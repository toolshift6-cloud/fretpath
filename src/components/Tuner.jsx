import { useState } from 'react'
import { useTuner } from '../hooks/useTuner'
import { Mic, MicOff } from 'lucide-react'

const STRING_TARGETS = {
  E2: { string: 6, name: 'E (6th)', freq: 82.41 },
  A2: { string: 5, name: 'A (5th)', freq: 110.00 },
  D3: { string: 4, name: 'D (4th)', freq: 146.83 },
  G3: { string: 3, name: 'G (3rd)', freq: 196.00 },
  B3: { string: 2, name: 'B (2nd)', freq: 246.94 },
  E4: { string: 1, name: 'e (1st)', freq: 329.63 },
}

const CENT_THRESHOLD = 10

function getCentColor(cents) {
  const abs = Math.abs(cents)
  if (abs <= CENT_THRESHOLD) return '#7ED16F'  // green = in tune
  if (abs <= 25) return '#E8C87A'              // yellow = close
  return '#FF6B6B'                             // red = off
}

export default function Tuner() {
  const { isListening, frequency, error, start, stop } = useTuner()
  const [selected, setSelected] = useState(null)

  const target = selected ? STRING_TARGETS[selected] : null
  // Cents relative to the manually selected string's target frequency —
  // ignores whatever note the autocorrelation thinks it heard, so the
  // display doesn't jump between strings while you're tuning just one.
  const cents = target && frequency
    ? Math.round(1200 * Math.log2(frequency / target.freq))
    : 0
  const hasSignal = !!(target && frequency)
  const inTune = hasSignal && Math.abs(cents) <= CENT_THRESHOLD
  const centColor = hasSignal ? getCentColor(cents) : '#444'
  const needleAngle = Math.max(-45, Math.min(45, cents * 0.9))

  const selectString = (key) => {
    setSelected(key)
    if (!isListening) start()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-cream">Chromatic Tuner</h3>
        <button
          onClick={isListening ? stop : start}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
            isListening ? 'bg-red-900/50 text-red-300 border border-red-700' : 'btn-primary'
          }`}
        >
          {isListening ? <><MicOff size={14} /> Stop</> : <><Mic size={14} /> Start</>}
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 rounded-xl p-3 mb-4">{error}</div>
      )}

      <p className="text-cream/40 text-xs mb-4 text-center">
        1. Tap the string below you want to tune &nbsp;→&nbsp; 2. Pluck that string and hold it
      </p>

      {/* Note display */}
      <div className="text-center mb-4">
        <div className={`text-6xl font-display font-bold transition-colors ${target ? '' : 'text-cream/20'}`}
          style={{ color: target ? centColor : undefined }}>
          {target ? target.name.split(' ')[0] : '—'}
        </div>
        {hasSignal && (
          <div className="text-cream/40 text-sm">{frequency} Hz</div>
        )}
      </div>

      {/* Needle gauge */}
      <div className="relative h-20 mb-3">
        {/* Arc background */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#2A2620" strokeWidth="12" strokeLinecap="round" />
          <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#7ED16F" strokeWidth="4"
            strokeLinecap="round" strokeDasharray="12 4"
            style={{ clipPath: 'polygon(80px 0, 120px 0, 120px 100px, 80px 100px)' }} />
          {/* Needle */}
          <line
            x1="100" y1="90"
            x2={100 + 65 * Math.sin(needleAngle * Math.PI / 180)}
            y2={90 - 65 * Math.cos(needleAngle * Math.PI / 180)}
            stroke={centColor}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transition: 'all 0.1s ease' }}
          />
          <circle cx="100" cy="90" r="5" fill={centColor} />
          {/* Labels */}
          <text x="20" y="105" textAnchor="middle" fontSize="9" fill="#666">-50</text>
          <text x="100" y="15" textAnchor="middle" fontSize="9" fill="#666">0</text>
          <text x="180" y="105" textAnchor="middle" fontSize="9" fill="#666">+50</text>
        </svg>
      </div>

      {/* Cent readout */}
      <div className="text-center mb-4">
        {!target ? (
          <span className="text-cream/30 text-sm">Select a string to begin</span>
        ) : hasSignal ? (
          <span className="font-semibold text-sm" style={{ color: centColor }}>
            {inTune ? '✓ In Tune' : cents > 0 ? `+${cents}¢ (sharp)` : `${cents}¢ (flat)`}
          </span>
        ) : (
          <span className="text-cream/30 text-sm">{isListening ? `Pluck the ${target.name} string...` : 'Press Start to tune'}</span>
        )}
      </div>

      {/* String selector */}
      <div className="grid grid-cols-3 gap-1 text-xs">
        {Object.entries(STRING_TARGETS).map(([key, info]) => (
          <button
            key={key}
            onClick={() => selectString(key)}
            className={`text-center p-2 rounded-lg transition-colors ${
              selected === key ? 'bg-amber-DEFAULT/20 text-amber-DEFAULT ring-1 ring-amber-DEFAULT' : 'bg-surface text-cream/40 hover:text-cream/70'
            }`}
          >
            <div className="font-semibold">{key.replace(/\d/, '')}</div>
            <div>{info.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
