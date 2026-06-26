import { useState, useEffect, useCallback, createContext, useContext, createElement } from 'react'
import { LEVELS } from '../data/curriculum'
import { checkNewBadges } from '../data/badges'

const STORAGE_KEY = 'fretpath_progress'

const defaultState = {
  profile: null,
  completedLessons: [],
  completedLevels: [],
  completedSongs: [],
  totalXP: 0,
  streak: 0,
  lastPracticeDate: null,
  badges: [],
  specialFlags: {},
  practiceHistory: [],
  currentLevel: 1,
  currentLesson: null,
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // quota exceeded
  }
}

function updateStreak(state) {
  const today = new Date().toDateString()
  const last = state.lastPracticeDate
  if (last === today) return state

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const wasYesterday = last === yesterday.toDateString()

  return {
    ...state,
    streak: wasYesterday ? (state.streak || 0) + 1 : 1,
    lastPracticeDate: today,
  }
}

// Shared context so all components read/write the same state
const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const setProfile = useCallback((profile) => {
    setState(prev => ({
      ...prev,
      profile: { ...profile, onboardingComplete: true },
    }))
  }, [])

  const completeLesson = useCallback((lessonId, xpEarned, lessonType) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev

      const hour = new Date().getHours()
      const specialFlags = { ...prev.specialFlags }
      if (hour < 8) specialFlags.earlyBird = true
      if (hour >= 22) specialFlags.nightOwl = true

      const updated = updateStreak({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        totalXP: prev.totalXP + xpEarned,
        practiceHistory: [
          ...prev.practiceHistory,
          { date: new Date().toISOString(), xp: xpEarned, lessonId },
        ],
        completedSongs: lessonType === 'song'
          ? [...(prev.completedSongs || []), lessonId]
          : prev.completedSongs || [],
        specialFlags,
      })

      const completedLevels = [...(prev.completedLevels || [])]
      for (const level of LEVELS) {
        if (!completedLevels.includes(level.id)) {
          const allDone = level.lessons.every(l =>
            updated.completedLessons.includes(l.id)
          )
          if (allDone) completedLevels.push(level.id)
        }
      }
      updated.completedLevels = completedLevels

      const newBadges = checkNewBadges(updated, prev.badges)
      updated.badges = [...prev.badges, ...newBadges]
      updated._newBadges = newBadges

      const currentLevel = LEVELS.find(l =>
        l.lessons.some(le => !updated.completedLessons.includes(le.id))
      )
      if (currentLevel) updated.currentLevel = currentLevel.id

      return updated
    })
  }, [])

  const setSpecialFlag = useCallback((flag) => {
    setState(prev => ({
      ...prev,
      specialFlags: { ...prev.specialFlags, [flag]: true },
    }))
  }, [])

  const exportProgress = useCallback(() => {
    const json = JSON.stringify(state, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fretpath-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [state])

  const importProgress = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        setState({ ...defaultState, ...imported })
      } catch {
        alert('Invalid progress file')
      }
    }
    reader.readAsText(file)
  }, [])

  const resetProgress = useCallback(() => {
    setState(defaultState)
  }, [])

  const value = {
    ...state,
    setProfile,
    completeLesson,
    setSpecialFlag,
    exportProgress,
    importProgress,
    resetProgress,
  }

  return createElement(ProgressContext.Provider, { value }, children)
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
