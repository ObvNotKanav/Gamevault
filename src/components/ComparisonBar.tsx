import React from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';

export const ComparisonBar: React.FC = () => {
  const { comparisonGames, removeFromComparison, clearComparison, navigateTo, route } = useGameVault();

  if (comparisonGames.length === 0 || route === 'compare') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border border-cyan-500/40 bg-[#131926]/95 p-3 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto py-1">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-semibold shrink-0 pl-1">
            <Scale className="h-4 w-4" />
            <span>Comparing ({comparisonGames.length}/4):</span>
          </div>

          <div className="flex items-center gap-2">
            {comparisonGames.map(game => (
              <div
                key={game.id}
                className="relative group flex items-center gap-2 rounded-sm bg-[#1c2436] px-2 py-1 border border-slate-700 text-xs shrink-0"
              >
                <img src={game.coverImage} alt={game.title} className="h-6 w-6 rounded-xs object-cover" />
                <span className="max-w-28 truncate text-slate-200 font-medium">{game.title}</span>
                <button
                  type="button"
                  onClick={() => removeFromComparison(game.id)}
                  className="text-slate-400 hover:text-rose-400 ml-1"
                  title="Remove from comparison"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={clearComparison}
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => navigateTo('compare')}
            className="inline-flex items-center gap-1.5 rounded-sm bg-cyan-500 px-3.5 py-1.5 text-xs font-bold text-[#0b0f17] hover:bg-cyan-400 transition-colors shadow-sm"
          >
            <span>Compare Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
