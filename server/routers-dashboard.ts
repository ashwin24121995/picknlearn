import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import {
  markLessonComplete,
  getUserLessonProgress,
  getAllUserProgress,
  addBookmark,
  removeBookmark,
  getUserBookmarks,
  isBookmarked,
  getUserAchievements,
  getUserDashboardStats,
} from "./db-dashboard";

export const dashboardRouter = router({
  // Progress tracking
  markLessonComplete: protectedProcedure
    .input(
      z.object({
        lessonId: z.number(),
        timeSpentMinutes: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await markLessonComplete(ctx.user.id, input.lessonId, input.timeSpentMinutes);
    }),

  getLessonProgress: protectedProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await getUserLessonProgress(ctx.user.id, input.lessonId);
    }),

  getAllProgress: protectedProcedure.query(async ({ ctx }) => {
    return await getAllUserProgress(ctx.user.id);
  }),

  // Bookmarks
  addBookmark: protectedProcedure
    .input(
      z.object({
        itemType: z.enum(["lesson", "glossary"]),
        itemId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await addBookmark(ctx.user.id, input.itemType, input.itemId);
    }),

  removeBookmark: protectedProcedure
    .input(
      z.object({
        itemType: z.enum(["lesson", "glossary"]),
        itemId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await removeBookmark(ctx.user.id, input.itemType, input.itemId);
    }),

  getBookmarks: protectedProcedure.query(async ({ ctx }) => {
    return await getUserBookmarks(ctx.user.id);
  }),

  isBookmarked: protectedProcedure
    .input(
      z.object({
        itemType: z.enum(["lesson", "glossary"]),
        itemId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await isBookmarked(ctx.user.id, input.itemType, input.itemId);
    }),

  // Achievements
  getAchievements: protectedProcedure.query(async ({ ctx }) => {
    return await getUserAchievements(ctx.user.id);
  }),

  // Dashboard stats
  getStats: protectedProcedure.query(async ({ ctx }) => {
    return await getUserDashboardStats(ctx.user.id);
  }),
});
