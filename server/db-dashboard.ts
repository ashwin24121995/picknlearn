import { and, desc, eq, sql } from "drizzle-orm";
import { 
  userLessonProgress, 
  bookmarks, 
  achievements, 
  userAchievements, 
  userStatistics,
  lessons,
  glossaryTerms,
  userQuizAttempts
} from "../drizzle/schema";
import { getDb } from "./db";

// Progress Tracking
export async function markLessonComplete(userId: number, lessonId: number, timeSpentMinutes: number) {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(userLessonProgress)
      .set({
        completed: "true",
        completedAt: new Date(),
        timeSpentMinutes: (existing[0]?.timeSpentMinutes || 0) + timeSpentMinutes,
        updatedAt: new Date(),
      })
      .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)));
  } else {
    await db.insert(userLessonProgress).values({
      userId,
      lessonId,
      completed: "true",
      completedAt: new Date(),
      timeSpentMinutes,
    });
  }

  // Update user statistics
  await updateUserStatistics(userId);
  
  // Check for achievements
  await checkAndUnlockAchievements(userId);

  return true;
}

export async function getUserLessonProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getAllUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(userLessonProgress)
    .where(eq(userLessonProgress.userId, userId));
}

// Bookmarks
export async function addBookmark(userId: number, itemType: "lesson" | "glossary", itemId: number) {
  const db = await getDb();
  if (!db) return null;

  // Check if already bookmarked
  const existing = await db
    .select()
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.itemType, itemType),
        eq(bookmarks.itemId, itemId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  await db.insert(bookmarks).values({
    userId,
    itemType,
    itemId,
  });

  // Fetch the newly created bookmark
  const newBookmark = await db
    .select()
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.itemType, itemType),
        eq(bookmarks.itemId, itemId)
      )
    )
    .limit(1);

  return newBookmark[0] || null;
}

export async function removeBookmark(userId: number, itemType: "lesson" | "glossary", itemId: number) {
  const db = await getDb();
  if (!db) return false;

  await db
    .delete(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.itemType, itemType),
        eq(bookmarks.itemId, itemId)
      )
    );

  return true;
}

export async function getUserBookmarks(userId: number) {
  const db = await getDb();
  if (!db) return { lessons: [], glossary: [] };

  const allBookmarks = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));

  const lessonBookmarks = allBookmarks.filter(b => b.itemType === "lesson");
  const glossaryBookmarks = allBookmarks.filter(b => b.itemType === "glossary");

  // Fetch actual lesson and glossary data
  const lessonIds = lessonBookmarks.map(b => b.itemId);
  const glossaryIds = glossaryBookmarks.map(b => b.itemId);

  const lessonData = lessonIds.length > 0
    ? await db.select().from(lessons).where(sql`${lessons.id} IN (${sql.join(lessonIds.map(id => sql`${id}`), sql`, `)})`)
    : [];

  const glossaryData = glossaryIds.length > 0
    ? await db.select().from(glossaryTerms).where(sql`${glossaryTerms.id} IN (${sql.join(glossaryIds.map(id => sql`${id}`), sql`, `)})`)
    : [];

  return {
    lessons: lessonData,
    glossary: glossaryData,
  };
}

export async function isBookmarked(userId: number, itemType: "lesson" | "glossary", itemId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .select()
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.itemType, itemType),
        eq(bookmarks.itemId, itemId)
      )
    )
    .limit(1);

  return result.length > 0;
}

// Achievements
export async function checkAndUnlockAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const stats = await getUserDashboardStats(userId);
  const allAchievements = await db.select().from(achievements);
  const userAchievementRecords = await db
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  const unlockedIds = new Set(userAchievementRecords.map(ua => ua.achievementId));
  const newlyUnlocked = [];

  for (const achievement of allAchievements) {
    if (unlockedIds.has(achievement.id)) continue;

    let shouldUnlock = false;

    switch (achievement.category) {
      case "lessons":
        shouldUnlock = stats.totalLessonsCompleted >= achievement.requirement;
        break;
      case "quizzes":
        shouldUnlock = stats.totalQuizzesPassed >= achievement.requirement;
        break;
      case "engagement":
        shouldUnlock = stats.currentStreak >= achievement.requirement;
        break;
      case "mastery":
        shouldUnlock = stats.averageQuizScore >= achievement.requirement;
        break;
    }

    if (shouldUnlock) {
      await db.insert(userAchievements).values({
        userId,
        achievementId: achievement.id,
      });
      newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
}

export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const userAchievementRecords = await db
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  const achievementIds = userAchievementRecords.map(ua => ua.achievementId);
  
  if (achievementIds.length === 0) return [];

  const achievementData = await db
    .select()
    .from(achievements)
    .where(sql`${achievements.id} IN (${sql.join(achievementIds.map(id => sql`${id}`), sql`, `)})`);

  return achievementData.map(achievement => {
    const userRecord = userAchievementRecords.find(ua => ua.achievementId === achievement.id);
    return {
      ...achievement,
      unlockedAt: userRecord?.unlockedAt,
    };
  });
}

// User Statistics
export async function updateUserStatistics(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const completedLessons = await db
    .select({ count: sql<number>`count(*)` })
    .from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.completed, "true")));

  const quizStats = await db
    .select({
      total: sql<number>`count(*)`,
      passed: sql<number>`sum(case when ${userQuizAttempts.isPassed} = 1 then 1 else 0 end)`,
      avgScore: sql<number>`avg(${userQuizAttempts.score})`,
    })
    .from(userQuizAttempts)
    .where(eq(userQuizAttempts.userId, userId));

  const stats = quizStats[0];

  const existing = await db
    .select()
    .from(userStatistics)
    .where(eq(userStatistics.userId, userId))
    .limit(1);

  const updateData = {
    totalLessonsCompleted: Number(completedLessons[0]?.count || 0),
    totalQuizzesTaken: Number(stats?.total || 0),
    totalQuizzesPassed: Number(stats?.passed || 0),
    averageQuizScore: Math.round(Number(stats?.avgScore || 0)),
    lastActivityDate: new Date(),
    updatedAt: new Date(),
  };

  if (existing.length > 0) {
    await db
      .update(userStatistics)
      .set(updateData)
      .where(eq(userStatistics.userId, userId));
  } else {
    await db.insert(userStatistics).values({
      userId,
      ...updateData,
      currentStreak: 0,
      longestStreak: 0,
    });
  }

  return updateData;
}

export async function getUserDashboardStats(userId: number) {
  const db = await getDb();
  if (!db) {
    return {
      totalLessonsCompleted: 0,
      totalQuizzesTaken: 0,
      totalQuizzesPassed: 0,
      averageQuizScore: 0,
      currentStreak: 0,
      longestStreak: 0,
      recentActivity: [],
    };
  }

  let stats = await db
    .select()
    .from(userStatistics)
    .where(eq(userStatistics.userId, userId))
    .limit(1);

  if (stats.length === 0) {
    await updateUserStatistics(userId);
    stats = await db
      .select()
      .from(userStatistics)
      .where(eq(userStatistics.userId, userId))
      .limit(1);
  }

  const recentLessons = await db
    .select()
    .from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.completed, "true")))
    .orderBy(desc(userLessonProgress.completedAt))
    .limit(5);

  const recentQuizzes = await db
    .select()
    .from(userQuizAttempts)
    .where(eq(userQuizAttempts.userId, userId))
    .orderBy(desc(userQuizAttempts.createdAt))
    .limit(5);

  return {
    ...stats[0],
    recentActivity: {
      lessons: recentLessons,
      quizzes: recentQuizzes,
    },
  };
}
