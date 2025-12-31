import { Swords, Target, Zap, Shield } from "lucide-react";

interface PlayerRole {
  title: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  characteristics: string[];
  keyPoint: string;
}

export function PlayerRolesGrid() {
  const roles: PlayerRole[] = [
    {
      title: "Batsman",
      icon: <Target className="w-12 h-12" />,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      characteristics: [
        "Scores runs consistently",
        "Gets points for boundaries",
        "Bonus for 50s and 100s",
        "Key for consistent points",
      ],
      keyPoint: "Foundation of your team - choose in-form batsmen",
    },
    {
      title: "Bowler",
      icon: <Zap className="w-12 h-12" />,
      color: "red",
      gradient: "from-red-500 to-red-600",
      characteristics: [
        "Takes wickets for big points",
        "Points for maiden overs",
        "Economy rate matters",
        "Bonus for 3/4/5 wickets",
      ],
      keyPoint: "Wicket-takers can win you contests with big hauls",
    },
    {
      title: "All-Rounder",
      icon: <Swords className="w-12 h-12" />,
      color: "green",
      gradient: "from-green-500 to-green-600",
      characteristics: [
        "Dual threat player",
        "Points from batting & bowling",
        "Most valuable picks",
        "Higher price range",
      ],
      keyPoint: "Premium picks - provide safety with multiple scoring avenues",
    },
    {
      title: "Wicket-Keeper",
      icon: <Shield className="w-12 h-12" />,
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      characteristics: [
        "Batting points",
        "Catches and stumpings",
        "Extra value addition",
        "Limited slots (1-2 max)",
      ],
      keyPoint: "Choose keeper-batsmen who bat in top order",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Fantasy Cricket Player Roles
      </h2>
      <p className="text-center text-gray-400 mb-12 text-lg">
        Understanding each role is crucial for building a balanced winning team
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map((role, idx) => (
          <div
            key={idx}
            className="group relative glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            {/* Animated gradient border */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            ></div>

            {/* Icon header */}
            <div
              className={`bg-gradient-to-r ${role.gradient} p-8 flex flex-col items-center justify-center relative`}
            >
              <div className="text-white mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {role.icon}
              </div>
              <h3 className="text-3xl font-bold text-white">{role.title}</h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Characteristics */}
              <div className="space-y-3">
                {role.characteristics.map((char, charIdx) => (
                  <div
                    key={charIdx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-${role.color}-400 mt-2 flex-shrink-0`}
                    ></div>
                    <span className="text-gray-200">{char}</span>
                  </div>
                ))}
              </div>

              {/* Key Point */}
              <div
                className={`mt-6 p-4 rounded-xl bg-gradient-to-r ${role.gradient} bg-opacity-20 border border-${role.color}-500/30`}
              >
                <p className="text-sm font-semibold text-gray-200">
                  <span className={`text-${role.color}-400`}>💡 Key Insight:</span>{" "}
                  {role.keyPoint}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
        <h4 className="text-xl font-bold text-purple-400 mb-3">
          Optimal Team Composition
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400">3-5</div>
            <div className="text-gray-400 text-sm">Batsmen</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">3-5</div>
            <div className="text-gray-400 text-sm">Bowlers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">1-3</div>
            <div className="text-gray-400 text-sm">All-Rounders</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-400">1-2</div>
            <div className="text-gray-400 text-sm">Wicket-Keepers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
