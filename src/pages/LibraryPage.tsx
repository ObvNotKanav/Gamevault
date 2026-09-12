import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  CheckCircle2,
  PlayCircle,
  PauseCircle,
  Trash2,
  Compass,
  Sparkles,
  Search,
  ExternalLink,
  ChevronDown,
  Award
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { LibraryStatus } from '../types';
import { RatingBadge } from '../components/RatingBadge';
import { PlatformBadge } from '../components/PlatformBadge';

export const LibraryPage: React.FC = () => {
  const { library, updateLibraryStatus, removeFromLibrary, navigateTo } = useGameVault();

  const [activeTab, setActiveTab] = useState<'all' | LibraryStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'title'>('date');

  // Stats
  const stats = useMemo(() => {
    const total = library.length;
    const wantToPlay = library.filter(i => i.status === 'want_to_play').length;
    const playing = library.filter(i => i.status === 'playing').length;
    const completed = library.filter(i => i.status === 'completed').length;
    const paused = library.filter(i => i.status === 'paused').length;
    const avgRating = total > 0
      ? Math.round((library.reduce((acc, i) => acc + i.game.rating, 0) / total) * 10) / 10
      : 0;

    return { total, wantToPlay, playing, completed, paused, avgRating };
  }, [library]);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    let result = library;

    if (activeTab !== 'all') {
      result = result.filter(item => item.status === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        item =>
          item.game.title.toLowerCase().includes(q) ||
          item.game.developer.toLowerCase().includes(q) ||
          item.game.genres.some(g => g.toLowerCase().includes(q))
      );
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.game.rating - a.game.rating;
      if (sortBy === 'title') return a.game.title.localeCompare(b.game.title);
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [library, activeTab, searchQuery, sortBy]);

  const tabs: { id: 'all' | LibraryStatus; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Items', count: stats.total, icon: <Bookmark className="h-3.5 w-3.5" /> },
    { id: 'want_to_play', label: 'Want to Play', count: stats.wantToPlay, icon: <Sparkles className="h-3.5 w-3.5 text-[#10b981]" /> },
    { id: 'playing', label: 'Playing Now', count: stats.playing, icon: <PlayCircle className="h-3.5 w-3.5 text-cyan-400" /> },
    { id: 'completed', label: 'Completed', count: stats.completed, icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> },
    { id: 'paused', label: 'Paused / Backlog', count: stats.paused, icon: <PauseCircle className="h-3.5 w-3.5 text-amber-400" /> }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10b981] mb-1">
          <Bookmark className="h-3.5 w-3.5" />
          <span>Personal Collection</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Your Vault Library
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Track what you want to play next, monitor active adventures, and catalog completed milestones
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="rounded-lg border border-slate-800 bg-[#131926] p-4">
          <span className="text-[11px] font-mono text-slate-400">Total Saved</span>
          <p className="font-display text-2xl font-bold text-white mt-1">{stats.total}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-[#131926] p-4">
          <span className="text-[11px] font-mono text-[#10b981]">Want to Play</span>
          <p className="font-display text-2xl font-bold text-[#10b981] mt-1">{stats.wantToPlay}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-[#131926] p-4">
          <span className="text-[11px] font-mono text-cyan-400">Playing Now</span>
          <p className="font-display text-2xl font-bold text-cyan-400 mt-1">{stats.playing}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-[#131926] p-4">
          <span className="text-[11px] font-mono text-emerald-400">Completed</span>
          <p className="font-display text-2xl font-bold text-emerald-400 mt-1">{stats.completed}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-[#131926] p-4 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-mono text-slate-400">Avg Metascore</span>
          <p className="font-display text-2xl font-bold text-white mt-1">
            {stats.avgRating > 0 ? stats.avgRating : '—'}
          </p>
        </div>
      </div>

      {/* TABS & SEARCH CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors border ${
                activeTab === tab.id
                  ? 'bg-[#1c2436] text-white border-[#10b981]/50 shadow-xs'
                  : 'bg-[#131926] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px] font-mono text-slate-300">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search library..."
              className="w-full rounded-sm border border-slate-700 bg-[#131926] pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-[#10b981] focus:outline-hidden"
            />
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="rounded-sm border border-slate-700 bg-[#131926] px-2.5 py-1.5 text-xs text-slate-300 font-semibold focus:border-[#10b981] focus:outline-hidden"
          >
            <option value="date">Recently Added</option>
            <option value="rating">Highest Metascore</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* ITEMS LIST */}
      {filteredItems.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#131926] p-12 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
            <Bookmark className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">
            {library.length === 0 ? 'Your Vault Library is Empty' : 'No Games in This Tab'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            {library.length === 0
              ? 'Start discovering titles and add them to your wishlist or playing status to track your gaming journey.'
              : 'Try selecting a different status filter or clear your search term.'}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigateTo('explore')}
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#10b981] px-4 py-2 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399]"
            >
              <Compass className="h-3.5 w-3.5" />
              Explore Games
            </button>
            <button
              type="button"
              onClick={() => navigateTo('quiz')}
              className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 bg-[#1c2436] px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#10b981]" />
              Take Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div
              key={item.game.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-slate-800 bg-[#131926] hover:border-slate-700 transition-colors"
            >
              {/* Game Info */}
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.game.coverImage}
                  alt={item.game.title}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-md object-cover shrink-0 cursor-pointer"
                  onClick={() => navigateTo('game-detail', item.game.id)}
                />

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3
                      onClick={() => navigateTo('game-detail', item.game.id)}
                      className="font-display text-base font-bold text-white hover:text-[#10b981] transition-colors truncate cursor-pointer"
                    >
                      {item.game.title}
                    </h3>
                    <RatingBadge rating={item.game.rating} size="sm" />
                  </div>

                  <p className="text-xs text-slate-400 font-mono truncate">
                    {item.game.developer} • {item.game.genres.slice(0, 3).join(', ')}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {item.game.platforms.slice(0, 3).map(p => (
                      <PlatformBadge key={p} platform={p} compact />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Selector & Controls */}
              <div className="flex items-center gap-3 sm:shrink-0 justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                <div>
                  <select
                    value={item.status}
                    onChange={e => updateLibraryStatus(item.game.id, e.target.value as LibraryStatus)}
                    className="rounded-sm border border-slate-700 bg-[#1c2436] px-2.5 py-1.5 text-xs text-slate-200 font-semibold focus:border-[#10b981] focus:outline-hidden"
                  >
                    <option value="want_to_play">Want to Play</option>
                    <option value="playing">Playing Now</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused / Backlog</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromLibrary(item.game.id)}
                  className="p-1.5 rounded-sm text-slate-400 hover:text-rose-400 transition-colors"
                  title="Remove from Library"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
