import { drizzle } from "drizzle-orm/mysql2";
import { achievements } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function seedAchievements() {
  console.log("🏆 Seeding achievements...");

  const achievementsList = [
    // Lessons
    { name: "First Steps", description: "Complete your first lesson", icon: "🎯", category: "lessons", requirement: 1 },
    { name: "Getting Started", description: "Complete 3 lessons", icon: "📚", category: "lessons", requirement: 3 },
    { name: "Knowledge Seeker", description: "Complete 5 lessons", icon: "🔍", category: "lessons", requirement: 5 },
    { name: "Dedicated Learner", description: "Complete 10 lessons", icon: "📖", category: "lessons", requirement: 10 },
    { name: "Master Student", description: "Complete 15 lessons", icon: "🎓", category: "lessons", requirement: 15 },
    { name: "Fantasy Cricket Expert", description: "Complete all 20+ lessons", icon: "👑", category: "lessons", requirement: 20 },
    
    // Quizzes
    { name: "Quiz Rookie", description: "Pass your first quiz", icon: "✅", category: "quizzes", requirement: 1 },
    { name: "Quiz Enthusiast", description: "Pass 3 quizzes", icon: "📝", category: "quizzes", requirement: 3 },
    { name: "Quiz Master", description: "Pass 5 quizzes", icon: "🏅", category: "quizzes", requirement: 5 },
    { name: "Perfect Score", description: "Achieve 100% on any quiz", icon: "💯", category: "mastery", requirement: 100 },
    { name: "High Achiever", description: "Maintain 90%+ average quiz score", icon: "⭐", category: "mastery", requirement: 90 },
    { name: "Consistent Performer", description: "Maintain 80%+ average quiz score", icon: "🌟", category: "mastery", requirement: 80 },
    
    // Engagement
    { name: "Daily Dedication", description: "Maintain a 3-day learning streak", icon: "🔥", category: "engagement", requirement: 3 },
    { name: "Week Warrior", description: "Maintain a 7-day learning streak", icon: "💪", category: "engagement", requirement: 7 },
    { name: "Unstoppable", description: "Maintain a 30-day learning streak", icon: "🚀", category: "engagement", requirement: 30 },
  ];

  for (const achievement of achievementsList) {
    await db.insert(achievements).values(achievement);
  }

  console.log(`✅ ${achievementsList.length} achievements created`);
  console.log("🎉 Achievements seed complete!");
}

seedAchievements().catch(console.error);
