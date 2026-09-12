import React, { useState, useEffect } from 'react';
import {
  Scale,
  X,
  Plus,
  Compass,
  Check,
  Clock,
  BookOpen,
  Zap,
  Users,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { gameService } from '../services/gameService';
import { Game } from '../types';
import { RatingBadge } from '../components/RatingBadge';
import { PlatformBadge } from '../components/PlatformBadge';

export const ComparePage: React.FC = () => {
  const { comparisonGames, removeFromComparison, clearComparison, addToComparison, navigateTo } = useGameVault();

  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    async function fetchAll() {
      const res = await gameService.getGames();
      setAvailableGames(res.games);
    }
    fetchAll();
  }, []);

  const filteredForAdd = availableGames.filter(
    g =>
      !comparisonGames.some(c => c.id === g.id) &&
      (g.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        g.genres.some(gen => gen.toLowerCase().includes(searchVal.toLowerCase())))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
            <Scale className="h-3.5 w-3.5" />
            <span>Side-by-Side Analysis Lab</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Game Comparison
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directly benchmark playtime commitment, difficulty, narrative depth, and platform viability
          </p>
        </div>

        {comparisonGames.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearComparison}
              className="rounded-sm border border-slate-700 bg-[#131926] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Clear All ({comparisonGames.length})
            </button>
            {comparisonGames.length < 4 && (
              <button
                type="button"
                onClick={() => setSelectorOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-sm bg-cyan-500 px-3.5 py-1.5 text-xs font-bold text-[#0b0f17] hover:bg-cyan-400"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Game ({comparisonGames.length}/4)</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* QUICK SELECTOR MODAL */}
      {selectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-lg border border-slate-700 bg-[#131926] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white">Add Game to Comparison</h3>
              <button
                type="button"
                onClick={() => setSelectorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search games to add..."
                className="w-full rounded-sm border border-slate-700 bg-[#1c2436] pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-hidden"
              />
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {filteredForAdd.map(game => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => {
                    addToComparison(game);
                    if (comparisonGames.length + 1 >= 4) {
                      setSelectorOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-sm border border-slate-800 bg-[#1c2436] hover:border-cyan-500/50 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={game.coverImage} alt={game.title} referrerPolicy="no-referrer" className="h-10 w-10 rounded-xs object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{game.title}</h4>
                      <p className="text-[10px] text-slate-400">{game.genres.slice(0, 2).join(', ')}</p>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-cyan-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON CONTENT */}
      {comparisonGames.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#131926] p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-cyan-400">
            <Scale className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">Comparison Tray Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Select 2 to 4 games to evaluate specs side-by-side, analyze playthrough length commitments, and compare review consensus.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('explore')}
              className="inline-flex items-center gap-1.5 rounded-sm bg-cyan-500 px-4 py-2 text-xs font-bold text-[#0b0f17] hover:bg-cyan-400"
            >
              <Compass className="h-3.5 w-3.5" />
              Browse Games to Compare
            </button>
            <button
              type="button"
              onClick={() => setSelectorOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 bg-[#1c2436] px-4 py-2 text-xs font-semibold text-slate-200"
            >
              <Plus className="h-3.5 w-3.5" />
              Quick Select
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div
            className="grid gap-4 min-w-[700px]"
            style={{
              gridTemplateColumns: `repeat(${comparisonGames.length + (comparisonGames.length < 4 ? 1 : 0)}, minmax(240px, 1fr))`
            }}
          >
            {comparisonGames.map(game => (
              <div
                key={game.id}
                className="rounded-xl border border-slate-800 bg-[#131926] p-5 space-y-6 flex flex-col justify-between"
              >
                {/* Header info & remove button */}
                <div className="space-y-4">
                  <div className="relative aspect-16/10 rounded-md overflow-hidden bg-slate-950 border border-slate-700">
                    <img src={game.coverImage} alt={game.title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFromComparison(game.id)}
                      className="absolute top-2 right-2 p-1 rounded-sm bg-black/80 text-slate-300 hover:text-rose-400"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      <RatingBadge rating={game.rating} size="sm" />
                    </div>
                  </div>

                  <div>
                    <h3
                      onClick={() => navigateTo('game-detail', game.id)}
                      className="font-display text-lg font-bold text-white hover:text-[#10b981] transition-colors cursor-pointer"
                    >
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {game.developer} • {game.releaseYear}
                    </p>
                  </div>

                  {/* Benchmark specs */}
                  <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                    {/* Metascore */}
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400 font-mono">Metascore</span>
                      <span className="font-display font-bold text-[#10b981]">{game.rating}/100</span>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400 font-mono">Retail Price</span>
                      <span className="font-mono text-emerald-400 font-bold">{game.priceFormatted}</span>
                    </div>

                    {/* Est Playtime */}
                    <div className="py-1">
                      <div className="flex justify-between items-center text-slate-400 font-mono mb-1">
                        <span>Playtime Commitment</span>
                      </div>
                      <div className="rounded-sm bg-[#1c2436] p-2 flex justify-between font-mono">
                        <div>
                          <div className="text-[10px] text-slate-500">Story</div>
                          <div className="text-white font-bold">{game.playtimeHours.mainStory} hrs</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500">100% Run</div>
                          <div className="text-slate-300">{game.playtimeHours.completionist} hrs</div>
                        </div>
                      </div>
                    </div>

                    {/* Difficulty */}
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400 font-mono">Difficulty Curve</span>
                      <span className="font-semibold text-white">{game.difficulty}</span>
                    </div>

                    {/* Narrative Depth */}
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400 font-mono">Story Importance</span>
                      <span className="font-mono text-cyan-400 font-bold">
                        {game.narrativeDepth}/5 ({game.narrativeDepth >= 4 ? 'High' : 'Balanced'})
                      </span>
                    </div>

                    {/* Game Modes */}
                    <div className="py-1">
                      <span className="text-slate-400 font-mono block mb-1">Game Modes</span>
                      <span className="font-semibold text-slate-200">{game.gameModes.join(', ')}</span>
                    </div>

                    {/* Hardware Platforms */}
                    <div className="py-1">
                      <span className="text-slate-400 font-mono block mb-1.5">Hardware Compatibility</span>
                      <div className="flex flex-wrap gap-1">
                        {game.platforms.map(p => (
                          <PlatformBadge key={p} platform={p} compact />
                        ))}
                      </div>
                    </div>

                    {/* Standout Highlights */}
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400 font-mono block mb-1.5">Standout Highlights</span>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {game.whyYouMightLike.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-[#10b981] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <button
                  type="button"
                  onClick={() => navigateTo('game-detail', game.id)}
                  className="w-full mt-4 rounded-sm bg-[#1c2436] py-2 text-xs font-bold text-[#10b981] hover:bg-slate-800 border border-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Inspect Full Dossier</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {/* Add placeholder card if < 4 */}
            {comparisonGames.length < 4 && (
              <button
                type="button"
                onClick={() => setSelectorOpen(true)}
                className="rounded-xl border-2 border-dashed border-slate-800 bg-[#131926]/40 p-8 flex flex-col items-center justify-center text-center gap-3 hover:border-cyan-500/50 hover:bg-[#131926]/70 transition-all text-slate-400 hover:text-white group"
              >
                <div className="p-3 rounded-full bg-[#1c2436] border border-slate-700 group-hover:border-cyan-400">
                  <Plus className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-200">Add Another Game</h4>
                  <p className="text-xs text-slate-500 mt-1">Benchmark up to 4 titles simultaneously</p>
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
