import { useEffect } from 'react'
import { Mic, MicOff, CheckCircle2 } from 'lucide-react'
import { useChordListener } from '../hooks/useChordListener'
import Fretboard from './Fretboard'
import SoundButton from './SoundButton'

// Same "play it to continue" gate as NoteGate, but for chords — verifies via
// FFT energy at each expected note's frequency instead of single-pitch detection.
export default function ChordGate({ chordName, fretboard, targetFreqs, onVerified }) {
  const { isListening, verified, error, holdProgress, matchedCount, total, start, stop } = useChordListener(targetFreqs)

  useEffect(() => {
    if (verified) onVerified?.()
  }, [verified, onVerified])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-cream">Play It To Continue</h3>
        <div className="flex items-center gap-2">
          <SoundButton frequencies={targetFreqs} strum />
          {!verified && (
            <button
              onClick={isListening ? stop : start}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isListening ? 'bg-red-900/50 text-red-300 border border-red-700' : 'btn-primary'
              }`}
            >
              {isListening ? <><MicOff size={14} /> Stop</> : <><Mic size={14} /> Listen</>}
            </button>
          )}
        </div>
      </div>

      <p className="text-cream/50 text-sm mb-4">
        Strum the {chordName} chord and let it ring — we'll listen through your mic to confirm before you continue.
      </p>

      {fretboard && (
        <div className="bg-bg rounded-xl p-3 mb-4 overflow-x-auto">
          <Fretboard chord={fretboard} numFrets={5} />
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 rounded-xl p-3 mb-3">{error}</div>
      )}

      {verified ? (
        <div className="flex items-center gap-2 text-green-400 font-semibold bg-green-900/20 rounded-xl p-3">
          <CheckCircle2 size={20} /> Verified — that's a clean {chordName}!
        </div>
      ) : (
        <>
          <div className="text-center text-sm text-cream/50 mb-2">{matchedCount}/{total} notes detected</div>
          <div className="h-2 rounded-full bg-surface overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${holdProgress * 100}%`, backgroundColor: '#7ED16F' }}
            />
          </div>
          <p className="text-cream/30 text-xs text-center mt-2">
            {isListening ? 'Strum and hold the chord steady...' : 'Press Listen, then strum the chord.'}
          </p>
        </>
      )}
    </div>
  )
}
