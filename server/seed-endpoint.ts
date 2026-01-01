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

    // Try to seed - if data exists, it will fail with duplicate key error which we'll catch

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
        tags: ["basics", "getting-started"],
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
        tags: ["fundamentals", "player-roles"],
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
        tags: ["statistics", "analysis"],
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
        tags: ["form", "analysis", "selection"],
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
        tags: ["team-building", "strategy"],
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
        tags: ["captain", "strategy", "advanced"],
      },
    ]);

    // Seed quizzes
    await db.insert(quizzes).values([
      {
        title: "Fantasy Cricket Fundamentals Quiz",
        slug: "fantasy-cricket-fundamentals-quiz",
        description: "Test your understanding of fantasy cricket basics",
        difficulty: "beginner",
        passingScore: 70,
        timeLimit: 10,
        isPublished: true,
      },
      {
        title: "Player Analysis Quiz",
        slug: "player-analysis-quiz",
        description: "Test your player analysis and selection skills",
        difficulty: "intermediate",
        passingScore: 75,
        timeLimit: 15,
        isPublished: true,
      },
      {
        title: "Advanced Strategy Quiz",
        slug: "advanced-strategy-quiz",
        description: "Master-level questions on fantasy cricket strategy",
        difficulty: "advanced",
        passingScore: 80,
        timeLimit: 20,
        isPublished: true,
      },
    ]);

    // Seed quiz questions
    await db.insert(quizQuestions).values([
      // Fundamentals Quiz Questions
      {
        quizId: 1,
        questionType: "multiple_choice",
        question: "How many players can you select in a fantasy cricket team?",
        options: ["9 players", "11 players", "13 players", "15 players"],
        correctAnswer: "11 players",
        explanation: "A fantasy cricket team consists of 11 players, just like a real cricket team.",
        orderIndex: 1,
      },
      {
        quizId: 1,
        questionType: "multiple_choice",
        question: "What multiplier does the captain get in fantasy cricket?",
        options: ["1.5x points", "2x points", "2.5x points", "3x points"],
        correctAnswer: "2x points",
        explanation: "The captain earns 2x points, while the vice-captain earns 1.5x points.",
        orderIndex: 2,
      },
      {
        quizId: 1,
        questionType: "multiple_choice",
        question: "Which player role is mandatory in every fantasy cricket team?",
        options: ["All-rounder", "Wicket-keeper", "Opening batsman", "Fast bowler"],
        correctAnswer: "Wicket-keeper",
        explanation: "Every fantasy cricket team must include at least one wicket-keeper.",
        orderIndex: 3,
      },
      // Player Analysis Quiz Questions
      {
        quizId: 2,
        questionType: "multiple_choice",
        question: "What does a player's strike rate measure in batting?",
        options: ["Runs per match", "Runs per 100 balls", "Wickets per match", "Catches per match"],
        correctAnswer: "Runs per 100 balls",
        explanation: "Strike rate is calculated as (runs scored / balls faced) × 100.",
        orderIndex: 1,
      },
      {
        quizId: 2,
        questionType: "multiple_choice",
        question: "Which statistic is most important for evaluating a bowler's economy?",
        options: ["Runs per over", "Wickets per match", "Batting average", "Strike rate"],
        correctAnswer: "Runs per over",
        explanation: "Economy rate (runs per over) shows how well a bowler restricts scoring.",
        orderIndex: 2,
      },
      // Advanced Strategy Quiz Questions
      {
        quizId: 3,
        questionType: "multiple_choice",
        question: "What is a 'differential pick' in fantasy cricket?",
        options: [
          "A player owned by very few teams",
          "A player with the highest price",
          "A player who is the captain",
          "A player from the losing team"
        ],
        correctAnswer: "A player owned by very few teams",
        explanation: "Differential picks are low-ownership players who can give you an edge if they perform well.",
        orderIndex: 1,
      },
    ]);

    await connection.end();

    res.json({
      success: true,
      message: "Database seeded successfully with 4 categories, 6 lessons, 3 quizzes, and 6 quiz questions!",
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to seed database",
      error: error.message,
    });
  }
});

export default router;
