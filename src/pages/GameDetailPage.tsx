import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Scale,
  Sparkles,
  ExternalLink,
  Clock,
  BookOpen,
  Zap,
  Users,
  Check,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { gameService } from '../services/gameService';
import { Game, LibraryStatus } from '../types';
import { RatingBadge } from '../components/RatingBadge';
import { PlatformBadge } from '../components/PlatformBadge';
import { GameCard } from '../components/GameCard';

export const GameDetailPage: React.FC = () => {
  const {
    activeGameId,
    navigateTo,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    addToLibrary,
    updateLibraryStatus,
    getLibraryItem,
    isInWishlist,
    toggleComparison,
    isInComparison,
    trackViewedGame
  } = useGameVault();

  const [game, setGame] = useState<Game | null>(null);
  const [similarGames, setSimilarGames] = useState<Game[]>([]);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGame() {
      if (!activeGameId) return;
      setLoading(true);
      try {
        const found = await gameService.getGameById(activeGameId);
        if (found) {
          setGame(found);
          trackViewedGame(found);
          const similar = await gameService.getSimilarGames(found, 4);
          setSimilarGames(similar);
          setActiveScreenshot(found.screenshots[0] || found.coverImage);
        }
      } finally {
        setLoading(false);
      }
    }
    loadGame();
  }, [activeGameId]);

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#10b981] border-t-transparent mb-3" />
        <p className="text-xs font-mono text-slate-400">Accessing secure game vault archives...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-white">Title Not Found</h2>
        <p className="text-xs text-slate-400">The requested game file could not be located in the vault database.</p>
        <button
          type="button"
          onClick={() => navigateTo('explore')}
          className="inline-flex items-center gap-2 rounded-sm bg-[#10b981] px-4 py-2 text-xs font-bold text-[#0b0f17]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>
      </div>
    );
  }

  const libraryItem = getLibraryItem(game.id);
  const inComparison = isInComparison(game.id);

  const handleStatusChange = (status: LibraryStatus) => {
    if (libraryItem) {
      updateLibraryStatus(game.id, status);
    } else {
      addToLibrary(game, status);
    }
  };

  return (
    <div className="pb-16 space-y-12">
      {/* 1. HERO BACKDROP */}
      <div className="relative w-full h-[380px] sm:h-[480px] overflow-hidden bg-slate-950">
        <img
          src={game.heroImage || game.coverImage}
          alt={game.title}
          className="h-full w-full object-cover object-top filter brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/70 to-black/50" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            type="button"
            onClick={() => navigateTo('explore')}
            className="inline-flex items-center gap-2 rounded-sm bg-black/70 backdrop-blur-md border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Catalog</span>
          </button>
        </div>

        {/* Bottom Hero Anchor Info */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              {game.isHiddenGem && (
                <span className="inline-flex items-center gap-1 rounded-sm bg-cyan-950/90 backdrop-blur-md px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider text-cyan-300 border border-cyan-500/60 shadow-lg">
                  <Sparkles className="h-3.5 w-3.5" />
                  Hidden Gem
                </span>
              )}
              <span className="text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                Released {game.releaseDate}
              </span>
              <span className="text-xs text-slate-400 font-mono">•</span>
              <span className="text-xs text-slate-300">{game.developer}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              {game.title}
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
              {game.tagline}
            </p>

            {/* Quick Hero Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => toggleWishlist(game)}
                className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-bold transition-all shadow-md ${
                  isInWishlist(game.id)
                    ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-900/40'
                    : 'bg-[#131926]/90 border border-slate-700 text-slate-200 hover:text-white hover:border-rose-500/70'
                }`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(game.id) ? 'fill-current' : 'text-rose-400'}`} />
                <span>{isInWishlist(game.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleComparison(game)}
                className={`inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  isInComparison(game.id)
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300'
                    : 'bg-[#131926]/90 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Scale className="h-3.5 w-3.5" />
                <span>{isInComparison(game.id) ? 'In Comparison' : 'Compare Game'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE CONTENT GRID */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Synopsis, Screenshots, and "Why You Might Like This Game" */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Synopsis */}
            <div className="rounded-xl border border-slate-800 bg-[#131926] p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span>Vault Dossier & Synopsis</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">{game.description}</p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {game.tags.map(t => (
                  <span
                    key={t}
                    className="rounded-sm bg-[#1c2436] px-2.5 py-1 text-xs font-mono text-slate-300 border border-slate-700/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* "WHY YOU MIGHT LIKE THIS GAME" (Explicit prompt requirement) */}
            <div className="rounded-xl border border-[#10b981]/40 bg-gradient-to-br from-[#101926] to-[#131d2e] p-6 sm:p-7 shadow-lg space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="p-2 rounded-sm bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white tracking-tight">
                    Why You Might Like This Game
                  </h2>
                  <p className="text-xs text-slate-400">
                    Transparent gameplay mechanics and playstyle compatibility telemetry
                  </p>
                </div>
              </div>

              <div className="rounded-md bg-[#0b0f17]/70 p-4 border border-slate-800/80">
                <p className="text-sm text-emerald-300 font-medium leading-relaxed">
                  "{game.whyYouMightLike.gameplaySummary}"
                </p>
              </div>

              {/* Core Telemetry Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Playtime */}
                <div className="rounded-md border border-slate-800 bg-[#131926] p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Est. Playtime</span>
                  </div>
                  <p className="font-display text-base font-bold text-white">
                    {game.playtimeHours.mainStory}h <span className="text-xs text-slate-400 font-normal">Story</span>
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">{game.playtimeHours.completionist}h Completionist</p>
                </div>

                {/* 2. Narrative Depth */}
                <div className="rounded-md border border-slate-800 bg-[#131926] p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                    <BookOpen className="h-3.5 w-3.5 text-[#10b981]" />
                    <span>Story Focus</span>
                  </div>
                  <div className="flex items-center gap-1 my-1">
                    {[1, 2, 3, 4, 5].map(step => (
                      <span
                        key={step}
                        className={`h-2 w-3 rounded-xs ${
                          step <= game.narrativeDepth ? 'bg-[#10b981]' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {game.narrativeDepth >= 4 ? 'Deep Narrative' : game.narrativeDepth === 3 ? 'Balanced Story' : 'Gameplay-Driven'}
                  </p>
                </div>

                {/* 3. Difficulty */}
                <div className="rounded-md border border-slate-800 bg-[#131926] p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span>Difficulty</span>
                  </div>
                  <p className="font-display text-base font-bold text-white">
                    {game.difficulty}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">Challenge Curve</p>
                </div>

                {/* 4. Modes */}
                <div className="rounded-md border border-slate-800 bg-[#131926] p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                    <Users className="h-3.5 w-3.5 text-purple-400" />
                    <span>Game Modes</span>
                  </div>
                  <p className="text-xs font-semibold text-white">
                    {game.gameModes.join(', ')}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">Verified Match</p>
                </div>
              </div>

              {/* Highlights & Ideal For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    Standout Features
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {game.whyYouMightLike.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    Ideal Player Match
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {game.whyYouMightLike.idealFor.map((target, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Screenshots Gallery */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-[#131926] p-6 space-y-4">
                <h2 className="font-display text-lg font-bold text-white">Verified Capture Gallery</h2>

                <div className="aspect-16/9 w-full overflow-hidden rounded-md border border-slate-700 bg-slate-950">
                  <img
                    src={activeScreenshot || game.screenshots[0]}
                    alt="Gameplay screenshot"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {game.screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveScreenshot(s)}
                      className={`relative aspect-16/10 overflow-hidden rounded-sm border transition-all ${
                        activeScreenshot === s
                          ? 'border-[#10b981] ring-2 ring-[#10b981]/30'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={s} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: Action Card, Official Stores, Specifications */}
          <div className="lg:col-span-4 space-y-6">
            {/* Library / Wishlist Status Card */}
            <div className="rounded-xl border border-slate-700 bg-[#131926] p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Standard Price
                  </span>
                  <p className="font-display text-2xl font-bold text-white">
                    {game.priceFormatted}
                  </p>
                </div>
                <RatingBadge rating={game.rating} size="lg" showLabel />
              </div>

              {/* Wishlist Direct Toggle Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(game)}
                className={`w-full py-2.5 px-4 rounded-sm border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isInWishlist(game.id)
                    ? 'bg-rose-950/90 border-rose-500 text-rose-300 hover:bg-rose-900/60 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'bg-[#1c2436] border-slate-700 text-slate-200 hover:text-white hover:border-rose-500/60'
                }`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(game.id) ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
                <span>{isInWishlist(game.id) ? 'Saved in Personal Wishlist (Click to Remove)' : 'Add to Personal Wishlist'}</span>
              </button>

              {/* Status Select Buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Vault Collection Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange('want_to_play')}
                    className={`py-2 px-3 rounded-sm border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      libraryItem?.status === 'want_to_play'
                        ? 'bg-[#10b981] text-[#0b0f17] border-[#10b981] font-bold shadow-md'
                        : 'bg-[#1c2436] border-slate-700 text-slate-200 hover:border-slate-500'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    <span>Want to Play</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange('playing')}
                    className={`py-2 px-3 rounded-sm border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      libraryItem?.status === 'playing'
                        ? 'bg-cyan-500 text-[#0b0f17] border-cyan-500 font-bold shadow-md'
                        : 'bg-[#1c2436] border-slate-700 text-slate-200 hover:border-slate-500'
                    }`}
                  >
                    <span>Playing Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange('completed')}
                    className={`py-2 px-3 rounded-sm border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      libraryItem?.status === 'completed'
                        ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                        : 'bg-[#1c2436] border-slate-700 text-slate-200 hover:border-slate-500'
                    }`}
                  >
                    <span>Completed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange('paused')}
                    className={`py-2 px-3 rounded-sm border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      libraryItem?.status === 'paused'
                        ? 'bg-amber-600 text-white border-amber-500 font-bold'
                        : 'bg-[#1c2436] border-slate-700 text-slate-200 hover:border-slate-500'
                    }`}
                  >
                    <span>Paused / Backlog</span>
                  </button>
                </div>
              </div>

              {/* Compare toggle button */}
              <button
                type="button"
                onClick={() => toggleComparison(game)}
                className={`w-full py-2 px-3 rounded-sm border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  inComparison
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                    : 'bg-[#1c2436] border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Scale className="h-4 w-4" />
                <span>{inComparison ? 'In Comparison List (Click to remove)' : 'Add to Comparison'}</span>
              </button>
            </div>

            {/* Official Store Links (Legitimate verified links) */}
            <div className="rounded-xl border border-slate-800 bg-[#131926] p-6 space-y-4">
              <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#10b981]" />
                <span>Verified Official Storefronts</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct authorized digital purchase channels for legal acquisition.
              </p>

              <div className="space-y-2 pt-1">
                {game.stores.map((store, i) => (
                  <a
                    key={i}
                    href={store.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-sm border border-slate-700/80 bg-[#1c2436] hover:border-[#10b981]/50 hover:bg-slate-800 text-xs transition-colors group"
                  >
                    <span className="font-semibold text-slate-200 group-hover:text-white">
                      {store.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {store.priceFormatted && (
                        <span className="font-mono text-emerald-400 font-semibold">{store.priceFormatted}</span>
                      )}
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#10b981]" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Telemetry Specification Table */}
            <div className="rounded-xl border border-slate-800 bg-[#131926] p-6 space-y-3">
              <h3 className="font-display text-sm font-bold text-white mb-3">Specification Sheet</h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400 font-mono">Developer</span>
                  <span className="text-slate-200 font-medium">{game.developer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400 font-mono">Publisher</span>
                  <span className="text-slate-200 font-medium">{game.publisher}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400 font-mono">Release Year</span>
                  <span className="text-slate-200 font-mono">{game.releaseYear}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400 font-mono">Metascore Reviews</span>
                  <span className="text-[#10b981] font-mono font-bold">{game.reviewCount.toLocaleString()} verified</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-400 font-mono block mb-1.5">Supported Hardware</span>
                  <div className="flex flex-wrap gap-1.5">
                    {game.platforms.map(p => (
                      <PlatformBadge key={p} platform={p} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SIMILAR GAMES SECTION */}
        {similarGames.length > 0 && (
          <div className="pt-12 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Similar Verified Games</h2>
                <p className="text-xs text-slate-400">Recommended based on shared mechanical depth and thematic genre traits</p>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('explore')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Browse all catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similarGames.map(sim => (
                <GameCard key={sim.id} game={sim} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
