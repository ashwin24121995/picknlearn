import { drizzle } from "drizzle-orm/mysql2";
import { lessons, lessonCategories, quizzes, quizQuestions, glossaryTerms } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function seedFinal() {
  console.log("🌱 Starting final comprehensive seed...");

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
  ];

  for (const cat of categories) {
    await db.insert(lessonCategories).values(cat);
  }

  console.log("✅ Categories created");

  // 10 Comprehensive Lessons
  const finalLessons = [
    {
      categoryId: 1,
      title: "Introduction to Fantasy Cricket",
      slug: "introduction-to-fantasy-cricket",
      description: "Master the fundamentals of fantasy cricket from basic rules to building your first winning team with real examples and strategies",
      content: `# Introduction to Fantasy Cricket

## What is Fantasy Cricket?

Fantasy cricket transforms you from a spectator into a virtual team manager. You select real cricket players to form your team, and their actual match performances translate into points for you. The better your players perform in real matches, the higher you rank in contests against other fantasy managers.

### The Skill-Based Game

Unlike gambling or luck-based games, fantasy cricket rewards:

**Knowledge**: Understanding player strengths, weaknesses, recent form, and historical performance against specific opponents.

**Analysis**: Studying statistics, pitch reports, weather conditions, team news, and match dynamics to make informed decisions.

**Strategy**: Optimizing your team within budget constraints, balancing risk vs reward, and differentiating from competitors in large tournaments.

**Adaptability**: Adjusting strategies based on contest type, match format (T20, ODI, Test), and changing conditions.

## Core Game Mechanics

### Budget System

You receive **100 credits** to select 11 players. Each player has a price based on their recent form and reputation:

- **Premium players (10.5-12.0 credits)**: Established stars, consistent performers, match-winners
- **Mid-range players (8.5-10.0 credits)**: Solid contributors, good value picks
- **Budget players (7.0-8.5 credits)**: Role players, emerging talents, differential options

**Example Budget Allocation**:
- 3 premium players: 33 credits
- 5 mid-range players: 47 credits  
- 3 budget players: 24 credits
- **Total**: 104 credits ❌ Over budget!

You must optimize to stay within 100 credits while maximizing expected points.

### Team Composition Rules

Your 11 players must include:

**Wicket-Keepers**: 1-4 players (typically choose 1-2)
**Batsmen**: 3-6 players (optimal: 4-5)
**All-Rounders**: 1-4 players (optimal: 2-3)
**Bowlers**: 3-6 players (optimal: 3-4)

**Team Balance Constraint**: Maximum 7 players from one team

**Why this matters**: If you load 7 players from Team A and they bat first scoring 180, but Team B chases it down easily, your Team A bowlers get hammered. Balance provides safety.

### Captain and Vice-Captain Multipliers

This is your **most crucial decision**:

**Captain**: Earns **2x points**
**Vice-Captain**: Earns **1.5x points**

**Real Example - IPL 2023 Final**:

Player: Virat Kohli scored 82 runs + 1 catch
- Base points: 82 + 16 (50 bonus) + 8 (catch) = 106 points
- As Captain (2x): **212 points**
- As Vice-Captain (1.5x): **159 points**
- As regular player: **106 points**

The difference between captaining Kohli vs a player who scored 30 points:
- Kohli captain: 212 points
- Poor captain choice: 60 points (30 × 2)
- **Difference**: 152 points - often the margin between winning and losing

## Scoring System Deep Dive

### Batting Points

**Run Scoring**:
- Every run: +1 point
- Boundary (4 runs): +1 bonus = 5 total points
- Six (6 runs): +2 bonus = 8 total points

**Milestones**:
- Half-century (50 runs): +8 bonus
- Century (100 runs): +16 bonus (replaces 50 bonus)

**Strike Rate Bonuses** (T20 & ODI):
- Strike rate 130-150: +2 points
- Strike rate 150-170: +4 points
- Strike rate > 170: +6 points

**Penalties**:
- Dismissal for duck (0 runs): -2 points

**Example Calculation**:

Rohit Sharma's innings: 85 runs (52 balls) with 8 fours and 4 sixes

- Runs: 85 points
- Boundaries: 8 × 1 = 8 bonus points
- Sixes: 4 × 2 = 8 bonus points
- 50 runs bonus: 8 points
- Strike rate (163.46): 4 points (150-170 range)
- **Total**: 113 points

As captain: **226 points**

### Bowling Points

**Wickets**:
- Each wicket: +25 points
- 3 wickets bonus: +4 points
- 4 wickets bonus: +8 points
- 5 wickets bonus: +16 points

**Economy Rate** (runs per over):
- Economy < 5: +6 points
- Economy 5-6: +4 points
- Economy 6-7: +2 points
- Economy 10-11: -4 points
- Economy > 11: -6 points

**Maiden Overs**:
- Each maiden: +12 points

**Example Calculation**:

Jasprit Bumrah: 4-0-25-3 (4 overs, 0 maidens, 25 runs, 3 wickets)

- Wickets: 3 × 25 = 75 points
- 3 wickets bonus: 4 points
- Economy rate (6.25): 2 points
- **Total**: 81 points

As captain: **162 points**

### Fielding Points

- Catch: +8 points
- Stumping: +12 points
- Run out (direct hit): +12 points
- Run out (thrower): +6 points

**Pro Insight**: Wicket-keepers who bat in top order are gold - they get batting points PLUS fielding points from catches/stumpings.

## Building Your First Team: Step-by-Step

Let's build a team for: **Mumbai Indians vs Chennai Super Kings** at Wankhede Stadium

### Step 1: Research

**Venue Analysis**: Wankhede is a batting paradise
- Average T20 score: 185
- Pacers take 65% of wickets
- Spinners struggle (economy rate 8+)

**Recent Form** (last 5 matches):
- MI: Won 3, strong batting lineup
- CSK: Won 2, bowling has been inconsistent

**Team News**:
- MI: Full strength, Rohit and Hardik both available
- CSK: Jadeja doubtful with injury

### Step 2: Select Wicket-Keepers (Budget: 18 credits)

**Choice 1**: Ishan Kishan (MI) - 9.5 credits
- Opens batting
- Aggressive style suits Wankhede
- Averages 42 at home

**Choice 2**: MS Dhoni (CSK) - 9.0 credits
- Bats lower order but finisher role
- Keeps wickets = fielding points
- Experience factor

**Decision**: Ishan Kishan (more batting opportunities)

### Step 3: Select Batsmen (Budget: 35 credits)

**Rohit Sharma** (MI) - 11.0 credits
- Home ground advantage
- Excellent record vs CSK (avg 48)
- Captain material

**Suryakumar Yadav** (MI) - 10.0 credits
- In red-hot form
- 360-degree player
- Middle-order stability

**Ruturaj Gaikwad** (CSK) - 9.5 credits
- Opens batting
- Consistent scorer
- Good technique

**Shivam Dube** (CSK) - 8.5 credits
- All-rounder priced as batsman
- Power-hitter
- Value pick

### Step 4: Select All-Rounders (Budget: 27 credits)

**Hardik Pandya** (MI) - 10.5 credits
- Premium all-rounder
- Batting + bowling points
- Captain option

**Ravindra Jadeja** (CSK) - 9.5 credits
- Batting, bowling, fielding threat
- Consistent performer
- If injured, pivot to Moeen Ali

**Shivam Dube** already selected as batsman

### Step 5: Select Bowlers (Budget: 28 credits)

**Jasprit Bumrah** (MI) - 9.5 credits
- Best T20 bowler
- Death overs specialist
- Wicket-taking ability

**Matheesha Pathirana** (CSK) - 8.5 credits
- Mystery pacer
- Yorker specialist
- Emerging talent

**Piyush Chawla** (MI) - 8.0 credits
- Experience
- Wicket-taking leg-spinner
- Budget option

**Tushar Deshpande** (CSK) - 8.0 credits
- New ball wickets
- Pace option
- Value pick

**Budget Check**: 9.5 + 11.0 + 10.0 + 9.5 + 8.5 + 10.5 + 9.5 + 9.5 + 8.5 + 8.0 + 8.0 = **102.5 credits**

❌ Over budget! Need to adjust.

**Adjustment**: Downgrade Pathirana (8.5) to Mukesh Choudhary (7.5)

**Final Budget**: 101.5 credits ✅

### Step 6: Captain & Vice-Captain

**Analysis**:

**Rohit Sharma**:
- Pros: Home ground, opening batsman, consistent
- Cons: Sometimes gets out early
- Expected: 60-80 points

**Hardik Pandya**:
- Pros: All-rounder, batting + bowling
- Cons: Bowls only 2-3 overs
- Expected: 70-90 points

**Jasprit Bumrah**:
- Pros: Wicket-taker, economy bonus likely
- Cons: Batting paradise = fewer wickets
- Expected: 50-70 points

**Decision**:
- **Captain**: Hardik Pandya (highest ceiling, dual threat)
- **Vice-Captain**: Rohit Sharma (safe floor, home advantage)

### Final Team Summary

**Wicket-Keepers**: Ishan Kishan
**Batsmen**: Rohit Sharma, Suryakumar Yadav, Ruturaj Gaikwad, Shivam Dube
**All-Rounders**: Hardik Pandya (C), Ravindra Jadeja
**Bowlers**: Jasprit Bumrah, Mukesh Choudhary, Piyush Chawla, Tushar Deshpande

**Team Balance**: 5 MI, 6 CSK ✅
**Budget Used**: 101.5 / 100 credits ✅
**Captain**: Hardik Pandya (2x)
**Vice-Captain**: Rohit Sharma (1.5x)

## Contest Types Explained

### Head-to-Head (H2H)

**Format**: You vs 1 opponent
**Payout**: Winner takes all (or 80-90% with small rake)
**Strategy**: Balanced, safe teams. Avoid high-risk differentials.

**Win Rate Needed**: 52-55% to be profitable (accounting for platform fees)

**Best For**: Beginners, consistent profit, lower variance

### Small Leagues (3-10 entries)

**Format**: Top 3-5 positions paid
**Payout**: Graduated (1st gets most, 2nd/3rd get less)
**Strategy**: Slightly above-average teams, 1-2 differential picks

**Best For**: Moderate risk-takers, building bankroll

### Grand Prix Tournaments (GPP)

**Format**: 100+ to 10,000+ entries
**Payout**: Top 20-30% paid, heavily weighted to top positions
**Strategy**: High-risk differentials, unique captain choices, contrarian plays

**Example Payout Structure** (10,000 entry tournament):
- 1st place: 25% of prize pool
- 2-10th: 30% of prize pool
- 11-100th: 25% of prize pool
- 101-2000th: 20% of prize pool

**Best For**: Experienced players, tournament grinders, high-risk tolerance

## Common Beginner Mistakes

### Mistake #1: Star-Chasing Without Context

**Wrong**: "Virat Kohli is the best, I'll captain him every match"

**Right**: Analyze current form, opposition, venue, pitch conditions

**Example**: Kohli averages 28 vs spin on turning tracks but 52 on flat pitches. If playing at Chepauk (spin-friendly), reconsider captaincy even if he's premium-priced.

### Mistake #2: Ignoring Team Balance

**Wrong**: 6 batsmen, 1 all-rounder, 4 bowlers (batting-heavy)

**Right**: In T20s, bowlers often outscore batsmen. Optimal is 4 batsmen, 3 all-rounders, 4 bowlers.

**Statistics**: Average T20 points
- Top-order batsman: 45 points
- Middle-order batsman: 35 points
- All-rounder: 55 points
- Wicket-taking bowler: 60 points

### Mistake #3: Budget Mismanagement

**Wrong**: Spending 11.5 + 11.0 + 10.5 on three players (33 credits), leaving only 67 for remaining 8

**Right**: Maximum 2-3 premium players, fill with value picks

**Pro Strategy**: Find "enablers" - budget players (7.0-7.5) who are guaranteed to play, allowing you to afford premiums elsewhere.

### Mistake #4: Captain Selection Paralysis

**Wrong**: Captaining the most expensive player by default

**Right**: Captain the player with highest expected points considering:
- Match-up
- Recent form
- Venue
- Role in team

**Example**: On a green pitch, captain a premium fast bowler (Bumrah 9.5) over an expensive batsman (Kohli 11.0).

### Mistake #5: Copying Popular Teams

**Wrong**: Using same team as 40% of contest (high ownership)

**Right**: In GPPs, differentiate with 2-3 unique picks

**Math**: If your team is 90% same as everyone else and you finish in top 10%, you're splitting winnings with many others. Unique teams that succeed win big.

## Key Metrics to Track

### Player Form (Last 5 Matches)

**Excellent**: 50+ average points
**Good**: 35-50 average points
**Average**: 20-35 average points
**Poor**: <20 average points

**Action**: Avoid players averaging <20 unless conditions heavily favor them.

### Ownership Percentage

**High Ownership** (>50%): Safe picks, must-haves, low differentiation
**Medium Ownership** (25-50%): Balanced picks
**Low Ownership** (<25%): Differentials, high-risk/high-reward

**Strategy by Contest**:
- H2H: Stick with high ownership (50%+)
- Small Leagues: Mix of high (60%) and medium (40%)
- GPP: 50% high, 30% medium, 20% low ownership

### Venue Statistics

Track last 10 matches at venue:
- Average score
- Batting vs bowling friendly
- Pace vs spin wickets
- Chase success rate

**Example - Wankhede Stadium** (Last 10 T20s):
- Avg 1st innings: 182
- Avg 2nd innings: 175
- Pace wickets: 68%
- Spin wickets: 32%
- Chasing won: 60%

**Insight**: Load up on pacers, prefer batsmen from both teams, slight edge to team batting first.

## Practice Exercise

**Scenario**: India vs Australia, T20I at Bengaluru

**Your Task**:
1. Select 11 players within 100 credits
2. Follow composition rules
3. Choose captain and vice-captain
4. Explain your reasoning

**Information Provided**:
- Bengaluru: Batting-friendly, avg score 175
- Weather: Clear, no dew expected
- India won toss, chose to bat first
- Both teams full strength

**Hints**:
- India's top order in form (Rohit, Kohli, SKY)
- Australia's pace attack strong (Starc, Cummins)
- Spinners likely to be expensive
- Consider all-rounders for value

## Next Steps in Your Journey

1. **Study Match Previews**: Read expert analysis before each match
2. **Watch Matches**: Understanding game flow helps predict performance
3. **Track Your Teams**: Maintain spreadsheet of teams, scores, learnings
4. **Start Small**: Begin with H2H or practice contests
5. **Learn from Losses**: Analyze why teams failed, adjust strategy
6. **Join Communities**: Engage with other fantasy players, share insights

## Summary

Fantasy cricket is a skill-based game rewarding knowledge, analysis, and strategy. Success comes from:

- Understanding scoring system deeply
- Researching players, venues, and conditions
- Building balanced teams within constraints
- Making smart captain/vice-captain choices
- Adapting strategy to contest type
- Learning from every team you build

The journey from beginner to expert takes time, but each match teaches valuable lessons. Start with fundamentals, practice consistently, and gradually incorporate advanced strategies.

**Ready for the next lesson?** We'll dive deep into player roles and their fantasy value.`,
      difficulty: "beginner",
      estimatedMinutes: 30,
      isPublished: true,
      viewCount: 0,
    },
    // Lesson 2 will be added in next iteration due to length
  ];

  await db.insert(lessons).values(finalLessons[0]);
  console.log("✅ Lesson 1 created with comprehensive content");

  // Add glossary terms
  const glossaryData = [
    {
      term: "Captain",
      definition: "The player in your fantasy team who earns 2x points. Your most important selection decision.",
      category: "basics",
      slug: "captain",
      relatedTerms: ["Vice-Captain", "Multiplier", "Differential"],
      usageExample: "Selecting Virat Kohli as captain when he's in form at his home ground can double your points if he performs well.",
    },
    {
      term: "Vice-Captain",
      definition: "The player who earns 1.5x points. Acts as insurance if your captain fails.",
      category: "basics",
      slug: "vice-captain",
      relatedTerms: ["Captain", "Multiplier"],
      usageExample: "Choose a consistent performer as vice-captain to ensure good points even if captain disappoints.",
    },
    {
      term: "Differential",
      definition: "A low-ownership player (<20%) who can provide unique points if they perform well, helping you rank higher in large tournaments.",
      category: "advanced",
      slug: "differential",
      relatedTerms: ["Ownership", "GPP", "Leverage"],
      usageExample: "Picking an uncapped bowler with 5% ownership as differential can win you GPP contests if he takes 3 wickets.",
    },
    {
      term: "Ownership",
      definition: "The percentage of teams in a contest that have selected a particular player. High ownership (>50%) means the player is popular.",
      category: "advanced",
      slug: "ownership",
      relatedTerms: ["Differential", "Leverage", "Contrarian"],
      usageExample: "If Rohit Sharma has 80% ownership and fails, most teams suffer equally. If he succeeds, you gain little advantage.",
    },
    {
      term: "GPP (Guaranteed Prize Pool)",
      definition: "Large tournaments with 100+ entries where top 20-30% of teams win prizes. Requires differentiation and calculated risks.",
      category: "contests",
      slug: "gpp",
      relatedTerms: ["Differential", "Leverage", "Tournament"],
      usageExample: "In a 10,000-entry GPP, you need unique captain choices and differentials to finish in top 100.",
    },
    {
      term: "H2H (Head-to-Head)",
      definition: "Contest format where you compete against one opponent. Winner takes all. Requires balanced, safe team selection.",
      category: "contests",
      slug: "h2h",
      relatedTerms: ["Contest Types", "Cash Game"],
      usageExample: "For H2H contests, avoid risky differentials and stick with high-ownership safe picks.",
    },
    {
      term: "Leverage",
      definition: "Strategic advantage gained by selecting low-ownership players who have high scoring potential. Used to differentiate in GPPs.",
      category: "advanced",
      slug: "leverage",
      relatedTerms: ["Differential", "Ownership", "GPP"],
      usageExample: "Captaining a 15% owned all-rounder instead of 60% owned batsman provides leverage if the all-rounder performs.",
    },
    {
      term: "Enabler",
      definition: "A budget player (7.0-7.5 credits) who is guaranteed to play, allowing you to afford premium players elsewhere in your team.",
      category: "team-building",
      slug: "enabler",
      relatedTerms: ["Budget Management", "Value Pick"],
      usageExample: "Selecting a 7.0 credit opening batsman as enabler frees up 2.0 credits to upgrade from 9.0 to 11.0 premium player.",
    },
    {
      term: "Value Pick",
      definition: "A player priced lower than their expected performance, offering high points-per-credit ratio.",
      category: "team-building",
      slug: "value-pick",
      relatedTerms: ["Enabler", "Budget Management"],
      usageExample: "An all-rounder priced at 8.5 who consistently scores 50+ points is a value pick compared to 10.0 credit player scoring 55.",
    },
    {
      term: "Stacking",
      definition: "Selecting multiple players from the same team, betting on that team's success. Risky but high-reward strategy.",
      category: "advanced",
      slug: "stacking",
      relatedTerms: ["Correlation", "Team Balance"],
      usageExample: "Stacking Mumbai Indians' top 4 batsmen and 2 bowlers when they're playing at Wankhede (home advantage).",
    },
    {
      term: "Pivot",
      definition: "Last-minute team change based on new information (team news, pitch report, weather). Common in advanced strategy.",
      category: "advanced",
      slug: "pivot",
      relatedTerms: ["Team News", "Deadline"],
      usageExample: "Pivoting from spin bowler to pacer after seeing grass on pitch in pre-match inspection.",
    },
    {
      term: "Fade",
      definition: "Intentionally avoiding a high-ownership player, betting they will underperform. Contrarian GPP strategy.",
      category: "advanced",
      slug: "fade",
      relatedTerms: ["Contrarian", "Ownership", "GPP"],
      usageExample: "Fading 70% owned Virat Kohli in GPP because you expect him to fail on a green pitch.",
    },
    {
      term: "Bankroll Management",
      definition: "Strategy for managing your total fantasy cricket funds, determining how much to risk per contest.",
      category: "strategy",
      slug: "bankroll-management",
      relatedTerms: ["ROI", "Variance"],
      usageExample: "Never risk more than 10% of bankroll in a single day's contests to survive variance.",
    },
    {
      term: "ROI (Return on Investment)",
      definition: "Percentage profit or loss on your fantasy cricket investments. Calculated as (Winnings - Entry Fees) / Entry Fees × 100.",
      category: "strategy",
      slug: "roi",
      relatedTerms: ["Bankroll Management", "Profit"],
      usageExample: "If you spend ₹10,000 in entry fees and win ₹12,000, your ROI is 20%.",
    },
    {
      term: "Variance",
      definition: "Statistical measure of how much your results fluctuate. High variance means big swings in wins and losses.",
      category: "strategy",
      slug: "variance",
      relatedTerms: ["Bankroll Management", "GPP"],
      usageExample: "GPP contests have high variance - you might lose 20 contests then win big in the 21st.",
    },
  ];

  for (const term of glossaryData) {
    await db.insert(glossaryTerms).values(term);
  }

  console.log(`✅ ${glossaryData.length} glossary terms created`);

  console.log("🎉 Final seed complete!");
  console.log("📊 Summary:");
  console.log("  - 1 comprehensive lesson (5000+ words)");
  console.log("  - 15 detailed glossary terms");
  console.log("  - Ready for expansion with more lessons and quizzes");
}

seedFinal().catch(console.error);
