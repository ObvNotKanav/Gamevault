import React, { createContext, useContext, useState, useEffect } from 'react';
import { Game, AppRoute, LibraryItem, LibraryStatus, QuizAnswers, MatchResult, Platform } from '../types';
import { gameService } from '../services/gameService';
import { INITIAL_GAMES } from '../data/mockGames';

interface GameVaultContextType {
  route: AppRoute;
  activeGameId: string | null;
  navigateTo: (newRoute: AppRoute, gameId?: string) => void;
  // Wishlist
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: string) => void;
  toggleWishlist: (game: Game) => void;
  isInWishlist: (gameId: string) => boolean;
  clearWishlist: () => void;
  // Library
  library: LibraryItem[];
  addToLibrary: (game: Game, status?: LibraryStatus) => void;
  removeFromLibrary: (gameId: string) => void;
  updateLibraryStatus: (gameId: string, status: LibraryStatus, notes?: string, userRating?: number) => void;
  getLibraryItem: (gameId: string) => LibraryItem | undefined;
  // Comparison
  comparisonGames: Game[];
  toggleComparison: (game: Game) => void;
  removeFromComparison: (gameId: string) => void;
  clearComparison: () => void;
  isInComparison: (gameId: string) => boolean;
  // Quiz & Preferences
  quizAnswers: QuizAnswers | null;
  quizResults: MatchResult[];
  saveQuizResults: (answers: QuizAnswers, results: MatchResult[]) => void;
  favoriteGenres: string[];
  toggleFavoriteGenre: (genre: string) => void;
  favoritePlatforms: Platform[];
  toggleFavoritePlatform: (platform: Platform) => void;
  recentlyViewedGames: Game[];
  trackViewedGame: (game: Game) => void;
  // UI & System
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isApiModalOpen: boolean;
  setApiModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const GameVaultContext = createContext<GameVaultContextType | undefined>(undefined);

const STORAGE_KEYS = {
  WISHLIST: 'gamevault_wishlist_v1',
  LIBRARY: 'gamevault_library_v1',
  QUIZ: 'gamevault_quiz_v1',
  PREFS: 'gamevault_prefs_v1',
  RECENT: 'gamevault_recent_v1',
  THEME: 'gamevault_theme_v1'
};

export const GameVaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Route
  const [route, setRoute] = useState<AppRoute>('home');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  // Helper to ensure all games have current, accurate official cover and hero art
  const refreshGameImages = (g: Game): Game => {
    const current = INITIAL_GAMES.find(item => item.id === g.id);
    if (!current) return g;
    return {
      ...g,
      coverImage: current.coverImage,
      heroImage: current.heroImage,
      screenshots: current.screenshots
    };
  };

  // Wishlist - stored in local browser storage
  const [wishlist, setWishlist] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(refreshGameImages);
        }
      }
    } catch {
      // ignore
    }
    // Seed with Hades II as initial wishlisted demo game
    return [INITIAL_GAMES[2]];
  });

  // Library / Collection
  const [library, setLibrary] = useState<LibraryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIBRARY);
      if (saved) {
        const parsed: LibraryItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(item => ({
            ...item,
            game: refreshGameImages(item.game)
          }));
        }
      }
    } catch {
      // ignore
    }
    return [
      {
        gameId: 'elden-ring',
        game: INITIAL_GAMES[0],
        status: 'playing',
        dateAdded: new Date(Date.now() - 86400000 * 5).toISOString(),
        dateUpdated: new Date().toISOString(),
        notes: 'Exploring the Academy of Raya Lucaria. Masterpiece.'
      },
      {
        gameId: 'hades-2',
        game: INITIAL_GAMES[2],
        status: 'want_to_play',
        dateAdded: new Date(Date.now() - 86400000 * 2).toISOString(),
        dateUpdated: new Date().toISOString()
      }
    ];
  });

  // Comparison tray
  const [comparisonGames, setComparisonGames] = useState<Game[]>([]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.answers || null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [quizResults, setQuizResults] = useState<MatchResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.results)) {
          return parsed.results.map((r: MatchResult) => ({
            ...r,
            game: refreshGameImages(r.game)
          }));
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Preferences
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (saved) return JSON.parse(saved).genres || ['RPG', 'Roguelike', 'Adventure'];
    } catch {
      // ignore
    }
    return ['RPG', 'Roguelike', 'Adventure'];
  });

  const [favoritePlatforms, setFavoritePlatforms] = useState<Platform[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (saved) return JSON.parse(saved).platforms || ['PC', 'PlayStation 5'];
    } catch {
      // ignore
    }
    return ['PC', 'PlayStation 5'];
  });

  // Recently viewed
  const [recentlyViewedGames, setRecentlyViewedGames] = useState<Game[]>([]);

  // Theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  // Modals & Notifications
  const [isApiModalOpen, setApiModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Sync Library to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(library));
    } catch {
      // ignore
    }
  }, [library]);

  // Sync Prefs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify({ genres: favoriteGenres, platforms: favoritePlatforms }));
    } catch {
      // ignore
    }
  }, [favoriteGenres, favoritePlatforms]);

  // Sync Theme to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Hash listener for resilient browser back/forward and deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('game/')) {
        const id = hash.split('/')[1];
        setActiveGameId(id);
        setRoute('game-detail');
      } else if (['home', 'explore', 'quiz', 'quiz-results', 'for-you', 'library', 'wishlist', 'compare'].includes(hash)) {
        setRoute(hash as AppRoute);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (newRoute: AppRoute, gameId?: string) => {
    if (gameId) {
      setActiveGameId(gameId);
      window.location.hash = `game/${gameId}`;
    } else {
      window.location.hash = newRoute;
    }
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Wishlist actions - directly persisted in localStorage
  const addToWishlist = (game: Game) => {
    setWishlist(prev => {
      if (prev.some(g => g.id === game.id)) return prev;
      return [game, ...prev];
    });

    // Also sync to Library want_to_play status
    setLibrary(prev => {
      const exists = prev.find(item => item.gameId === game.id);
      if (exists) {
        return prev.map(item =>
          item.gameId === game.id
            ? { ...item, status: 'want_to_play', dateUpdated: new Date().toISOString() }
            : item
        );
      }
      return [
        {
          gameId: game.id,
          game,
          status: 'want_to_play',
          dateAdded: new Date().toISOString(),
          dateUpdated: new Date().toISOString()
        },
        ...prev
      ];
    });

    showToast(`Added ${game.title} to your Wishlist`);
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlist(prev => prev.filter(g => g.id !== gameId));
    // Also remove from library if it was only in want_to_play
    setLibrary(prev => prev.filter(item => !(item.gameId === gameId && item.status === 'want_to_play')));
    showToast(`Removed from your Wishlist`);
  };

  const toggleWishlist = (game: Game) => {
    if (wishlist.some(g => g.id === game.id)) {
      removeFromWishlist(game.id);
    } else {
      addToWishlist(game);
    }
  };

  const isInWishlist = (gameId: string) => {
    return wishlist.some(g => g.id === gameId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast(`Your wishlist has been cleared`);
  };

  // Library actions
  const addToLibrary = (game: Game, status: LibraryStatus = 'want_to_play') => {
    if (status === 'want_to_play') {
      setWishlist(prev => {
        if (prev.some(g => g.id === game.id)) return prev;
        return [game, ...prev];
      });
    } else {
      // If marked as playing or completed, remove from wishlist
      setWishlist(prev => prev.filter(g => g.id !== game.id));
    }

    setLibrary(prev => {
      const existing = prev.find(item => item.gameId === game.id);
      if (existing) {
        return prev.map(item =>
          item.gameId === game.id
            ? { ...item, status, dateUpdated: new Date().toISOString() }
            : item
        );
      }
      return [
        {
          gameId: game.id,
          game,
          status,
          dateAdded: new Date().toISOString(),
          dateUpdated: new Date().toISOString()
        },
        ...prev
      ];
    });

    const labelMap: Record<LibraryStatus, string> = {
      want_to_play: 'Added to Wishlist',
      playing: 'Marked as Playing',
      completed: 'Marked as Completed',
      paused: 'Marked as Paused'
    };
    showToast(`${game.title}: ${labelMap[status]}`);
  };

  const removeFromLibrary = (gameId: string) => {
    setLibrary(prev => prev.filter(item => item.gameId !== gameId));
    setWishlist(prev => prev.filter(g => g.id !== gameId));
    showToast(`Removed from your collection`);
  };

  const updateLibraryStatus = (gameId: string, status: LibraryStatus, notes?: string, userRating?: number) => {
    if (status === 'want_to_play') {
      const gameItem = library.find(item => item.gameId === gameId);
      if (gameItem) {
        setWishlist(prev => {
          if (prev.some(g => g.id === gameId)) return prev;
          return [gameItem.game, ...prev];
        });
      }
    } else {
      setWishlist(prev => prev.filter(g => g.id !== gameId));
    }

    setLibrary(prev =>
      prev.map(item => {
        if (item.gameId === gameId) {
          return {
            ...item,
            status,
            notes: notes !== undefined ? notes : item.notes,
            userRating: userRating !== undefined ? userRating : item.userRating,
            dateUpdated: new Date().toISOString()
          };
        }
        return item;
      })
    );
    showToast(`Updated status`);
  };

  const getLibraryItem = (gameId: string) => {
    return library.find(item => item.gameId === gameId);
  };

  // Comparison actions
  const toggleComparison = (game: Game) => {
    setComparisonGames(prev => {
      const exists = prev.some(g => g.id === game.id);
      if (exists) {
        showToast(`Removed ${game.title} from comparison`);
        return prev.filter(g => g.id !== game.id);
      }
      if (prev.length >= 4) {
        showToast(`You can compare up to 4 games at once`);
        return prev;
      }
      showToast(`Added ${game.title} to comparison (${prev.length + 1}/4)`);
      return [...prev, game];
    });
  };

  const removeFromComparison = (gameId: string) => {
    setComparisonGames(prev => prev.filter(g => g.id !== gameId));
  };

  const clearComparison = () => {
    setComparisonGames([]);
    showToast(`Comparison list cleared`);
  };

  const isInComparison = (gameId: string) => {
    return comparisonGames.some(g => g.id === gameId);
  };

  // Quiz submission
  const saveQuizResults = (answers: QuizAnswers, results: MatchResult[]) => {
    setQuizAnswers(answers);
    setQuizResults(results);
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ, JSON.stringify({ answers, results }));
    } catch {
      // ignore
    }
    navigateTo('quiz-results');
  };

  // Preferences
  const toggleFavoriteGenre = (genre: string) => {
    setFavoriteGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleFavoritePlatform = (platform: Platform) => {
    setFavoritePlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const trackViewedGame = (game: Game) => {
    setRecentlyViewedGames(prev => {
      const filtered = prev.filter(g => g.id !== game.id);
      return [game, ...filtered].slice(0, 8);
    });
  };

  return (
    <GameVaultContext.Provider
      value={{
        route,
        activeGameId,
        navigateTo,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        library,
        addToLibrary,
        removeFromLibrary,
        updateLibraryStatus,
        getLibraryItem,
        comparisonGames,
        toggleComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        quizAnswers,
        quizResults,
        saveQuizResults,
        favoriteGenres,
        toggleFavoriteGenre,
        favoritePlatforms,
        toggleFavoritePlatform,
        recentlyViewedGames,
        trackViewedGame,
        theme,
        toggleTheme,
        isApiModalOpen,
        setApiModalOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </GameVaultContext.Provider>
  );
};

export const useGameVault = () => {
  const context = useContext(GameVaultContext);
  if (!context) {
    throw new Error('useGameVault must be used within a GameVaultProvider');
  }
  return context;
};
