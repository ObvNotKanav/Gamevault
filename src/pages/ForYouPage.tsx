import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  Bookmark,
  Clock,
  ChevronRight,
  Shield,
  RotateCcw,
  Check
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { gameService } from '../services/gameService';
import { Game, Genre, Platform } from '../types';
import { GameCard } from '../components/GameCard';

const ALL_GENRES: Genre[] = [
  'Action',
  'RPG',
  'Adventure',
  'Indie',
  'Strategy',
  'Shooter',
  'Puzzle',
  'Simulation',
  'Horror',
  'Roguelike',
  'Platformer'
];

const ALL_PLATFORMS: Platform[] = [
  'PC',
  'PlayStation 5',
  'Xbox Series X/S',
  'Nintendo Switch',
  'Steam Deck'
];

export const ForYouPage: React.FC = () => {
  const {
    library,
    quizResults,
    favoriteGenres,
    toggleFavoriteGenre,
    favoritePlatforms,
    toggleFavoritePlatform,
    recentlyViewedGames,
    navigateTo
  } = useGameVault();

  const [allGames, setAllGames] = useState<Game[]>([]);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      const res = await gameService.getGames();
      setAllGames(res.games);
    }
    fetchAll();
  }, []);

  // Compute recommendations based on Library genres + Favorite genres + Quiz results
  const recommendations = useMemo(() => {
    if (allGames.length === 0) return [];

    // Aggregate genres from library
    const libraryGenres: Record<string, number> = {};
    library.forEach(item => {
      item.game.genres.forEach(g => {
        libraryGenres[g] = (libraryGenres[g] || 0) + 1;
      });
    });

    const scored = allGames.map(game => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Library genre match
      const matchingLibraryGenres = game.genres.filter(g => libraryGenres[g]);
      if (matchingLibraryGenres.length > 0) {
        score += matchingLibraryGenres.length * 15;
        reasons.push(`Similar to games saved in your Vault Library (${matchingLibraryGenres.join(', ')})`);
      }

      // 2. Favorite genre match
      const matchingFavGenres = game.genres.filter(g => favoriteGenres.includes(g));
      if (matchingFavGenres.length > 0) {
        score += matchingFavGenres.length * 20;
        reasons.push(`Matches your preferred genre (${matchingFavGenres.join(', ')})`);
      }

      // 3. Platform match
      const matchingPlatform = game.platforms.some(p => favoritePlatforms.includes(p));
      if (matchingPlatform) {
        score += 15;
      }

      // 4. Quality boost
      score += Math.round(game.rating / 5);

      return {
        game,
        score,
        reason: reasons[0] || 'Matches your general discovery profile'
      };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [allGames, library, favoriteGenres, favoritePlatforms]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10b981] mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Personalized Feed</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Curated For You
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesized from your library tastes, recent interactions, and hardware specifications
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPreferencesOpen(!preferencesOpen)}
          className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 bg-[#131926] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-cyan-500/50 transition-colors self-start sm:self-auto"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
          <span>{preferencesOpen ? 'Close Taste Tuner' : 'Tune Preferences'}</span>
        </button>
      </div>

      {/* PREFERENCE TUNER DRAWER */}
      {preferencesOpen && (
        <div className="rounded-xl border border-cyan-500/30 bg-[#131926] p-6 space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="font-display text-base font-bold text-white mb-1">
              Refine Your Discovery Algorithm
            </h2>
            <p className="text-xs text-slate-400">
              Toggle your favorite genres and platforms to immediately calibrate the recommendation engine.
            </p>
          </div>

          {/* Genres */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
              Favorite Genres
            </span>
            <div className="flex flex-wrap gap-2">
              {ALL_GENRES.map(g => {
                const active = favoriteGenres.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleFavoriteGenre(g)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-[#10b981] text-[#0b0f17] border-[#10b981]'
                        : 'bg-[#1c2436] text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {active && <Check className="h-3 w-3 stroke-[3]" />}
                    <span>{g}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
              Hardware Platforms Owned
            </span>
            <div className="flex flex-wrap gap-2">
              {ALL_PLATFORMS.map(p => {
                const active = favoritePlatforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleFavoritePlatform(p)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-mono font-medium border transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-cyan-500 text-[#0b0f17] border-cyan-400 font-bold'
                        : 'bg-[#1c2436] text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {active && <Check className="h-3 w-3 stroke-[3]" />}
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ QUICK PROMPT (If quiz not completed yet) */}
      {(!quizResults || quizResults.length === 0) && (
        <div className="rounded-xl border border-slate-800 bg-[#131926] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white">Unlock Deep Recommendation Precision</h3>
              <p className="text-xs text-slate-400">Take the 2-minute Perfect Fit Quiz to unlock multidimensional compatibility matching</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('quiz')}
            className="rounded-sm bg-[#10b981] px-4 py-2 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-colors shrink-0"
          >
            Take Quiz Now
          </button>
        </div>
      )}

      {/* MAIN RECOMMENDATIONS GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Top Recommended Matches</h2>
            <p className="text-xs text-slate-400">Dynamically generated from your interaction vectors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendations.map(item => (
            <div key={item.game.id} className="relative flex flex-col group">
              <div className="mb-2 text-[11px] font-mono text-cyan-300 truncate bg-cyan-950/40 border border-cyan-900/60 rounded-xs px-2 py-0.5">
                💡 {item.reason}
              </div>
              <GameCard game={item.game} />
            </div>
          ))}
        </div>
      </section>

      {/* RECENTLY VIEWED ROW */}
      {recentlyViewedGames.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <h2 className="font-display text-lg font-bold text-white">Recently Inspected in Vault</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyViewedGames.map(game => (
              <button
                key={game.id}
                type="button"
                onClick={() => navigateTo('game-detail', game.id)}
                className="group text-left rounded-md border border-slate-800 bg-[#131926] p-2 hover:border-[#10b981]/50 transition-all"
              >
                <div className="aspect-16/10 w-full overflow-hidden rounded-xs bg-slate-900 mb-2">
                  <img src={game.coverImage} alt={game.title} referrerPolicy="no-referrer" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="font-display text-xs font-bold text-white truncate group-hover:text-[#10b981]">
                  {game.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">{game.releaseYear}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
