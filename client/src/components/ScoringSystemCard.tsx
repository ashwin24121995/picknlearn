import { Trophy, Target, Hand, Users } from "lucide-react";

interface ScoringRule {
  action: string;
  points: string;
  icon?: string;
}

interface ScoringSection {
  title: string;
  color: string;
  icon: React.ReactNode;
  rules: ScoringRule[];
}

export function ScoringSystemCard() {
  const sections: ScoringSection[] = [
    {
      title: "Batting Points",
      color: "from-blue-500 to-blue-600",
      icon: <Target className="w-8 h-8" />,
      rules: [
        { action: "Run", points: "+1 point" },
        { action: "Boundary (4)", points: "+1 bonus" },
        { action: "Over Boundary (6)", points: "+2 bonus" },
        { action: "Half Century (50 runs)", points: "+8 bonus" },
        { action: "Century (100 runs)", points: "+16 bonus" },
        { action: "Dismissal for Duck", points: "-2 points" },
      ],
    },
    {
      title: "Bowling Points",
      color: "from-red-500 to-red-600",
      icon: <Trophy className="w-8 h-8" />,
      rules: [
        { action: "Wicket", points: "+25 points" },
        { action: "Bonus (3 wickets)", points: "+4 points" },
        { action: "Bonus (4 wickets)", points: "+8 points" },
        { action: "Bonus (5 wickets)", points: "+16 points" },
        { action: "Maiden Over", points: "+12 points" },
        { action: "Economy Rate < 5", points: "+6 points" },
        { action: "Economy Rate 10-11", points: "-4 points" },
        { action: "Economy Rate > 11", points: "-6 points" },
      ],
    },
    {
      title: "Fielding Points",
      color: "from-green-500 to-green-600",
      icon: <Hand className="w-8 h-8" />,
      rules: [
        { action: "Catch", points: "+8 points" },
        { action: "Stumping", points: "+12 points" },
        { action: "Run Out (direct)", points: "+12 points" },
        { action: "Run Out (thrower)", points: "+6 points" },
      ],
    },
    {
      title: "Multipliers",
      color: "from-orange-500 to-orange-600",
      icon: <Users className="w-8 h-8" />,
      rules: [
        { action: "Captain", points: "2x points" },
        { action: "Vice-Captain", points: "1.5x points" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Fantasy Cricket Scoring System
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            {/* Header */}
            <div
              className={`bg-gradient-to-r ${section.color} p-6 flex items-center gap-4`}
            >
              <div className="text-white">{section.icon}</div>
              <h3 className="text-2xl font-bold text-white">{section.title}</h3>
            </div>

            {/* Rules */}
            <div className="p-6 space-y-3">
              {section.rules.map((rule, ruleIdx) => (
                <div
                  key={ruleIdx}
                  className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-200 font-medium">{rule.action}</span>
                  <span
                    className={`font-bold ${
                      rule.points.startsWith("+")
                        ? "text-green-400"
                        : rule.points.startsWith("-")
                        ? "text-red-400"
                        : "text-blue-400"
                    }`}
                  >
                    {rule.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
        <p className="text-center text-gray-200">
          <span className="font-bold text-purple-400">💡 Pro Tip:</span> Captain
          and Vice-Captain selections are crucial - they can double or multiply your
          points by 1.5x!
        </p>
      </div>
    </div>
  );
}
