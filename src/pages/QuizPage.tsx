import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Layers,
  Gamepad2,
  Clock,
  Zap,
  Sword,
  Shield,
  Heart,
  BookOpen
} from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';
import { gameService } from '../services/gameService';
import { QuizAnswers, Platform, Genre, Difficulty } from '../types';
import { rankGamesForQuiz } from '../utils/quizScoring';

const AVAILABLE_GENRES: { name: Genre; icon: string; desc: string }[] = [
  { name: 'RPG', icon: '⚔️', desc: 'Character builds, dialogue, leveling & epic lore' },
  { name: 'Action', icon: '⚡', desc: 'Fast reflex combat, snappy movement & thrills' },
  { name: 'Adventure', icon: '🗺️', desc: 'Exploration, puzzles, quests & environmental mystery' },
  { name: 'Roguelike', icon: '🎲', desc: 'Procedural runs, synergy crafting & high replayability' },
  { name: 'Strategy', icon: '♟️', desc: 'Calculated tactics, resource planning & squad synergy' },
  { name: 'Shooter', icon: '🎯', desc: 'Gunplay precision, tactical loadouts & team warfare' },
  { name: 'Indie', icon: '✨', desc: 'Innovative artistic visions, unique loops & heartfelt stories' },
  { name: 'Simulation', icon: '🏡', desc: 'Cozy routines, town building, farming & relaxing life-sims' },
  { name: 'Metroidvania', icon: '🗝️', desc: 'Interconnected map exploration & ability-gated progression' },
  { name: 'Horror', icon: '👁️', desc: 'Atmospheric dread, survival pressure & tension' }
];

export const QuizPage: React.FC = () => {
  const { saveQuizResults, navigateTo } = useGameVault();

  // Current step 0 to 5
  const [currentStep, setCurrentStep] = useState(0);

  // User answers state
  const [answers, setAnswers] = useState<QuizAnswers>({
    preferredGenres: ['RPG', 'Action', 'Adventure'],
    platforms: ['PC', 'PlayStation 5'],
    timeCommitment: 'moderate',
    gameplayStyle: 'action',
    difficulty: 'Moderate',
    storyImportance: 4,
    // Legacy fallback bindings
    q1_mood: 'A Story-Driven Adventure',
    q2_platforms: ['PC', 'PlayStation 5'],
    q3_timeAvailable: 'medium',
    q4_experience: 'solo',
    q5_storyImportance: 4,
    q6_difficulty: 'Moderate'
  });

  const [calculating, setCalculating] = useState(false);

  // 1. Preferred Genres Toggle
  const handleToggleGenre = (genre: Genre) => {
    setAnswers(prev => {
      const list = prev.preferredGenres || [];
      const updated = list.includes(genre)
        ? list.filter(g => g !== genre)
        : [...list, genre];
      return {
        ...prev,
        preferredGenres: updated.length > 0 ? updated : [genre]
      };
    });
  };

  // 2. Platform Toggle
  const handleTogglePlatform = (platform: Platform) => {
    setAnswers(prev => {
      const list = prev.platforms || [];
      const updated = list.includes(platform)
        ? list.filter(p => p !== platform)
        : [...list, platform];
      const nextPlatforms = updated.length > 0 ? updated : [platform];
      return {
        ...prev,
        platforms: nextPlatforms,
        q2_platforms: nextPlatforms
      };
    });
  };

  // Submit Quiz and calculate scores
  const handleCompleteQuiz = async () => {
    setCalculating(true);
    try {
      const allGamesRes = await gameService.getGames();
      const scoredResults = rankGamesForQuiz(allGamesRes.games, answers);
      saveQuizResults(answers, scoredResults);
    } catch (err) {
      console.error('Failed to compute quiz recommendations:', err);
    } finally {
      setCalculating(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleCompleteQuiz();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('home');
    }
  };

  const progressPercent = Math.round(((currentStep + 1) / 6) * 100);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Quiz Header & Step Counter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="p-1.5 rounded-sm border border-slate-700 bg-[#131926] text-slate-300 hover:text-white transition-colors"
              title="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10b981]">
              The 'Perfect Fit' Quiz
            </span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Step <span className="text-white font-bold">{currentStep + 1}</span> of 6
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1c2436]">
          <div
            className="h-full bg-linear-to-r from-[#10b981] to-cyan-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Container */}
      <div className="rounded-xl border border-slate-800 bg-[#131926] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* STEP 1: PREFERRED GENRES (Multi-Select) */}
        {currentStep === 0 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#10b981] font-semibold mb-1">
                <Layers className="h-3.5 w-3.5" />
                <span>Primary Affinity Vector (35% Weight)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Which video game genres do you love or want to explore?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                Choose one or more genres. We'll prioritize games that match your selections or share related gameplay systems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {AVAILABLE_GENRES.map(g => {
                const isSelected = (answers.preferredGenres || []).includes(g.name);
                return (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => handleToggleGenre(g.name)}
                    className={`flex items-start gap-3 p-3.5 rounded-md border text-left transition-all ${
                      isSelected
                        ? 'border-[#10b981] bg-[#10b981]/15 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-[#10b981]/40'
                        : 'border-slate-800 bg-[#1c2436]/70 hover:border-slate-700 hover:bg-[#1c2436]'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{g.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isSelected ? 'text-[#10b981]' : 'text-slate-100'}`}>
                          {g.name}
                        </span>
                        {isSelected && <Check className="h-4 w-4 text-[#10b981] shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">{g.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: PLATFORMS (Multi-Select) */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
                <Gamepad2 className="h-3.5 w-3.5" />
                <span>Hardware Compatibility Vector (25% Weight)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                What gaming platforms do you have access to?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                Select all devices you own. Recommendations strictly prioritize games natively available on your hardware.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { id: 'PC', label: 'PC (Windows / Steam / Epic)', desc: 'High framerates, mouse & keyboard or controller flexibility.' },
                { id: 'PlayStation 5', label: 'PlayStation 5', desc: 'DualSense haptics, exclusive blockbusters & high performance.' },
                { id: 'Xbox Series X/S', label: 'Xbox Series X / S', desc: 'Game Pass ecosystem, Quick Resume & cloud synchronization.' },
                { id: 'Nintendo Switch', label: 'Nintendo Switch', desc: 'Hybrid console & handheld flexibility for home or transit.' },
                { id: 'Steam Deck', label: 'Steam Deck / Handheld PC', desc: 'Portable PC gaming with verified battery-friendly compatibility.' }
              ].map(opt => {
                const isSelected = (answers.platforms || []).includes(opt.id as Platform);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleTogglePlatform(opt.id as Platform)}
                    className={`w-full flex items-center justify-between p-4 rounded-md border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40 shadow-sm'
                        : 'border-slate-800 bg-[#1c2436]/70 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{opt.label}</span>
                        {isSelected && (
                          <span className="rounded-xs bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-mono text-cyan-300">
                            Available
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-xs border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500 text-[#0b0f17]'
                          : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: TIME COMMITMENT */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold mb-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Pacing & Duration Vector (20% Weight)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                What is your current time commitment or desired game length?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                Whether you want quick bite-sized runs or a massive 100-hour world to sink months into.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                {
                  id: 'bite_sized',
                  legacy: 'short',
                  title: 'Bite-Sized & Drop-In',
                  time: '15–30 min sessions (<15h total)',
                  icon: '⏱️',
                  desc: 'Quick procedural runs, easy save checkpoints, and immediate satisfaction without cognitive overload.'
                },
                {
                  id: 'moderate',
                  legacy: 'medium',
                  title: 'Moderate & Focused',
                  time: '1–2 hr sessions (20–35h campaign)',
                  icon: '⏳',
                  desc: 'A complete, well-paced story with meaningful progression each night and no filler bloat.'
                },
                {
                  id: 'deep',
                  legacy: 'long',
                  title: 'Deep Journey',
                  time: '2–3 hr sessions (40–70h rich progression)',
                  icon: '🌙',
                  desc: 'Expansive side quests, deep skill trees, intricate mechanics, and high exploration rewards.'
                },
                {
                  id: 'epic',
                  legacy: 'epic',
                  title: 'Epic Marathon',
                  time: 'Heavy investment (80–120+ hours)',
                  icon: '🌌',
                  desc: 'Massive sandbox scale, endless build crafting, huge maps, and endless endgame mastery.'
                }
              ].map(item => {
                const isSelected = answers.timeCommitment === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setAnswers(p => ({
                        ...p,
                        timeCommitment: item.id as any,
                        q3_timeAvailable: item.legacy as any
                      }))
                    }
                    className={`flex items-start gap-3 p-4 rounded-md border text-left transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-950/25 ring-1 ring-amber-400/40 shadow-sm'
                        : 'border-slate-800 bg-[#1c2436]/70 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-slate-100'}`}>
                          {item.title}
                        </h3>
                        {isSelected && <Check className="h-4 w-4 text-amber-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] font-mono text-slate-300 mt-0.5">{item.time}</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: GAMEPLAY STYLE */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-semibold mb-1">
                <Zap className="h-3.5 w-3.5" />
                <span>Pacing & Engagement Vector (20% Weight)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                What gameplay style and mental flow engages you most?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                Choose the interaction rhythm that matches your mood right now.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                {
                  id: 'action',
                  title: 'Fast Reflex Action & Combat',
                  desc: 'Snappy movement, visceral weapon feedback, dodging, and high-energy adrenaline rushes.',
                  icon: '⚡'
                },
                {
                  id: 'tactical',
                  title: 'Deep Tactical & Strategic Planning',
                  desc: 'Synergy discovery, calculated decisions, deckbuilding, and thoughtful turn-based systems.',
                  icon: '♟️'
                },
                {
                  id: 'relaxed',
                  title: 'Relaxed Exploration & Cozy Flow',
                  desc: 'Gentle atmosphere, no fail states, calming audio, and welcoming low-stress gameplay loops.',
                  icon: '☕'
                },
                {
                  id: 'narrative',
                  title: 'Rich Narrative & Cinematic Immersion',
                  desc: 'Memorable characters, world-class writing, impactful moral dilemmas, and cinematic pacing.',
                  icon: '📖'
                },
                {
                  id: 'challenging',
                  title: 'Hardcore Mastery & High Stakes',
                  desc: 'Demanding precision, tight boss patterns, learning from defeat, and triumph through skill.',
                  icon: '⚔️'
                },
                {
                  id: 'multiplayer',
                  title: 'Squad Synergy or Competition',
                  desc: 'Teaming up with friends, coordinated co-op tactics, or testing skills against online players.',
                  icon: '👥'
                }
              ].map(item => {
                const isSelected = answers.gameplayStyle === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAnswers(p => ({ ...p, gameplayStyle: item.id as any }))}
                    className={`flex items-start gap-3 p-4 rounded-md border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-950/25 ring-1 ring-indigo-400/40 shadow-sm'
                        : 'border-slate-800 bg-[#1c2436]/70 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold ${isSelected ? 'text-indigo-300' : 'text-slate-100'}`}>
                          {item.title}
                        </h3>
                        {isSelected && <Check className="h-4 w-4 text-indigo-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: DIFFICULTY PREFERENCE */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold mb-1">
                <Shield className="h-3.5 w-3.5" />
                <span>Challenge Calibration</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                What difficulty level feels most rewarding to you?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                Calibrate how punishing encounters should be and how strictly mistakes are penalized.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                {
                  id: 'Relaxed',
                  title: 'Relaxed & Accessible',
                  icon: '🌸',
                  desc: 'Story-first or gentle progression with generous checkpoints and zero frustrating roadblocks.'
                },
                {
                  id: 'Moderate',
                  title: 'Balanced & Engaging',
                  icon: '⚖️',
                  desc: 'Standard fair challenge with steady learning, satisfying overcoming of hurdles without hair-pulling.'
                },
                {
                  id: 'Challenging',
                  title: 'Demanding Mastery',
                  icon: '⚔️',
                  desc: 'Requires build optimization, fast reaction times, and learning enemy patterns meticulously.'
                },
                {
                  id: 'Hardcore',
                  title: 'Extremely Punishing',
                  icon: '💀',
                  desc: 'Unforgiving Souls-like difficulty, strict stamina/punish windows, and high-intensity boss tests.'
                }
              ].map(item => {
                const isSelected = answers.difficulty === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setAnswers(p => ({
                        ...p,
                        difficulty: item.id as Difficulty,
                        q6_difficulty: item.id as Difficulty
                      }))
                    }
                    className={`flex items-start gap-3 p-4 rounded-md border text-left transition-all ${
                      isSelected
                        ? 'border-[#10b981] bg-[#10b981]/15 ring-1 ring-[#10b981]/40'
                        : 'border-slate-800 bg-[#1c2436]/70 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold ${isSelected ? 'text-[#10b981]' : 'text-slate-100'}`}>
                          {item.title}
                        </h3>
                        {isSelected && <Check className="h-4 w-4 text-[#10b981] shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: NARRATIVE VS MECHANICS (Story Depth) */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Story & Lore Calibration</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                How essential is storytelling and narrative depth?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                Slider from pure arcade gameplay with no cutscenes (1) to literary masterpiece with branching choices (5).
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Pure Gameplay First</span>
                <span className="text-base font-display font-bold text-[#10b981]">
                  Tier {answers.storyImportance || 4} of 5
                </span>
                <span>Literary Cinematic Drama</span>
              </div>

              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={answers.storyImportance || 4}
                onChange={e => {
                  const val = Number(e.target.value);
                  setAnswers(p => ({
                    ...p,
                    storyImportance: val,
                    q5_storyImportance: val
                  }));
                }}
                className="w-full accent-[#10b981] h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-mono text-slate-400">
                <span className={answers.storyImportance === 1 ? 'text-[#10b981] font-bold' : ''}>1: Pure Action</span>
                <span className={answers.storyImportance === 2 ? 'text-[#10b981] font-bold' : ''}>2: Light Lore</span>
                <span className={answers.storyImportance === 3 ? 'text-[#10b981] font-bold' : ''}>3: Balanced</span>
                <span className={answers.storyImportance === 4 ? 'text-[#10b981] font-bold' : ''}>4: Deep Plot</span>
                <span className={answers.storyImportance === 5 ? 'text-[#10b981] font-bold' : ''}>5: Masterpiece</span>
              </div>

              <div className="rounded-md border border-slate-800 bg-[#0b0f17] p-4 text-xs text-slate-300">
                {answers.storyImportance === 5 && (
                  <p>Prioritizes unforgettable dialogue, moral dilemmas, and narrative reactivity like Baldur's Gate 3 or Disco Elysium.</p>
                )}
                {answers.storyImportance === 4 && (
                  <p>Rich lore, cinematic setpieces, and immersive character development with compelling stakes.</p>
                )}
                {answers.storyImportance === 3 && (
                  <p>A satisfying narrative backdrop that gives purpose to your actions without long-winded cinematic pauses.</p>
                )}
                {answers.storyImportance === 2 && (
                  <p>Minimal narrative hurdles; immediate gameplay focus with light environmental storytelling.</p>
                )}
                {answers.storyImportance === 1 && (
                  <p>Zero interest in story cutscenes. Maximum focus on pure mechanics, roguelike loops, or reflex action.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentStep === 0 ? 'Cancel Quiz' : 'Previous Step'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={calculating}
            className="inline-flex items-center gap-2 rounded-sm bg-[#10b981] px-6 py-2.5 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-all shadow-[0_0_16px_rgba(16,185,129,0.3)] disabled:opacity-50"
          >
            {calculating ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#0b0f17] border-t-transparent" />
                <span>Computing Scoring Vectors...</span>
              </>
            ) : currentStep === 5 ? (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Recommendations</span>
              </>
            ) : (
              <>
                <span>Next Step</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
