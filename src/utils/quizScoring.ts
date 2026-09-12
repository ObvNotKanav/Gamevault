import { Game, QuizAnswers, MatchResult, MatchScoreBreakdown, Platform, Genre } from '../types';

/**
 * GameVault Transparent Scoring Engine
 * Calibrates game recommendations based on:
 * - Preferred Genres: 35%
 * - Supported Platforms: 25%
 * - Time Commitment / Playtime: 20%
 * - Gameplay Style & Challenge: 20%
 * Total = 100%
 */
export function calculateGameMatch(game: Game, answers: QuizAnswers): MatchScoreBreakdown {
  const reasons: string[] = [];

  // ==========================================
  // 1. PREFERRED GENRES (Max 35 points)
  // ==========================================
  let genreScore = 18; // baseline neutral
  const selectedGenres = answers.preferredGenres || [];

  if (selectedGenres.length > 0) {
    const matchingGenres = game.genres.filter(g => selectedGenres.includes(g));
    if (matchingGenres.length >= 2) {
      genreScore = 35;
      reasons.push(`Direct match for your preferred ${matchingGenres.join(' & ')} genres`);
    } else if (matchingGenres.length === 1) {
      genreScore = 28;
      reasons.push(`Features your favorite ${matchingGenres[0]} genre`);
    } else {
      // Check related genre affinities
      const hasRelated = game.genres.some(g => {
        if (selectedGenres.includes('RPG') && (g === 'Adventure' || g === 'Action')) return true;
        if (selectedGenres.includes('Action') && (g === 'Shooter' || g === 'Fighting')) return true;
        if (selectedGenres.includes('Strategy') && (g === 'Roguelike' || g === 'Puzzle')) return true;
        if (selectedGenres.includes('Indie') && (g === 'Metroidvania' || g === 'Adventure')) return true;
        return false;
      });
      genreScore = hasRelated ? 18 : 8;
    }
  } else if (answers.q1_mood) {
    // Legacy fallback
    const mood = answers.q1_mood.toLowerCase();
    if (mood.includes('story') && (game.genres.includes('RPG') || game.genres.includes('Adventure'))) {
      genreScore = 35;
      reasons.push(`Tailor-made for rich storytelling & immersive adventures`);
    } else if (mood.includes('action') && (game.genres.includes('Action') || game.genres.includes('Shooter'))) {
      genreScore = 35;
      reasons.push(`High-octane action and fast combat mechanics`);
    } else if (mood.includes('relax') && (game.genres.includes('Simulation') || game.tags.includes('Cozy'))) {
      genreScore = 35;
      reasons.push(`Comforting atmosphere with zero stressful pressure`);
    } else if (mood.includes('strateg') && (game.genres.includes('Strategy') || game.genres.includes('Roguelike'))) {
      genreScore = 35;
      reasons.push(`Deep tactical thinking and rewarding synergies`);
    } else {
      genreScore = 22;
    }
  }

  // ==========================================
  // 2. PLATFORMS HARDWARE (Max 25 points)
  // ==========================================
  let platformScore = 25;
  const userPlatforms = answers.platforms || answers.q2_platforms || [];

  if (userPlatforms.length > 0) {
    const matchedHardware = userPlatforms.filter(p => game.platforms.includes(p));
    if (matchedHardware.length > 0) {
      platformScore = 25;
      reasons.push(`Native support for your ${matchedHardware.slice(0, 2).join(' & ')}`);
    } else {
      platformScore = 2; // severe penalty if user cannot play on their hardware
    }
  }

  // ==========================================
  // 3. TIME COMMITMENT (Max 20 points)
  // ==========================================
  let timeScore = 14;
  const timeCommitment = answers.timeCommitment || answers.q3_timeAvailable;
  const mainHours = game.playtimeHours.mainStory;

  if (timeCommitment) {
    if (timeCommitment === 'bite_sized' || timeCommitment === 'short') {
      // Prefers games under 18h or procedural roguelikes with quick runs
      if (mainHours <= 18 || game.genres.includes('Roguelike')) {
        timeScore = 20;
        reasons.push(`Bite-sized pacing with quick drop-in sessions (${mainHours}h story)`);
      } else if (mainHours <= 30) {
        timeScore = 14;
      } else {
        timeScore = 6;
      }
    } else if (timeCommitment === 'moderate' || timeCommitment === 'medium') {
      // 15 - 35 hours
      if (mainHours >= 15 && mainHours <= 38) {
        timeScore = 20;
        reasons.push(`Balanced campaign length (${mainHours}h main quest)`);
      } else if (mainHours < 15) {
        timeScore = 16;
      } else {
        timeScore = 13;
      }
    } else if (timeCommitment === 'deep' || timeCommitment === 'long') {
      // 35 - 70 hours
      if (mainHours >= 30 && mainHours <= 75) {
        timeScore = 20;
        reasons.push(`Expansive journey with deep progression (${mainHours}h campaign)`);
      } else if (mainHours > 75) {
        timeScore = 17;
      } else {
        timeScore = 12;
      }
    } else if (timeCommitment === 'epic') {
      // 60+ hours epic marathons
      if (mainHours >= 50 || game.playtimeHours.completionist >= 90) {
        timeScore = 20;
        reasons.push(`Monumental scale with massive world to master (${game.playtimeHours.completionist}h completion)`);
      } else {
        timeScore = 10;
      }
    }
  }

  // ==========================================
  // 4. GAMEPLAY STYLE & CHALLENGE (Max 20 points)
  // ==========================================
  let styleScore = 15;
  const style = answers.gameplayStyle;

  if (style) {
    if (style === 'action') {
      if (game.genres.includes('Action') || game.genres.includes('Shooter') || game.genres.includes('Fighting')) {
        styleScore = 20;
        reasons.push(`Electrifying real-time combat and reflex-driven flow`);
      } else {
        styleScore = 8;
      }
    } else if (style === 'tactical') {
      if (game.genres.includes('Strategy') || game.genres.includes('Roguelike') || game.genres.includes('Puzzle')) {
        styleScore = 20;
        reasons.push(`Deep tactical decision-making and calculated systems`);
      } else {
        styleScore = 8;
      }
    } else if (style === 'relaxed') {
      if (game.difficulty === 'Relaxed' || game.genres.includes('Simulation') || game.tags.includes('Cozy')) {
        styleScore = 20;
        reasons.push(`Chill, welcoming pace with zero stressful penalties`);
      } else {
        styleScore = 6;
      }
    } else if (style === 'narrative') {
      if (game.narrativeDepth >= 4 || game.genres.includes('RPG') || game.tags.includes('Choices Matter')) {
        styleScore = 20;
        reasons.push(`Compelling narrative arc with meaningful dialogue & choices`);
      } else {
        styleScore = 10;
      }
    } else if (style === 'challenging') {
      if (game.difficulty === 'Challenging' || game.difficulty === 'Hardcore' || game.tags.includes('Souls-like')) {
        styleScore = 20;
        reasons.push(`Tough, rewarding trial of reflex discipline and mastery`);
      } else {
        styleScore = 8;
      }
    } else if (style === 'multiplayer') {
      if (game.gameModes.includes('Multiplayer') || game.gameModes.includes('Co-op') || game.gameModes.includes('PvP')) {
        styleScore = 20;
        reasons.push(`Built for thriving squad collaboration or competitive action`);
      } else {
        styleScore = 6;
      }
    }
  } else if (answers.q4_experience) {
    // Legacy fallback
    if (answers.q4_experience === 'solo' && game.gameModes.includes('Single-player')) {
      styleScore = 20;
      reasons.push(`Exceptional dedicated solo experience`);
    } else if (answers.q4_experience === 'multiplayer' && !game.gameModes.includes('Single-player')) {
      styleScore = 20;
    }
  }

  // Story & Difficulty minor nudges if provided
  if (answers.storyImportance !== undefined || answers.q5_storyImportance !== undefined) {
    const storyTier = answers.storyImportance ?? answers.q5_storyImportance ?? 3;
    const diff = Math.abs(game.narrativeDepth - storyTier);
    if (diff === 0) styleScore = Math.min(20, styleScore + 2);
    else if (diff >= 3) styleScore = Math.max(5, styleScore - 2);
  }

  if (answers.difficulty || answers.q6_difficulty) {
    const targetDiff = answers.difficulty || answers.q6_difficulty;
    if (game.difficulty === targetDiff) {
      styleScore = Math.min(20, styleScore + 2);
    }
  }

  const rawSum = genreScore + platformScore + timeScore + styleScore;
  const totalPercentage = Math.min(99, Math.max(20, Math.round(rawSum)));

  return {
    genreScore,
    platformScore,
    timeScore,
    styleScore,
    totalPercentage,
    reasons: reasons.slice(0, 3)
  };
}

export function rankGamesForQuiz(games: Game[], answers: QuizAnswers): MatchResult[] {
  const scored = games.map(game => ({
    game,
    score: calculateGameMatch(game, answers)
  }));

  // Sort descending by total score, then by game rating
  return scored.sort((a, b) => {
    if (b.score.totalPercentage !== a.score.totalPercentage) {
      return b.score.totalPercentage - a.score.totalPercentage;
    }
    return b.game.rating - a.game.rating;
  });
}
