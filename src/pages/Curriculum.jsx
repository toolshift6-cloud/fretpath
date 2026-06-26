import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { LEVELS } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import LessonCard from '../components/LessonCard'
import ProgressBar from '../components/ProgressBar'

export default function Curriculum() {
  const navigate = useNavigate()
  const { completedLessons, completedLevels, currentLevel } = useProgress()
  const [expanded, setExpanded] = useState(currentLevel || 1)

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-bg-card border-b border-white/5 px-5 pt-12 pb-5">
        <h1 className="font-display text-2xl font-bold text-cream">Curriculum</h1>
        <p className="text-cream/50 text-sm mt-1">6 levels from beginner to professional</p>
      </div>

      <div className="px-5 py-5 space-y-3">
        {LEVELS.map((level) => {
          const done = level.lessons.filter(l => (completedLessons || []).includes(l.id)).length
          const total = level.lessons.length
          // A level unlocks once the previous level's lessons are all done — matches
          // the actual gate enforced when navigating lesson-to-lesson (sequential
          // completion), instead of an XP threshold that could fall out of sync
          // with it (e.g. via the Dashboard's "Up Next" card, which always points
          // at the next incomplete lesson regardless of XP).
          const isUnlocked = level.id === 1 || (completedLevels || []).includes(level.id - 1)
          const isActive = level.id === (currentLevel || 1)
          const isOpen = expanded === level.id
          const nextLessonId = level.lessons.find(l => !(completedLessons || []).includes(l.id))?.id

          return (
            <div
              key={level.id}
              className={`rounded-2xl border overflow-hidden transition-all ${
                !isUnlocked ? 'border-white/5 opacity-50' : isActive ? 'border-amber-DEFAULT/40' : 'border-white/10'
              }`}
            >
              {/* Level header */}
              <button
                onClick={() => setExpanded(isOpen ? null : level.id)}
                className="w-full bg-bg-card p-4 text-left"
                disabled={!isUnlocked}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ background: `${level.color}20`, color: level.color }}
                  >
                    {!isUnlocked ? <Lock size={16} className="text-cream/30" /> : level.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-cream">{level.title}</span>
                      {isActive && <span className="text-xs text-amber-DEFAULT font-semibold">Current</span>}
                    </div>
                    <p className="text-xs text-cream/50">{level.subtitle}</p>
                    <div className="mt-2">
                      <ProgressBar value={done} max={total} color={level.color} height={4} />
                      <div className="text-xs text-cream/30 mt-1">{done}/{total} lessons</div>
                    </div>
                  </div>
                  {isUnlocked && (
                    isOpen ? <ChevronUp size={16} className="text-cream/40 flex-shrink-0" /> : <ChevronDown size={16} className="text-cream/40 flex-shrink-0" />
                  )}
                </div>
              </button>

              {/* Lessons */}
              {isOpen && isUnlocked && (
                <div className="bg-bg px-4 pb-4 space-y-2">
                  {level.lessons.map((lesson, i) => {
                    const isCompleted = (completedLessons || []).includes(lesson.id)
                    const isNext = lesson.id === nextLessonId
                    // A lesson is locked if no previous lesson in this level is done (except first)
                    const isLocked = !isCompleted && i > 0 && !(completedLessons || []).includes(level.lessons[i - 1]?.id)
                    return (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        levelId={level.id}
                        isCompleted={isCompleted}
                        isNext={isNext}
                        isLocked={isLocked}
                      />
                    )
                  })}
                </div>
              )}

              {/* Locked state */}
              {!isUnlocked && (
                <div className="bg-bg px-4 py-3 text-center">
                  <p className="text-xs text-cream/30">Complete Level {level.id - 1} to unlock</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
