import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PitchType {
  name: string;
  description: string;
  color: string;
  gradient: string;
  characteristics: string[];
  favoredPlayers: {
    type: string;
    impact: "high" | "medium" | "low";
    reason: string;
  }[];
  avgScore: string;
  venues: string[];
}

export function PitchTypesComparison() {
  const pitchTypes: PitchType[] = [
    {
      name: "Batting Paradise",
      description: "Flat, hard pitch with true bounce - batsman's dream",
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      characteristics: [
        "True bounce and carry",
        "Minimal seam movement",
        "Spinners struggle",
        "High scoring matches (180+ in T20)",
      ],
      favoredPlayers: [
        {
          type: "Top-order Batsmen",
          impact: "high",
          reason: "Can play through the line with confidence",
        },
        {
          type: "Power Hitters",
          impact: "high",
          reason: "Ball comes onto the bat nicely for big hits",
        },
        {
          type: "Fast Bowlers",
          impact: "low",
          reason: "Limited assistance, expensive overs likely",
        },
        {
          type: "Spinners",
          impact: "low",
          reason: "Minimal turn, easy to score against",
        },
      ],
      avgScore: "T20: 180-200 | ODI: 320-350",
      venues: ["Wankhede (Mumbai)", "Chinnaswamy (Bangalore)", "Sharjah"],
    },
    {
      name: "Green Top / Seaming",
      description: "Grass cover, moisture - pace bowler's paradise",
      color: "blue",
      gradient: "from-blue-500 to-cyan-600",
      characteristics: [
        "Seam and swing movement",
        "Uneven bounce possible",
        "Early wickets common",
        "Low to medium scores",
      ],
      favoredPlayers: [
        {
          type: "Fast Bowlers",
          impact: "high",
          reason: "Seam movement creates wicket-taking opportunities",
        },
        {
          type: "Swing Bowlers",
          impact: "high",
          reason: "Conditions perfect for swing bowling",
        },
        {
          type: "Top-order Batsmen",
          impact: "low",
          reason: "Difficult to score, high dismissal risk",
        },
        {
          type: "Middle-order Batsmen",
          impact: "medium",
          reason: "Pitch eases out, scoring becomes easier",
        },
      ],
      avgScore: "T20: 140-160 | ODI: 240-270",
      venues: ["Eden Gardens (Kolkata)", "Newlands (Cape Town)", "Lord's (London)"],
    },
    {
      name: "Spin-Friendly / Dusty",
      description: "Dry, cracked surface - spinner's delight",
      color: "orange",
      gradient: "from-orange-500 to-amber-600",
      characteristics: [
        "Significant turn and grip",
        "Variable bounce",
        "Slows down as match progresses",
        "Spinners dominate middle overs",
      ],
      favoredPlayers: [
        {
          type: "Spinners",
          impact: "high",
          reason: "Turn and bounce make batting difficult",
        },
        {
          type: "Spin-playing Batsmen",
          impact: "high",
          reason: "Can read spin and score freely",
        },
        {
          type: "Fast Bowlers",
          impact: "low",
          reason: "Pitch too slow, hard to generate pace",
        },
        {
          type: "Aggressive Batsmen",
          impact: "medium",
          reason: "Can counter-attack before pitch deteriorates",
        },
      ],
      avgScore: "T20: 150-170 | ODI: 260-290",
      venues: ["Chepauk (Chennai)", "Feroz Shah Kotla (Delhi)", "Mirpur (Bangladesh)"],
    },
    {
      name: "Balanced / Good Cricket Pitch",
      description: "Fair contest between bat and ball",
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      characteristics: [
        "Something for everyone",
        "Early help for pacers",
        "Spin comes into play later",
        "Rewards good cricket",
      ],
      favoredPlayers: [
        {
          type: "All-Rounders",
          impact: "high",
          reason: "Can contribute with both bat and ball",
        },
        {
          type: "Quality Batsmen",
          impact: "high",
          reason: "Skill and technique rewarded",
        },
        {
          type: "Wicket-taking Bowlers",
          impact: "high",
          reason: "Opportunities available throughout",
        },
        {
          type: "All Player Types",
          impact: "medium",
          reason: "Balanced conditions suit all skills",
        },
      ],
      avgScore: "T20: 160-180 | ODI: 280-310",
      venues: ["MCG (Melbourne)", "The Oval (London)", "Mohali"],
    },
  ];

  const getImpactIcon = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "medium":
        return <Minus className="w-5 h-5 text-yellow-400" />;
      case "low":
        return <TrendingDown className="w-5 h-5 text-red-400" />;
    }
  };

  const getImpactColor = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-red-400";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Pitch Types & Player Selection Impact
      </h2>
      <p className="text-center text-gray-400 mb-12 text-lg">
        Understanding pitch conditions is crucial for optimal player selection
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {pitchTypes.map((pitch, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${pitch.gradient} p-6`}>
              <h3 className="text-2xl font-bold text-white mb-2">{pitch.name}</h3>
              <p className="text-white/90 text-sm">{pitch.description}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Characteristics */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">
                  Pitch Characteristics
                </h4>
                <div className="space-y-2">
                  {pitch.characteristics.map((char, charIdx) => (
                    <div
                      key={charIdx}
                      className="flex items-start gap-3 p-2 rounded-lg bg-white/5"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${pitch.color}-400 mt-2 flex-shrink-0`}></div>
                      <span className="text-gray-300 text-sm">{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favored Players */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">
                  Player Impact Analysis
                </h4>
                <div className="space-y-3">
                  {pitch.favoredPlayers.map((player, playerIdx) => (
                    <div
                      key={playerIdx}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-200">
                          {player.type}
                        </span>
                        <div className="flex items-center gap-2">
                          {getImpactIcon(player.impact)}
                          <span
                            className={`text-sm font-bold uppercase ${getImpactColor(player.impact)}`}
                          >
                            {player.impact}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">{player.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Average Scores */}
              <div className={`p-4 rounded-xl bg-gradient-to-r ${pitch.gradient} bg-opacity-20 border border-${pitch.color}-500/30`}>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  Average Scores
                </h4>
                <p className="text-lg font-bold text-gray-200">{pitch.avgScore}</p>
              </div>

              {/* Example Venues */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  Example Venues
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pitch.venues.map((venue, venueIdx) => (
                    <span
                      key={venueIdx}
                      className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300"
                    >
                      {venue}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
        <h4 className="text-xl font-bold text-purple-400 mb-4">
          💡 Pitch Analysis Pro Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Check weather reports</span> - Overcast
              conditions help swing bowlers even on flat pitches
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Day vs Night matters</span> - Dew in
              evening matches can nullify spin and help batting
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Pitch report timing</span> - Check
              official pitch reports 1-2 hours before match
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Recent match history</span> - Last 3-5
              matches at venue show pitch behavior trends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
