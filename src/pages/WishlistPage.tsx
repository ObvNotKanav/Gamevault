import React, { useState, useMemo } from 'react';
import {
  Heart,
  Trash2,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Compass,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Scale,
  ShoppingBag,
  TrendingUp,
  Award
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { Game, Genre, Platform } from '../types';
import { GameCard } from '../components/GameCard';
import { RatingBadge } from '../components/RatingBadge';
import { PlatformBadge } from '../components/PlatformBadge';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    addToLibrary,
    navigateTo,
    toggleComparison,
    isInComparison
  } = useGameVault();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'price-asc' | 'price-desc'>('rating');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Computed metrics
  const stats = useMemo(() => {
    const total = wishlist.length;
    if (total === 0) return { total: 0, avgRating: 0, totalPrice: 0, freeCount: 0 };

    const sumRating = wishlist.reduce((acc, g) => acc + g.rating, 0);
    const avgRating = Math.round(sumRating / total);
    const totalPrice = wishlist.reduce((acc, g) => acc + (g.priceUsd || 0), 0);
    const freeCount = wishlist.filter(g => g.priceTier === 'Free').length;

    return {
      total,
      avgRating,
      totalPrice: totalPrice.toFixed(2),
      freeCount
    };
  }, [wishlist]);

  // Extract available genres & platforms from wishlist
  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    wishlist.forEach(g => g.genres.forEach(genre => set.add(genre)));
    return Array.from(set).sort();
  }, [wishlist]);

  const availablePlatforms = useMemo(() => {
    const set = new Set<string>();
    wishlist.forEach(g => g.platforms.forEach(p => set.add(p)));
    return Array.from(set).sort();
  }, [wishlist]);

  // Filtered & sorted wishlist games
  const filteredGames = useMemo(() => {
    let result = [...wishlist];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        g =>
          g.title.toLowerCase().includes(q) ||
          g.developer.toLowerCase().includes(q) ||
          g.genres.some(genre => genre.toLowerCase().includes(q))
      );
    }

    if (selectedGenre !== 'All') {
      result = result.filter(g => g.genres.includes(selectedGenre as Genre));
    }

    if (selectedPlatform !== 'All') {
      result = result.filter(g => g.platforms.includes(selectedPlatform as Platform));
    }

    return result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'price-asc') return (a.priceUsd || 0) - (b.priceUsd || 0);
      if (sortBy === 'price-desc') return (b.priceUsd || 0) - (a.priceUsd || 0);
      return 0;
    });
  }, [wishlist, searchQuery, selectedGenre, selectedPlatform, sortBy]);

  const handleMoveToPlaying = (game: Game) => {
    addToLibrary(game, 'playing');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Title and Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-1">
            <Heart className="h-4 w-4 fill-rose-400" />
            <span>Personal Wishlist</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Saved Games to Play
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Track future titles, monitor deals, and organize prospective playthroughs directly in browser storage.
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-3 self-start md:self-auto">
            {showClearConfirm ? (
              <div className="flex items-center gap-2 bg-rose-950/80 border border-rose-600/60 p-1.5 rounded-sm">
                <span className="text-xs text-rose-300 font-medium px-2">Clear all?</span>
                <button
                  type="button"
                  onClick={() => {
                    clearWishlist();
                    setShowClearConfirm(false);
                  }}
                  className="px-2.5 py-1 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xs"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 bg-[#131926] px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Wishlist</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => navigateTo('quiz')}
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#10b981] px-4 py-2 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-all shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Find More via Quiz</span>
            </button>
          </div>
        )}
      </div>

      {/* Summary KPI Ribbon */}
      {wishlist.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg border border-slate-800 bg-[#131926] p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-rose-950/60 border border-rose-500/40 flex items-center justify-center shrink-0">
              <Heart className="h-5 w-5 text-rose-400 fill-rose-400" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Wishlist Size</p>
              <p className="font-display text-xl font-bold text-white">{stats.total} Games</p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-[#131926] p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Award className="h-5 w-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Average Metascore</p>
              <p className="font-display text-xl font-bold text-[#10b981]">{stats.avgRating} / 100</p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-[#131926] p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <ShoppingBag className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Estimated Total</p>
              <p className="font-display text-xl font-bold text-white">${stats.totalPrice}</p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-[#131926] p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Free to Play</p>
              <p className="font-display text-xl font-bold text-white">{stats.freeCount} Titles</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Wishlist View or Empty State */}
      {wishlist.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 bg-[#131926]/40 p-12 text-center space-y-5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-950/50 border border-rose-500/30">
            <Heart className="h-8 w-8 text-rose-400" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="font-display text-xl font-bold text-white">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You haven't saved any games to your wishlist yet. Browse our catalog or take the Perfect Fit Quiz to discover games you'll love.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigateTo('explore')}
              className="inline-flex items-center gap-2 rounded-sm bg-[#10b981] px-5 py-2.5 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-all shadow-md"
            >
              <Compass className="h-4 w-4" />
              <span>Explore All Games</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('quiz')}
              className="inline-flex items-center gap-2 rounded-sm border border-slate-700 bg-[#1c2436] px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-[#10b981]" />
              <span>Take Perfect Fit Quiz</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filter, Search & Sort Toolbar */}
          <div className="rounded-lg border border-slate-800 bg-[#131926] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search within wishlist */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search within your wishlist..."
                className="w-full rounded-sm border border-slate-700 bg-[#0b0f17] pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-[#10b981] focus:outline-none"
              />
            </div>

            {/* Filters & Sorting */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Genre filter */}
              {availableGenres.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-mono text-[11px]">Genre:</span>
                  <select
                    value={selectedGenre}
                    onChange={e => setSelectedGenre(e.target.value)}
                    className="rounded-sm border border-slate-700 bg-[#0b0f17] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#10b981] focus:outline-none"
                  >
                    <option value="All">All Genres</option>
                    {availableGenres.map(genre => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Platform filter */}
              {availablePlatforms.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-mono text-[11px]">Platform:</span>
                  <select
                    value={selectedPlatform}
                    onChange={e => setSelectedPlatform(e.target.value)}
                    className="rounded-sm border border-slate-700 bg-[#0b0f17] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#10b981] focus:outline-none"
                  >
                    <option value="All">All Platforms</option>
                    {availablePlatforms.map(p => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort by */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="rounded-sm border border-slate-700 bg-[#0b0f17] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#10b981] focus:outline-none"
                >
                  <option value="rating">Highest Metascore</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Games Grid with dedicated Wishlist Controls */}
          {filteredGames.length === 0 ? (
            <div className="rounded-lg border border-slate-800 bg-[#131926] p-8 text-center text-xs text-slate-400">
              No games in your wishlist match the current search or filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <div
                  key={game.id}
                  className="flex flex-col justify-between rounded-md border border-slate-800 bg-[#131926] overflow-hidden group hover:border-rose-500/50 transition-all duration-300 shadow-md"
                >
                  {/* Artwork Banner */}
                  <div
                    onClick={() => navigateTo('game-detail', game.id)}
                    className="relative aspect-16/9 w-full overflow-hidden bg-slate-950 cursor-pointer"
                  >
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-black/40" />

                    {/* Top rating badge */}
                    <div className="absolute top-2.5 right-2.5">
                      <RatingBadge rating={game.rating} size="sm" />
                    </div>

                    {/* Top left price tier */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[11px] font-mono text-white font-bold bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-slate-700">
                        {game.priceFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                        <span>{game.developer}</span>
                        <span>{game.releaseYear}</span>
                      </div>

                      <h3
                        onClick={() => navigateTo('game-detail', game.id)}
                        className="font-display text-base font-bold text-white group-hover:text-rose-400 transition-colors cursor-pointer line-clamp-1"
                      >
                        {game.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {game.tagline}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {game.genres.slice(0, 3).map(g => (
                          <span
                            key={g}
                            className="rounded-sm bg-[#1c2436] px-1.5 py-0.5 text-[11px] text-slate-300 border border-slate-800"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Remove from Wishlist button */}
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(game.id)}
                          className="inline-flex items-center gap-1 rounded-sm border border-rose-900/60 bg-rose-950/40 px-2.5 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-900/50 hover:text-white transition-colors"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Remove</span>
                        </button>

                        {/* Move to Playing */}
                        <button
                          type="button"
                          onClick={() => handleMoveToPlaying(game)}
                          className="inline-flex items-center gap-1 rounded-sm border border-slate-700 bg-[#1c2436] px-2.5 py-1.5 text-xs font-semibold text-cyan-300 hover:border-cyan-500 transition-colors"
                          title="Start Playing"
                        >
                          <PlayCircle className="h-3 w-3" />
                          <span>Play</span>
                        </button>
                      </div>

                      {/* Inspect details */}
                      <button
                        type="button"
                        onClick={() => navigateTo('game-detail', game.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#10b981] hover:text-[#34d399] transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
