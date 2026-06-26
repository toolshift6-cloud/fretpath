import { useEffect } from 'react'
import { useMetronome } from '../hooks/useMetronome'
import { Play, Pause, Minus, Plus } from 'lucide-react'

export default function Metronome({ onSpeedDemon }) {
  const { bpm, setBpm, isPlaying, toggle, beat, beatsPerBar, setBeatsPerBar, tap } = useMetronome()

  // Trigger on any path that reaches 180+ BPM (slider, +/-, presets, or tap tempo)
  useEffect(() => {
    if (bpm >= 180 && onSpeedDemon) onSpeedDemon()
  }, [bpm, onSpeedDemon])

  const handleBpmChange = (val) => {
    const clamped = Math.max(40, Math.min(220, val))
    setBpm(clamped)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-cream">Metronome</h3>
        <div className="flex gap-1">
          {Array.from({ length: beatsPerBar }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-75 ${
                isPlaying && beat === i
                  ? i === 0 ? 'bg-amber-DEFAULT scale-125' : 'bg-blue-electric scale-110'
                  : 'bg-surface'
              }`}
            />
          ))}
        </div>
      </div>

      {/* BPM display */}
      <div className="text-center mb-4">
        <div className="text-5xl font-display text-amber-DEFAULT font-bold leading-none">{bpm}</div>
        <div className="text-cream/50 text-sm mt-1">BPM</div>
      </div>

      {/* BPM slider */}
      <input
        type="range"
        min={40}
        max={220}
        value={bpm}
        onChange={(e) => handleBpmChange(Number(e.target.value))}
        className="w-full accent-amber-DEFAULT mb-4"
      />

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => handleBpmChange(bpm - 5)} className="btn-secondary p-2 rounded-lg">
          <Minus size={16} />
        </button>
        <button
          onClick={toggle}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
            isPlaying ? 'bg-red-900/50 text-red-300 border border-red-700' : 'btn-primary'
          }`}
        >
          {isPlaying ? <><Pause size={18} /> Stop</> : <><Play size={18} /> Start</>}
        </button>
        <button onClick={() => handleBpmChange(bpm + 5)} className="btn-secondary p-2 rounded-lg">
          <Plus size={16} />
        </button>
      </div>

      {/* Tap tempo & beats per bar */}
      <div className="flex gap-2">
        <button onClick={tap} className="flex-1 btn-secondary text-sm py-2">Tap Tempo</button>
        <select
          value={beatsPerBar}
          onChange={(e) => setBeatsPerBar(Number(e.target.value))}
          className="input-field text-sm py-2 px-3"
        >
          <option value={3}>3/4</option>
          <option value={4}>4/4</option>
          <option value={6}>6/8</option>
        </select>
      </div>

      {/* Common BPM presets */}
      <div className="flex flex-wrap gap-1 mt-3">
        {[60, 80, 100, 120, 140].map(b => (
          <button
            key={b}
            onClick={() => handleBpmChange(b)}
            className={`text-xs px-2 py-1 rounded-lg transition-colors ${
              bpm === b ? 'bg-amber-DEFAULT text-bg' : 'bg-surface text-cream/50 hover:text-cream'
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  )
}
