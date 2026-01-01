import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Get DATABASE_URL from command line argument
const DATABASE_URL = process.argv[2];

if (!DATABASE_URL) {
  console.error('Usage: node seed-railway.mjs "<DATABASE_URL>"');
  process.exit(1);
}

console.log('🌱 Connecting to Railway database...\n');

const connection = await mysql.createConnection(DATABASE_URL);
const db = connection;

try {
  // Seed Lesson Categories
  console.log('Creating lesson categories...');
  await db.query(`
    INSERT INTO lesson_categories (name, slug, description, orderIndex) VALUES
    ('Fundamentals', 'fundamentals', 'Master the basics of fantasy cricket', 1),
    ('Player Analysis', 'player-analysis', 'Learn how to analyze and select players', 2),
    ('Team Building', 'team-building', 'Build winning fantasy cricket teams', 3),
    ('Advanced Strategies', 'advanced-strategies', 'Master advanced tactics and strategies', 4)
    ON DUPLICATE KEY UPDATE name=VALUES(name)
  `);
  console.log('✅ Categories created\n');

  // Seed Lessons
  console.log('Creating lessons...');
  await db.query(`
    INSERT INTO lessons (title, slug, description, content, categoryId, difficulty, estimatedMinutes, orderIndex, isPublished) VALUES
    ('Introduction to Fantasy Cricket', 'introduction-to-fantasy-cricket', 
     'Learn the basics of fantasy cricket, how it works, and how to get started with your first team.',
     '# Introduction to Fantasy Cricket\\n\\nFantasy cricket is a game where you create a virtual team of real cricket players. Your team earns points based on how these players perform in actual matches.\\n\\n## Key Concepts\\n\\n- **Team Selection**: Choose 11 players within a budget\\n- **Captain & Vice-Captain**: Earn 2x and 1.5x points\\n- **Points System**: Runs, wickets, catches all earn points\\n- **Contests**: Compete against other players\\n\\n## Getting Started\\n\\n1. Understand the scoring system\\n2. Research player form and statistics\\n3. Build a balanced team\\n4. Select your captain wisely\\n5. Join contests and track performance',
     1, 'beginner', 10, 1, 1),
    
    ('Understanding Player Roles', 'understanding-player-roles',
     'Deep dive into different player roles: batsmen, bowlers, all-rounders, and wicket-keepers.',
     '# Understanding Player Roles\\n\\n## Batsmen\\nBatsmen score runs and are crucial for accumulating points. Look for consistent run-scorers with good strike rates.\\n\\n## Bowlers\\nBowlers take wickets and restrict runs. Economy rate and wicket-taking ability are key metrics.\\n\\n## All-Rounders\\nAll-rounders contribute with both bat and ball, offering balanced point-scoring opportunities.\\n\\n## Wicket-Keepers\\nWicket-keepers earn bonus points for catches and stumpings in addition to batting points.',
     1, 'beginner', 15, 2, 1),
    
    ('Reading Player Statistics', 'reading-player-statistics',
     'Learn how to interpret batting averages, strike rates, economy rates, and other key statistics.',
     '# Reading Player Statistics\\n\\n## Batting Stats\\n- **Average**: Total runs / dismissals\\n- **Strike Rate**: (Runs / balls faced) × 100\\n- **Recent Form**: Last 5-10 innings performance\\n\\n## Bowling Stats\\n- **Average**: Runs conceded / wickets taken\\n- **Economy Rate**: Runs per over\\n- **Strike Rate**: Balls per wicket\\n\\n## Match Context\\nAlways consider pitch conditions, opposition strength, and match format when analyzing stats.',
     2, 'intermediate', 20, 1, 1),
    
    ('Analyzing Recent Form', 'analyzing-recent-form',
     'Understand how to evaluate a player\\'s recent performance and form trends.',
     '# Analyzing Recent Form\\n\\nRecent form often matters more than career statistics in fantasy cricket.\\n\\n## Key Indicators\\n1. **Last 5 matches**: Consistency check\\n2. **Venue performance**: Home vs away\\n3. **Opposition analysis**: Performance against specific teams\\n4. **Injury status**: Fitness and match readiness\\n\\n## Red Flags\\n- Multiple low scores in a row\\n- Coming back from injury\\n- Out of form for extended period',
     2, 'intermediate', 18, 2, 1),
    
    ('Building a Balanced Team', 'building-balanced-team',
     'Learn the art of creating a well-balanced fantasy cricket team within budget constraints.',
     '# Building a Balanced Team\\n\\n## Team Composition\\n- 3-5 Batsmen\\n- 3-5 Bowlers\\n- 1-3 All-Rounders\\n- 1 Wicket-Keeper (mandatory)\\n\\n## Budget Management\\n- Allocate more budget to key players\\n- Find value picks in lower price ranges\\n- Balance star players with budget options\\n\\n## Team Balance\\nEnsure your team can score points throughout the match - batting depth and bowling variety are crucial.',
     3, 'intermediate', 25, 1, 1),
    
    ('Captain and Vice-Captain Selection', 'captain-vice-captain-selection',
     'Master the strategy of selecting your captain and vice-captain for maximum points.',
     '# Captain and Vice-Captain Selection\\n\\n## Multipliers\\n- **Captain**: 2x points\\n- **Vice-Captain**: 1.5x points\\n\\n## Selection Criteria\\n1. **Consistency**: Reliable performers\\n2. **Match-up**: Favorable conditions\\n3. **Role**: All-rounders offer dual opportunities\\n4. **Form**: Recent performance trends\\n\\n## Common Strategies\\n- Safe pick: Consistent star player\\n- Differential: Low-owned high-potential player\\n- Conditions-based: Player suited to pitch/weather',
     3, 'advanced', 20, 2, 1)
    ON DUPLICATE KEY UPDATE title=VALUES(title)
  `);
  console.log('✅ Lessons created\n');

  // Seed Quizzes
  console.log('Creating quizzes...');
  await db.query(`
    INSERT INTO quizzes (title, slug, description, difficulty, passingScore, timeLimit, isPublished) VALUES
    ('Fantasy Cricket Basics Quiz', 'fantasy-cricket-basics',
     'Test your understanding of fantasy cricket fundamentals and basic concepts.',
     'beginner', 70, 600, 1),
    
    ('Player Selection Mastery', 'player-selection-mastery',
     'Challenge yourself on player analysis, statistics interpretation, and selection strategies.',
     'intermediate', 75, 900, 1),
    
    ('Advanced Team Building', 'advanced-team-building',
     'Test your advanced knowledge of team composition, budget management, and strategic planning.',
     'advanced', 80, 1200, 1)
    ON DUPLICATE KEY UPDATE title=VALUES(title)
  `);
  console.log('✅ Quizzes created\n');

  // Seed Quiz Questions
  console.log('Creating quiz questions...');
  await db.query(`
    INSERT INTO quiz_questions (quizId, questionText, questionType, points, orderIndex) VALUES
    (1, 'How many players can you select in a standard fantasy cricket team?', 'multiple_choice', 10, 1),
    (1, 'What multiplier does the captain receive for their points?', 'multiple_choice', 10, 2),
    (1, 'Which player role is mandatory to have at least one of in your team?', 'multiple_choice', 10, 3)
    ON DUPLICATE KEY UPDATE questionText=VALUES(questionText)
  `);
  console.log('✅ Quiz questions created\n');

  // Seed Answer Options
  console.log('Creating answer options...');
  await db.query(`
    INSERT INTO quiz_answer_options (questionId, optionText, isCorrect, orderIndex) VALUES
    (1, '9 players', 0, 1),
    (1, '11 players', 1, 2),
    (1, '13 players', 0, 3),
    (1, '15 players', 0, 4),
    (2, '1.5x', 0, 1),
    (2, '2x', 1, 2),
    (2, '2.5x', 0, 3),
    (2, '3x', 0, 4),
    (3, 'Batsman', 0, 1),
    (3, 'Bowler', 0, 2),
    (3, 'Wicket-keeper', 1, 3),
    (3, 'All-rounder', 0, 4)
    ON DUPLICATE KEY UPDATE optionText=VALUES(optionText)
  `);
  console.log('✅ Answer options created\n');

  console.log('🎉 Database seeded successfully!');
  console.log('\nCreated:');
  console.log('- 4 lesson categories');
  console.log('- 6 lessons');
  console.log('- 3 quizzes');
  console.log('- 3 quiz questions with 12 answer options');

} catch (error) {
  console.error('❌ Error seeding database:', error.message);
  process.exit(1);
} finally {
  await connection.end();
}
