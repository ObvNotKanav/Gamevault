import React from 'react';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Heart,
  Scale,
  Award,
  ArrowRight,
  ShieldCheck,
  Layers,
  Gamepad2,
  Clock,
  Zap
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { GameCard } from '../components/GameCard';
import { PlatformBadge } from '../components/PlatformBadge';
import { RatingBadge } from '../components/RatingBadge';

export const QuizResultsPage: React.FC = () => {
  const {
    quizResults,
    quizAnswers,
    navigateTo,
    toggleWishlist,
    isInWishlist,
    toggleComparison,
    isInComparison
  } = useGameVault();

  if (!quizResults || quizResults.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-white">No Quiz Session Active</h2>
        <p className="text-xs text-slate-400">
          Take the 'Perfect Fit' Quiz to generate recommendations scored transparently against your preferred genres, platforms, time commitment, and gameplay style.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('quiz')}
          className="inline-flex items-center gap-2 rounded-sm bg-[#10b981] px-5 py-2.5 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-all"
        >
          <Sparkles className="h-4 w-4" />
          Start 'Perfect Fit' Quiz
        </button>
      </div>
    );
  }

  const topMatch = quizResults[0];
  const runnersUp = quizResults.slice(1, 7);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Retake button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#10b981] mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Algorithmic Telemetry Match</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Your 'Perfect Fit' Recommendations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculated across genre affinity (35%), hardware platforms (25%), time commitment (20%), and gameplay style (20%).
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('quiz')}
          className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 bg-[#131926] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-[#10b981]/50 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5 text-[#10b981]" />
          <span>Retake Quiz</span>
        </button>
      </div>

      {/* User Parameters Recap Banner */}
      {quizAnswers && (
        <div className="rounded-lg border border-slate-800 bg-[#131926]/90 p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <span className="text-[#10b981] font-bold uppercase">Active Filters:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {quizAnswers.preferredGenres && quizAnswers.preferredGenres.length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#1c2436] px-2.5 py-1 rounded-sm border border-slate-700/80">
                <Layers className="h-3.5 w-3.5 text-[#10b981]" />
                <span className="text-slate-200">{quizAnswers.preferredGenres.slice(0, 3).join(', ')}</span>
              </div>
            )}

            {quizAnswers.platforms && quizAnswers.platforms.length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#1c2436] px-2.5 py-1 rounded-sm border border-slate-700/80">
                <Gamepad2 className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-slate-200">{quizAnswers.platforms.join(', ')}</span>
              </div>
            )}

            {quizAnswers.timeCommitment && (
              <div className="flex items-center gap-1.5 bg-[#1c2436] px-2.5 py-1 rounded-sm border border-slate-700/80">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-slate-200 capitalize">{quizAnswers.timeCommitment.replace('_', ' ')}</span>
              </div>
            )}

            {quizAnswers.gameplayStyle && (
              <div className="flex items-center gap-1.5 bg-[#1c2436] px-2.5 py-1 rounded-sm border border-slate-700/80">
                <Zap className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-slate-200 capitalize">{quizAnswers.gameplayStyle} Style</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOP MATCH HERO SHOWCASE */}
      {topMatch && (
        <section className="relative overflow-hidden rounded-xl border-2 border-[#10b981] bg-linear-to-br from-[#131926] via-[#182233] to-[#0f172a] shadow-[0_0_35px_rgba(16,185,129,0.25)]">
          {/* Top banner */}
          <div className="bg-[#10b981] px-4 py-1.5 flex items-center justify-between text-[#0b0f17] font-bold text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              <span>PRIMARY RECOMMENDATION • HIGHEST SCORING FIT</span>
            </div>
            <span>{topMatch.score.totalPercentage}% COMPATIBILITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
            {/* Left Cover Image */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-lg border border-slate-700 bg-slate-950 aspect-16/10 sm:aspect-4/3">
              <img
                src={topMatch.game.coverImage}
                alt={topMatch.game.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-60" />
              <div className="absolute top-3 left-3">
                <RatingBadge rating={topMatch.game.rating} size="lg" showLabel />
              </div>
            </div>

            {/* Right Match Analysis */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-1">
                  <span>{topMatch.game.releaseYear}</span>
                  <span>•</span>
                  <span>{topMatch.game.developer}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{topMatch.game.priceFormatted}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  {topMatch.game.title}
                </h2>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {topMatch.game.description}
                </p>
              </div>

              {/* WHY THIS MATCHES YOU SECTION */}
              <div className="rounded-lg border border-[#10b981]/30 bg-[#0b0f17]/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10b981] flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    Why This Matches You
                  </span>
                  <span className="font-display text-sm font-bold text-[#10b981]">
                    {topMatch.score.totalPercentage}% Score
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-200">
                  {topMatch.score.reasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                {/* Score breakdown metrics aligned to 100% */}
                <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono text-slate-400">
                  <div className="rounded-xs bg-[#131926] p-2 border border-slate-800">
                    <div className="text-white font-bold text-xs">{topMatch.score.genreScore} / 35</div>
                    <div className="text-slate-400 mt-0.5">Genres (35%)</div>
                  </div>
                  <div className="rounded-xs bg-[#131926] p-2 border border-slate-800">
                    <div className="text-white font-bold text-xs">{topMatch.score.platformScore} / 25</div>
                    <div className="text-slate-400 mt-0.5">Platforms (25%)</div>
                  </div>
                  <div className="rounded-xs bg-[#131926] p-2 border border-slate-800">
                    <div className="text-white font-bold text-xs">{topMatch.score.timeScore} / 20</div>
                    <div className="text-slate-400 mt-0.5">Time Length (20%)</div>
                  </div>
                  <div className="rounded-xs bg-[#131926] p-2 border border-slate-800">
                    <div className="text-white font-bold text-xs">{topMatch.score.styleScore} / 20</div>
                    <div className="text-slate-400 mt-0.5">Style & Pace (20%)</div>
                  </div>
                </div>
              </div>

              {/* Supported hardware & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {topMatch.game.platforms.map(p => (
                    <PlatformBadge key={p} platform={p} compact />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleComparison(topMatch.game)}
                    className={`p-2.5 rounded-sm border text-xs font-semibold ${
                      isInComparison(topMatch.game.id)
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                        : 'bg-[#1c2436] border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title="Compare"
                  >
                    <Scale className="h-4 w-4" />
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(topMatch.game)}
                    className={`inline-flex items-center gap-1.5 rounded-sm border px-3.5 py-2 text-xs font-semibold transition-colors ${
                      isInWishlist(topMatch.game.id)
                        ? 'bg-rose-950/90 border-rose-500 text-rose-300 font-bold shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                        : 'bg-[#1c2436] border-slate-700 text-slate-200 hover:text-rose-300 hover:border-rose-900'
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${isInWishlist(topMatch.game.id) ? 'fill-rose-400 text-rose-400' : ''}`} />
                    <span>{isInWishlist(topMatch.game.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('game-detail', topMatch.game.id)}
                    className="inline-flex items-center gap-1.5 rounded-sm bg-[#10b981] px-4 py-2 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-all"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RUNNER-UP RECOMMENDATIONS */}
      {runnersUp.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-white">Strong Runner-Up Recommendations</h3>
              <p className="text-xs text-slate-400">Other high-affinity matches that closely align with your parameters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {runnersUp.map(item => (
              <div key={item.game.id} className="relative flex flex-col">
                {/* Match percentage floating header */}
                <div className="absolute top-2 left-2 z-20 rounded-xs bg-[#10b981] px-2 py-0.5 text-[11px] font-mono font-bold text-[#0b0f17] shadow-md">
                  {item.score.totalPercentage}% Match
                </div>
                <GameCard game={item.game} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
