import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useProgress } from '../hooks/useProgress'
import { LEVELS } from '../data/curriculum'
import BadgeDisplay from '../components/BadgeDisplay'
import ProgressBar from '../components/ProgressBar'

function PracticeHeatmap({ history }) {
  const today = new Date()
  const days = Array.from({ length: 84 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (83 - i))
    const dateStr = d.toISOString().split('T')[0]
    const practiced = history.some(h => h.date?.startsWith(dateStr))
    return { date: dateStr, practiced, day: d.getDay() }
  })

  const weeks = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  return (
    <div className="card">
      <h3 className="font-semibold text-cream mb-3">Practice Heatmap</h3>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={day.date}
                className="w-3.5 h-3.5 rounded-sm"
                style={{
                  background: day.practiced ? '#C4832A' : '#2A2620',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-cream/40">
        <div className="w-3 h-3 rounded-sm bg-bg-elevated" /> No practice
        <div className="w-3 h-3 rounded-sm bg-amber-DEFAULT ml-2" /> Practiced
      </div>
    </div>
  )
}

function XPChart({ history }) {
  if (!history.length) return null

  const data = history.slice(-14).reduce((acc, h) => {
    const date = new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const existing = acc.find(d => d.date === date)
    if (existing) existing.xp += h.xp
    else acc.push({ date, xp: h.xp })
    return acc
  }, [])

  return (
    <div className="card">
      <h3 className="font-semibold text-cream mb-4">XP This Week</h3>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C4832A" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#C4832A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2620" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#888' }} />
          <YAxis tick={{ fontSize: 10, fill: '#888' }} />
          <Tooltip
            contentStyle={{ background: '#221F1A', border: '1px solid #C4832A40', borderRadius: 12, color: '#F2EDE4' }}
          />
          <Area type="monotone" dataKey="xp" stroke="#C4832A" fill="url(#xpGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function Progress() {
  const { totalXP, streak, completedLessons, completedLevels, badges, practiceHistory, currentLevel, profile } = useProgress()

  const lessonCount = completedLessons?.length || 0
  const totalLessons = LEVELS.reduce((s, l) => s + l.lessons.length, 0)

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-bg-card border-b border-white/5 px-5 pt-12 pb-5">
        <h1 className="font-display text-2xl font-bold text-cream">Your Progress</h1>
        <p className="text-cream/50 text-sm mt-1">Keep up the great work, {profile?.name || 'Guitarist'}!</p>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card text-center py-5">
            <div className="text-4xl font-bold text-amber-DEFAULT">{totalXP || 0}</div>
            <div className="text-xs text-cream/50 mt-1">Total XP Earned</div>
          </div>
          <div className="card text-center py-5">
            <div className="text-4xl font-bold text-orange-400 streak-flame">{streak || 0}</div>
            <div className="text-xs text-cream/50 mt-1">Day Streak 🔥</div>
          </div>
          <div className="card text-center py-5">
            <div className="text-4xl font-bold text-blue-electric">{lessonCount}</div>
            <div className="text-xs text-cream/50 mt-1">Lessons Complete</div>
          </div>
          <div className="card text-center py-5">
            <div className="text-4xl font-bold text-gold">{badges?.length || 0}</div>
            <div className="text-xs text-cream/50 mt-1">Badges Earned</div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="card">
          <h3 className="font-semibold text-cream mb-3">Overall Completion</h3>
          <ProgressBar value={lessonCount} max={totalLessons} showPercent label={`${lessonCount} / ${totalLessons} lessons`} />
        </div>

        {/* Level progress */}
        <div className="card">
          <h3 className="font-semibold text-cream mb-3">Level Progress</h3>
          <div className="space-y-3">
            {LEVELS.map(level => {
              const done = level.lessons.filter(l => (completedLessons || []).includes(l.id)).length
              const isComplete = (completedLevels || []).includes(level.id)
              const isUnlocked = level.id === 1 || (completedLevels || []).includes(level.id - 1)
              return (
                <div key={level.id} className={!isUnlocked ? 'opacity-40' : ''}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-2">
                      <span style={{ color: level.color }} className="font-semibold">Level {level.id}</span>
                      <span className="text-cream/60">{level.title}</span>
                      {isComplete && <span className="text-green-400">✓</span>}
                    </span>
                    <span className="text-cream/40">{done}/{level.lessons.length}</span>
                  </div>
                  <ProgressBar value={done} max={level.lessons.length} color={level.color} height={6} />
                </div>
              )
            })}
          </div>
        </div>

        {/* XP Chart */}
        {practiceHistory?.length > 0 && <XPChart history={practiceHistory} />}

        {/* Heatmap */}
        <PracticeHeatmap history={practiceHistory || []} />

        {/* Badges */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-cream">Badges</h3>
            <span className="text-xs text-cream/40">{badges?.length || 0} earned</span>
          </div>
          <BadgeDisplay earnedBadgeIds={badges || []} />
        </div>
      </div>
    </div>
  )
}
