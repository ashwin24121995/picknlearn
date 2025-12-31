import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as schema from '../drizzle/schema.js';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

// Lesson Categories
const categories = [
  { id: 1, name: 'Fundamentals', slug: 'fundamentals', description: 'Core concepts and basics of fantasy cricket', icon: 'BookOpen', orderIndex: 1 },
  { id: 2, name: 'Player Analysis', slug: 'player-analysis', description: 'Understanding player roles, forms, and selection', icon: 'Users', orderIndex: 2 },
  { id: 3, name: 'Scoring Systems', slug: 'scoring-systems', description: 'How fantasy points are calculated', icon: 'TrendingUp', orderIndex: 3 },
  { id: 4, name: 'Team Building', slug: 'team-building', description: 'Strategies for constructing winning teams', icon: 'Shield', orderIndex: 4 },
  { id: 5, name: 'Advanced Strategies', slug: 'advanced-strategies', description: 'Pro-level tactics and analytics', icon: 'Brain', orderIndex: 5 },
  { id: 6, name: 'Responsible Gaming', slug: 'responsible-gaming', description: 'Fair play and ethical considerations', icon: 'Heart', orderIndex: 6 },
];

// Comprehensive Lessons
const lessons = [
  {
    id: 1,
    categoryId: 1,
    title: 'Introduction to Fantasy Cricket',
    slug: 'introduction-to-fantasy-cricket',
    description: 'Learn the fundamentals of fantasy cricket, how it works, and why millions of fans love this strategic game.',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    orderIndex: 1,
    isPublished: true,
    content: `# Introduction to Fantasy Cricket

Fantasy cricket is a strategic online game where you create virtual teams of real cricket players and earn points based on their actual performance in live matches.

## What is Fantasy Cricket?

Fantasy cricket transforms you from a spectator into a team manager. You select real players within a budget, create your dream team, and compete against other fantasy managers. Your team earns points based on how your selected players perform in real matches.

## How Does It Work?

1. **Select Players**: Choose 11 players from upcoming matches within a fixed budget
2. **Assign Roles**: Pick a captain (2x points) and vice-captain (1.5x points)
3. **Join Contests**: Enter various contest types with different prize structures
4. **Track Performance**: Watch live matches and see your points accumulate in real-time
5. **Win Rewards**: Top-performing teams win prizes based on contest rules

## Why Play Fantasy Cricket?

- **Strategic Thinking**: Analyze player form, pitch conditions, and match dynamics
- **Deeper Engagement**: Every ball becomes exciting when your players are involved
- **Skill-Based Competition**: Success depends on cricket knowledge and analysis
- **Community**: Compete with friends and cricket enthusiasts worldwide
- **Learn Cricket**: Develop deeper understanding of player roles and match strategies

## Key Concepts

**Budget Management**: Each player has a credit value. You must build your team within the total budget (typically 100 credits).

**Player Categories**: Teams must include batsmen, bowlers, all-rounders, and wicket-keepers in specified proportions.

**Contest Types**: Different formats include Head-to-Head, 50/50 contests, and Grand Prize Pools (GPP).

**Points System**: Players earn points for runs, wickets, catches, strike rates, and economy rates.

## Getting Started

Fantasy cricket requires no special equipment or prior gaming experience. All you need is:
- Cricket knowledge and interest
- Understanding of player performances
- Strategic thinking and decision-making skills
- Willingness to learn and adapt

## Educational Focus

This platform focuses on teaching the concepts, strategies, and analytics behind fantasy cricket. We emphasize skill development, responsible gaming, and deep cricket understanding rather than monetary aspects.

## Next Steps

Continue to the next lessons to learn about contest types, player roles, scoring systems, and team-building strategies. Each lesson builds on previous knowledge, creating a comprehensive understanding of fantasy cricket mastery.`
  },
  {
    id: 2,
    categoryId: 1,
    title: 'Understanding Contest Types',
    slug: 'understanding-contest-types',
    description: 'Explore different fantasy cricket contest formats including H2H, 50/50, and GPP tournaments.',
    difficulty: 'beginner',
    estimatedMinutes: 12,
    orderIndex: 2,
    isPublished: true,
    content: `# Understanding Contest Types

Fantasy cricket offers various contest formats, each requiring different strategies and risk profiles. Understanding these formats is crucial for success.

## Head-to-Head (H2H) Contests

**Format**: You compete directly against one other player. Winner takes all.

**Characteristics**:
- 50% win rate (excluding ties)
- Lower variance
- Consistent strategy works well
- Focus on safe, reliable players

**Strategy**:
- Select high-floor players (consistent performers)
- Avoid risky differential picks
- Prioritize players with guaranteed playing time
- Captain safe, in-form batsmen

**Best For**: Beginners, conservative players, building confidence

## 50/50 Contests

**Format**: Top 50% of participants win equal prizes.

**Characteristics**:
- Moderate risk-reward balance
- Need to beat only half the field
- More forgiving than GPPs
- Allows some differentiation

**Strategy**:
- Mix of safe and differential players
- Balanced team composition
- Avoid extremely risky picks
- Target value players with upside

**Best For**: Intermediate players, balanced risk appetite

## Grand Prize Pool (GPP) Tournaments

**Format**: Large field with top-heavy prize distribution. Winners take significant prizes.

**Characteristics**:
- High variance
- Low win rate but massive upside
- Requires differentiation from field
- Contrarian thinking helps

**Strategy**:
- Include low-owned differential players
- Take calculated risks
- Multiple lineup entries with variations
- Target high-ceiling players
- Contrarian captain choices

**Best For**: Advanced players, high-risk tolerance, tournament specialists

## Small League Contests

**Format**: 3-10 participants, typically private leagues with friends.

**Characteristics**:
- Social and competitive
- Easier to predict opponent strategies
- Moderate prize pools
- Fun and engaging

**Strategy**:
- Know your opponents' tendencies
- Differentiate from expected popular picks
- Balance safety with uniqueness
- Psychological elements matter

## Mega Contests

**Format**: Thousands of participants, largest prize pools.

**Characteristics**:
- Extremely competitive
- Requires significant differentiation
- Multiple entries common
- Top prizes are substantial

**Strategy**:
- High-risk, high-reward approach
- Low-owned player stacks
- Contrarian thinking essential
- Multiple lineup variations

## Guaranteed Prize Pool (Guaranteed)

**Format**: Prize pool guaranteed regardless of entries.

**Characteristics**:
- Overlay opportunities when under-subscribed
- Consistent prize structure
- Popular among regular players

**Strategy**:
- Look for overlays (fewer entries than capacity)
- Standard GPP strategies apply
- Value increases with fewer participants

## Winner-Takes-All

**Format**: Single winner receives entire prize pool.

**Characteristics**:
- Extreme variance
- Requires maximum differentiation
- Very low win probability
- Massive upside potential

**Strategy**:
- Maximum contrarian approach
- Stack low-owned combinations
- Take significant risks
- Multiple unique lineups

## Choosing the Right Contest

**Beginners**: Start with H2H and 50/50 contests
**Intermediate**: Mix of 50/50 and small GPPs
**Advanced**: GPP focus with some 50/50 for bankroll stability
**Recreational**: Small leagues and H2H with friends

## Bankroll Management

Never enter more than 10% of your bankroll in any single contest. Diversify across contest types to manage risk and variance.

## Key Takeaways

- Different contests require different strategies
- Match your risk tolerance to contest type
- Diversification reduces variance
- Learn one format well before expanding
- Contest selection is as important as team selection`
  },
  {
    id: 3,
    categoryId: 2,
    title: 'Player Roles and Positions',
    slug: 'player-roles-and-positions',
    description: 'Deep dive into cricket player roles: batsmen, bowlers, all-rounders, and wicket-keepers.',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    orderIndex: 3,
    isPublished: true,
    content: `# Player Roles and Positions

Understanding player roles is fundamental to fantasy cricket success. Each role has distinct characteristics, scoring patterns, and strategic value.

## Batsmen

Batsmen score runs and form the backbone of your fantasy team.

### Opening Batsmen

**Role**: Face the new ball, set platform for innings

**Characteristics**:
- Face most deliveries
- Consistent scoring opportunity
- Bonus points for milestones (50, 100)
- Strike rate matters in T20s

**Fantasy Value**: High floor, moderate ceiling

**Selection Tips**:
- Prioritize in-form openers
- Check head-to-head records against opposition
- Consider pitch conditions
- Home advantage significant

### Middle-Order Batsmen

**Role**: Stabilize innings, accelerate scoring

**Characteristics**:
- Fewer balls faced than openers
- Higher strike rates expected
- Crucial in run chases
- Experience matters

**Fantasy Value**: Moderate floor, high ceiling

**Selection Tips**:
- Look for aggressive players in T20s
- Check recent form and strike rates
- Consider match situation tendencies
- Batting position stability important

### Finishers

**Role**: Explosive scoring in death overs

**Characteristics**:
- Limited balls but high impact
- Strike rates above 150 common
- Match-winning potential
- High variance

**Fantasy Value**: Low floor, very high ceiling

**Selection Tips**:
- Perfect for GPP differentiation
- Check death-over strike rates
- Prefer players batting at 5-6
- Match context crucial

## Bowlers

Bowlers earn points through wickets, economy, and maidens.

### Opening Bowlers (Pace)

**Role**: New ball exploitation, early wickets

**Characteristics**:
- Powerplay specialists
- Swing and seam movement
- Wicket-taking opportunities
- Economy can suffer

**Fantasy Value**: High ceiling, moderate floor

**Selection Tips**:
- Check powerplay records
- Pitch and weather conditions crucial
- Opposition top-order weakness
- Recent form and fitness

### Death Bowlers

**Role**: Contain runs in final overs

**Characteristics**:
- Economy rate critical
- Yorker specialists
- High-pressure situations
- Wicket opportunities

**Fantasy Value**: Consistent floor, bonus ceiling

**Selection Tips**:
- Prioritize economy rate
- Check death-over statistics
- Experience matters significantly
- Variations and yorkers key

### Spin Bowlers

**Role**: Middle-overs control, wickets

**Characteristics**:
- Pitch-dependent effectiveness
- Economy and wickets balance
- Strategic bowling changes
- Match-up advantages

**Fantasy Value**: Pitch-dependent variance

**Selection Tips**:
- Analyze pitch reports carefully
- Check opposition weakness against spin
- Home spinners often valuable
- Middle-overs economy crucial

## All-Rounders

All-rounders provide dual value through batting and bowling.

### Batting All-Rounders

**Role**: Primary batsman, part-time bowler

**Characteristics**:
- Bat in top 6
- Bowl 2-4 overs typically
- Double scoring opportunities
- Premium pricing

**Fantasy Value**: High floor and ceiling

**Selection Tips**:
- Prioritize batting role
- Bowling overs not guaranteed
- Recent form in both disciplines
- Excellent captain options

### Bowling All-Rounders

**Role**: Primary bowler, lower-order batsman

**Characteristics**:
- Bowl full quota
- Bat at 7-8
- Bowling points primary
- Value pricing

**Fantasy Value**: Moderate floor, high ceiling

**Selection Tips**:
- Focus on bowling performance
- Batting bonus potential
- Budget-friendly options
- Consistent point scorers

## Wicket-Keepers

Wicket-keepers earn batting points plus dismissal bonuses.

### Batting Wicket-Keepers

**Role**: Top-order batsman who keeps wickets

**Characteristics**:
- Bat in top 4
- Dismissal bonus opportunities
- Premium pricing
- Dual value

**Fantasy Value**: Very high floor and ceiling

**Selection Tips**:
- Batting position critical
- Form and recent scores
- Dismissal opportunities
- Excellent captain candidates

### Lower-Order Wicket-Keepers

**Role**: Keeping specialist, limited batting

**Characteristics**:
- Bat at 7-8
- Dismissal points primary value
- Budget options
- Limited upside

**Fantasy Value**: Low floor, moderate ceiling

**Selection Tips**:
- Budget constraints only
- Dismissal opportunities
- Playing XI certainty
- Avoid as captain

## Role Balance in Team Selection

**Mandatory Requirements** (typical):
- 1-4 Wicket-keepers
- 3-6 Batsmen
- 3-6 Bowlers
- 1-4 All-rounders
- Total: 11 players

**Optimal Balance**:
- 1 WK (batting keeper)
- 3-4 Batsmen (mix of openers and middle-order)
- 3-4 Bowlers (pace and spin balance)
- 2-3 All-rounders (batting all-rounders preferred)

## Key Takeaways

- Each role has distinct scoring patterns
- All-rounders provide maximum value
- Batting keepers are premium assets
- Balance roles based on contest type
- Match context affects role value`
  }
];

// Insert categories
console.log('Seeding lesson categories...');
for (const category of categories) {
  await db.insert(schema.lessonCategories)
    .values(category)
    .onDuplicateKeyUpdate({
      set: {
        name: category.name,
        description: category.description,
        icon: category.icon,
        orderIndex: category.orderIndex,
      },
    });
}

// Insert lessons
console.log('Seeding lessons...');
for (const lesson of lessons) {
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

console.log('✅ Database seeded successfully!');
console.log(`- ${categories.length} lesson categories`);
console.log(`- ${lessons.length} lessons`);

await connection.end();
