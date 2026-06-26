import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const GUITAR_TYPES = [
  { id: 'acoustic', label: 'Acoustic', icon: '🎸', desc: 'Steel strings, no amp needed' },
  { id: 'classical', label: 'Classical', icon: '🎻', desc: 'Nylon strings, fingerpicking' },
  { id: 'electric', label: 'Electric', icon: '⚡', desc: 'Plug in and rock' },
  { id: 'bass', label: 'Bass', icon: '🎵', desc: 'Hold the groove' },
]

const GOALS = [
  { id: 'songs', label: 'Play my favorite songs', icon: '🎶' },
  { id: 'perform', label: 'Perform for others', icon: '🎤' },
  { id: 'write', label: 'Write my own music', icon: '✍️' },
  { id: 'jam', label: 'Jam with friends', icon: '🤝' },
  { id: 'pro', label: 'Go professional', icon: '🏆' },
  { id: 'fun', label: 'Just for fun', icon: '😊' },
]

const PRACTICE_TIMES = [
  { id: 10, label: '10 min/day', desc: 'Perfect for busy schedules' },
  { id: 20, label: '20 min/day', desc: 'Great steady progress' },
  { id: 30, label: '30 min/day', desc: 'Recommended for fast progress' },
  { id: 60, label: '1 hour/day', desc: 'Serious dedication' },
]

const INFLUENCES = [
  'Rock', 'Blues', 'Pop', 'Country', 'Jazz', 'Classical', 'Metal', 'Folk', 'R&B', 'Indie',
]

const STEPS = ['guitar', 'goal', 'time', 'influences', 'name']

export default function Onboarding() {
  const navigate = useNavigate()
  const { setProfile, profile } = useProgress()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    guitarType: '',
    goal: '',
    practiceTime: 30,
    influences: [],
    name: '',
  })

  // Navigate only after profile state has been committed to localStorage
  useEffect(() => {
    if (profile?.onboardingComplete) {
      navigate('/', { replace: true })
    }
  }, [profile?.onboardingComplete, navigate])

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const canNext = () => {
    if (current === 'guitar') return !!data.guitarType
    if (current === 'goal') return !!data.goal
    if (current === 'time') return !!data.practiceTime
    if (current === 'influences') return data.influences.length > 0
    if (current === 'name') return data.name.trim().length > 0
    return true
  }

  const next = () => {
    if (isLast) {
      setProfile(data)
      // navigation happens via useEffect once profile state updates
    } else {
      setStep(s => s + 1)
    }
  }

  const back = () => setStep(s => s - 1)

  const toggleInfluence = (inf) => {
    setData(d => ({
      ...d,
      influences: d.influences.includes(inf)
        ? d.influences.filter(i => i !== inf)
        : [...d.influences, inf],
    }))
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🎸</div>
        <h1 className="font-display text-3xl font-bold text-amber-DEFAULT">FretPath</h1>
        <p className="text-cream/50 text-sm mt-1">Your personal guitar journey</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${
            i <= step ? 'bg-amber-DEFAULT w-6' : 'bg-surface w-3'
          }`} />
        ))}
      </div>

      {/* Step content */}
      <div className="w-full max-w-md">
        {current === 'guitar' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-cream mb-2">What guitar do you have?</h2>
            <p className="text-cream/50 text-sm mb-6">We'll tailor your lessons to your instrument.</p>
            <div className="grid grid-cols-2 gap-3">
              {GUITAR_TYPES.map(g => (
                <button
                  key={g.id}
                  onClick={() => setData(d => ({ ...d, guitarType: g.id }))}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    data.guitarType === g.id
                      ? 'border-amber-DEFAULT bg-amber-DEFAULT/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-3xl mb-2">{g.icon}</div>
                  <div className="font-semibold text-cream">{g.label}</div>
                  <div className="text-xs text-cream/50 mt-0.5">{g.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {current === 'goal' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-cream mb-2">What's your main goal?</h2>
            <p className="text-cream/50 text-sm mb-6">This shapes your personalized roadmap.</p>
            <div className="space-y-2">
              {GOALS.map(g => (
                <button
                  key={g.id}
                  onClick={() => setData(d => ({ ...d, goal: g.id }))}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all ${
                    data.goal === g.id
                      ? 'border-amber-DEFAULT bg-amber-DEFAULT/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  <span className="font-semibold text-cream">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {current === 'time' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-cream mb-2">How much time can you practice?</h2>
            <p className="text-cream/50 text-sm mb-6">Even 10 minutes daily beats 2 hours once a week.</p>
            <div className="space-y-3">
              {PRACTICE_TIMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setData(d => ({ ...d, practiceTime: t.id }))}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    data.practiceTime === t.id
                      ? 'border-amber-DEFAULT bg-amber-DEFAULT/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold text-cream">{t.label}</div>
                  <div className="text-xs text-cream/50">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {current === 'influences' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-cream mb-2">What music do you love?</h2>
            <p className="text-cream/50 text-sm mb-6">Pick all that apply — we'll use songs you already know.</p>
            <div className="flex flex-wrap gap-2">
              {INFLUENCES.map(inf => (
                <button
                  key={inf}
                  onClick={() => toggleInfluence(inf)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                    data.influences.includes(inf)
                      ? 'border-amber-DEFAULT bg-amber-DEFAULT text-bg'
                      : 'border-white/20 text-cream/70 hover:border-white/40'
                  }`}
                >
                  {inf}
                </button>
              ))}
            </div>
          </div>
        )}

        {current === 'name' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-cream mb-2">What should we call you?</h2>
            <p className="text-cream/50 text-sm mb-6">Your coach will use this to personalize advice.</p>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData(d => ({ ...d, name: e.target.value }))}
              placeholder="Your name"
              className="input-field w-full text-lg"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && canNext() && next()}
            />
            <p className="text-cream/30 text-xs mt-3">Everything stays on your device. No account needed.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={back} className="btn-secondary flex items-center gap-2">
              <ChevronLeft size={18} /> Back
            </button>
          )}
          <button
            onClick={next}
            disabled={!canNext()}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLast ? 'Start Learning 🎸' : <>Next <ChevronRight size={18} /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
