import React from 'react';
import { Platform } from '../types';

interface PlatformBadgeProps {
  platform: Platform;
  compact?: boolean;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform, compact = false }) => {
  // Shorten for compact views
  const getShortName = (p: Platform) => {
    switch (p) {
      case 'PlayStation 5':
        return compact ? 'PS5' : 'PS5';
      case 'PlayStation 4':
        return compact ? 'PS4' : 'PS4';
      case 'Xbox Series X/S':
        return compact ? 'XSX' : 'Xbox Series';
      case 'Xbox One':
        return compact ? 'XBO' : 'Xbox One';
      case 'Nintendo Switch':
        return compact ? 'Switch' : 'Switch';
      case 'Steam Deck':
        return compact ? 'Deck' : 'Steam Deck';
      default:
        return p;
    }
  };

  return (
    <span className="inline-flex items-center rounded-sm bg-[#131926]/90 px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-slate-300 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors">
      {getShortName(platform)}
    </span>
  );
};
