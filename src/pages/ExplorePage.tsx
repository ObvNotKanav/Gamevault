import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronDown,
  Sparkles,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { gameService } from '../services/gameService';
import { Game, FilterState, Genre, Platform } from '../types';
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
  'Platformer',
  'Fighting',
  'Metroidvania',
  'Sci-Fi'
];

const ALL_PLATFORMS: Platform[] = [
  'PC',
  'PlayStation 5',
  'PlayStation 4',
  'Xbox Series X/S',
  'Xbox One',
  'Nintendo Switch',
  'Steam Deck'
];

export const ExplorePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    genre: 'all',
    platform: 'all',
    minRating: 0,
    priceTier: 'all',
    gameMode: 'all',
    difficulty: 'all',
    onlyHiddenGems: false,
    sortBy: 'relevance'
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const fetchFilteredGames = async () => {
    setLoading(true);
    try {
      const res = await gameService.getGames(filters);
      setGames(res.games);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredGames();
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      search: '',
      genre: 'all',
      platform: 'all',
      minRating: 0,
      priceTier: 'all',
      gameMode: 'all',
      difficulty: 'all',
      onlyHiddenGems: false,
      sortBy: 'relevance'
    });
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.genre !== 'all') count++;
    if (filters.platform !== 'all') count++;
    if (filters.minRating > 0) count++;
    if (filters.priceTier !== 'all') count++;
    if (filters.gameMode !== 'all') count++;
    if (filters.onlyHiddenGems) count++;
    return count;
  }, [filters]);

  // Paginated slice
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return games.slice(start, start + pageSize);
  }, [games, currentPage, pageSize]);

  const totalPages = Math.ceil(games.length / pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#10b981] mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Telemetry Catalog</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Explore Video Games
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Filter by verified release parameters, platform support, and gameplay difficulty
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={filters.search}
              onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search title, studio, tags..."
              className="w-full rounded-sm border border-slate-700 bg-[#131926] pl-9 pr-8 py-2 text-xs text-white placeholder:text-slate-500 focus:border-[#10b981] focus:outline-hidden"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Grid vs List toggle */}
          <div className="hidden sm:flex items-center rounded-sm border border-slate-700 bg-[#131926] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xs transition-colors ${
                viewMode === 'grid' ? 'bg-[#1c2436] text-[#10b981]' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-xs transition-colors ${
                viewMode === 'list' ? 'bg-[#1c2436] text-[#10b981]' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Filter toggle button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 rounded-sm border border-slate-700 bg-[#131926] px-3 py-2 text-xs font-semibold text-slate-200"
          >
            <Filter className="h-3.5 w-3.5 text-[#10b981]" />
            <span>Filters ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR FILTER PANEL (Desktop & Mobile Drawer) */}
        <aside
          className={`md:col-span-3 space-y-6 ${
            mobileFilterOpen
              ? 'fixed inset-0 z-50 overflow-y-auto bg-[#0b0f17] p-6'
              : 'hidden md:block'
          }`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 md:hidden">
              <span className="font-display font-bold text-white">Filter Parameters</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          <div className="rounded-lg border border-slate-800 bg-[#131926] p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#10b981]" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Hidden Gem Quick Toggle */}
            <div>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-200">
                <input
                  type="checkbox"
                  checked={filters.onlyHiddenGems}
                  onChange={e => setFilters(prev => ({ ...prev, onlyHiddenGems: e.target.checked }))}
                  className="rounded-xs border-slate-700 bg-slate-900 text-[#10b981] focus:ring-0 focus:ring-offset-0"
                />
                <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                  <Sparkles className="h-3 w-3" />
                  Only Hidden Gems
                </span>
              </label>
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={e => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                className="w-full rounded-sm border border-slate-700 bg-[#1c2436] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#10b981] focus:outline-hidden"
              >
                <option value="all">All Genres</option>
                {ALL_GENRES.map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Platform
              </label>
              <select
                value={filters.platform}
                onChange={e => setFilters(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full rounded-sm border border-slate-700 bg-[#1c2436] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#10b981] focus:outline-hidden"
              >
                <option value="all">All Platforms</option>
                {ALL_PLATFORMS.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Rating Slider / Select */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span>Minimum Metascore</span>
                <span className="font-bold text-[#10b981]">
                  {filters.minRating > 0 ? `${filters.minRating}+` : 'Any'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={filters.minRating}
                onChange={e => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                className="w-full accent-[#10b981] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>Any</span>
                <span>80+</span>
                <span>90+</span>
              </div>
            </div>

            {/* Price Tier */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Budget / Price Tier
              </label>
              <select
                value={filters.priceTier}
                onChange={e => setFilters(prev => ({ ...prev, priceTier: e.target.value }))}
                className="w-full rounded-sm border border-slate-700 bg-[#1c2436] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#10b981] focus:outline-hidden"
              >
                <option value="all">All Budgets</option>
                <option value="Under $20">Under $20 (Indies & Deals)</option>
                <option value="Under $40">Under $40</option>
                <option value="Full Price">Full Price ($59 - $70)</option>
              </select>
            </div>

            {/* Game Mode */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Game Mode
              </label>
              <select
                value={filters.gameMode}
                onChange={e => setFilters(prev => ({ ...prev, gameMode: e.target.value }))}
                className="w-full rounded-sm border border-slate-700 bg-[#1c2436] px-2.5 py-1.5 text-xs text-slate-200 focus:border-[#10b981] focus:outline-hidden"
              >
                <option value="all">Any Mode</option>
                <option value="Single-player">Single-player</option>
                <option value="Co-op">Co-operative</option>
                <option value="Multiplayer">Multiplayer / PvP</option>
              </select>
            </div>

            {mobileFilterOpen && (
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-sm bg-[#10b981] py-2.5 text-xs font-bold text-[#0b0f17] mt-4"
              >
                Apply Filters
              </button>
            )}
          </div>
        </aside>

        {/* MAIN RESULTS GRID */}
        <main className="md:col-span-9 space-y-6">
          {/* Active Filter Pills & Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#131926] p-3 rounded-md border border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-slate-400">
                Found <strong className="text-white font-bold">{games.length}</strong> title{games.length === 1 ? '' : 's'}
              </span>

              {filters.genre !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-sm bg-slate-800 px-2 py-0.5 text-slate-300 font-mono text-[11px]">
                  Genre: {filters.genre}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-white"
                    onClick={() => setFilters(p => ({ ...p, genre: 'all' }))}
                  />
                </span>
              )}

              {filters.platform !== 'all' && (
                <span className="inline-flex items-center gap-1 rounded-sm bg-slate-800 px-2 py-0.5 text-slate-300 font-mono text-[11px]">
                  Platform: {filters.platform}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-white"
                    onClick={() => setFilters(p => ({ ...p, platform: 'all' }))}
                  />
                </span>
              )}

              {filters.onlyHiddenGems && (
                <span className="inline-flex items-center gap-1 rounded-sm bg-cyan-950 px-2 py-0.5 text-cyan-300 font-mono text-[11px] border border-cyan-800">
                  Hidden Gems Only
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-white"
                    onClick={() => setFilters(p => ({ ...p, onlyHiddenGems: false }))}
                  />
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-slate-400 font-mono text-[11px]">Sort By:</span>
              <select
                value={filters.sortBy}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="rounded-sm border border-slate-700 bg-[#1c2436] px-2 py-1 text-xs text-slate-200 font-semibold focus:border-[#10b981] focus:outline-hidden"
              >
                <option value="relevance">Relevance / Featured</option>
                <option value="rating">Rating (Highest First)</option>
                <option value="release">Release Date (Newest)</option>
                <option value="popularity">Popularity</option>
                <option value="name">Title (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Results Grid / List */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#10b981] border-t-transparent mb-3" />
              <p className="text-xs font-mono text-slate-400">Querying telemetry vault...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-[#131926] p-12 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-slate-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">No Matching Games Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                No titles in the vault matched your current filter criteria. Try relaxing your rating threshold or removing platform filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 rounded-sm bg-[#10b981] px-4 py-2 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                  : 'space-y-4'
              }
            >
              {paginatedGames.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  variant={viewMode === 'grid' ? 'standard' : 'horizontal'}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="rounded-sm border border-slate-700 bg-[#131926] px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-[#1c2436] disabled:opacity-40 disabled:pointer-events-none"
              >
                Previous
              </button>

              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <span>Page</span>
                <strong className="text-white">{currentPage}</strong>
                <span>of</span>
                <strong className="text-white">{totalPages}</strong>
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="rounded-sm border border-slate-700 bg-[#131926] px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-[#1c2436] disabled:opacity-40 disabled:pointer-events-none"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
