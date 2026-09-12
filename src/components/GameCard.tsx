import React from 'react';
import { Bookmark, Sparkles, Scale, Check, ChevronRight, Heart } from 'lucide-react';
import { Game } from '../types';
import { useGameVault } from '../context/GameVaultContext';
import { RatingBadge } from './RatingBadge';
import { PlatformBadge } from './PlatformBadge';

interface GameCardProps {
  game: Game;
  variant?: 'standard' | 'compact' | 'horizontal';
  showComparisonToggle?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  variant = 'standard',
  showComparisonToggle = true
}) => {
  const {
    navigateTo,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getLibraryItem,
    toggleComparison,
    isInComparison
  } = useGameVault();

  const isSaved = !!getLibraryItem(game.id);
  const inWishlist = isInWishlist(game.id);
  const inComparison = isInComparison(game.id);

  const handleCardClick = () => {
    navigateTo('game-detail', game.id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(game);
  };

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComparison(game);
  };

  if (variant === 'horizontal') {
    return (
      <div
        onClick={handleCardClick}
        className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-md border border-slate-800 bg-[#131926] transition-all duration-300 hover:border-[#10b981]/50 hover:shadow-[0_8px_24px_-6px_rgba(16,185,129,0.15)] cursor-pointer"
      >
        <div className="relative w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden bg-slate-900">
          <img
            src={game.coverImage}
            alt={game.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-[#131926]/80" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {game.isHiddenGem && (
                  <span className="inline-flex items-center gap-1 rounded-sm bg-cyan-950/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 border border-cyan-500/40">
                    <Sparkles className="h-2.5 w-2.5" />
                    Hidden Gem
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">{game.releaseYear}</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">{game.developer}</span>
              </div>
              <RatingBadge rating={game.rating} />
            </div>

            <h3 className="font-display text-lg font-bold text-slate-100 group-hover:text-[#10b981] transition-colors line-clamp-1">
              {game.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400 line-clamp-2">{game.tagline || game.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {game.genres.slice(0, 3).map(genre => (
                <span
                  key={genre}
                  className="rounded-sm bg-slate-800/70 px-2 py-0.5 text-xs text-slate-300 border border-slate-700/50"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60">
            <div className="flex flex-wrap items-center gap-1.5">
              {game.platforms.slice(0, 4).map(p => (
                <PlatformBadge key={p} platform={p} compact />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {showComparisonToggle && (
                <button
                  type="button"
                  onClick={handleComparisonToggle}
                  className={`p-2 rounded-sm border text-xs transition-colors ${
                    inComparison
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                      : 'bg-[#1c2436] border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                  title={inComparison ? 'Remove from comparison' : 'Add to compare'}
                >
                  <Scale className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`p-2 rounded-sm border text-xs transition-colors ${
                  inWishlist
                    ? 'bg-rose-950/90 border-rose-500 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    : 'bg-[#1c2436] border-slate-700 text-slate-400 hover:text-rose-400 hover:border-slate-500'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`h-4 w-4 ${inWishlist ? 'fill-rose-400 text-rose-400' : ''}`} />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-sm bg-[#10b981] px-3 py-1.5 text-xs font-semibold text-[#0b0f17] hover:bg-[#34d399] transition-all"
              >
                Details
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard vertical card
  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-md border border-slate-800 bg-[#131926] transition-all duration-300 hover:-translate-y-1 hover:border-[#10b981]/50 hover:shadow-[0_8px_24px_-6px_rgba(16,185,129,0.2)] cursor-pointer"
    >
      {/* Artwork Header */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950">
        <img
          src={game.coverImage}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
          {game.isHiddenGem ? (
            <span className="inline-flex items-center gap-1 rounded-sm bg-cyan-950/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-cyan-300 border border-cyan-500/50 shadow-md">
              <Sparkles className="h-2.5 w-2.5" />
              Hidden Gem
            </span>
          ) : game.isFeatured ? (
            <span className="inline-flex items-center rounded-sm bg-emerald-950/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300 border border-emerald-500/50">
              Featured
            </span>
          ) : (
            <span className="text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
              {game.releaseYear}
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <RatingBadge rating={game.rating} size="sm" />
          </div>
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          {showComparisonToggle && (
            <button
              type="button"
              onClick={handleComparisonToggle}
              className={`p-1.5 rounded-sm backdrop-blur-md border transition-all ${
                inComparison
                  ? 'bg-cyan-900/90 border-cyan-400 text-cyan-200'
                  : 'bg-black/60 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
              }`}
              title={inComparison ? 'In comparison' : 'Compare'}
            >
              <Scale className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`p-1.5 rounded-sm backdrop-blur-md border transition-all ${
              inWishlist
                ? 'bg-rose-950/90 border-rose-500 text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                : 'bg-black/60 border-slate-700 text-slate-300 hover:text-rose-400 hover:border-slate-500'
            }`}
            title={inWishlist ? 'In Wishlist (Click to remove)' : 'Add to Wishlist'}
            aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`h-3.5 w-3.5 ${inWishlist ? 'fill-rose-400 text-rose-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>{game.developer}</span>
            <span className="text-slate-300 font-semibold">{game.priceFormatted}</span>
          </div>

          <h3 className="font-display text-base font-bold text-slate-100 group-hover:text-[#10b981] transition-colors line-clamp-1">
            {game.title}
          </h3>

          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.tagline}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {game.genres.slice(0, 3).map(genre => (
              <span
                key={genre}
                className="rounded-sm bg-[#1c2436] px-1.5 py-0.5 text-[11px] text-slate-300 border border-slate-800"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info: Platforms & Details link */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex flex-wrap gap-1 max-w-[65%] overflow-hidden">
            {game.platforms.slice(0, 3).map(p => (
              <PlatformBadge key={p} platform={p} compact />
            ))}
          </div>

          <span className="text-xs font-semibold text-[#10b981] group-hover:text-[#34d399] inline-flex items-center gap-0.5">
            Inspect
            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
