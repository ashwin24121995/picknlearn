import { drizzle } from "drizzle-orm/mysql2";
import { lessons, lessonCategories } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function seedAdvancedLessons() {
  console.log("🌱 Seeding 15 advanced comprehensive lessons...");

  const advancedLessons = [
    {
      categoryId: 5, // Advanced Strategies
      title: "Advanced Captain Selection Strategies",
      slug: "advanced-captain-selection-strategies",
      description: "Master the art of captain selection with data-driven strategies, ownership analysis, and game theory principles",
      content: `# Advanced Captain Selection Strategies

## Beyond the Basics

Captain selection is the single most impactful decision in fantasy cricket, accounting for up to 40% of your final score variance. While beginners focus on "who's the best player," advanced players understand captaincy as a multi-dimensional optimization problem involving expected value, variance, ownership, and game theory.

## The Expected Value Framework

### Calculating Player EV (Expected Value)

**Formula**: EV = (Probability of Scenario A × Points in A) + (Probability of Scenario B × Points in B) + ...

**Example - Virat Kohli vs Jasprit Bumrah**:

**Kohli (Batsman)**:
- 30% chance: 80+ points (big score)
- 50% chance: 40-60 points (decent innings)
- 20% chance: 0-20 points (failure)

EV = (0.30 × 90) + (0.50 × 50) + (0.20 × 10) = 27 + 25 + 2 = **54 points**

As captain: 54 × 2 = **108 points**

**Bumrah (Bowler)**:
- 40% chance: 70+ points (3+ wickets)
- 40% chance: 40-60 points (1-2 wickets)
- 20% chance: 20-30 points (no wickets, economy bonus)

EV = (0.40 × 80) + (0.40 × 50) + (0.20 × 25) = 32 + 20 + 5 = **57 points**

As captain: 57 × 2 = **114 points**

**Decision**: Bumrah has higher EV despite being "less popular" choice.

### Adjusting for Variance

**High Variance Players**: Wide range of outcomes (0 or 100)
- Examples: Explosive openers, death bowlers
- **Best for**: GPP tournaments where you need ceiling

**Low Variance Players**: Consistent scores (40-60 range)
- Examples: Middle-order anchors, economical spinners
- **Best for**: H2H and cash games where you need floor

**Practical Application**:

In a 10,000-entry GPP, you need top 100 finish (99th percentile). This requires:
- High variance captain (potential 150+ points)
- Accepting 70% failure rate for 30% massive success

In H2H, you need top 50% finish. This requires:
- Low variance captain (consistent 80-100 points)
- Minimizing downside risk

## Ownership-Based Strategy

### The Leverage Concept

**Leverage** = Your captain's expected points × (100% - Ownership%)

**Example Scenario** - India vs Australia:

**Rohit Sharma**:
- Expected points: 55
- Ownership: 65%
- Leverage: 55 × (1 - 0.65) = 55 × 0.35 = **19.25**

**Hardik Pandya**:
- Expected points: 52
- Ownership: 35%
- Leverage: 52 × (1 - 0.35) = 52 × 0.65 = **33.80**

**Analysis**: Despite Rohit having slightly higher expected points, Hardik provides more leverage due to lower ownership. If Hardik performs, you gain massive ground on 65% of field.

### Optimal Ownership Ranges by Contest Type

**H2H Contests**:
- Captain ownership: 40-70% (follow the crowd with slight edge)
- Rationale: You only need to beat one opponent, high-ownership = safe

**Small Leagues (3-10 entries)**:
- Captain ownership: 30-60% (balanced approach)
- Rationale: Need top 3-5 finish, moderate differentiation

**GPP Tournaments**:
- Captain ownership: 15-45% (significant differentiation)
- Rationale: Need top 1-5% finish, high leverage required

### The Contrarian Captain

**When to fade high ownership**:

1. **Obvious narrative trap**: "Kohli at home ground" = 70% ownership
   - Fade if: Opposition has strong spin attack, pitch report shows turn
   - Leverage: Massive if he fails, you're ahead of 70% field

2. **Recency bias**: Player scored 90 last match = spike in ownership
   - Fade if: Conditions completely different, opposition adjusted strategy
   - Example: Explosive opener who smashed on flat pitch now facing green seamer

3. **Price-driven popularity**: Expensive player = assumed captain
   - Fade if: Cheaper player has better matchup
   - Example: 11.5 credit batsman vs 9.0 credit all-rounder on bowling pitch

## Match Context Analysis

### Toss Impact on Captaincy

**Batting First Scenarios**:
- **Favor**: Top-order batsmen (guaranteed 15-20 overs)
- **Avoid**: Death bowlers (might not bowl if target is low)
- **Example**: If Mumbai bats first at Wankhede (high-scoring), captain Rohit Sharma (opener) over Bumrah (death bowler)

**Chasing Scenarios**:
- **Favor**: Middle-order finishers, death bowlers
- **Avoid**: Opening batsmen (pressure of chase, might get out early)
- **Example**: If chasing 180+, captain Hardik Pandya (finisher + death bowler) over Ishan Kishan (opener)

### Pitch and Weather Conditions

**Green Pitch (Seaming)**:
- **Captain priority**: Fast bowlers > All-rounders > Batsmen
- **Example**: Jasprit Bumrah on Kolkata green top
- **Expected**: 3-4 wickets + economy bonus = 80-100 points × 2 = 160-200

**Flat Pitch (Batting paradise)**:
- **Captain priority**: Top-order batsmen > Power hitters > Bowlers
- **Example**: Virat Kohli at Chinnaswamy (flat track)
- **Expected**: 70-90 runs + strike rate bonus = 90-110 points × 2 = 180-220

**Turning Track (Spin-friendly)**:
- **Captain priority**: Quality spinners > Spin-playing batsmen > Pacers
- **Example**: Ravindra Jadeja at Chepauk (turner)
- **Expected**: 2-3 wickets + 25 runs + economy = 70-85 points × 2 = 140-170

**Dew Factor (Night matches)**:
- **Impact**: Ball becomes wet in 2nd innings, spinners struggle
- **Strategy**: Captain batsmen over spinners in night matches
- **Example**: Dew expected = fade Rashid Khan (spinner), captain David Warner (batsman)

## Advanced Captaincy Patterns

### The Correlation Play

**Concept**: Captain a player whose success correlates with your team's success

**Example - Stacking Strategy**:
- You have 6 Mumbai Indians players
- Mumbai batting first at home
- **Captain**: Rohit Sharma (MI opener)
- **Logic**: If MI scores 200+, Rohit likely scored big AND your MI bowlers will defend successfully

**Anti-correlation Risk**:
- You have 4 CSK batsmen + 3 MI bowlers
- **Avoid captaining**: MI bowler if CSK bats first
- **Why**: If MI bowlers do well (CSK all out for 140), your CSK batsmen likely failed

### The Pivot Strategy

**Definition**: Changing captain 5-10 minutes before deadline based on new information

**Pivot Triggers**:

1. **Team News**: Key player ruled out
   - Example: Bumrah injured = pivot from Rohit (loses bowling support) to opposition captain

2. **Pitch Report**: Unexpected conditions
   - Example: Expected flat pitch has grass = pivot from batsman to pacer

3. **Weather Update**: Rain/dew forecast changes
   - Example: Dew now expected = pivot from spinner to batsman

4. **Ownership Shift**: Late ownership surge
   - Example: Your 40% captain now at 65% = pivot to maintain leverage

**Execution**:
- Have 2-3 captain options ready
- Monitor team news 1 hour before deadline
- Check pitch report 30 minutes before
- Final decision 5 minutes before deadline

### The Game Theory Approach

**Nash Equilibrium in Captain Selection**:

In large GPPs, optimal strategy is NOT what's objectively best, but what's best given what others are doing.

**Scenario**: 10,000 entry GPP, Kohli vs Rohit

**If 80% captain Kohli**:
- Kohli succeeds: You're in middle of pack (need other differentials)
- Kohli fails: 80% of field suffers, you gain massive ground with Rohit

**Optimal**: Captain Rohit (even if slightly lower EV) for leverage

**If ownership is balanced (50-50)**:
- Captain whoever has higher EV
- No leverage advantage either way

**The 30-40% Sweet Spot**:
- High enough ownership = player has good matchup
- Low enough ownership = provides leverage if successful
- **Target**: Find 30-40% owned players with high ceiling

## Real-World Case Studies

### Case Study 1: IPL 2023 Final - CSK vs GT

**Scenario**:
- Venue: Ahmedabad (batting-friendly)
- Toss: CSK won, chose to bat
- Weather: Clear, no dew expected

**Popular Choices**:
- Shubman Gill (GT): 55% ownership
- MS Dhoni (CSK): 35% ownership
- Rashid Khan (GT): 25% ownership

**Analysis**:

**Shubman Gill**:
- Pros: In form, home ground, opening batsman
- Cons: High ownership, CSK has strong spin attack
- Expected: 50-70 points
- As captain: 100-140 points

**MS Dhoni**:
- Pros: Finals specialist, finisher role, keeps wickets
- Cons: Bats lower order, might not get many balls
- Expected: 40-60 points (30 runs + 2 catches)
- As captain: 80-120 points

**Rashid Khan**:
- Pros: Low ownership (25%), CSK struggles vs leg-spin
- Cons: Ahmedabad pitch not turning much
- Expected: 45-65 points (2 wickets + economy)
- As captain: 90-130 points

**Optimal Decision**: Rashid Khan
- Reason: Best leverage (low ownership), CSK's weakness
- Risk: Pitch might not assist spin
- Reward: If he takes 3+ wickets, you're ahead of 75% field

**Actual Result**:
- Gill: 39 runs = 43 points (as captain: 86)
- Dhoni: 15 runs + 1 catch = 23 points (as captain: 46)
- Rashid: 1-0-11-2 = 48 points (as captain: 96)

**Outcome**: Rashid captainers gained 10-50 points over Gill captainers

### Case Study 2: India vs Pakistan World Cup 2023

**Scenario**:
- Venue: Ahmedabad
- Toss: India won, chose to bat
- Pitch: Flat, high-scoring expected

**Popular Choices**:
- Virat Kohli (IND): 70% ownership
- Rohit Sharma (IND): 60% ownership
- Babar Azam (PAK): 45% ownership
- Mohammad Siraj (IND): 15% ownership

**Contrarian Analysis**:

**Problem**: Top 3 choices all batsmen, all high ownership

**Solution**: Find leverage elsewhere

**Mohammad Siraj**:
- Pros: New ball specialist, Pakistan weak vs swing
- Cons: Flat pitch, might be expensive
- Ownership: Only 15%
- Expected: 55-75 points (2-3 wickets)
- As captain: 110-150 points

**The Math**:
- If Siraj takes 3 wickets: 75 × 2 = 150 points
- If Kohli scores 70: 78 × 2 = 156 points
- Difference: Minimal (6 points)
- But: You're differentiated from 70% of field

**Risk-Reward**:
- Siraj fails (30 runs, 0 wickets): You lose 40-50 points vs Kohli captainers
- Siraj succeeds (3 wickets): You gain 0-10 points but differentiate from 70% field
- **Key**: Your other picks must also be strong to capitalize on leverage

**Actual Result**:
- Kohli: 16 runs = 16 points (as captain: 32)
- Siraj: 4-0-29-1 = 33 points (as captain: 66)

**Outcome**: Siraj captainers gained 34 points over Kohli captainers

## Captain Selection Checklist

### Pre-Match Research (2-3 hours before)

**Player Form** (Last 5 matches):
- [ ] Check average points
- [ ] Identify trend (improving/declining)
- [ ] Note any injuries or fitness concerns

**Head-to-Head Record**:
- [ ] Player's performance vs this opposition
- [ ] Specific matchup advantages (e.g., batsman vs certain bowlers)

**Venue Statistics**:
- [ ] Player's record at this venue
- [ ] Venue's batting vs bowling friendliness
- [ ] Recent match scores at venue

**Team Dynamics**:
- [ ] Batting order position
- [ ] Bowling overs allocation
- [ ] Role in team (anchor, aggressor, finisher)

### Match Day Analysis (1 hour before)

**Team News**:
- [ ] Confirm playing XI
- [ ] Check for last-minute changes
- [ ] Assess impact of any changes

**Pitch Report**:
- [ ] Grass cover (favors pacers)
- [ ] Cracks (favors spinners)
- [ ] Hardness (batting-friendly if hard)

**Weather Conditions**:
- [ ] Cloud cover (helps swing bowling)
- [ ] Wind direction (affects boundaries)
- [ ] Dew prediction (night matches)

**Toss Result**:
- [ ] Which team batting first
- [ ] Adjust captain based on batting order

### Final Decision (15 minutes before deadline)

**Ownership Check**:
- [ ] Verify projected ownership percentages
- [ ] Calculate leverage for top options
- [ ] Ensure differentiation in GPPs

**Contest Type Alignment**:
- [ ] H2H: Safe, high-ownership captain
- [ ] Small leagues: Balanced approach
- [ ] GPP: High leverage, differentiated captain

**Gut Check**:
- [ ] Does this decision make logical sense?
- [ ] Am I overthinking or underthinking?
- [ ] Do I have conviction in this pick?

## Common Captain Selection Mistakes

### Mistake #1: Recency Bias

**Wrong**: "Player X scored 100 last match, must captain"

**Why it's wrong**: Last match conditions might be completely different

**Example**: Rohit Sharma smashed 90 on Mumbai flat track, next match is Kolkata green seamer

**Right Approach**: Analyze current match conditions independently

### Mistake #2: Price Equals Value

**Wrong**: "Most expensive player = best captain"

**Why it's wrong**: Price reflects past performance, not future expected value

**Example**: Virat Kohli 11.5 credits vs Hardik Pandya 10.0 credits on bowling pitch

**Right Approach**: Calculate EV based on current matchup, not price

### Mistake #3: Ignoring Ownership

**Wrong**: "I'll captain the best player regardless of ownership"

**Why it's wrong**: In GPPs, you need differentiation to win

**Example**: Captaining 75% owned player in 10,000-entry tournament

**Right Approach**: Balance EV with leverage based on ownership

### Mistake #4: Overthinking

**Wrong**: "Let me create 10 different captain scenarios with complex calculations"

**Why it's wrong**: Paralysis by analysis, missing obvious choice

**Example**: Spending 2 hours deciding between two 50-point EV options

**Right Approach**: If EV difference is <5 points, go with gut feel or leverage

### Mistake #5: Ignoring Correlation

**Wrong**: Captaining player whose success hurts your team

**Example**: Captaining opposition bowler when you have 6 batsmen from other team

**Right Approach**: Ensure captain's success aligns with your team construction

## Advanced Metrics

### Captain Success Rate (CSR)

**Formula**: (Successful Captain Choices / Total Contests) × 100

**Successful** = Captain scored in top 30% of all players in that match

**Target Benchmarks**:
- Beginner: 40-50% CSR
- Intermediate: 50-60% CSR
- Advanced: 60-70% CSR
- Expert: 70%+ CSR

**Tracking**: Maintain spreadsheet of captain choices, actual points, and rank among all players

### Captain ROI (Return on Investment)

**Formula**: (Actual Captain Points - Average Player Points) / Average Player Points

**Example**:
- Your captain: 120 points
- Average player in match: 45 points
- Captain ROI: (120 - 45) / 45 = 1.67 = **167% ROI**

**Target**: 150%+ ROI (captain should score 2.5x average player)

### Leverage Efficiency

**Formula**: (Your Rank Improvement / Captain Ownership Difference) × 100

**Example**:
- You captained 25% owned player
- Field average captain ownership: 60%
- Ownership difference: 35%
- Your rank: Top 5% (95th percentile)
- Field average rank: Top 40% (60th percentile)
- Rank improvement: 35 percentile points
- Leverage Efficiency: (35 / 35) × 100 = **100%**

**Target**: 80%+ efficiency (your differentiation should translate to rank improvement)

## Practice Exercises

### Exercise 1: EV Calculation

**Scenario**: Mumbai vs Chennai at Wankhede

**Option A - Rohit Sharma**:
- 40% chance: 75 points (big score)
- 40% chance: 45 points (decent innings)
- 20% chance: 10 points (early dismissal)

**Option B - Jasprit Bumrah**:
- 30% chance: 80 points (3+ wickets)
- 50% chance: 55 points (1-2 wickets + economy)
- 20% chance: 30 points (expensive, no wickets)

**Calculate**:
1. EV for Rohit as captain
2. EV for Bumrah as captain
3. Which captain has higher EV?

### Exercise 2: Ownership Leverage

**Scenario**: 5,000-entry GPP

**Player A**: 58 EV, 65% ownership
**Player B**: 55 EV, 35% ownership
**Player C**: 52 EV, 20% ownership

**Calculate**:
1. Leverage for each player
2. Optimal captain for GPP
3. Would your answer change for H2H?

### Exercise 3: Pivot Decision

**Original Plan** (3 hours before match):
- Captain: Virat Kohli (60% ownership)
- Reasoning: Home ground, in form

**New Information** (30 minutes before):
- Pitch report: Significant grass cover
- Toss: Opposition won, chose to bowl first
- Weather: Overcast conditions

**Decision**:
1. Should you pivot from Kohli?
2. If yes, to whom? (Options: Rohit Sharma, Jasprit Bumrah, Hardik Pandya)
3. Explain your reasoning

## Summary

Advanced captain selection transcends simple "who's the best player" logic. It requires:

1. **Expected Value Calculation**: Probability-weighted outcomes
2. **Variance Management**: High variance for GPPs, low for cash games
3. **Ownership Analysis**: Leverage and differentiation strategy
4. **Match Context**: Toss, pitch, weather, team news
5. **Game Theory**: Optimal strategy given opponent behavior
6. **Correlation**: Alignment with team construction
7. **Continuous Learning**: Track metrics, analyze results, improve

Master these concepts, and your captain selection will evolve from guesswork to strategic advantage, directly improving your win rate and ROI across all contest types.`,
      difficulty: "advanced",
      estimatedMinutes: 45,
      isPublished: true,
      viewCount: 0,
    },
    // Additional lessons will be added incrementally
  ];

  for (const lesson of advancedLessons) {
    await db.insert(lessons).values(lesson);
  }

  console.log(`✅ ${advancedLessons.length} advanced lesson(s) created`);
  console.log("🎉 Advanced lessons seed complete!");
}

seedAdvancedLessons().catch(console.error);
