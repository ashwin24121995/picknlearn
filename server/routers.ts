import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { dashboardRouter } from "./routers-dashboard";
import { hashPassword, comparePassword, generateToken } from "./auth-utils";

export const appRouter = router({
  dashboard: dashboardRouter,
  
  auth: router({
    // Get current user
    me: publicProcedure.query(opts => opts.ctx.user),
    
    // Register new user
    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Check if user already exists
        const existingUser = await db.getUserByEmail(input.email);
        if (existingUser) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User with this email already exists",
          });
        }

        // Hash password
        const hashedPassword = await hashPassword(input.password);

        // Create user
        const user = await db.createUser(input.email, hashedPassword, input.name);

        // Generate token
        const token = generateToken({
          userId: user.id,
          email: user.email,
        });

        return {
          success: true,
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      }),
    
    // Login
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Get user by email
        const user = await db.getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }

        // Compare password
        const isValid = await comparePassword(input.password, user.password);
        if (!isValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }

        // Update last sign in
        await db.updateUserLastSignIn(user.id);

        // Generate token
        const token = generateToken({
          userId: user.id,
          email: user.email,
        });

        return {
          success: true,
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      }),
    
    // Logout
    logout: publicProcedure.mutation(() => {
      return { success: true };
    }),
  }),

  // Lesson Categories
  lessonCategories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllLessonCategories();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getLessonCategoryBySlug(input.slug);
      }),
  }),

  // Lessons
  lessons: router({
    list: publicProcedure.query(async () => {
      return await db.getAllLessons();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getLessonBySlug(input.slug);
      }),
    
    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getLessonsByCategory(input.categoryId);
      }),
    
    // User progress (protected)
    getProgress: protectedProcedure
      .input(z.object({ lessonId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserLessonProgress(ctx.user.id, input.lessonId);
      }),
    
    markComplete: protectedProcedure
      .input(z.object({
        lessonId: z.number(),
        timeSpent: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.markLessonComplete(ctx.user.id, input.lessonId, input.timeSpent);
        return { success: true };
      }),
  }),

  // Quizzes
  quizzes: router({
    list: publicProcedure.query(async () => {
      return await db.getAllQuizzes();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const quiz = await db.getQuizBySlug(input.slug);
        if (!quiz) return null;
        
        const questions = await db.getQuizQuestions(quiz.id);
        return { ...quiz, questions };
      }),
    
    // User attempts (protected)
    getAttempts: protectedProcedure
      .input(z.object({ quizId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserQuizAttempts(ctx.user.id, input.quizId);
      }),
    
    submitAttempt: protectedProcedure
      .input(z.object({
        quizId: z.number(),
        answers: z.record(z.string(), z.string()),
        timeSpent: z.number().nullable(),
      }))
      .mutation(async ({ ctx, input }) => {
        const questions = await db.getQuizQuestions(input.quizId);
        const quiz = await db.getQuizBySlug(input.quizId.toString());
        if (!quiz) throw new TRPCError({ code: "NOT_FOUND", message: "Quiz not found" });
        
        let correctAnswers = 0;
        questions.forEach(q => {
          if (input.answers[q.id.toString()] === q.correctAnswer) {
            correctAnswers++;
          }
        });
        
        const score = Math.round((correctAnswers / questions.length) * 100);
        const isPassed = score >= quiz.passingScore;
        
        await db.saveQuizAttempt(
          ctx.user.id,
          input.quizId,
          score,
          questions.length,
          correctAnswers,
          input.timeSpent || 0,
          isPassed,
          input.answers
        );
        
        return {
          score,
          correctAnswers,
          totalQuestions: questions.length,
          isPassed,
        };
      }),
  }),

  // Glossary
  glossary: router({
    list: publicProcedure.query(async () => {
      return await db.getAllGlossaryTerms();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getGlossaryTermBySlug(input.slug);
      }),
    
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return await db.searchGlossaryTerms(input.query);
      }),
  }),

  // Bookmarks
  bookmarks: router({
    list: protectedProcedure
      .input(z.object({ itemType: z.enum(["lesson", "glossary"]).optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserBookmarks(ctx.user.id, input.itemType);
      }),
    
    add: protectedProcedure
      .input(z.object({
        itemType: z.enum(["lesson", "glossary"]),
        itemId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.addBookmark(ctx.user.id, input.itemType, input.itemId);
        return { success: true };
      }),
    
    remove: protectedProcedure
      .input(z.object({
        itemType: z.enum(["lesson", "glossary"]),
        itemId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.removeBookmark(ctx.user.id, input.itemType, input.itemId);
        return { success: true };
      }),
  }),

  // Achievements
  achievements: router({
    list: publicProcedure.query(async () => {
      return await db.getAllAchievements();
    }),
    
    userAchievements: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserAchievements(ctx.user.id);
    }),
  }),

  // User Statistics
  userStats: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserStatistics(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
