import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { dashboardRouter } from "./routers-dashboard";

export const appRouter = router({
  system: systemRouter,
  dashboard: dashboardRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
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
    
    updateProgress: protectedProcedure
      .input(z.object({
        lessonId: z.number(),
        isCompleted: z.boolean(),
        timeSpent: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateLessonProgress(
          ctx.user.id,
          input.lessonId,
          input.isCompleted,
          input.timeSpent
        );
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
        const quiz = await db.getQuizById(input.quizId);
        if (!quiz) throw new Error("Quiz not found");
        
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
          input.timeSpent,
          isPassed,
          input.answers as Record<string, string>
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
    
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getGlossaryTermsByCategory(input.category);
      }),
  }),

  // Tutorials
  tutorials: router({
    list: publicProcedure.query(async () => {
      return await db.getAllTutorials();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const tutorial = await db.getTutorialBySlug(input.slug);
        if (!tutorial) return null;
        
        const steps = await db.getTutorialSteps(tutorial.id);
        return { ...tutorial, steps };
      }),
  }),

  // User Dashboard
  user: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserStats(ctx.user.id);
    }),
    
    bookmarks: router({
      list: protectedProcedure.query(async ({ ctx }) => {
        return await db.getUserBookmarks(ctx.user.id);
      }),
      
      add: protectedProcedure
        .input(z.object({ lessonId: z.number() }))
        .mutation(async ({ ctx, input }) => {
          await db.addBookmark(ctx.user.id, input.lessonId);
          return { success: true };
        }),
      
      remove: protectedProcedure
        .input(z.object({ lessonId: z.number() }))
        .mutation(async ({ ctx, input }) => {
          await db.removeBookmark(ctx.user.id, input.lessonId);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
