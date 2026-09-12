import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Compass,
  Sparkles,
  Bookmark,
  Heart,
  Scale,
  Sun,
  Moon,
  Database,
  Menu,
  X,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { gameService } from '../services/gameService';
import { Game, AppRoute } from '../types';

export const Navbar: React.FC = () => {
  const {
    route,
    navigateTo,
    wishlist,
    library,
    comparisonGames,
    theme,
    toggleTheme,
    setApiModalOpen
  } = useGameVault();

  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search suggestions
  useEffect(() => {
    if (!searchVal.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await gameService.getGames({ search: searchVal });
      setSuggestions(res.games.slice(0, 5));
    }, 150);

    return () => clearTimeout(timer);
  }, [searchVal]);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global hotkey: / or ⌘K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT')) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigateTo('explore');
      // Store in session search if needed
      setIsSearchOpen(false);
    }
  };

  const handleSelectGame = (gameId: string) => {
    setIsSearchOpen(false);
    setSearchVal('');
    navigateTo('game-detail', gameId);
  };

  const navItems: { label: string; route: AppRoute; icon: React.ReactNode; badge?: number }[] = [
    { label: 'Home', route: 'home', icon: null },
    { label: 'Explore', route: 'explore', icon: <Compass className="h-4 w-4" /> },
    {
      label: 'Perfect Fit Quiz',
      route: 'quiz',
      icon: <Sparkles className="h-4 w-4 text-[#10b981]" />
    },
    { label: 'For You', route: 'for-you', icon: null },
    {
      label: 'Wishlist',
      route: 'wishlist',
      icon: <Heart className="h-4 w-4 text-rose-400" />,
      badge: wishlist.length > 0 ? wishlist.length : undefined
    },
    {
      label: 'Vault Library',
      route: 'library',
      icon: <Bookmark className="h-4 w-4" />,
      badge: library.length
    },
    {
      label: 'Compare',
      route: 'compare',
      icon: <Scale className="h-4 w-4" />,
      badge: comparisonGames.length > 0 ? comparisonGames.length : undefined
    }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Logo & Wordmark */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-linear-to-br from-slate-900 to-[#131926] border border-[#10b981]/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-[#10b981] transition-colors">
              <span className="font-display text-base font-bold text-[#10b981] tracking-tighter">GV</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                GAME<span className="text-[#10b981]">VAULT</span>
              </span>
              <span className="hidden sm:block text-[9px] font-mono uppercase tracking-widest text-slate-400">
                Discovery Engine
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = route === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => navigateTo(item.route)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#1c2436] text-[#10b981] border border-[#10b981]/30 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 rounded-full bg-[#10b981] px-1.5 py-0.2 text-[10px] font-bold text-[#0b0f17]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center/Right: Search Bar & Actions */}
        <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
          {/* Quick Search */}
          <div ref={searchRef} className="relative w-full max-w-xs sm:max-w-sm">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchVal}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={e => {
                    setSearchVal(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  placeholder="Search games, genres, studios..."
                  className="w-full rounded-sm border border-slate-700/80 bg-[#131926] pl-9 pr-12 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-hidden focus:ring-1 focus:ring-cyan-400/30 transition-all"
                />
                <kbd className="hidden sm:inline-block absolute right-2 top-1/2 -translate-y-1/2 rounded-xs border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                  ⌘K
                </kbd>
              </div>
            </form>

            {/* Instant Suggestions Dropdown */}
            {isSearchOpen && suggestions.length > 0 && (
              <div className="absolute top-full mt-1.5 left-0 right-0 z-50 overflow-hidden rounded-md border border-slate-700 bg-[#131926] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-1.5">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Matches
                  </div>
                  {suggestions.map(g => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleSelectGame(g.id)}
                      className="w-full flex items-center gap-2.5 p-2 rounded-sm text-left hover:bg-[#1c2436] transition-colors group"
                    >
                      <img
                        src={g.coverImage}
                        alt={g.title}
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-xs object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold text-slate-100 truncate group-hover:text-[#10b981]">
                            {g.title}
                          </p>
                          <span className="font-mono text-[11px] font-bold text-emerald-400 shrink-0">
                            {g.rating}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">
                          {g.genres.slice(0, 2).join(', ')} • {g.releaseYear}
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full mt-1 border-t border-slate-800 pt-1.5 pb-1 px-2 text-center text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    View all results in Explore →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Database / API Status button */}
          <button
            type="button"
            onClick={() => setApiModalOpen(true)}
            className="p-2 rounded-sm border border-slate-700/80 bg-[#131926] text-slate-300 hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors"
            title="Data Source & API Configuration"
          >
            <Database className="h-4 w-4" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-sm border border-slate-700/80 bg-[#131926] text-slate-300 hover:text-white transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-sm border border-slate-700 bg-[#131926] text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0f131c] px-4 py-3 space-y-1 animate-in fade-in duration-200">
          {navItems.map(item => (
            <button
              key={item.route}
              type="button"
              onClick={() => {
                navigateTo(item.route);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-semibold ${
                route === item.route
                  ? 'bg-[#1c2436] text-[#10b981]'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="rounded-full bg-[#10b981] px-2 py-0.5 text-xs font-bold text-[#0b0f17]">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
