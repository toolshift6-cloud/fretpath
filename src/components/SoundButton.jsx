import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import { playFrequencies } from '../utils/audio'

// Small reusable "hear it" button — synthesized audio cue (Web Audio
// oscillators, not a real recording) for whatever note/chord is being taught.
export default function SoundButton({ frequencies = [], label = 'Hear it', strum = false, sequence = false, className = '' }) {
  const [playing, setPlaying] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    if (!frequencies.length) return
    setPlaying(true)
    playFrequencies(frequencies, { strum, sequence })
    setTimeout(() => setPlaying(false), sequence ? frequencies.length * 300 + 200 : 900)
  }

  if (!frequencies.length) return null

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
        playing ? 'bg-amber-DEFAULT text-bg' : 'bg-surface text-cream/60 hover:text-amber-DEFAULT hover:bg-amber-DEFAULT/10'
      } ${className}`}
    >
      <Volume2 size={12} className={playing ? 'animate-pulse' : ''} /> {label}
    </button>
  )
}
