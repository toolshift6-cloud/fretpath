// Lightweight synthesized audio cues — not a real guitar sample, but gives
// an actual pitch reference for notes/chords being taught, using the Web
// Audio API (oscillators) so no audio files need to ship with the app.
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

let sharedCtx = null
function getCtx() {
  if (!sharedCtx) sharedCtx = new (window.AudioContext || window.webkitAudioContext)()
  return sharedCtx
}

// 'E4' -> 329.63 (standard 440Hz-reference equal temperament)
export function noteToFrequency(noteWithOctave) {
  const m = /^([A-G]#?)(-?\d+)$/.exec(noteWithOctave)
  if (!m) return null
  const [, name, octaveStr] = m
  const octave = parseInt(octaveStr, 10)
  const noteIndex = NOTE_NAMES.indexOf(name)
  if (noteIndex === -1) return null
  const midi = (octave + 1) * 12 + noteIndex
  return 440 * Math.pow(2, (midi - 69) / 12)
}

// Plays one or more frequencies.
// `strum: true` staggers note starts slightly (like a downstrum) instead of
// firing all at once (like a single plucked note or a held chord).
// `sequence: true` plays notes one after another instead of overlapping —
// for scales/riffs, where hearing a chord cluster would be misleading.
export function playFrequencies(freqs, { duration = 1.3, strum = false, sequence = false } = {}) {
  if (!freqs?.length) return
  const ctx = getCtx()
  if (ctx.state === 'suspended') ctx.resume()
  const now = ctx.currentTime
  const noteDuration = sequence ? 0.35 : duration
  const gap = sequence ? 0.3 : (strum ? 0.025 : 0)

  freqs.forEach((freq, i) => {
    if (!freq) return
    const startAt = now + i * gap
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, startAt)
    gain.gain.linearRampToValueAtTime(0.16, startAt + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + noteDuration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(startAt)
    osc.stop(startAt + noteDuration + 0.05)
  })
}
