import { useNavigate } from 'react-router-dom'
import { Clock, Star, ChevronRight, CheckCircle } from 'lucide-react'

const TYPE_COLORS = {
  theory: '#4A9EFF',
  technique: '#C4832A',
  chord: '#E8C87A',
  song: '#7ED16F',
  scale: '#FF6B6B',
  practical: '#C4832A',
  composition: '#E8C87A',
}

const TYPE_LABELS = {
  theory: 'Theory',
  technique: 'Technique',
  chord: 'Chord',
  song: 'Song',
  scale: 'Scale',
  practical: 'Practical',
  composition: 'Composition',
}

export default function LessonCard({ lesson, levelId, isCompleted, isNext, isLocked }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!isLocked) navigate(`/lesson/${levelId}/${lesson.id}`)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLocked}
      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
        isCompleted
          ? 'bg-bg-card border-white/5 opacity-70'
          : isNext
          ? 'bg-bg-elevated border-amber-DEFAULT/50 glow-pulse'
          : isLocked
          ? 'bg-bg-card border-white/5 opacity-40 cursor-not-allowed'
          : 'bg-bg-card border-white/10 hover:border-amber-DEFAULT/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isCompleted ? 'bg-green-800/50' : isNext ? 'bg-amber-DEFAULT' : 'bg-surface'
        }`}>
          {isCompleted ? (
            <CheckCircle size={16} className="text-green-400" />
          ) : isLocked ? (
            <span className="text-cream/30 text-sm">🔒</span>
          ) : (
            <span className="text-xs font-bold" style={{ color: TYPE_COLORS[lesson.type] || '#C4832A' }}>
              {lesson.id.split('-')[1]}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${TYPE_COLORS[lesson.type]}20`, color: TYPE_COLORS[lesson.type] || '#C4832A' }}>
              {TYPE_LABELS[lesson.type] || lesson.type}
            </span>
            {isNext && <span className="text-xs text-amber-DEFAULT font-semibold">← Next</span>}
          </div>
          <div className="font-semibold text-sm text-cream truncate">{lesson.title}</div>
          <div className="text-xs text-cream/50 mt-0.5 line-clamp-1">{lesson.description}</div>
          <div className="flex items-center gap-3 mt-2 text-xs text-cream/40">
            <span className="flex items-center gap-1"><Clock size={10} /> {lesson.duration}m</span>
            <span className="flex items-center gap-1"><Star size={10} /> {lesson.xp} XP</span>
          </div>
        </div>

        <ChevronRight size={16} className="text-cream/30 flex-shrink-0 mt-1" />
      </div>
    </button>
  )
}
