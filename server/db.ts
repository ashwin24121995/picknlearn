import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  lessonCategories,
  lessons,
  quizzes,
  quizQuestions,
  glossaryTerms,
  tutorials,
  tutorialSteps,
  userLessonProgress,
  userQuizAttempts,
  userTutorialProgress,
  userAchievements,
  userBookmarks,
  bookmarks,
  achievements,
  userStatistics,
  type LessonCategory,
  type Lesson,
  type Quiz,
  type QuizQuestion,
  type GlossaryTerm,
  type Tutorial,
  type TutorialStep,
  type UserLessonProgress,
  type UserQuizAttempt,
  type User,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============= User Management (Custom Auth) =============

export async function createUser(email: string, hashedPassword: string, name?: string): Promise<User> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const values: InsertUser = {
    email,
    password: hashedPassword,
    name: name || null,
    role: "user",
  };

  await db.insert(users).values(values);
  
  // Get the created user
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserLastSignIn(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(users)
    .set({ lastSignedIn: new Date() })
    .where(eq(users.id, userId));
}

// ============= Lesson Categories =============

export async function getAllLessonCategories() {
  const db = await getDb();
  if (!db) return [];

  const categories = await db.select().from(lessonCategories).orderBy(lessonCategories.orderIndex);
  return categories;
}

export async function getLessonCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(lessonCategories).where(eq(lessonCategories.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============= Lessons =============

export async function getAllLessons() {
  const db = await getDb();
  if (!db) return [];

  const allLessons = await db.select().from(lessons)
    .where(eq(lessons.isPublished, true))
    .orderBy(lessons.orderIndex);
  return allLessons;
}

export async function getLessonBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(lessons).where(eq(lessons.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getLessonsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];

  const categoryLessons = await db.select().from(lessons)
    .where(and(
      eq(lessons.categoryId, categoryId),
      eq(lessons.isPublished, true)
    ))
    .orderBy(lessons.orderIndex);
  return categoryLessons;
}

// ============= Quizzes =============

export async function getAllQuizzes() {
  const db = await getDb();
  if (!db) return [];

  const allQuizzes = await db.select().from(quizzes)
    .where(eq(quizzes.isPublished, true));
  return allQuizzes;
}

export async function getQuizBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getQuizQuestions(quizId: number) {
  const db = await getDb();
  if (!db) return [];

  const questions = await db.select().from(quizQuestions)
    .where(eq(quizQuestions.quizId, quizId))
    .orderBy(quizQuestions.orderIndex);
  return questions;
}

// ============= Glossary =============

export async function getAllGlossaryTerms() {
  const db = await getDb();
  if (!db) return [];

  const terms = await db.select().from(glossaryTerms).orderBy(glossaryTerms.term);
  return terms;
}

export async function getGlossaryTermBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(glossaryTerms).where(eq(glossaryTerms.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function searchGlossaryTerms(searchTerm: string) {
  const db = await getDb();
  if (!db) return [];

  const terms = await db.select().from(glossaryTerms)
    .where(sql`${glossaryTerms.term} LIKE ${`%${searchTerm}%`} OR ${glossaryTerms.definition} LIKE ${`%${searchTerm}%`}`)
    .orderBy(glossaryTerms.term);
  return terms;
}

// ============= User Progress =============

export async function getUserLessonProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userLessonProgress)
    .where(and(
      eq(userLessonProgress.userId, userId),
      eq(userLessonProgress.lessonId, lessonId)
    ))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function markLessonComplete(userId: number, lessonId: number, timeSpent: number = 0) {
  const db = await getDb();
  if (!db) return;

  const existing = await getUserLessonProgress(userId, lessonId);

  if (existing) {
    await db.update(userLessonProgress)
      .set({
        completed: "true",
        completedAt: new Date(),
        timeSpentMinutes: timeSpent,
        updatedAt: new Date(),
      })
      .where(eq(userLessonProgress.id, existing.id));
  } else {
    await db.insert(userLessonProgress).values({
      userId,
      lessonId,
      completed: "true",
      completedAt: new Date(),
      timeSpentMinutes: timeSpent,
    });
  }
}

export async function getUserCompletedLessons(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const completed = await db.select().from(userLessonProgress)
    .where(and(
      eq(userLessonProgress.userId, userId),
      eq(userLessonProgress.completed, "true")
    ));
  return completed;
}

// ============= Quiz Attempts =============

export async function saveQuizAttempt(
  userId: number,
  quizId: number,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  timeSpent: number,
  isPassed: boolean,
  answers: Record<string, string>
) {
  const db = await getDb();
  if (!db) return;

  await db.insert(userQuizAttempts).values({
    userId,
    quizId,
    score,
    totalQuestions,
    correctAnswers,
    timeSpent,
    isPassed,
    answers,
  });
}

export async function getUserQuizAttempts(userId: number, quizId?: number) {
  const db = await getDb();
  if (!db) return [];

  if (quizId) {
    const attempts = await db.select().from(userQuizAttempts)
      .where(and(
        eq(userQuizAttempts.userId, userId),
        eq(userQuizAttempts.quizId, quizId)
      ))
      .orderBy(desc(userQuizAttempts.createdAt));
    return attempts;
  } else {
    const attempts = await db.select().from(userQuizAttempts)
      .where(eq(userQuizAttempts.userId, userId))
      .orderBy(desc(userQuizAttempts.createdAt));
    return attempts;
  }
}

// ============= Bookmarks =============

export async function addBookmark(userId: number, itemType: "lesson" | "glossary", itemId: number) {
  const db = await getDb();
  if (!db) return;

  // Check if already bookmarked
  const existing = await db.select().from(bookmarks)
    .where(and(
      eq(bookmarks.userId, userId),
      eq(bookmarks.itemType, itemType),
      eq(bookmarks.itemId, itemId)
    ))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(bookmarks).values({
      userId,
      itemType,
      itemId,
    });
  }
}

export async function removeBookmark(userId: number, itemType: "lesson" | "glossary", itemId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(bookmarks)
    .where(and(
      eq(bookmarks.userId, userId),
      eq(bookmarks.itemType, itemType),
      eq(bookmarks.itemId, itemId)
    ));
}

export async function getUserBookmarks(userId: number, itemType?: "lesson" | "glossary") {
  const db = await getDb();
  if (!db) return [];

  if (itemType) {
    return await db.select().from(bookmarks)
      .where(and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.itemType, itemType)
      ))
      .orderBy(desc(bookmarks.createdAt));
  } else {
    return await db.select().from(bookmarks)
      .where(eq(bookmarks.userId, userId))
      .orderBy(desc(bookmarks.createdAt));
  }
}

// ============= Achievements =============

export async function getAllAchievements() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(achievements).orderBy(achievements.category);
}

export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(userAchievements)
    .where(eq(userAchievements.userId, userId))
    .orderBy(desc(userAchievements.unlockedAt));
}

export async function unlockAchievement(userId: number, achievementId: number) {
  const db = await getDb();
  if (!db) return;

  // Check if already unlocked
  const existing = await db.select().from(userAchievements)
    .where(and(
      eq(userAchievements.userId, userId),
      eq(userAchievements.achievementId, achievementId)
    ))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(userAchievements).values({
      userId,
      achievementId,
    });
  }
}

// ============= User Statistics =============

export async function getUserStatistics(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userStatistics)
    .where(eq(userStatistics.userId, userId))
    .limit(1);
  
  if (result.length === 0) {
    // Create initial statistics
    await db.insert(userStatistics).values({
      userId,
      totalLessonsCompleted: 0,
      totalQuizzesTaken: 0,
      totalQuizzesPassed: 0,
      averageQuizScore: 0,
      currentStreak: 0,
      longestStreak: 0,
    });
    return await getUserStatistics(userId);
  }
  
  return result[0];
}

export async function updateUserStatistics(userId: number, updates: Partial<typeof userStatistics.$inferInsert>) {
  const db = await getDb();
  if (!db) return;

  await db.update(userStatistics)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(userStatistics.userId, userId));
}
