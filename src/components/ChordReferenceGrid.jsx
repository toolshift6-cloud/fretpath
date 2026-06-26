import Fretboard from './Fretboard'
import SoundButton from './SoundButton'
import { chordToFrequencies } from '../utils/chordFrequencies'

// Small side-by-side chord diagrams for lessons that mention multiple chords
// by name in the text (e.g. "Bars 1-4: A7. Bars 5-6: D7...") without a single
// chord being the lesson's main focus — gives a visual for every chord named.
export default function ChordReferenceGrid({ chords = [] }) {
  if (!chords.length) return null
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {chords.map(c => (
        <div key={c.name} className="bg-bg rounded-xl p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-cream/70">{c.name}</span>
            <SoundButton frequencies={chordToFrequencies(c.fretboard)} label="" strum className="px-1.5 py-1.5" />
          </div>
          <Fretboard chord={c.fretboard} numFrets={4} />
        </div>
      ))}
    </div>
  )
}
