import { Router } from "express";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { lessonCategories, lessons, quizzes, quizQuestions } from "../drizzle/schema";
import { ENV } from "./_core/env";

const router = Router();

router.post("/api/seed-database", async (req, res) => {
  try {
    // Initialize database connection
    const connection = await mysql.createConnection(ENV.databaseUrl);
    const db = drizzle(connection);

    // Check if already seeded
    const existingLessons = await db.select().from(lessons).limit(1);
    if (existingLessons.length > 0) {
      return res.json({
        success: false,
        message: "Database already contains lessons. Skipping seed to avoid duplicates.",
      });
    }

    // Seed lesson categories
    await db.insert(lessonCategories).values([
      { name: "Fundamentals", slug: "fundamentals", description: "Master the basics of fantasy cricket", orderIndex: 1 },
      { name: "Player Analysis", slug: "player-analysis", description: "Learn how to analyze and select players", orderIndex: 2 },
      { name: "Team Building", slug: "team-building", description: "Build winning fantasy cricket teams", orderIndex: 3 },
      { name: "Advanced Strategies", slug: "advanced-strategies", description: "Master advanced tactics and strategies", orderIndex: 4 },
    ]);

    // Seed lessons
    await db.insert(lessons).values([
      {
        title: "Introduction to Fantasy Cricket",
        slug: "introduction-to-fantasy-cricket",
        description: "Learn the basics of fantasy cricket, how it works, and how to get started with your first team.",
        content: "# Introduction to Fantasy Cricket\\n\\nFantasy cricket is a game where you create a virtual team of real cricket players. Your team earns points based on how these players perform in actual matches.\\n\\n## Key Concepts\\n\\n- **Team Selection**: Choose 11 players within a budget\\n- **Captain & Vice-Captain**: Earn 2x and 1.5x points\\n- **Points System**: Runs, wickets, catches all earn points\\n- **Contests**: Compete against other players\\n\\n## Getting Started\\n\\n1. Understand the scoring system\\n2. Research player form and statistics\\n3. Build a balanced team\\n4. Select your captain wisely\\n5. Join contests and track performance",
        categoryId: 1,
        difficulty: "beginner",
        estimatedMinutes: 10,
        orderIndex: 1,
        isPublished: true,
      },
      {
        title: "Understanding Player Roles",
        slug: "understanding-player-roles",
        description: "Deep dive into different player roles: batsmen, bowlers, all-rounders, and wicket-keepers.",
        content: "# Understanding Player Roles\\n\\n## Batsmen\\nBatsmen score runs and are crucial for accumulating points. Look for consistent run-scorers with good strike rates.\\n\\n## Bowlers\\nBowlers take wickets and restrict runs. Economy rate and wicket-taking ability are key metrics.\\n\\n## All-Rounders\\nAll-rounders contribute with both bat and ball, offering balanced point-scoring opportunities.\\n\\n## Wicket-Keepers\\nWicket-keepers earn bonus points for catches and stumpings in addition to batting points.",
        categoryId: 1,
        difficulty: "beginner",
        estimatedMinutes: 15,
        orderIndex: 2,
        isPublished: true,
      },
      {
        title: "Reading Player Statistics",
        slug: "reading-player-statistics",
        description: "Learn how to interpret batting averages, strike rates, economy rates, and other key statistics.",
        content: "# Reading Player Statistics\\n\\n## Batting Stats\\n- **Average**: Total runs / dismissals\\n- **Strike Rate**: (Runs / balls faced) × 100\\n- **Recent Form**: Last 5-10 innings performance\\n\\n## Bowling Stats\\n- **Average**: Runs conceded / wickets taken\\n- **Economy Rate**: Runs per over\\n- **Strike Rate**: Balls per wicket\\n\\n## Match Context\\nAlways consider pitch conditions, opposition strength, and match format when analyzing stats.",
        categoryId: 2,
        difficulty: "intermediate",
        estimatedMinutes: 20,
        orderIndex: 1,
        isPublished: true,
      },
      {
        title: "Analyzing Recent Form",
        slug: "analyzing-recent-form",
        description: "Understand how to evaluate a player's recent performance and form trends.",
        content: "# Analyzing Recent Form\\n\\nRecent form often matters more than career statistics in fantasy cricket.\\n\\n## Key Indicators\\n1. **Last 5 matches**: Consistency check\\n2. **Venue performance**: Home vs away\\n3. **Opposition analysis**: Performance against specific teams\\n4. **Injury status**: Fitness and match readiness\\n\\n## Red Flags\\n- Multiple low scores in a row\\n- Coming back from injury\\n- Out of form for extended period",
        categoryId: 2,
        difficulty: "intermediate",
        estimatedMinutes: 18,
        orderIndex: 2,
        isPublished: true,
      },
      {
        title: "Building a Balanced Team",
        slug: "building-balanced-team",
        description: "Learn the art of creating a well-balanced fantasy cricket team within budget constraints.",
        content: "# Building a Balanced Team\\n\\n## Team Composition\\n- 3-5 Batsmen\\n- 3-5 Bowlers\\n- 1-3 All-Rounders\\n- 1 Wicket-Keeper (mandatory)\\n\\n## Budget Management\\n- Allocate more budget to key players\\n- Find value picks in lower price ranges\\n- Balance star players with budget options\\n\\n## Team Balance\\nEnsure your team can score points throughout the match - batting depth and bowling variety are crucial.",
        categoryId: 3,
        difficulty: "intermediate",
        estimatedMinutes: 25,
        orderIndex: 1,
        isPublished: true,
      },
      {
        title: "Captain and Vice-Captain Selection",
        slug: "captain-vice-captain-selection",
        description: "Master the strategy of selecting your captain and vice-captain for maximum points.",
        content: "# Captain and Vice-Captain Selection\\n\\n## Multipliers\\n- **Captain**: 2x points\\n- **Vice-Captain**: 1.5x points\\n\\n## Selection Criteria\\n1. **Consistency**: Reliable performers\\n2. **Match-up**: Favorable conditions\\n3. **Role**: All-rounders offer dual opportunities\\n4. **Form**: Recent performance trends\\n\\n## Common Strategies\\n- Safe pick: Consistent star player\\n- Differential: Low-owned high-potential player\\n- Conditions-based: Player suited to pitch/weather",
        categoryId: 3,
        difficulty: "advanced",
        estimatedMinutes: 20,
        orderIndex: 2,
        isPublished: true,
      },
    ]);

    // Seed quizzes
    await db.insert(quizzes).values([
      {
        title: "Fantasy Cricket Basics Quiz",
        slug: "fantasy-cricket-basics",
        description: "Test your understanding of fantasy cricket fundamentals and basic concepts.",
        difficulty: "beginner",
        passingScore: 70,
        timeLimit: 600,
        isPublished: true,
      },
      {
        title: "Player Selection Mastery",
        slug: "player-selection-mastery",
        description: "Challenge yourself on player analysis, statistics interpretation, and selection strategies.",
        difficulty: "intermediate",
        passingScore: 75,
        timeLimit: 900,
        isPublished: true,
      },
      {
        title: "Advanced Team Building",
        slug: "advanced-team-building",
        description: "Test your advanced knowledge of team composition, budget management, and strategic planning.",
        difficulty: "advanced",
        passingScore: 80,
        timeLimit: 1200,
        isPublished: true,
      },
    ]);

    // Seed quiz questions
    await db.insert(quizQuestions).values([
      { 
        quizId: 1, 
        question: "How many players can you select in a standard fantasy cricket team?", 
        questionType: "multiple_choice", 
        options: ["9 players", "11 players", "13 players", "15 players"],
        correctAnswer: "1",
        explanation: "A standard fantasy cricket team consists of 11 players, just like a real cricket team.",
        points: 10, 
        orderIndex: 1 
      },
      { 
        quizId: 1, 
        question: "What multiplier does the captain receive for their points?", 
        questionType: "multiple_choice", 
        options: ["1.5x", "2x", "2.5x", "3x"],
        correctAnswer: "1",
        explanation: "The captain receives a 2x multiplier on their points, making captain selection crucial.",
        points: 10, 
        orderIndex: 2 
      },
      { 
        quizId: 1, 
        question: "Which player role is mandatory to have at least one of in your team?", 
        questionType: "multiple_choice", 
        options: ["Batsman", "Bowler", "Wicket-keeper", "All-rounder"],
        correctAnswer: "2",
        explanation: "You must have at least one wicket-keeper in your fantasy cricket team.",
        points: 10, 
        orderIndex: 3 
      },
    ]);

    res.json({
      success: true,
      message: "Database seeded successfully! Created 4 categories, 6 lessons, and 3 quizzes with questions.",
    });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to seed database",
    });
  }
});

export default router;
