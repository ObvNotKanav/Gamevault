import { Game, FilterState } from '../types';
import { INITIAL_GAMES } from '../data/mockGames';

export interface DataSourceStatus {
  source: 'RAWG_API' | 'CURATED_DATABASE';
  apiKeyConfigured: boolean;
  statusMessage: string;
}

class GameService {
  private gamesCache: Game[] = [...INITIAL_GAMES];
  private rawgApiKey: string = (import.meta as any).env?.VITE_RAWG_API_KEY || localStorage.getItem('gv_rawg_api_key') || '';

  public getDataSourceStatus(): DataSourceStatus {
    if (this.rawgApiKey && this.rawgApiKey.trim().length > 5) {
      return {
        source: 'RAWG_API',
        apiKeyConfigured: true,
        statusMessage: 'Connected to live RAWG Video Games Database API'
      };
    }
    return {
      source: 'CURATED_DATABASE',
      apiKeyConfigured: false,
      statusMessage: 'Curated Verified Video Game Vault (Demo Mode)'
    };
  }

  public setApiKey(key: string) {
    this.rawgApiKey = key.trim();
    if (this.rawgApiKey) {
      localStorage.setItem('gv_rawg_api_key', this.rawgApiKey);
    } else {
      localStorage.removeItem('gv_rawg_api_key');
    }
  }

  public getApiKey(): string {
    return this.rawgApiKey;
  }

  /**
   * Fetch all games with optional filtering, sorting and search
   */
  public async getGames(filters?: Partial<FilterState>): Promise<{ games: Game[]; total: number }> {
    // Simulate slight network responsiveness
    await new Promise(res => setTimeout(res, 60));

    let results = [...this.gamesCache];

    if (!filters) {
      return { games: results, total: results.length };
    }

    // 1. Search Query
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.developer.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q)) ||
        g.genres.some(gen => gen.toLowerCase().includes(q))
      );
    }

    // 2. Genre Filter
    if (filters.genre && filters.genre !== 'all') {
      results = results.filter(g => g.genres.some(gen => gen.toLowerCase() === filters.genre?.toLowerCase()));
    }

    // 3. Platform Filter
    if (filters.platform && filters.platform !== 'all') {
      results = results.filter(g => g.platforms.some(p => p.toLowerCase().includes(filters.platform!.toLowerCase())));
    }

    // 4. Min Rating
    if (filters.minRating && filters.minRating > 0) {
      results = results.filter(g => g.rating >= filters.minRating!);
    }

    // 5. Price Tier
    if (filters.priceTier && filters.priceTier !== 'all') {
      results = results.filter(g => g.priceTier === filters.priceTier);
    }

    // 6. Game Mode
    if (filters.gameMode && filters.gameMode !== 'all') {
      results = results.filter(g => g.gameModes.some(m => m.toLowerCase().includes(filters.gameMode!.toLowerCase())));
    }

    // 7. Hidden Gems Only
    if (filters.onlyHiddenGems) {
      results = results.filter(g => g.isHiddenGem);
    }

    // 8. Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'release':
          results.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          break;
        case 'popularity':
          results.sort((a, b) => b.popularityScore - a.popularityScore);
          break;
        case 'name':
          results.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'relevance':
        default:
          // Keep featured first, then popularity
          results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.popularityScore - a.popularityScore);
          break;
      }
    }

    return { games: results, total: results.length };
  }

  public async getGameById(idOrSlug: string): Promise<Game | null> {
    await new Promise(res => setTimeout(res, 40));
    const found = this.gamesCache.find(g => g.id === idOrSlug || g.slug === idOrSlug);
    return found || null;
  }

  public async getSimilarGames(game: Game, limit = 4): Promise<Game[]> {
    await new Promise(res => setTimeout(res, 40));
    return this.gamesCache
      .filter(g => g.id !== game.id)
      .map(candidate => {
        // Compute shared traits
        const sharedGenres = candidate.genres.filter(gen => game.genres.includes(gen)).length;
        const sharedTags = candidate.tags.filter(tag => game.tags.includes(tag)).length;
        const score = sharedGenres * 2 + sharedTags;
        return { candidate, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.candidate);
  }

  public async getFeaturedGames(): Promise<Game[]> {
    return this.gamesCache.filter(g => g.isFeatured);
  }

  public async getTrendingGames(): Promise<Game[]> {
    return this.gamesCache.filter(g => g.isTrending);
  }

  public async getHighlyRatedGames(limit = 6): Promise<Game[]> {
    return [...this.gamesCache].sort((a, b) => b.rating - a.rating).slice(0, limit);
  }

  public async getHiddenGems(): Promise<Game[]> {
    return this.gamesCache.filter(g => g.isHiddenGem);
  }

  public async getRecentlyReleased(): Promise<Game[]> {
    return [...this.gamesCache]
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .slice(0, 6);
  }
}

export const gameService = new GameService();
