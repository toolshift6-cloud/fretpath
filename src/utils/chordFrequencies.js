// Standard tuning open-string frequencies, indexed by string number (1 = high e ... 6 = low E)
const OPEN_STRING_FREQ = {
  1: 329.63, // e
  2: 246.94, // B
  3: 196.00, // G
  4: 146.83, // D
  5: 110.00, // A
  6: 82.41,  // E
}

// Derives the expected fundamental frequencies for a chord directly from its
// existing fretboard diagram data (fingers + open strings), so any chord
// lesson gets mic-verification automatically — no extra curriculum data needed.
export function chordToFrequencies(chord) {
  if (!chord) return []
  const freqs = []
  chord.fingers?.forEach(({ string, fret }) => {
    const open = OPEN_STRING_FREQ[string]
    if (open) freqs.push(open * Math.pow(2, fret / 12))
  })
  chord.openStrings?.forEach((string) => {
    const open = OPEN_STRING_FREQ[string]
    if (open) freqs.push(open)
  })
  return freqs
}

// Same string/fret -> frequency math, for arbitrary note lists (e.g. scale
// diagrams) rather than a chord's fingers/openStrings shape.
export function notesToFrequencies(notes) {
  if (!notes) return []
  return notes
    .map(({ string, fret }) => {
      const open = OPEN_STRING_FREQ[string]
      return open ? open * Math.pow(2, fret / 12) : null
    })
    .filter(Boolean)
}
