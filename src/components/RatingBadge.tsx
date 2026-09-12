import React from 'react';

interface RatingBadgeProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, size = 'md', showLabel = false }) => {
  // Score styling logic
  let colorStyles = 'bg-emerald-950/70 text-[#10b981] border-[#10b981]/30';
  if (rating >= 90) {
    colorStyles = 'bg-emerald-950/80 text-[#34d399] border-[#34d399]/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
  } else if (rating >= 80) {
    colorStyles = 'bg-teal-950/70 text-[#2dd4bf] border-[#2dd4bf]/30';
  } else if (rating >= 70) {
    colorStyles = 'bg-cyan-950/70 text-[#38bdf8] border-[#38bdf8]/30';
  } else {
    colorStyles = 'bg-amber-950/70 text-amber-400 border-amber-500/30';
  }

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 font-bold',
    md: 'text-sm px-2 py-0.5 font-bold',
    lg: 'text-base px-3 py-1 font-bold'
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-sm border font-mono tracking-tight ${sizeClasses} ${colorStyles}`}
      title={`Metascore: ${rating}/100`}
    >
      <span>{rating}</span>
      {showLabel && <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-slate-400">Score</span>}
    </div>
  );
};
