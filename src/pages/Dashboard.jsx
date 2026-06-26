import { useNavigate } from 'react-router-dom'
import { Flame, Star, Zap, ChevronRight, Play } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { LEVELS } from '../data/curriculum'
import ProgressBar from '../components/ProgressBar'
import Fretboard from '../components/Fretboard'

const TOTAL_XP = LEVELS.reduce((sum, lvl) => sum + lvl.lessons.reduce((s, l) => s + (l.xp || 0), 0), 0)

function getNextLesson(completedLessons) {
  for (const level of LEVELS) {
    for (const lesson of level.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return { lesson, level }
      }
    }
  }
  return null
}

function XPBar({ totalXP, completedLessons }) {
  const totalLessons = LEVELS.reduce((s, l) => s + l.lessons.length, 0)
  const done = completedLessons.length >= totalLessons

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Star size={14} className="text-amber-DEFAULT" />
          <span className="text-xs font-semibold text-cream/60">{totalXP} XP earned</span>
        </div>
        <span className="text-xs text-amber-light font-bold">{TOTAL_XP} XP total</span>
      </div>
      <ProgressBar value={totalXP} max={TOTAL_XP} />
      <div className="flex justify-between text-xs text-cream/30 mt-1">
        <span>{completedLessons.length}/{totalLessons} lessons</span>
        <span>{done ? '🎉 All lessons complete!' : `${TOTAL_XP - totalXP} XP remaining`}</span>
      </div>
    </div>
  )
}

// SVG fretboard that shows learned chords
function DashboardFretboard({ completedLessons }) {
  const CHORD_LESSONS = {
    'L1-5': { name: 'Em', string: 5, fret: 2 },
    'L1-6': { name: 'Am', string: 4, fret: 2 },
    'L1-7': { name: 'G', string: 6, fret: 3 },
    'L1-8': { name: 'C', string: 5, fret: 3 },
    'L1-9': { name: 'D', string: 1, fret: 2 },
    'L3-1': { name: 'F', string: 1, fret: 1 },
  }

  const learned = Object.entries(CHORD_LESSONS).filter(([id]) => completedLessons.includes(id))

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-cream text-sm">Fretboard Progress</h3>
        <span className="text-xs text-cream/40">{learned.length} chords learned</span>
      </div>
      <div className="bg-bg rounded-xl p-3 overflow-x-auto">
        <Fretboard
          chord={learned.length > 0 ? {
            fingers: learned.map(([, c]) => ({ string: c.string, fret: c.fret ?? 1, finger: 1 })),
            openStrings: [],
            mutedStrings: [],
          } : null}
          numFrets={5}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {Object.entries(CHORD_LESSONS).map(([id, chord]) => (
          <span key={id} className={`text-xs px-2 py-1 rounded-lg font-semibold ${
            completedLessons.includes(id)
              ? 'bg-amber-DEFAULT/20 text-amber-light'
              : 'bg-surface text-cream/30'
          }`}>
            {chord.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { profile, totalXP, streak, completedLessons, completedLevels, badges, currentLevel } = useProgress()

  const next = getNextLesson(completedLessons || [])
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-bg pb-4">
      {/* Header */}
      <div className="bg-bg-card border-b border-white/5 px-5 pt-12 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-cream/40 text-sm">{today}</p>
            <h1 className="font-display text-2xl font-bold text-cream mt-0.5">
              Hey, {profile?.name || 'Guitarist'} 👋
            </h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 bg-orange-900/30 px-3 py-1.5 rounded-full">
              <span className="streak-flame">🔥</span>
              <span className="text-orange-400 font-bold text-sm">{streak || 0}</span>
            </div>
            {badges?.length > 0 && (
              <div className="text-xs text-cream/30">{badges.length} badge{badges.length !== 1 ? 's' : ''}</div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-4">
        {/* XP Progress */}
        <XPBar totalXP={totalXP || 0} completedLessons={completedLessons || []} />

        {/* Today's Practice — Next Lesson */}
        {next ? (
          <div className="bg-bg-elevated border border-amber-DEFAULT/40 rounded-2xl p-5 glow-pulse">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-amber-DEFAULT" />
              <span className="text-xs font-semibold text-amber-DEFAULT uppercase tracking-wider">Up Next</span>
            </div>
            <h2 className="font-display text-lg font-bold text-cream mb-0.5">{next.lesson.title}</h2>
            <p className="text-sm text-cream/60 mb-4">{next.lesson.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 text-xs text-cream/40">
                <span>⏱ {next.lesson.duration} min</span>
                <span>⭐ {next.lesson.xp} XP</span>
                <span>Level {next.level.id}</span>
              </div>
              <button
                onClick={() => navigate(`/lesson/${next.level.id}/${next.lesson.id}`)}
                className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"
              >
                <Play size={14} /> Start
              </button>
            </div>
          </div>
        ) : (
          <div className="card text-center py-8">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="font-display text-xl font-bold text-amber-DEFAULT">All lessons complete!</h2>
            <p className="text-cream/50 text-sm mt-2">You've completed the full FretPath curriculum.</p>
          </div>
        )}

        {/* Fretboard progress */}
        <DashboardFretboard completedLessons={completedLessons || []} />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card text-center">
            <div className="text-2xl font-bold text-amber-DEFAULT">{completedLessons?.length || 0}</div>
            <div className="text-xs text-cream/50 mt-0.5">Lessons</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-electric">{totalXP || 0}</div>
            <div className="text-xs text-cream/50 mt-0.5">Total XP</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-orange-400">{streak || 0}</div>
            <div className="text-xs text-cream/50 mt-0.5">Day Streak</div>
          </div>
        </div>

        {/* Quick access */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('/curriculum')} className="card text-left hover:border-amber-DEFAULT/30 border border-white/5 transition-colors">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-semibold text-sm text-cream">Curriculum</div>
            <div className="text-xs text-cream/40 mt-0.5">All 6 levels</div>
          </button>
          <button onClick={() => navigate('/songs')} className="card text-left hover:border-amber-DEFAULT/30 border border-white/5 transition-colors">
            <div className="text-2xl mb-2">🎵</div>
            <div className="font-semibold text-sm text-cream">Song Library</div>
            <div className="text-xs text-cream/40 mt-0.5">20 songs to learn</div>
          </button>
        </div>

        {/* Level overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-cream text-sm">Your Roadmap</h3>
            <button onClick={() => navigate('/curriculum')} className="text-xs text-amber-DEFAULT">View all</button>
          </div>
          <div className="space-y-3">
            {LEVELS.map(level => {
              const levelLessons = level.lessons.length
              const done = level.lessons.filter(l => (completedLessons || []).includes(l.id)).length
              const pct = Math.round((done / levelLessons) * 100)
              const isActive = level.id === currentLevel
              return (
                <div key={level.id} className={`flex items-center gap-3 ${level.id !== 1 && !(completedLevels || []).includes(level.id - 1) ? 'opacity-40' : ''}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${level.color}20`, color: level.color }}>
                    {level.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={`font-semibold ${isActive ? 'text-cream' : 'text-cream/60'}`}>{level.title}</span>
                      <span className="text-cream/40">{done}/{levelLessons}</span>
                    </div>
                    <ProgressBar value={done} max={levelLessons} color={level.color} height={4} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
