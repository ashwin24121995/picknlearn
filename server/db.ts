import { eq, and, desc, asc, sql } from "drizzle-orm";
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
  type LessonCategory,
  type Lesson,
  type Quiz,
  type QuizQuestion,
  type GlossaryTerm,
  type Tutorial,
  type TutorialStep,
  type UserLessonProgress,
  type UserQuizAttempt,
} from "../drizzle/schema";
import { ENV } from './_core/env';

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

// ============= User Management =============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============= Lesson Categories =============

export async function getAllLessonCategories() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(lessonCategories).orderBy(asc(lessonCategories.orderIndex));
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
  
  return await db.select().from(lessons)
    .where(eq(lessons.isPublished, true))
    .orderBy(asc(lessons.orderIndex));
}

export async function getLessonsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(lessons)
    .where(and(eq(lessons.categoryId, categoryId), eq(lessons.isPublished, true)))
    .orderBy(asc(lessons.orderIndex));
}

export async function getLessonBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(lessons).where(eq(lessons.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getLessonById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============= Quizzes =============

export async function getAllQuizzes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(quizzes)
    .where(eq(quizzes.isPublished, true))
    .orderBy(desc(quizzes.createdAt));
}

export async function getQuizBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getQuizById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(quizzes).where(eq(quizzes.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getQuizQuestions(quizId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(quizQuestions)
    .where(eq(quizQuestions.quizId, quizId))
    .orderBy(asc(quizQuestions.orderIndex));
}

// ============= Glossary =============

export async function getAllGlossaryTerms() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(glossaryTerms).orderBy(asc(glossaryTerms.term));
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
  
  return await db.select().from(glossaryTerms)
    .where(sql`${glossaryTerms.term} LIKE ${`%${searchTerm}%`} OR ${glossaryTerms.definition} LIKE ${`%${searchTerm}%`}`)
    .orderBy(asc(glossaryTerms.term));
}

export async function getGlossaryTermsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(glossaryTerms)
    .where(eq(glossaryTerms.category, category))
    .orderBy(asc(glossaryTerms.term));
}

// ============= Tutorials =============

export async function getAllTutorials() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(tutorials)
    .where(eq(tutorials.isPublished, true))
    .orderBy(desc(tutorials.createdAt));
}

export async function getTutorialBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(tutorials).where(eq(tutorials.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getTutorialSteps(tutorialId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(tutorialSteps)
    .where(eq(tutorialSteps.tutorialId, tutorialId))
    .orderBy(asc(tutorialSteps.orderIndex));
}

// ============= User Progress =============

export async function getUserLessonProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLessonProgress(userId: number, lessonId: number, isCompleted: boolean, timeSpent: number) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db.select().from(userLessonProgress).where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId))).limit(1);
  
  if (existing.length > 0) {
    await db.update(userLessonProgress)
      .set({
        completed: isCompleted ? "true" : "false",
        completedAt: isCompleted ? new Date() : null,
        timeSpentMinutes: (existing[0]?.timeSpentMinutes || 0) + timeSpent,
        updatedAt: new Date(),
      })
      .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)));
  } else {
    await db.insert(userLessonProgress).values({
      userId,
      lessonId,
      completed: isCompleted ? "true" : "false",
      completedAt: isCompleted ? new Date() : null,
      timeSpentMinutes: timeSpent,
    });
  }
}

export async function getUserQuizAttempts(userId: number, quizId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(userQuizAttempts)
    .where(and(eq(userQuizAttempts.userId, userId), eq(userQuizAttempts.quizId, quizId)))
    .orderBy(desc(userQuizAttempts.createdAt));
}

export async function saveQuizAttempt(
  userId: number,
  quizId: number,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  timeSpent: number | null,
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

export async function getUserStats(userId: number) {
  const db = await getDb();
  if (!db) return {
    completedLessons: 0,
    totalQuizzes: 0,
    averageScore: 0,
    totalTimeSpent: 0,
  };
  
  const completedLessons = await db.select({ count: sql<number>`count(*)` })
    .from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.completed, "true")));
  
  const quizStats = await db.select({
    count: sql<number>`count(*)`,
    avgScore: sql<number>`avg(${userQuizAttempts.score})`,
  })
    .from(userQuizAttempts)
    .where(eq(userQuizAttempts.userId, userId));
  
  const timeSpent = await db.select({ total: sql<number>`sum(${userLessonProgress.timeSpentMinutes})` })
    .from(userLessonProgress)
    .where(eq(userLessonProgress.userId, userId));
  
  return {
    completedLessons: completedLessons[0]?.count || 0,
    totalQuizzes: quizStats[0]?.count || 0,
    averageScore: Math.round(quizStats[0]?.avgScore || 0),
    totalTimeSpent: timeSpent[0]?.total || 0,
  };
}

// ============= Bookmarks =============

export async function getUserBookmarks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select({
    id: userBookmarks.id,
    lessonId: userBookmarks.lessonId,
    createdAt: userBookmarks.createdAt,
    lesson: lessons,
  })
    .from(userBookmarks)
    .leftJoin(lessons, eq(userBookmarks.lessonId, lessons.id))
    .where(eq(userBookmarks.userId, userId))
    .orderBy(desc(userBookmarks.createdAt));
}

export async function addBookmark(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(userBookmarks).values({ userId, lessonId });
}

export async function removeBookmark(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.delete(userBookmarks)
    .where(and(eq(userBookmarks.userId, userId), eq(userBookmarks.lessonId, lessonId)));
}
