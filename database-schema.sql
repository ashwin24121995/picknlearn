-- Pick N Learn Platform - Complete MySQL Schema
-- Generated for Railway deployment
-- Run this file to create all tables manually

-- Users table with email/password authentication
CREATE TABLE IF NOT EXISTS `users` (
  `id` int AUTO_INCREMENT NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` text,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `users_id` PRIMARY KEY(`id`),
  CONSTRAINT `users_email_unique` UNIQUE(`email`)
);

-- Lesson Categories
CREATE TABLE IF NOT EXISTS `lesson_categories` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text,
  `icon` varchar(50),
  `orderIndex` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `lesson_categories_id` PRIMARY KEY(`id`),
  CONSTRAINT `lesson_categories_slug_unique` UNIQUE(`slug`)
);

-- Lessons
CREATE TABLE IF NOT EXISTS `lessons` (
  `id` int AUTO_INCREMENT NOT NULL,
  `categoryId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL,
  `difficulty` enum('beginner','intermediate','advanced') NOT NULL,
  `estimatedMinutes` int NOT NULL,
  `orderIndex` int NOT NULL DEFAULT 0,
  `isPublished` boolean NOT NULL DEFAULT true,
  `tags` json,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `lessons_id` PRIMARY KEY(`id`),
  CONSTRAINT `lessons_slug_unique` UNIQUE(`slug`)
);

-- Quizzes
CREATE TABLE IF NOT EXISTS `quizzes` (
  `id` int AUTO_INCREMENT NOT NULL,
  `lessonId` int,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `difficulty` enum('beginner','intermediate','advanced') NOT NULL,
  `passingScore` int NOT NULL DEFAULT 70,
  `timeLimit` int,
  `isPublished` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `quizzes_id` PRIMARY KEY(`id`),
  CONSTRAINT `quizzes_slug_unique` UNIQUE(`slug`)
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS `quiz_questions` (
  `id` int AUTO_INCREMENT NOT NULL,
  `quizId` int NOT NULL,
  `questionType` enum('multiple_choice','true_false','scenario') NOT NULL,
  `question` text NOT NULL,
  `options` json,
  `correctAnswer` text NOT NULL,
  `explanation` text NOT NULL,
  `points` int NOT NULL DEFAULT 1,
  `orderIndex` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `quiz_questions_id` PRIMARY KEY(`id`)
);

-- Glossary Terms
CREATE TABLE IF NOT EXISTS `glossary_terms` (
  `id` int AUTO_INCREMENT NOT NULL,
  `term` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `definition` text NOT NULL,
  `example` text,
  `category` varchar(50) NOT NULL,
  `relatedTerms` json,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `glossary_terms_id` PRIMARY KEY(`id`),
  CONSTRAINT `glossary_terms_term_unique` UNIQUE(`term`),
  CONSTRAINT `glossary_terms_slug_unique` UNIQUE(`slug`)
);

-- Tutorials
CREATE TABLE IF NOT EXISTS `tutorials` (
  `id` int AUTO_INCREMENT NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `difficulty` enum('beginner','intermediate','advanced') NOT NULL,
  `estimatedMinutes` int NOT NULL,
  `category` varchar(50) NOT NULL,
  `isPublished` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `tutorials_id` PRIMARY KEY(`id`),
  CONSTRAINT `tutorials_slug_unique` UNIQUE(`slug`)
);

-- Tutorial Steps
CREATE TABLE IF NOT EXISTS `tutorial_steps` (
  `id` int AUTO_INCREMENT NOT NULL,
  `tutorialId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(500),
  `orderIndex` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `tutorial_steps_id` PRIMARY KEY(`id`)
);

-- Achievements
CREATE TABLE IF NOT EXISTS `achievements` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(100) NOT NULL,
  `category` enum('lessons','quizzes','engagement','mastery') NOT NULL,
  `requirement` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);

-- User Lesson Progress
CREATE TABLE IF NOT EXISTS `user_lesson_progress` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `lessonId` int NOT NULL,
  `completed` enum('true','false') NOT NULL DEFAULT 'false',
  `completedAt` timestamp,
  `timeSpentMinutes` int DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `user_lesson_progress_id` PRIMARY KEY(`id`)
);

-- User Quiz Attempts
CREATE TABLE IF NOT EXISTS `user_quiz_attempts` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `quizId` int NOT NULL,
  `score` int NOT NULL,
  `totalQuestions` int NOT NULL,
  `correctAnswers` int NOT NULL,
  `timeSpent` int,
  `isPassed` boolean NOT NULL,
  `answers` json,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `user_quiz_attempts_id` PRIMARY KEY(`id`)
);

-- User Tutorial Progress
CREATE TABLE IF NOT EXISTS `user_tutorial_progress` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `tutorialId` int NOT NULL,
  `currentStepId` int,
  `isCompleted` boolean NOT NULL DEFAULT false,
  `completedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `user_tutorial_progress_id` PRIMARY KEY(`id`)
);

-- User Bookmarks
CREATE TABLE IF NOT EXISTS `user_bookmarks` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `lessonId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `user_bookmarks_id` PRIMARY KEY(`id`)
);

-- Bookmarks (legacy)
CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `itemType` enum('lesson','glossary') NOT NULL,
  `itemId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `bookmarks_id` PRIMARY KEY(`id`)
);

-- User Achievements
CREATE TABLE IF NOT EXISTS `user_achievements` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `achievementId` int NOT NULL,
  `unlockedAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `user_achievements_id` PRIMARY KEY(`id`)
);

-- User Statistics
CREATE TABLE IF NOT EXISTS `user_statistics` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `totalLessonsCompleted` int NOT NULL DEFAULT 0,
  `totalQuizzesTaken` int NOT NULL DEFAULT 0,
  `totalQuizzesPassed` int NOT NULL DEFAULT 0,
  `averageQuizScore` int NOT NULL DEFAULT 0,
  `currentStreak` int NOT NULL DEFAULT 0,
  `longestStreak` int NOT NULL DEFAULT 0,
  `lastActivityDate` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `user_statistics_id` PRIMARY KEY(`id`),
  CONSTRAINT `user_statistics_userId_unique` UNIQUE(`userId`)
);

-- Indexes for better performance
CREATE INDEX idx_lessons_categoryId ON lessons(categoryId);
CREATE INDEX idx_lessons_slug ON lessons(slug);
CREATE INDEX idx_quizzes_lessonId ON quizzes(lessonId);
CREATE INDEX idx_quiz_questions_quizId ON quiz_questions(quizId);
CREATE INDEX idx_user_lesson_progress_userId ON user_lesson_progress(userId);
CREATE INDEX idx_user_quiz_attempts_userId ON user_quiz_attempts(userId);
CREATE INDEX idx_user_bookmarks_userId ON user_bookmarks(userId);
CREATE INDEX idx_user_achievements_userId ON user_achievements(userId);
