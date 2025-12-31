import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";

interface BudgetStrategy {
  name: string;
  description: string;
  allocation: {
    premium: number;
    mid: number;
    budget: number;
  };
  pros: string[];
  cons: string[];
  bestFor: string;
}

export function BudgetAllocationChart() {
  const strategies: BudgetStrategy[] = [
    {
      name: "Balanced Approach",
      description: "Mix of premium, mid-range, and budget players",
      allocation: { premium: 40, mid: 40, budget: 20 },
      pros: [
        "Lower risk strategy",
        "Good floor and ceiling",
        "Flexible for changes",
      ],
      cons: ["May lack differentials", "Average ownership"],
      bestFor: "Beginners and H2H contests",
    },
    {
      name: "Top-Heavy",
      description: "Load up on premium players",
      allocation: { premium: 60, mid: 25, budget: 15 },
      pros: [
        "High ceiling potential",
        "Star players deliver",
        "Safer captain choices",
      ],
      cons: ["Limited flexibility", "Risky if stars fail"],
      bestFor: "Small contests and cash games",
    },
    {
      name: "Value Hunting",
      description: "Focus on underpriced gems",
      allocation: { premium: 25, mid: 45, budget: 30 },
      pros: [
        "Low ownership plays",
        "High differential",
        "Room for pivots",
      ],
      cons: ["Higher variance", "Research intensive"],
      bestFor: "GPP and large tournaments",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
        Budget Allocation Strategies
      </h2>
      <p className="text-center text-gray-400 mb-8 text-lg">
        How to distribute your 100 credits across 11 players
      </p>

      {/* Budget Basics */}
      <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
        <div className="flex items-start gap-4">
          <DollarSign className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-2">
              Understanding Player Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  10.5 - 12.0
                </div>
                <div className="text-gray-300 font-semibold">Premium Players</div>
                <div className="text-sm text-gray-400 mt-2">
                  Top performers, consistent scorers, match-winners
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  8.5 - 10.0
                </div>
                <div className="text-gray-300 font-semibold">Mid-Range Players</div>
                <div className="text-sm text-gray-400 mt-2">
                  Solid contributors, good value picks
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  7.0 - 8.0
                </div>
                <div className="text-gray-300 font-semibold">Budget Players</div>
                <div className="text-sm text-gray-400 mt-2">
                  Role players, differential picks, enablers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {strategies.map((strategy, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {strategy.name}
              </h3>
              <p className="text-green-100 text-sm">{strategy.description}</p>
            </div>

            {/* Allocation Visual */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Credit Distribution</span>
                  <span>100 Credits</span>
                </div>
                <div className="h-8 rounded-full overflow-hidden flex">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${strategy.allocation.premium}%` }}
                  >
                    {strategy.allocation.premium}%
                  </div>
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${strategy.allocation.mid}%` }}
                  >
                    {strategy.allocation.mid}%
                  </div>
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${strategy.allocation.budget}%` }}
                  >
                    {strategy.allocation.budget}%
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Premium</span>
                  <span>Mid-Range</span>
                  <span>Budget</span>
                </div>
              </div>

              {/* Pros */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="font-semibold text-green-400">Pros</span>
                </div>
                <ul className="space-y-1">
                  {strategy.pros.map((pro, proIdx) => (
                    <li key={proIdx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="font-semibold text-red-400">Cons</span>
                </div>
                <ul className="space-y-1">
                  {strategy.cons.map((con, conIdx) => (
                    <li key={conIdx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <div className="text-xs font-semibold text-purple-400 mb-1">
                  BEST FOR
                </div>
                <div className="text-sm text-gray-200">{strategy.bestFor}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tips */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
        <h4 className="text-xl font-bold text-purple-400 mb-4">💡 Pro Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Save 0.5-1.0 credits</span> for last-minute
              changes before deadline
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Don't force expensive players</span> if
              they're out of form or conditions don't suit
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Budget players can be gold</span> - look
              for batting all-rounders priced as bowlers
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
            <p className="text-gray-200">
              <span className="font-semibold">Adjust by contest type</span> - GPPs need
              more differentials than H2H
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
