export const BADGES = [
  // Streak badges
  { id: 'streak_3', name: '3-Day Streak', description: 'Practice 3 days in a row', icon: '🔥', category: 'streak', condition: (p) => p.streak >= 3 },
  { id: 'streak_7', name: 'Week Warrior', description: 'Practice 7 days in a row', icon: '⚡', category: 'streak', condition: (p) => p.streak >= 7 },
  { id: 'streak_30', name: 'Monthly Devotion', description: 'Practice 30 days in a row', icon: '💎', category: 'streak', condition: (p) => p.streak >= 30 },

  // XP badges
  { id: 'xp_100', name: 'First Steps', description: 'Earn 100 XP', icon: '⭐', category: 'xp', condition: (p) => p.totalXP >= 100 },
  { id: 'xp_500', name: 'Getting Serious', description: 'Earn 500 XP', icon: '🌟', category: 'xp', condition: (p) => p.totalXP >= 500 },
  { id: 'xp_1000', name: 'Dedicated Student', description: 'Earn 1,000 XP', icon: '🏆', category: 'xp', condition: (p) => p.totalXP >= 1000 },
  { id: 'xp_5000', name: 'Guitar Hero', description: 'Earn 5,000 XP', icon: '🎸', category: 'xp', condition: (p) => p.totalXP >= 5000 },

  // Lesson badges
  { id: 'first_lesson', name: 'First Lesson', description: 'Complete your first lesson', icon: '🎯', category: 'lessons', condition: (p) => p.completedLessons.length >= 1 },
  { id: 'five_lessons', name: 'Five Down', description: 'Complete 5 lessons', icon: '📚', category: 'lessons', condition: (p) => p.completedLessons.length >= 5 },
  { id: 'ten_lessons', name: 'Ten Lessons', description: 'Complete 10 lessons', icon: '🎓', category: 'lessons', condition: (p) => p.completedLessons.length >= 10 },
  { id: 'level_1_complete', name: 'Level 1 Complete', description: 'Finish all Level 1 lessons', icon: '🥉', category: 'levels', condition: (p) => p.completedLevels?.includes(1) },
  { id: 'level_2_complete', name: 'Level 2 Complete', description: 'Finish all Level 2 lessons', icon: '🥈', category: 'levels', condition: (p) => p.completedLevels?.includes(2) },
  { id: 'level_3_complete', name: 'Level 3 Complete', description: 'Finish all Level 3 lessons', icon: '🥇', category: 'levels', condition: (p) => p.completedLevels?.includes(3) },

  // Song badges
  { id: 'first_song', name: 'First Song', description: 'Complete your first song lesson', icon: '🎵', category: 'songs', condition: (p) => p.completedSongs?.length >= 1 },
  { id: 'five_songs', name: 'Repertoire', description: 'Learn 5 songs', icon: '🎶', category: 'songs', condition: (p) => p.completedSongs?.length >= 5 },

  // Chord badges
  { id: 'open_chords', name: 'Open String Player', description: 'Learn all 5 open chords (G, C, D, Em, Am)', icon: '✋', category: 'chords', condition: (p) => ['L1-5','L1-6','L1-7','L1-8','L1-9'].every(id => p.completedLessons.includes(id)) },
  { id: 'barre_chord', name: 'Barre Champion', description: 'Complete the F major barre chord lesson', icon: '💪', category: 'chords', condition: (p) => p.completedLessons.includes('L3-1') },

  // Special badges
  { id: 'early_bird', name: 'Early Bird', description: 'Practice before 8am', icon: '🌅', category: 'special', condition: (p) => p.specialFlags?.earlyBird },
  { id: 'night_owl', name: 'Night Owl', description: 'Practice after 10pm', icon: '🦉', category: 'special', condition: (p) => p.specialFlags?.nightOwl },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Use the metronome at 180+ BPM', icon: '⚡', category: 'special', condition: (p) => p.specialFlags?.speedDemon },
]

export const checkNewBadges = (progress, previousBadges = []) => {
  const earned = previousBadges || []
  const newBadges = []
  for (const badge of BADGES) {
    if (!earned.includes(badge.id) && badge.condition(progress)) {
      newBadges.push(badge.id)
    }
  }
  return newBadges
}

export const getBadgeById = (id) => BADGES.find(b => b.id === id)
