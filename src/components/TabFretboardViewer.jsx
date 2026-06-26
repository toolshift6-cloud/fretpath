import Fretboard from './Fretboard'
import { parseTabNotes } from '../utils/parseTab'

const STRING_NAMES = { 1: 'e', 2: 'B', 3: 'G', 4: 'D', 5: 'A', 6: 'E' }
const STEP_COLORS = ['#4A9EFF', '#C4832A', '#E8C87A', '#FF6B6B', '#7ED16F']

// Visual companion to raw tab text: a fretboard diagram of every note used,
// plus a numbered "play order" strip — tab notation alone isn't intuitive
// until you've read a lot of it, so this gives a picture to match the text.
export default function TabFretboardViewer({ tabLines }) {
  const events = parseTabNotes(tabLines)
  if (events.length === 0) return null

  // Dedupe identical {string,fret} pairs for the "notes used" diagram
  const seen = new Set()
  const uniqueNotes = []
  events.forEach(({ string, fret }) => {
    const key = `${string}-${fret}`
    if (!seen.has(key)) {
      seen.add(key)
      uniqueNotes.push({ string, fret })
    }
  })

  const frets = events.map(e => e.fret)
  const maxFret = Math.max(...frets, 4)
  const startFret = 0
  const numFrets = Math.max(5, maxFret - startFret + 1)

  return (
    <div className="mt-4">
      <div className="bg-bg rounded-xl p-3 overflow-x-auto">
        <Fretboard scale={{ notes: uniqueNotes }} startFret={startFret} numFrets={numFrets} />
      </div>

      <div className="mt-3">
        <div className="text-xs text-cream/40 mb-2 font-semibold uppercase tracking-wider">Play Order</div>
        <div className="flex flex-wrap gap-1.5">
          {events.map((e, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-xs font-bold flex-shrink-0"
              style={{ background: `${STEP_COLORS[i % STEP_COLORS.length]}20`, color: STEP_COLORS[i % STEP_COLORS.length] }}
              title={`String ${STRING_NAMES[e.string]}, fret ${e.fret}`}
            >
              {STRING_NAMES[e.string]}{e.fret}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
