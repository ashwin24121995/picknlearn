import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Lesson categories for organizing curriculum
 */
export const lessonCategories = mysqlTable("lesson_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }), // Icon name for UI
  orderIndex: int("orderIndex").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LessonCategory = typeof lessonCategories.$inferSelect;
export type InsertLessonCategory = typeof lessonCategories.$inferInsert;

/**
 * Lessons table - comprehensive learning content
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(), // Markdown content
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]).notNull(),
  estimatedMinutes: int("estimatedMinutes").notNull(), // Reading time
  orderIndex: int("orderIndex").notNull().default(0),
  isPublished: boolean("isPublished").notNull().default(true),
  tags: json("tags").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

/**
 * Quizzes table - assessment content
 */
export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId"), // Optional - can be standalone
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description").notNull(),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]).notNull(),
  passingScore: int("passingScore").notNull().default(70), // Percentage
  timeLimit: int("timeLimit"), // Minutes, null for untimed
  isPublished: boolean("isPublished").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

/**
 * Quiz questions with multiple types
 */
export const quizQuestions = mysqlTable("quiz_questions", {
  id: int("id").autoincrement().primaryKey(),
  quizId: int("quizId").notNull(),
  questionType: mysqlEnum("questionType", ["multiple_choice", "true_false", "scenario"]).notNull(),
  question: text("question").notNull(),
  options: json("options").$type<string[]>(), // For multiple choice
  correctAnswer: text("correctAnswer").notNull(), // Index or value
  explanation: text("explanation").notNull(),
  points: int("points").notNull().default(1),
  orderIndex: int("orderIndex").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestions.$inferInsert;

/**
 * Glossary terms
 */
export const glossaryTerms = mysqlTable("glossary_terms", {
  id: int("id").autoincrement().primaryKey(),
  term: varchar("term", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  definition: text("definition").notNull(),
  example: text("example"),
  category: varchar("category", { length: 50 }).notNull(),
  relatedTerms: json("relatedTerms").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type InsertGlossaryTerm = typeof glossaryTerms.$inferInsert;

/**
 * Tutorials - step-by-step guides
 */
export const tutorials = mysqlTable("tutorials", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description").notNull(),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]).notNull(),
  estimatedMinutes: int("estimatedMinutes").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  isPublished: boolean("isPublished").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Tutorial = typeof tutorials.$inferSelect;
export type InsertTutorial = typeof tutorials.$inferInsert;

/**
 * Tutorial steps
 */
export const tutorialSteps = mysqlTable("tutorial_steps", {
  id: int("id").autoincrement().primaryKey(),
  tutorialId: int("tutorialId").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(), // Markdown
  imageUrl: varchar("imageUrl", { length: 500 }),
  orderIndex: int("orderIndex").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TutorialStep = typeof tutorialSteps.$inferSelect;
export type InsertTutorialStep = typeof tutorialSteps.$inferInsert;

/**
 * User progress for lessons
 */
export const userLessonProgress = mysqlTable("user_lesson_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  isCompleted: boolean("isCompleted").notNull().default(false),
  completedAt: timestamp("completedAt"),
  timeSpent: int("timeSpent").notNull().default(0), // Seconds
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserLessonProgress = typeof userLessonProgress.$inferSelect;
export type InsertUserLessonProgress = typeof userLessonProgress.$inferInsert;

/**
 * User quiz attempts and scores
 */
export const userQuizAttempts = mysqlTable("user_quiz_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  quizId: int("quizId").notNull(),
  score: int("score").notNull(), // Percentage
  totalQuestions: int("totalQuestions").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  timeSpent: int("timeSpent"), // Seconds
  isPassed: boolean("isPassed").notNull(),
  answers: json("answers").$type<Record<string, string>>(), // Question ID -> Answer
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserQuizAttempt = typeof userQuizAttempts.$inferSelect;
export type InsertUserQuizAttempt = typeof userQuizAttempts.$inferInsert;

/**
 * User tutorial progress
 */
export const userTutorialProgress = mysqlTable("user_tutorial_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tutorialId: int("tutorialId").notNull(),
  currentStepId: int("currentStepId"),
  isCompleted: boolean("isCompleted").notNull().default(false),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserTutorialProgress = typeof userTutorialProgress.$inferSelect;
export type InsertUserTutorialProgress = typeof userTutorialProgress.$inferInsert;

/**
 * User achievements/badges
 */
export const userAchievements = mysqlTable("user_achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementType: varchar("achievementType", { length: 50 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;

/**
 * User bookmarks for lessons
 */
export const userBookmarks = mysqlTable("user_bookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserBookmark = typeof userBookmarks.$inferSelect;
export type InsertUserBookmark = typeof userBookmarks.$inferInsert;
