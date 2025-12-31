CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(100) NOT NULL,
	`category` enum('lessons','quizzes','engagement','mastery') NOT NULL,
	`requirement` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`itemType` enum('lesson','glossary') NOT NULL,
	`itemId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookmarks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_statistics` (
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
--> statement-breakpoint
ALTER TABLE `user_achievements` ADD `achievementId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `user_achievements` ADD `unlockedAt` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_lesson_progress` ADD `completed` enum('true','false') DEFAULT 'false' NOT NULL;--> statement-breakpoint
ALTER TABLE `user_lesson_progress` ADD `timeSpentMinutes` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `user_achievements` DROP COLUMN `achievementType`;--> statement-breakpoint
ALTER TABLE `user_achievements` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `user_achievements` DROP COLUMN `description`;--> statement-breakpoint
ALTER TABLE `user_achievements` DROP COLUMN `icon`;--> statement-breakpoint
ALTER TABLE `user_achievements` DROP COLUMN `earnedAt`;--> statement-breakpoint
ALTER TABLE `user_lesson_progress` DROP COLUMN `isCompleted`;--> statement-breakpoint
ALTER TABLE `user_lesson_progress` DROP COLUMN `timeSpent`;