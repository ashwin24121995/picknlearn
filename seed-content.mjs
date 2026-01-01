import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.js';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

console.log('🌱 Seeding database with fantasy cricket content...\n');

// Seed Lesson Categories
console.log('Creating lesson categories...');
const categories = await db.insert(schema.lessonCategories).values([
  {
    name: 'Fundamentals',
    description: 'Master the basics of fantasy cricket',
    slug: 'fundamentals',
    displayOrder: 1,
  },
  {
    name: 'Player Analysis',
    description: 'Learn how to analyze and select players',
    slug: 'player-analysis',
    displayOrder: 2,
  },
  {
    name: 'Team Building',
    description: 'Build winning fantasy cricket teams',
    slug: 'team-building',
    displayOrder: 3,
  },
  {
    name: 'Advanced Strategies',
    description: 'Master advanced tactics and strategies',
    slug: 'advanced-strategies',
    displayOrder: 4,
  },
]);

console.log('✅ Categories created\n');

// Seed Lessons
console.log('Creating lessons...');
const lessons = await db.insert(schema.lessons).values([
  {
    title: 'Introduction to Fantasy Cricket',
    slug: 'introduction-to-fantasy-cricket',
    description: 'Learn the basics of fantasy cricket, how it works, and how to get started with your first team.',
    content: '# Introduction to Fantasy Cricket\n\nFantasy cricket is a game where you create a virtual team of real cricket players...',
    categoryId: 1,
    difficulty: 'beginner',
    estimatedMinutes: 10,
    displayOrder: 1,
    isPublished: true,
  },
  {
    title: 'Understanding Player Roles',
    slug: 'understanding-player-roles',
    description: 'Deep dive into different player roles: batsmen, bowlers, all-rounders, and wicket-keepers.',
    content: '# Understanding Player Roles\n\nEach player in cricket has a specific role...',
    categoryId: 1,
    difficulty: 'beginner',
    estimatedMinutes: 15,
    displayOrder: 2,
    isPublished: true,
  },
  {
    title: 'Reading Player Statistics',
    slug: 'reading-player-statistics',
    description: 'Learn how to interpret batting averages, strike rates, economy rates, and other key statistics.',
    content: '# Reading Player Statistics\n\nStatistics are crucial for making informed decisions...',
    categoryId: 2,
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    displayOrder: 1,
    isPublished: true,
  },
  {
    title: 'Analyzing Recent Form',
    slug: 'analyzing-recent-form',
    description: 'Understand how to evaluate a player\'s recent performance and form trends.',
    content: '# Analyzing Recent Form\n\nRecent form is often more important than career statistics...',
    categoryId: 2,
    difficulty: 'intermediate',
    estimatedMinutes: 18,
    displayOrder: 2,
    isPublished: true,
  },
  {
    title: 'Building a Balanced Team',
    slug: 'building-balanced-team',
    description: 'Learn the art of creating a well-balanced fantasy cricket team within budget constraints.',
    content: '# Building a Balanced Team\n\nA balanced team has the right mix of batsmen, bowlers, and all-rounders...',
    categoryId: 3,
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    displayOrder: 1,
    isPublished: true,
  },
  {
    title: 'Captain and Vice-Captain Selection',
    slug: 'captain-vice-captain-selection',
    description: 'Master the strategy of selecting your captain and vice-captain for maximum points.',
    content: '# Captain and Vice-Captain Selection\n\nYour captain earns 2x points and vice-captain earns 1.5x points...',
    categoryId: 3,
    difficulty: 'advanced',
    estimatedMinutes: 20,
    displayOrder: 2,
    isPublished: true,
  },
]);

console.log('✅ Lessons created\n');

// Seed Quizzes
console.log('Creating quizzes...');
const quizzes = await db.insert(schema.quizzes).values([
  {
    title: 'Fantasy Cricket Basics Quiz',
    slug: 'fantasy-cricket-basics',
    description: 'Test your understanding of fantasy cricket fundamentals and basic concepts.',
    difficulty: 'beginner',
    passingScore: 70,
    timeLimit: 600, // 10 minutes in seconds
    isPublished: true,
  },
  {
    title: 'Player Selection Mastery',
    slug: 'player-selection-mastery',
    description: 'Challenge yourself on player analysis, statistics interpretation, and selection strategies.',
    difficulty: 'intermediate',
    passingScore: 75,
    timeLimit: 900, // 15 minutes
    isPublished: true,
  },
  {
    title: 'Advanced Team Building',
    slug: 'advanced-team-building',
    description: 'Test your advanced knowledge of team composition, budget management, and strategic planning.',
    difficulty: 'advanced',
    passingScore: 80,
    timeLimit: 1200, // 20 minutes
    isPublished: true,
  },
]);

console.log('✅ Quizzes created\n');

// Seed Quiz Questions for first quiz
console.log('Creating quiz questions...');
await db.insert(schema.quizQuestions).values([
  {
    quizId: 1,
    questionText: 'How many players can you select in a standard fantasy cricket team?',
    questionType: 'multiple_choice',
    points: 10,
    displayOrder: 1,
  },
  {
    quizId: 1,
    questionText: 'What multiplier does the captain receive for their points?',
    questionType: 'multiple_choice',
    points: 10,
    displayOrder: 2,
  },
  {
    quizId: 1,
    questionText: 'Which player role is mandatory to have at least one of in your team?',
    questionType: 'multiple_choice',
    points: 10,
    displayOrder: 3,
  },
]);

console.log('✅ Quiz questions created\n');

// Seed Answer Options
console.log('Creating answer options...');
await db.insert(schema.quizAnswerOptions).values([
  // Question 1 options
  { questionId: 1, optionText: '9 players', isCorrect: false, displayOrder: 1 },
  { questionId: 1, optionText: '11 players', isCorrect: true, displayOrder: 2 },
  { questionId: 1, optionText: '13 players', isCorrect: false, displayOrder: 3 },
  { questionId: 1, optionText: '15 players', isCorrect: false, displayOrder: 4 },
  
  // Question 2 options
  { questionId: 2, optionText: '1.5x', isCorrect: false, displayOrder: 1 },
  { questionId: 2, optionText: '2x', isCorrect: true, displayOrder: 2 },
  { questionId: 2, optionText: '2.5x', isCorrect: false, displayOrder: 3 },
  { questionId: 2, optionText: '3x', isCorrect: false, displayOrder: 4 },
  
  // Question 3 options
  { questionId: 3, optionText: 'Batsman', isCorrect: false, displayOrder: 1 },
  { questionId: 3, optionText: 'Bowler', isCorrect: false, displayOrder: 2 },
  { questionId: 3, optionText: 'Wicket-keeper', isCorrect: true, displayOrder: 3 },
  { questionId: 3, optionText: 'All-rounder', isCorrect: false, displayOrder: 4 },
]);

console.log('✅ Answer options created\n');

await connection.end();

console.log('🎉 Database seeded successfully!');
console.log('\nCreated:');
console.log('- 4 lesson categories');
console.log('- 6 lessons');
console.log('- 3 quizzes');
console.log('- 3 quiz questions with 12 answer options');
