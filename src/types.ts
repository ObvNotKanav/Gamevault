export type Platform =
  | 'PC'
  | 'PlayStation 5'
  | 'PlayStation 4'
  | 'Xbox Series X/S'
  | 'Xbox One'
  | 'Nintendo Switch'
  | 'Steam Deck';

export type Genre =
  | 'Action'
  | 'RPG'
  | 'Adventure'
  | 'Indie'
  | 'Strategy'
  | 'Shooter'
  | 'Puzzle'
  | 'Simulation'
  | 'Horror'
  | 'Roguelike'
  | 'Platformer'
  | 'Fighting'
  | 'Metroidvania'
  | 'Sci-Fi';

export type GameMode = 'Single-player' | 'Multiplayer' | 'Co-op' | 'PvP' | 'MMO';

export type PriceTier = 'Free' | 'Under $20' | 'Under $40' | 'Full Price' | 'Price unavailable';

export type Difficulty = 'Relaxed' | 'Moderate' | 'Challenging' | 'Hardcore';

export interface OfficialStoreLink {
  name: string;
  storeType: 'Steam' | 'PlayStation' | 'Xbox' | 'Nintendo' | 'GOG' | 'Epic' | 'Official';
  url: string;
  priceFormatted?: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
  heroImage: string;
  screenshots: string[];
  trailerUrl?: string;
  releaseDate: string;
  releaseYear: number;
  developer: string;
  publisher: string;
  genres: Genre[];
  platforms: Platform[];
  rating: number; // 0 - 100 Metacritic / verified score
  reviewCount: number;
  popularityScore: number; // 1 - 100
  isFeatured?: boolean;
  isTrending?: boolean;
  isHiddenGem?: boolean;
  isRecentlyReleased?: boolean;
  priceTier: PriceTier;
  priceFormatted: string;
  gameModes: GameMode[];
  playtimeHours: {
    mainStory: number;
    completionist: number;
  };
  narrativeDepth: 1 | 2 | 3 | 4 | 5; // 1 = Minimal, 5 = Masterpiece
  difficulty: Difficulty;
  tags: string[];
  stores: OfficialStoreLink[];
  whyYouMightLike: {
    gameplaySummary: string;
    highlights: string[];
    idealFor: string[];
  };
}

export type LibraryStatus = 'want_to_play' | 'playing' | 'completed' | 'paused';

export interface LibraryItem {
  gameId: string;
  game: Game;
  status: LibraryStatus;
  userRating?: number; // 1 to 5 stars
  notes?: string;
  dateAdded: string;
  dateUpdated: string;
}

export interface FilterState {
  search: string;
  genre: string;
  platform: string;
  minRating: number;
  priceTier: string;
  gameMode: string;
  difficulty: string;
  onlyHiddenGems: boolean;
  sortBy: 'relevance' | 'rating' | 'release' | 'popularity' | 'name';
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    iconName: string;
    targetGenres?: Genre[];
    targetPlatforms?: Platform[];
    targetModes?: GameMode[];
    targetDifficulty?: Difficulty;
    narrativeScore?: number;
    targetBudget?: PriceTier;
  }[];
}

export interface QuizAnswers {
  preferredGenres?: Genre[];
  platforms?: Platform[];
  timeCommitment?: 'bite_sized' | 'moderate' | 'deep' | 'epic';
  gameplayStyle?: 'action' | 'tactical' | 'relaxed' | 'narrative' | 'challenging' | 'multiplayer';
  difficulty?: Difficulty;
  storyImportance?: number; // 1 to 5
  budget?: PriceTier | 'Any';
  // Legacy aliases for backward compatibility
  q1_mood?: string;
  q2_platforms?: Platform[];
  q3_timeAvailable?: 'short' | 'medium' | 'long' | 'epic';
  q4_experience?: 'solo' | 'multiplayer' | 'both';
  q5_storyImportance?: number;
  q6_difficulty?: Difficulty;
  q7_budget?: PriceTier | 'Any';
}

export interface MatchScoreBreakdown {
  genreScore: number; // out of 35
  platformScore: number; // out of 25
  timeScore: number; // out of 20
  styleScore: number; // out of 20
  totalPercentage: number; // 0 - 100
  reasons: string[];
}

export interface MatchResult {
  game: Game;
  score: MatchScoreBreakdown;
}

export type AppRoute =
  | 'home'
  | 'explore'
  | 'game-detail'
  | 'quiz'
  | 'quiz-results'
  | 'for-you'
  | 'library'
  | 'wishlist'
  | 'compare';
