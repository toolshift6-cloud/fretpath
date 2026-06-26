import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Star } from 'lucide-react'
import { getLevelById, getLessonById } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import Fretboard from '../components/Fretboard'
import Metronome from '../components/Metronome'
import Tuner from '../components/Tuner'
import TabViewer from '../components/TabViewer'
import PickingHandDiagram from '../components/PickingHandDiagram'
import ChordReferenceGrid from '../components/ChordReferenceGrid'
import ProgressionChart from '../components/ProgressionChart'
import SoundButton from '../components/SoundButton'
import { chordToFrequencies, notesToFrequencies } from '../utils/chordFrequencies'

export default function Lesson() {
  const { levelId, lessonId } = useParams()
  const navigate = useNavigate()
  const { completedLessons, completeLesson, setSpecialFlag } = useProgress()

  const level = getLevelById(levelId)
  const lesson = getLessonById(levelId, lessonId)

  const [checkedItems, setCheckedItems] = useState([])
  const [completed, setCompleted] = useState(() => completedLessons?.includes(lessonId))
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('lesson') // 'lesson' | 'tools'

  if (!lesson || !level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">😕</div>
          <p className="text-cream/60">Lesson not found</p>
          <button onClick={() => navigate('/curriculum')} className="btn-primary mt-4">Back to Curriculum</button>
        </div>
      </div>
    )
  }

  const checklist = lesson.content?.checklist || []
  const allChecked = checklist.length === 0 || checkedItems.length === checklist.length
  const scaleNotesData = lesson.content?.fretboard?.notes
  const scaleFrets = scaleNotesData?.map(n => n.fret) || [0]
  const scaleMinFret = Math.min(...scaleFrets, 0)
  const scaleMaxFret = Math.max(...scaleFrets, 4)
  const scaleStartFret = Math.max(0, scaleMinFret - (scaleMinFret > 0 ? 1 : 0))
  const scaleNumFrets = Math.max(5, scaleMaxFret - scaleStartFret + 1)
  const readyToComplete = allChecked
  const hasMetronome = lesson.type === 'technique' || lesson.type === 'song' || lesson.type === 'chord'
  const hasTuner = lesson.content?.hasTuner
  const hasFretboard = !!lesson.content?.fretboard
  const hasTabs = lesson.content?.tabs?.length > 0

  const toggleCheck = (idx) => {
    setCheckedItems(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const handleComplete = () => {
    if (!completed) {
      completeLesson(lessonId, lesson.xp, lesson.type)
      setCompleted(true)
    }
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Find next lesson
  const allLessons = level.lessons
  const currentIdx = allLessons.findIndex(l => l.id === lessonId)
  const nextLesson = allLessons[currentIdx + 1]

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-bg-card border-b border-white/5 px-5 pt-12 pb-4">
        <button onClick={() => navigate('/curriculum')} className="flex items-center gap-2 text-cream/50 hover:text-cream text-sm mb-3">
          <ChevronLeft size={16} /> Level {level.id}: {level.title}
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-DEFAULT/20 text-amber-DEFAULT capitalize">{lesson.type}</span>
              {completed && <CheckCircle size={14} className="text-green-400" />}
            </div>
            <h1 className="font-display text-xl font-bold text-cream">{lesson.title}</h1>
          </div>
          <div className="flex items-center gap-1 text-amber-DEFAULT font-bold text-sm">
            <Star size={14} />
            <span>{lesson.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Tab switcher (lesson content vs tools) */}
      <div className="flex border-b border-white/10 px-5">
        {['lesson', 'tools'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-sm font-semibold capitalize border-b-2 transition-colors ${
              activeTab === tab ? 'border-amber-DEFAULT text-amber-DEFAULT' : 'border-transparent text-cream/40'
            }`}
          >
            {tab === 'tools' ? '🔧 Tools' : '📖 Lesson'}
          </button>
        ))}
      </div>

      <div className="px-5 py-5 space-y-4">
        {activeTab === 'lesson' && (
          <>
            {/* Overview */}
            <div className="card">
              <p className="text-cream/80 leading-relaxed">{lesson.content?.overview}</p>
            </div>

            {/* Fretboard diagram */}
            {hasFretboard && lesson.content.fretboard?.fingers && (
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-cream">
                    {lesson.content.fretboard.chord
                      ? lesson.type === 'chord'
                        ? `${lesson.content.fretboard.chord} Chord`
                        : lesson.content.fretboard.chord
                      : 'Fretboard Diagram'}
                  </h3>
                  <SoundButton frequencies={chordToFrequencies(lesson.content.fretboard)} strum />
                </div>
                <div className="bg-bg rounded-xl p-3 overflow-x-auto">
                  <Fretboard chord={lesson.content.fretboard} numFrets={5} />
                </div>
              </div>
            )}

            {/* Scale diagram — fret window sized to whatever frets the scale actually uses */}
            {hasFretboard && lesson.content.fretboard?.notes && (
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-cream">Scale Diagram</h3>
                  <SoundButton frequencies={notesToFrequencies(lesson.content.fretboard.notes)} label="Hear scale" sequence />
                </div>
                <div className="bg-bg rounded-xl p-3 overflow-x-auto">
                  <Fretboard scale={lesson.content.fretboard} startFret={scaleStartFret} numFrets={scaleNumFrets} />
                </div>
              </div>
            )}

            {/* Picking hand diagram — which right-hand finger plays which string */}
            {lesson.content?.pickingHand && (
              <div className="card">
                <h3 className="font-semibold text-cream mb-3">Picking Hand Map</h3>
                <div className="bg-bg rounded-xl p-3 overflow-x-auto">
                  <PickingHandDiagram assignments={lesson.content.pickingHand} />
                </div>
              </div>
            )}

            {/* Bar-by-bar progression chart, for lessons that describe a chord progression in text */}
            {lesson.content?.progression && (
              <div className="card">
                <h3 className="font-semibold text-cream mb-3">Progression</h3>
                <ProgressionChart progression={lesson.content.progression} />
              </div>
            )}

            {/* Reference diagrams for every chord named in the lesson text */}
            {lesson.content?.chordReferences && (
              <div className="card">
                <h3 className="font-semibold text-cream mb-3">Chords Used</h3>
                <ChordReferenceGrid chords={lesson.content.chordReferences} />
              </div>
            )}

            {/* Content sections */}
            {lesson.content?.sections?.map((section, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-amber-light mb-2">{section.heading}</h3>
                <p className="text-cream/75 leading-relaxed text-sm">{section.text}</p>
              </div>
            ))}

            {/* Tab viewer */}
            {hasTabs && <TabViewer tabs={lesson.content.tabs} />}

            {/* Checklist */}
            {checklist.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-cream mb-3">Self-Assessment</h3>
                <p className="text-xs text-cream/40 mb-3">Check each item when you can do it consistently:</p>
                <div className="space-y-2">
                  {checklist.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => toggleCheck(i)}
                      className="w-full flex items-start gap-3 text-left py-2 group"
                    >
                      {checkedItems.includes(i) ? (
                        <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle size={18} className="text-cream/30 flex-shrink-0 mt-0.5 group-hover:text-cream/60" />
                      )}
                      <span className={`text-sm leading-snug ${checkedItems.includes(i) ? 'line-through text-cream/40' : 'text-cream/80'}`}>
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Complete button */}
            {checklist.length > 0 && (
              <button
                onClick={handleComplete}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  completed
                    ? 'bg-green-800/30 text-green-400 border border-green-700/50'
                    : readyToComplete
                    ? 'btn-primary'
                    : 'bg-surface text-cream/40 cursor-not-allowed'
                }`}
                disabled={!readyToComplete && !completed}
              >
                {completed
                  ? '✓ Lesson Complete!'
                  : readyToComplete
                  ? `Complete & Earn ${lesson.xp} XP →`
                  : `Check all items to complete (${checkedItems.length}/${checklist.length})`}
              </button>
            )}

            {/* Success toast */}
            {showSuccess && (
              <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-800 text-green-100 px-6 py-3 rounded-2xl font-semibold shadow-lg flex items-center gap-2">
                <Star size={16} className="text-yellow-300" /> +{lesson.xp} XP earned!
              </div>
            )}

            {/* Next lesson */}
            {nextLesson && (
              <button
                onClick={() => navigate(`/lesson/${levelId}/${nextLesson.id}`)}
                className="w-full card hover:border-amber-DEFAULT/30 border border-white/5 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-cream/40 mb-1">Next Lesson</div>
                    <div className="font-semibold text-cream">{nextLesson.title}</div>
                  </div>
                  <ChevronRight size={20} className="text-amber-DEFAULT" />
                </div>
              </button>
            )}
          </>
        )}

        {activeTab === 'tools' && (
          <>
            {hasTuner && <Tuner />}
            {hasMetronome && <Metronome onSpeedDemon={() => setSpecialFlag('speedDemon')} />}
            {!hasTuner && !hasMetronome && (
              <div className="card text-center py-8 text-cream/40">
                <div className="text-3xl mb-2">🔧</div>
                <p className="text-sm">Practice tools available for technique and song lessons.</p>
              </div>
            )}
            {hasMetronome && (
              <div className="card text-sm text-cream/60">
                <p className="font-semibold text-cream mb-2">Practice Tips</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Start at 60 BPM — accuracy first, speed second</li>
                  <li>Once clean at current speed, increase by 5 BPM</li>
                  <li>Practice difficult transitions in isolation</li>
                  <li>Your goal BPM for this lesson: {lesson.type === 'song' ? '100+' : '80+'} BPM</li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
