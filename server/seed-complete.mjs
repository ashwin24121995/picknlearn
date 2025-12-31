import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as schema from '../drizzle/schema.js';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

// More comprehensive lessons
const moreLessons = [
  {
    id: 4,
    categoryId: 1,
    title: "Understanding Contest Types",
    slug: "understanding-contest-types",
    description: "Learn about different fantasy cricket contest formats and which ones suit your strategy",
    content: `# Understanding Contest Types

Fantasy cricket platforms offer various contest types, each requiring different strategies and risk profiles.

## Head-to-Head (H2H) Contests

**What are they?**
- You compete against just one other player
- Winner takes all (minus platform fees)
- 50% win rate needed for profitability

**Best for:**
- Beginners learning the game
- Players who want consistent, lower-variance results
- Testing new strategies with minimal risk

**Strategy Tips:**
- Focus on high-floor players (consistent performers)
- Avoid very risky captain choices
- Balance is key - don't go too contrarian

## 50/50 Contests

**What are they?**
- Top 50% of entries win
- Smaller prize multiplier but higher win probability
- Also called "double-up" contests

**Best for:**
- Conservative players
- Building bankroll steadily
- Reducing variance

**Strategy Tips:**
- Play safe with popular choices
- Avoid extremely low-owned players
- Captain selection should be consensus picks

## Guaranteed Prize Pool (GPP) Contests

**What are they?**
- Large field tournaments
- Top-heavy payout structure
- Only top 10-20% get paid

**Best for:**
- Experienced players
- Those comfortable with high variance
- Players with strong analytical edge

**Strategy Tips:**
- Differentiate your lineup from the field
- Take calculated risks on captain choices
- Consider correlation plays
- Multiple entries with varied strategies

## Private Contests

Create custom contests with friends:
- Set your own entry fees
- Choose contest size
- Control who can join

## Winner-Take-All

- Highest risk, highest reward
- Only 1st place wins
- Requires significant differentiation

## Key Takeaways

1. **Match your bankroll to contest type**
2. **Beginners should start with H2H and 50/50**
3. **GPPs require advanced strategies**
4. **Diversify across contest types**
5. **Track your performance by contest type**`,
    difficulty: "beginner",
    estimatedMinutes: 12,
    orderIndex: 4,
    isPublished: true,
  },
  {
    id: 5,
    categoryId: 2,
    title: "Recent Form Analysis",
    slug: "recent-form-analysis",
    description: "Master the art of analyzing player form and momentum",
    content: `# Recent Form Analysis

Recent form is one of the most critical factors in fantasy cricket player selection.

## What is Form?

Form refers to a player's recent performance trend:
- **Hot streak**: Consistent high scores
- **Cold streak**: Series of poor performances
- **Returning from injury**: Uncertain form

## Time Windows to Consider

### Last 5 Matches
- Most relevant for current form
- Weight these performances heavily
- Look for consistency or trends

### Last 10 Matches
- Broader performance picture
- Helps identify sustained form vs. flukes
- Consider match contexts

### Season-Long Stats
- Baseline performance level
- Helps distinguish form from ability
- Use for long-term projections

## Key Metrics to Track

### For Batsmen
- **Strike rate trends**: Improving or declining?
- **Boundary percentage**: Ability to score quickly
- **Dismissal patterns**: Getting out the same way?
- **Position changes**: Batting order impact

### For Bowlers
- **Economy rate**: Especially in T20s
- **Wicket-taking frequency**: Breakthroughs vs. containing
- **Death bowling performance**: High-pressure situations
- **Powerplay effectiveness**: New ball impact

### For All-Rounders
- **Contribution balance**: Bat vs. ball
- **Role clarity**: Primary vs. secondary skill
- **Workload management**: Fatigue factors

## Context Matters

Don't just look at numbers:

**Opposition Quality**
- Strong vs. weak attacks
- Home vs. away records
- Format-specific performance

**Match Conditions**
- Pitch type and behavior
- Weather impact
- Venue history

**Team Situation**
- Batting position stability
- Bowling workload
- Team combination changes

## Red Flags

Watch for these warning signs:

1. **Declining strike rates** (batsmen)
2. **Rising economy rates** (bowlers)
3. **Reduced workload** (potential injury/rotation)
4. **Position changes** (role uncertainty)
5. **Team selection uncertainty**

## Green Flags

Positive indicators:

1. **Consistent scores** across matches
2. **Increasing responsibility** (promotion, more overs)
3. **Favorable matchups** ahead
4. **Confidence indicators** (interviews, body language)
5. **Career-best periods**

## Practical Application

### Step-by-Step Process

1. **Collect last 5-10 match data**
2. **Calculate trend metrics**
3. **Compare to season averages**
4. **Factor in upcoming matchup**
5. **Adjust projections accordingly**

### Form Multipliers

Apply these to base projections:
- **Hot form**: 1.1-1.2x multiplier
- **Average form**: 1.0x (no adjustment)
- **Cold form**: 0.8-0.9x multiplier
- **Returning from injury**: 0.7-0.8x

## Advanced Concepts

### Regression to the Mean
- Extreme performances tend to normalize
- Don't overreact to single exceptional games
- Consider sample size

### Momentum vs. Skill
- Distinguish lucky streaks from genuine improvement
- Look at underlying metrics (not just results)
- Consider opposition quality

### Recency Bias
- Don't overweight last match only
- Balance recent form with established ability
- Avoid knee-jerk reactions

## Tools and Resources

- Platform statistics pages
- Cricket analytics websites
- Match highlights and videos
- Expert analysis and podcasts

## Conclusion

Form analysis is both art and science. Combine statistical analysis with contextual understanding for best results.`,
    difficulty: "intermediate",
    estimatedMinutes: 18,
    orderIndex: 2,
    isPublished: true,
  },
  {
    id: 6,
    categoryId: 3,
    title: "Bonus Points and Penalties",
    slug: "bonus-points-penalties",
    description: "Understand how bonus points and penalties affect fantasy scores",
    content: `# Bonus Points and Penalties

Beyond basic scoring, fantasy cricket includes bonuses and penalties that can significantly impact your team's total.

## Batting Bonuses

### Milestone Bonuses
- **30 runs**: +4 points
- **50 runs (Half-century)**: +8 points
- **100 runs (Century)**: +16 points

**Strategy Tip**: Players batting in top order have better milestone potential.

### Strike Rate Bonuses (T20/ODI)

**T20 Format:**
- Strike rate 150-200: +2 points
- Strike rate > 200: +4 points

**ODI Format:**
- Strike rate 100-125: +2 points
- Strike rate > 125: +4 points

**Important**: Minimum balls faced requirement (usually 10-20 balls)

## Bowling Bonuses

### Wicket Milestones
- **3 wickets**: +4 points
- **4 wickets**: +8 points
- **5 wickets**: +16 points

### Economy Rate Bonuses (T20/ODI)

**T20 Format:**
- Economy 5-6: +2 points
- Economy < 5: +4 points

**ODI Format:**
- Economy 3-4: +2 points
- Economy < 3: +4 points

**Minimum**: Usually 2 overs bowled

### Maiden Overs
- **T20**: +12 points per maiden
- **ODI**: +4 points per maiden
- **Test**: +4 points per maiden

## Fielding Bonuses

### Catches
- **3 catches**: +4 points
- **Wicketkeeper catches**: Sometimes bonus points

### Run Outs
- **Direct hit**: +12 points
- **Assisted**: +6 points (thrower/catcher)

## Penalties

### Batting Penalties
- **Duck (0 runs)**: -2 points
  - Applies to batsmen only
  - Bowlers/all-rounders may be exempt

### Bowling Penalties
- **Expensive overs**: Some platforms penalize economy > 12

### Fielding Penalties
- **Dropped catches**: Rare but some platforms apply -2 points

## Captain and Vice-Captain Multipliers

### Captain
- **2x points**: All points doubled
- **Includes bonuses and penalties**
- Most critical decision

### Vice-Captain
- **1.5x points**: 50% bonus
- Insurance if captain fails
- Still very important

**Strategic Implications:**
- Captain choice can swing 50-100 points
- Consider ceiling (upside potential)
- Balance safety with differentiation

## Practical Examples

### Example 1: Explosive Batsman
- Base: 75 runs = 75 points
- Milestone: 50+ = +8 points
- Strike rate: 180 = +4 points
- **Total**: 87 points
- **As Captain**: 174 points

### Example 2: Economical Bowler
- Base: 3 wickets = 75 points (25 each)
- Milestone: 3 wickets = +4 points
- Economy: 4.5 = +2 points
- Maiden: 1 = +12 points
- **Total**: 93 points
- **As Captain**: 186 points

### Example 3: Duck Penalty
- Base: 0 runs = 0 points
- Duck penalty: -2 points
- **Total**: -2 points
- **As Captain**: -4 points

## Maximizing Bonuses

### For Batsmen
1. **Target top-order players** (more balls = milestone chance)
2. **Look for aggressive players** (strike rate bonuses)
3. **Consider pitch conditions** (flat = high scores)

### For Bowlers
1. **Powerplay specialists** (wickets + economy)
2. **Death bowlers** (high wicket potential)
3. **Spinners on turning tracks** (economy + wickets)

### For All-Rounders
1. **Dual bonus potential** (bat + bowl)
2. **Higher floor** (multiple scoring avenues)
3. **Premium pricing** (worth it for bonuses)

## Platform Variations

Different platforms have different rules:
- **Check specific scoring** before contests
- **Bonus thresholds** may vary
- **Penalty rules** differ
- **Multiplier systems** can be unique

## Advanced Strategy

### Stacking for Bonuses
- Build lineups targeting specific bonuses
- Example: Multiple top-order batsmen for milestones
- Risk: If pitch is difficult, entire strategy fails

### Balanced Approach
- Mix high-floor and high-ceiling players
- Don't rely solely on bonuses
- Ensure base scoring is solid

### Game Theory
- In GPPs, target bonus-heavy lineups
- In H2H, prioritize consistent base scoring
- Adjust based on contest type

## Common Mistakes

1. **Ignoring minimum requirements** (balls/overs for bonuses)
2. **Overvaluing bonus potential** vs. base scoring
3. **Not accounting for penalties** in captain choice
4. **Forgetting multiplier effects** on bonuses

## Conclusion

Bonuses and penalties can add 20-40% to a player's score. Understanding and targeting them is crucial for fantasy success.`,
    difficulty: "intermediate",
    estimatedMinutes: 15,
    orderIndex: 3,
    isPublished: true,
  },
];

// Quizzes
const quizzes = [
  {
    id: 1,
    title: "Fantasy Cricket Fundamentals Quiz",
    slug: "fundamentals-quiz",
    description: "Test your understanding of basic fantasy cricket concepts",
    difficulty: "beginner",
    timeLimit: 600,
    passingScore: 70,
    categoryId: 1,
    isPublished: true,
  },
  {
    id: 2,
    title: "Player Analysis Mastery",
    slug: "player-analysis-quiz",
    description: "Challenge your player evaluation and selection skills",
    difficulty: "intermediate",
    timeLimit: 900,
    passingScore: 75,
    categoryId: 2,
    isPublished: true,
  },
];

// Quiz Questions
const quizQuestions = [
  // Fundamentals Quiz
  {
    id: 1,
    quizId: 1,
    question: "What is the primary advantage of Head-to-Head (H2H) contests for beginners?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "Highest prize money",
      B: "50% win rate needed for profitability",
      C: "Most players to compete against",
      D: "No entry fee required"
    }),
    correctAnswer: "B",
    explanation: "H2H contests require only a 50% win rate to be profitable over time, making them ideal for beginners to learn while minimizing risk.",
    points: 10,
    orderIndex: 1,
  },
  {
    id: 2,
    quizId: 1,
    question: "How many points does a batsman get for scoring a half-century (50 runs)?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "4 points",
      B: "8 points",
      C: "16 points",
      D: "50 points"
    }),
    correctAnswer: "B",
    explanation: "A half-century milestone awards +8 bonus points in addition to the base points for runs scored.",
    points: 10,
    orderIndex: 2,
  },
  {
    id: 3,
    quizId: 1,
    question: "The captain's score is multiplied by what factor?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "1.5x",
      B: "2x",
      C: "2.5x",
      D: "3x"
    }),
    correctAnswer: "B",
    explanation: "The captain's total points are doubled (2x multiplier), making captain selection one of the most critical decisions.",
    points: 10,
    orderIndex: 3,
  },
  {
    id: 4,
    quizId: 1,
    question: "True or False: In 50/50 contests, the top 50% of entries win prizes.",
    questionType: "true_false",
    options: JSON.stringify({
      A: "True",
      B: "False"
    }),
    correctAnswer: "A",
    explanation: "50/50 contests (also called double-ups) pay out the top 50% of entries, offering higher win probability but smaller prize multipliers.",
    points: 10,
    orderIndex: 4,
  },
  {
    id: 5,
    quizId: 1,
    question: "What penalty does a batsman receive for scoring a duck (0 runs)?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "No penalty",
      B: "-2 points",
      C: "-5 points",
      D: "-10 points"
    }),
    correctAnswer: "B",
    explanation: "Most fantasy platforms apply a -2 point penalty when a batsman scores a duck (0 runs).",
    points: 10,
    orderIndex: 5,
  },
  // Player Analysis Quiz
  {
    id: 6,
    quizId: 2,
    question: "When analyzing recent form, which time window is most relevant for current performance?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "Last 3 matches",
      B: "Last 5 matches",
      C: "Last 10 matches",
      D: "Entire season"
    }),
    correctAnswer: "B",
    explanation: "The last 5 matches provide the most relevant indicator of current form, balancing recency with adequate sample size.",
    points: 15,
    orderIndex: 1,
  },
  {
    id: 7,
    quizId: 2,
    question: "What strike rate in T20 cricket typically earns a batsman +4 bonus points?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "Above 120",
      B: "Above 150",
      C: "Above 170",
      D: "Above 200"
    }),
    correctAnswer: "D",
    explanation: "A strike rate above 200 in T20 cricket typically awards +4 bonus points (with minimum balls faced requirement).",
    points: 15,
    orderIndex: 2,
  },
  {
    id: 8,
    quizId: 2,
    question: "True or False: Top-order batsmen have better milestone bonus potential than middle-order batsmen.",
    questionType: "true_false",
    options: JSON.stringify({
      A: "True",
      B: "False"
    }),
    correctAnswer: "A",
    explanation: "Top-order batsmen face more balls and have more time to reach milestones (50s, 100s), making them better for bonus points.",
    points: 15,
    orderIndex: 3,
  },
  {
    id: 9,
    quizId: 2,
    question: "What is a 'red flag' when analyzing player form?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "Consistent scores across matches",
      B: "Declining strike rates for batsmen",
      C: "Increasing responsibility in the team",
      D: "Favorable upcoming matchups"
    }),
    correctAnswer: "B",
    explanation: "Declining strike rates for batsmen indicate worsening form and reduced scoring efficiency, making it a red flag.",
    points: 15,
    orderIndex: 4,
  },
  {
    id: 10,
    quizId: 2,
    question: "How many bonus points does a bowler get for taking 4 wickets?",
    questionType: "multiple_choice",
    options: JSON.stringify({
      A: "4 points",
      B: "8 points",
      C: "12 points",
      D: "16 points"
    }),
    correctAnswer: "B",
    explanation: "Taking 4 wickets awards +8 bonus points in addition to the base 25 points per wicket.",
    points: 15,
    orderIndex: 5,
  },
];

// Glossary Terms
const glossaryTerms = [
  {
    id: 1,
    term: "Captain",
    slug: "captain",
    definition: "The player in your fantasy team whose points are doubled (2x multiplier). This is your most important selection decision.",
    example: "If your captain scores 80 points, your team receives 160 points from that player.",
    category: "Team Building",
    relatedTerms: JSON.stringify(["Vice-Captain", "Multiplier", "Differential"]),
  },
  {
    id: 2,
    term: "Vice-Captain",
    slug: "vice-captain",
    definition: "The player whose points are multiplied by 1.5x. Acts as insurance if your captain fails.",
    example: "If your vice-captain scores 60 points, your team receives 90 points from that player.",
    category: "Team Building",
    relatedTerms: JSON.stringify(["Captain", "Multiplier"]),
  },
  {
    id: 3,
    term: "Differential",
    slug: "differential",
    definition: "A player with low ownership percentage who can help you gain an edge over opponents if they perform well.",
    example: "Selecting a 5% owned player as captain instead of a 60% owned player is a differential play.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["Ownership", "GPP", "Leverage"]),
  },
  {
    id: 4,
    term: "Ownership",
    slug: "ownership",
    definition: "The percentage of teams in a contest that have selected a particular player.",
    example: "If Virat Kohli is in 65% of teams, he has 65% ownership.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["Differential", "Chalk", "Leverage"]),
  },
  {
    id: 5,
    term: "Chalk",
    slug: "chalk",
    definition: "Highly owned, popular players that most people select. Safe but offers little differentiation.",
    example: "In a match between India and Bangladesh, Indian top-order batsmen are typically chalk plays.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["Ownership", "Differential", "Contrarian"]),
  },
  {
    id: 6,
    term: "GPP",
    slug: "gpp",
    definition: "Guaranteed Prize Pool tournament. Large-field contests with top-heavy payouts where only 10-20% of entries win.",
    example: "A GPP might have 10,000 entries with prizes only for the top 1,000 finishers.",
    category: "Contest Types",
    relatedTerms: JSON.stringify(["H2H", "50/50", "Tournament"]),
  },
  {
    id: 7,
    term: "H2H",
    slug: "h2h",
    definition: "Head-to-Head contest where you compete against just one other player. Winner takes all.",
    example: "You and one opponent each enter ₹100. Winner gets ₹180 (after platform fees).",
    category: "Contest Types",
    relatedTerms: JSON.stringify(["50/50", "GPP", "Contest"]),
  },
  {
    id: 8,
    term: "50/50",
    slug: "fifty-fifty",
    definition: "Contest type where the top 50% of entries win, typically doubling their entry fee (minus platform fees).",
    example: "In a 100-person 50/50, the top 50 finishers all win the same prize.",
    category: "Contest Types",
    relatedTerms: JSON.stringify(["H2H", "GPP", "Double-Up"]),
  },
  {
    id: 9,
    term: "Leverage",
    slug: "leverage",
    definition: "Strategic differentiation by selecting low-owned players in key positions (especially captain) to gain an edge.",
    example: "Captaining a 10% owned bowler instead of a 50% owned batsman is a leverage play.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["Differential", "Ownership", "GPP"]),
  },
  {
    id: 10,
    term: "Correlation",
    slug: "correlation",
    definition: "Selecting multiple players whose performances are likely to be connected (e.g., batsmen from same team, bowler + fielders).",
    example: "Stacking India's top 3 batsmen assumes India will bat well, correlating their scores.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["Stacking", "Game Theory", "Lineup Construction"]),
  },
  {
    id: 11,
    term: "Stacking",
    slug: "stacking",
    definition: "Loading your lineup with multiple players from the same team or batting order to maximize correlated upside.",
    example: "Selecting 4-5 batsmen from the team batting first on a flat pitch.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["Correlation", "Lineup Construction", "Game Theory"]),
  },
  {
    id: 12,
    term: "Fade",
    slug: "fade",
    definition: "Intentionally avoiding a popular (chalk) player to differentiate your lineup.",
    example: "Fading a 70% owned player to gain leverage if they fail.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["Chalk", "Differential", "Contrarian"]),
  },
  {
    id: 13,
    term: "Bankroll",
    slug: "bankroll",
    definition: "The total amount of money you have allocated for playing fantasy sports.",
    example: "If you deposit ₹10,000 for fantasy cricket, that's your bankroll.",
    category: "Bankroll Management",
    relatedTerms: JSON.stringify(["Bankroll Management", "ROI", "Variance"]),
  },
  {
    id: 14,
    term: "ROI",
    slug: "roi",
    definition: "Return on Investment. The percentage profit or loss on your fantasy sports investment.",
    example: "If you invest ₹10,000 and win ₹12,000, your ROI is 20%.",
    category: "Bankroll Management",
    relatedTerms: JSON.stringify(["Bankroll", "Profit", "EV"]),
  },
  {
    id: 15,
    term: "EV",
    slug: "ev",
    definition: "Expected Value. The average amount you expect to win or lose per entry over the long run.",
    example: "A +EV play means you expect to profit over time, even if individual entries lose.",
    category: "Strategy",
    relatedTerms: JSON.stringify(["ROI", "Probability", "Game Theory"]),
  },
];

// Seed the database
console.log('Seeding additional lessons...');
for (const lesson of moreLessons) {
  await db.insert(schema.lessons)
    .values(lesson)
    .onDuplicateKeyUpdate({
      set: {
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        difficulty: lesson.difficulty,
        estimatedMinutes: lesson.estimatedMinutes,
      },
    });
}

console.log('Seeding quizzes...');
for (const quiz of quizzes) {
  await db.insert(schema.quizzes)
    .values(quiz)
    .onDuplicateKeyUpdate({
      set: {
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty,
      },
    });
}

console.log('Seeding quiz questions...');
for (const question of quizQuestions) {
  await db.insert(schema.quizQuestions)
    .values(question)
    .onDuplicateKeyUpdate({
      set: {
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      },
    });
}

console.log('Seeding glossary terms...');
for (const term of glossaryTerms) {
  await db.insert(schema.glossaryTerms)
    .values(term)
    .onDuplicateKeyUpdate({
      set: {
        definition: term.definition,
        example: term.example,
        category: term.category,
      },
    });
}

await connection.end();

console.log('✅ Complete database seeded successfully!');
console.log(`- ${moreLessons.length} additional lessons`);
console.log(`- ${quizzes.length} quizzes`);
console.log(`- ${quizQuestions.length} quiz questions`);
console.log(`- ${glossaryTerms.length} glossary terms`);
