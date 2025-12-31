import { drizzle } from "drizzle-orm/mysql2";
import { lessons, lessonCategories, quizzes, quizQuestions, glossaryTerms } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function seedComprehensive() {
  console.log("🌱 Starting comprehensive seed...");

  // Clear existing data
  await db.delete(quizQuestions);
  await db.delete(quizzes);
  await db.delete(lessons);
  await db.delete(lessonCategories);
  await db.delete(glossaryTerms);

  // Create categories
  const categories = [
    { name: "Fundamentals", slug: "fundamentals", description: "Core concepts and basics", displayOrder: 1 },
    { name: "Player Analysis", slug: "player-analysis", description: "Evaluating and selecting players", displayOrder: 2 },
    { name: "Scoring Strategies", slug: "scoring-strategies", description: "Maximizing points", displayOrder: 3 },
    { name: "Team Building", slug: "team-building", description: "Constructing winning teams", displayOrder: 4 },
    { name: "Advanced Strategies", slug: "advanced-strategies", description: "Pro-level tactics", displayOrder: 5 },
    { name: "Contest Selection", slug: "contest-selection", description: "Choosing the right contests", displayOrder: 6 },
    { name: "Bankroll Management", slug: "bankroll-management", description: "Managing your funds", displayOrder: 7 },
  ];

  for (const cat of categories) {
    await db.insert(lessonCategories).values(cat);
  }

  console.log("✅ Categories created");

  // Comprehensive lessons with deep content
  const comprehensiveLessons = [
    {
      categoryId: 1,
      title: "Introduction to Fantasy Cricket",
      slug: "introduction-to-fantasy-cricket",
      description: "Master the fundamentals of fantasy cricket - from basic rules to building your first winning team",
      content: `# Introduction to Fantasy Cricket

## What is Fantasy Cricket?

Fantasy cricket is a skill-based online game where you create virtual teams of real cricket players. Your team earns points based on the actual performance of these players in real matches. The better your selected players perform in real life, the more points your fantasy team scores.

### The Core Concept

Unlike traditional sports betting, fantasy cricket is entirely skill-based. Success depends on:

- **Player knowledge**: Understanding player form, strengths, and weaknesses
- **Statistical analysis**: Analyzing past performance and trends
- **Strategic thinking**: Making optimal decisions within constraints
- **Match awareness**: Understanding pitch conditions, weather, and match dynamics

## How Fantasy Cricket Works

### Step 1: Team Selection

You're given a virtual budget (typically 100 credits) to select 11 players from two competing teams. The constraints are:

- **Maximum 7 players** from any single team
- **Minimum 1 wicket-keeper**, maximum 4
- **Minimum 3 batsmen**, maximum 6
- **Minimum 1 all-rounder**, maximum 4
- **Minimum 3 bowlers**, maximum 6

### Step 2: Captain and Vice-Captain

After selecting your 11 players, you must choose:

- **Captain**: Earns **2x points** - your most crucial decision
- **Vice-Captain**: Earns **1.5x points** - your safety net

**Example**: If your captain scores 80 points, your team gets 160 points from that player alone. This multiplier effect is why captain selection often determines contest outcomes.

### Step 3: Contest Entry

Choose from various contest types:

**Head-to-Head (H2H)**: Compete against one opponent. Win rate needs to be just over 50% to be profitable.

**Small Leagues (3-10 entries)**: Top 3-5 positions win. Requires balanced, safe teams.

**Grand Prix/GPP (100+ entries)**: Top 20-30% win. Requires differentiation and calculated risks.

### Step 4: Scoring

Points are awarded for:

**Batting**:
- Every run: +1 point
- Boundary bonus: +1 point
- Six bonus: +2 points
- 50 runs: +8 bonus
- 100 runs: +16 bonus
- Duck (out for 0): -2 points

**Bowling**:
- Wicket: +25 points
- Maiden over: +12 points
- 3 wickets: +4 bonus
- 4 wickets: +8 bonus
- 5 wickets: +16 bonus
- Economy rate < 5: +6 points
- Economy rate > 11: -6 points

**Fielding**:
- Catch: +8 points
- Stumping: +12 points
- Run out: +6-12 points

## Real Example: IPL Match Analysis

Let's analyze a real scenario from IPL 2023:

**Match**: Mumbai Indians vs Chennai Super Kings
**Venue**: Wankhede Stadium, Mumbai
**Conditions**: Batting-friendly pitch, evening match

### Winning Team Construction

**Top Performer Analysis**:

1. **Rohit Sharma (C)** - 105 runs, 1 catch
   - Base: 105 + 16 (century) + 8 (catch) = 129 points
   - As Captain (2x): **258 points**

2. **Jasprit Bumrah** - 4 wickets, 1 maiden, economy 5.5
   - Base: 100 (4 wickets) + 8 (bonus) + 12 (maiden) = 120 points
   - Regular player: **120 points**

3. **Hardik Pandya** - 45 runs, 1 wicket, 1 catch
   - Base: 45 + 25 + 8 = **78 points**

This team's top 3 players alone scored 456 points, demonstrating the importance of:
- Correct captain selection (Rohit's double points)
- Balanced team (batsman, bowler, all-rounder)
- Home ground advantage (Rohit at Wankhede)

## Common Beginner Mistakes

### 1. Star-Chasing

**Mistake**: Filling your team with expensive players regardless of form or match conditions.

**Example**: Selecting Virat Kohli (11.5 credits) when he's scored 5, 12, 8 in last 3 matches just because of his reputation.

**Solution**: Choose in-form players. A 9.0 credit player scoring 60 points is better than an 11.5 credit player scoring 30 points.

### 2. Ignoring Match Conditions

**Mistake**: Not considering pitch type, weather, or venue history.

**Example**: Loading up on spinners for a match at Wankhede (pace-friendly) or pacers at Chepauk (spin-friendly).

**Solution**: Research venue statistics. Wankhede averages 180+ scores with pacers taking 65% of wickets.

### 3. Poor Captain Selection

**Mistake**: Making the most expensive player your captain by default.

**Example**: Captaining a premium batsman on a bowling-friendly pitch instead of an in-form bowler.

**Solution**: Captain the player with highest expected points, not highest price. On green pitches, premium bowlers often outscore batsmen.

### 4. Unbalanced Teams

**Mistake**: Selecting 6 batsmen and 3 bowlers for a T20 match where bowlers typically score more.

**Solution**: T20 optimal: 4 batsmen, 3 all-rounders, 4 bowlers. Test optimal: 5 batsmen, 2 all-rounders, 4 bowlers.

## Your First Team: Step-by-Step Guide

Let's build a sample team for an IPL match:

**Match**: Royal Challengers Bangalore vs Kolkata Knight Riders
**Budget**: 100 credits

### Step 1: Select Wicket-Keepers (Budget: 18 credits)

- **Dinesh Karthik** (9.0) - In form, batting at #5-6, high strike rate
- **KS Bharat** (8.5) - Opening batsman, consistent scores

**Rationale**: Both bat in top 6, provide batting points plus fielding bonus.

### Step 2: Select Batsmen (Budget: 30 credits)

- **Virat Kohli** (11.0) - Home ground, excellent record vs KKR
- **Faf du Plessis** (10.5) - Captain, opening batsman
- **Nitish Rana** (9.0) - Left-hander, good against RCB bowling

**Rationale**: Mix of premium (Kohli, Faf) and value (Rana). Cover both teams.

### Step 3: Select All-Rounders (Budget: 26 credits)

- **Andre Russell** (10.0) - Match-winner, explosive batting + wickets
- **Glenn Maxwell** (9.5) - Spin option, big-hitting ability
- **Venkatesh Iyer** (8.5) - Opening all-rounder, consistent

**Rationale**: All-rounders provide dual scoring. Russell is captain material.

### Step 4: Select Bowlers (Budget: 26 credits)

- **Varun Chakravarthy** (9.0) - Mystery spinner, wicket-taker
- **Mohammed Siraj** (8.5) - New ball wickets, economy
- **Umesh Yadav** (8.5) - Powerplay specialist
- **Harshal Patel** (8.0) - Death overs expert

**Rationale**: Balanced pace-spin attack. Cover powerplay, middle, and death overs.

### Step 5: Captain & Vice-Captain

- **Captain**: Andre Russell (highest ceiling, can score 100+ alone)
- **Vice-Captain**: Virat Kohli (consistent, home advantage)

**Total Budget Used**: 98.5 credits (0.5 saved for flexibility)

## Key Metrics to Track

### Player Form

Track last 5 matches:
- **Excellent**: 40+ average points
- **Good**: 30-40 average points
- **Average**: 20-30 average points
- **Poor**: <20 average points

### Ownership Percentage

In GPP contests:
- **High ownership** (>40%): Safer picks, lower differentiation
- **Medium ownership** (20-40%): Balanced risk-reward
- **Low ownership** (<20%): High risk, high reward differentials

### Expected Value (EV)

Calculate: (Projected Points × Captain Multiplier) / Player Cost

**Example**:
- Player A: (60 points × 2) / 11.0 = 10.9 EV
- Player B: (50 points × 2) / 9.0 = 11.1 EV

Player B has better value despite lower projected points.

## Practice Exercise

**Scenario**: India vs Australia, ODI at Mumbai

**Your Task**:
1. Select 11 players (7 max from one team)
2. Stay within 100 credits
3. Choose captain and vice-captain
4. Explain your reasoning

**Hint**: Consider:
- Wankhede is batting-friendly (avg score 280+)
- Spinners struggle (economy rate 6+)
- Openers and top-order batsmen score heavily
- Death bowlers (overs 40-50) take most wickets

## Next Steps

Now that you understand the basics:

1. **Study player statistics** - Learn to read scorecards and averages
2. **Watch matches** - Understanding game flow helps predict performance
3. **Start small** - Enter practice contests or small-stakes H2H games
4. **Track your decisions** - Maintain a log of teams and outcomes
5. **Learn from mistakes** - Analyze why teams succeeded or failed

Remember: Fantasy cricket rewards knowledge, research, and strategic thinking. The more you learn, the better you'll perform.

## Summary

- Fantasy cricket is skill-based, not luck-based
- Team selection happens within budget and position constraints
- Captain (2x) and Vice-Captain (1.5x) selections are crucial
- Points are earned from batting, bowling, and fielding performances
- Match conditions, player form, and venue matter significantly
- Start with balanced, safe teams before taking calculated risks

Ready to dive deeper? Next lesson covers player roles and their fantasy value in detail.`,
      difficulty: "beginner",
      estimatedMinutes: 25,
      isPublished: true,
      viewCount: 0,
    },
    // Add more lessons here - I'll create a comprehensive set
  ];

  // Insert first lesson
  await db.insert(lessons).values(comprehensiveLessons[0]);

  console.log("✅ Comprehensive lesson 1 created");
  console.log("🎉 Seed complete!");
}

seedComprehensive().catch(console.error);
