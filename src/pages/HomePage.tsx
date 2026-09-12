import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Search,
  ChevronRight,
  Bookmark,
  Gamepad2,
  SlidersHorizontal,
  Flame,
  Layers
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { gameService } from '../services/gameService';
import { Game, Genre, Platform } from '../types';
import { GameCard } from '../components/GameCard';
import { RatingBadge } from '../components/RatingBadge';
import { PlatformBadge } from '../components/PlatformBadge';

export const HomePage: React.FC = () => {
  const { navigateTo, addToLibrary, isInWishlist } = useGameVault();

  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [trendingGames, setTrendingGames] = useState<Game[]>([]);
  const [highRatedGames, setHighRatedGames] = useState<Game[]>([]);
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [hiddenGems, setHiddenGems] = useState<Game[]>([]);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [heroSearchInput, setHeroSearchInput] = useState('');

  useEffect(() => {
    async function loadData() {
      const [feat, trend, rated, recent, gems] = await Promise.all([
        gameService.getFeaturedGames(),
        gameService.getTrendingGames(),
        gameService.getHighlyRatedGames(4),
        gameService.getRecentlyReleased(),
        gameService.getHiddenGems()
      ]);
      setFeaturedGames(feat);
      setTrendingGames(trend);
      setHighRatedGames(rated);
      setRecentGames(recent);
      setHiddenGems(gems);
    }
    loadData();
  }, []);

  // Automatic hero slider cycle (optional, slow)
  useEffect(() => {
    if (featuredGames.length <= 1) return;
    const interval = setInterval(() => {
      setActiveHeroIndex(prev => (prev + 1) % featuredGames.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredGames.length]);

  const activeHeroGame = featuredGames[activeHeroIndex] || featuredGames[0];

  const genresList: { name: Genre; iconEmoji: string; description: string }[] = [
    { name: 'RPG', iconEmoji: '⚔️', description: 'Epic tales & character progression' },
    { name: 'Action', iconEmoji: '💥', description: 'Fast reflex combat & adrenaline' },
    { name: 'Roguelike', iconEmoji: '🃏', description: 'Infinitely replayable procedural runs' },
    { name: 'Adventure', iconEmoji: '🧭', description: 'Vast mysteries & uncharted worlds' },
    { name: 'Strategy', iconEmoji: '♟️', description: 'Tactical thinking & calculated mastery' },
    { name: 'Simulation', iconEmoji: '🌾', description: 'Cozy living, farming & managing' },
    { name: 'Shooter', iconEmoji: '🎯', description: 'Precision gunplay & co-op squads' },
    { name: 'Indie', iconEmoji: '✨', description: 'Creative auteur visions & gems' }
  ];

  const platformsList: { name: Platform; label: string; tag: string }[] = [
    { name: 'PC', label: 'PC Windows / Steam', tag: 'High-Fidelity' },
    { name: 'PlayStation 5', label: 'PlayStation 5', tag: 'DualSense Immersion' },
    { name: 'Xbox Series X/S', label: 'Xbox Series X/S', tag: 'Game Pass Power' },
    { name: 'Nintendo Switch', label: 'Nintendo Switch', tag: 'Hybrid Freedom' },
    { name: 'Steam Deck', label: 'Steam Deck', tag: 'Handheld PC' }
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      navigateTo('explore');
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#10b981]/10 px-3 py-1 text-xs font-mono text-[#34d399] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Generation Game Discovery</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Find Your Next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#10b981] to-cyan-400">
                  Favorite Game.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Stop doom-scrolling through infinite storefronts. GameVault filters through thousands of games based on your available time, platform, narrative appetite, and difficulty taste.
              </p>

              {/* Quick Hero Search Input */}
              <form onSubmit={handleHeroSearch} className="max-w-md">
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={e => setHeroSearchInput(e.target.value)}
                    placeholder="Search by title, genre, studio..."
                    className="w-full rounded-md border border-slate-700 bg-[#131926]/90 pl-10 pr-24 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#10b981] focus:outline-hidden focus:ring-1 focus:ring-[#10b981]/50 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-sm bg-[#10b981] px-3.5 py-1.5 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('quiz')}
                  className="inline-flex items-center gap-2 rounded-md bg-[#10b981] px-5 py-3 text-sm font-bold text-[#0b0f17] hover:bg-[#34d399] shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Find My Perfect Game</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('explore')}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-[#1c2436] px-5 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-400/60 hover:text-white transition-all cursor-pointer"
                >
                  <Compass className="h-4 w-4 text-cyan-400" />
                  <span>Explore Vault</span>
                </button>
              </div>

              {/* Live Metric Pills */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
                <div>
                  <span className="font-bold text-slate-200">100%</span> Verified Telemetry
                </div>
                <div>•</div>
                <div>
                  <span className="font-bold text-[#10b981]">0</span> Fake Price Data
                </div>
                <div>•</div>
                <div>
                  <span className="font-bold text-cyan-400">7-Step</span> Smart Quiz
                </div>
              </div>
            </div>

            {/* Right Hero: Featured Spotlight Showcase */}
            {activeHeroGame && (
              <div className="lg:col-span-6">
                <div className="relative group overflow-hidden rounded-xl border border-slate-700/80 bg-[#131926] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  {/* Backdrop art */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                    <img
                      src={activeHeroGame.heroImage || activeHeroGame.coverImage}
                      alt={activeHeroGame.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-[#131926]/40 to-transparent" />

                    {/* Top tags */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="rounded-sm bg-[#10b981] px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#0b0f17]">
                        Spotlight Title
                      </span>
                      <RatingBadge rating={activeHeroGame.rating} size="md" showLabel />
                    </div>

                    <div className="absolute top-4 right-4">
                      <button
                        type="button"
                        onClick={() => addToLibrary(activeHeroGame, 'want_to_play')}
                        className={`p-2 rounded-sm backdrop-blur-md border ${
                          isInWishlist(activeHeroGame.id)
                            ? 'bg-[#10b981] text-[#0b0f17] border-[#10b981]'
                            : 'bg-black/60 border-slate-700 text-slate-200 hover:text-white'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Spotlight details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                      <span>{activeHeroGame.developer}</span>
                      <span className="text-emerald-400 font-bold">{activeHeroGame.priceFormatted}</span>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-white group-hover:text-[#10b981] transition-colors">
                      {activeHeroGame.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {activeHeroGame.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                      <div className="flex flex-wrap gap-1.5">
                        {activeHeroGame.platforms.slice(0, 4).map(p => (
                          <PlatformBadge key={p} platform={p} compact />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo('game-detail', activeHeroGame.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#10b981] hover:text-[#34d399] transition-colors"
                      >
                        <span>View Dossier & Store Links</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Spotlight mini selector pips */}
                  {featuredGames.length > 1 && (
                    <div className="flex items-center justify-center gap-2 pb-4">
                      {featuredGames.map((g, idx) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setActiveHeroIndex(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === activeHeroIndex ? 'w-8 bg-[#10b981]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                          }`}
                          aria-label={`Slide to ${g.title}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. TRENDING NOW SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white tracking-tight">Trending in the Community</h2>
              <p className="text-xs text-slate-400">Games capturing widespread attention and rapid discussions right now</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('explore')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>See All</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingGames.slice(0, 4).map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* 3. THE PERFECT FIT QUIZ CALLOUT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl border border-[#10b981]/40 bg-gradient-to-r from-[#131926] via-[#1a2335] to-[#0f172a] p-8 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-sm bg-[#10b981]/20 px-2.5 py-1 text-xs font-mono font-semibold text-[#34d399] border border-[#10b981]/40">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Smart Recommendation Engine</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Unsure what to boot up tonight?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Answer 7 simple questions about your mood, session duration, preferred difficulty, and platform. Our transparent scoring engine analyzes compatibility to present your highest match.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo('quiz')}
                className="inline-flex items-center gap-2 rounded-md bg-[#10b981] px-6 py-3 text-sm font-bold text-[#0b0f17] hover:bg-[#34d399] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Sparkles className="h-4 w-4" />
                <span>Start The 2-Minute Quiz</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                100% transparent scoring breakdown included
              </span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 hidden lg:flex items-center pr-12 opacity-15 pointer-events-none">
            <Gamepad2 className="h-72 w-72 text-[#10b981]" />
          </div>
        </div>
      </section>

      {/* 4. HIGHLY RATED TITLES (METASCORE 90+) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-sm bg-emerald-500/10 border border-[#10b981]/30 text-[#10b981]">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white tracking-tight">Critical Acclaim: Metascore 90+</h2>
              <p className="text-xs text-slate-400">Masterpieces verified by industry critics and thousands of player reviews</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('explore')}
            className="text-xs font-semibold text-[#10b981] hover:text-[#34d399] flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highRatedGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* 5. HIDDEN GEMS RADAR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-cyan-500/30 bg-[#101726]/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-cyan-950/80 border border-cyan-500/50 text-cyan-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Hidden Gems Radar
                </h2>
                <p className="text-xs text-slate-400">
                  Exceptional titles that flew under mainstream marketing radars despite stellar player praise
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('explore')}
              className="inline-flex items-center gap-1.5 rounded-sm border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60"
            >
              Filter Only Hidden Gems
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hiddenGems.slice(0, 3).map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BROWSE BY GENRE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-white tracking-tight">Browse by Genre</h2>
          <p className="text-xs text-slate-400">Curated libraries tuned to specific gameplay loops and thematic worlds</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {genresList.map(g => (
            <button
              key={g.name}
              type="button"
              onClick={() => navigateTo('explore')}
              className="group p-4 rounded-md border border-slate-800 bg-[#131926] hover:border-[#10b981]/50 hover:bg-[#1c2436] transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-2">{g.iconEmoji}</div>
                <h3 className="font-display text-sm font-bold text-white group-hover:text-[#10b981] transition-colors">
                  {g.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{g.description}</p>
              </div>
              <span className="mt-3 text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 flex items-center gap-0.5">
                Explore →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 7. BROWSE BY PLATFORM */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-white tracking-tight">Browse by Platform Ecosystem</h2>
          <p className="text-xs text-slate-400">Tailored compatibility tested for your hardware specs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {platformsList.map(p => (
            <button
              key={p.name}
              type="button"
              onClick={() => navigateTo('explore')}
              className="p-4 rounded-md border border-slate-800 bg-[#131926] hover:border-cyan-500/50 hover:bg-[#1c2436] transition-all text-left group"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">{p.tag}</span>
              <h3 className="font-display text-sm font-bold text-white mt-1 group-hover:text-cyan-300">
                {p.label}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 mt-2">Filter Catalog →</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
