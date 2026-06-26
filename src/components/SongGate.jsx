import { useState, useEffect } from 'react'
import { Mic, MicOff, CheckCircle2, Check } from 'lucide-react'
import { useChordListener } from '../hooks/useChordListener'
import { chordToFrequencies } from '../utils/chordFrequencies'
import Fretboard from './Fretboard'
import SoundButton from './SoundButton'

// One step of the sequence — gets its own useChordListener instance (mounted
// fresh per step via `key` in the parent) so verification state doesn't leak
// between chords.
function SongChordStep({ chordName, fretboard, targetFreqs, onVerified }) {
  const { isListening, verified, error, holdProgress, matchedCount, total, start, stop } = useChordListener(targetFreqs)

  useEffect(() => {
    if (verified) onVerified?.()
  }, [verified, onVerified])

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-cream/50">Strum <span className="text-cream font-semibold">{chordName}</span> and let it ring</div>
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

      {fretboard && !verified && (
        <div className="bg-bg rounded-xl p-3 mb-4 overflow-x-auto">
          <Fretboard chord={fretboard} numFrets={5} />
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 rounded-xl p-3 mb-3">{error}</div>
      )}

      {verified ? (
        <div className="flex items-center gap-2 text-green-400 font-semibold bg-green-900/20 rounded-xl p-3">
          <CheckCircle2 size={20} /> Nice — that's {chordName}!
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
    </>
  )
}

// Steps the player through every chord in a song's progression, verifying
// each one via mic before moving to the next — same underlying chord
// detection as ChordGate, just sequenced.
export default function SongGate({ songChords, onVerified }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const current = songChords[step]
  const targetFreqs = chordToFrequencies(current.fretboard)

  const handleStepVerified = () => {
    if (step + 1 < songChords.length) {
      setStep(s => s + 1)
    } else {
      setDone(true)
      onVerified?.()
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-cream">Play It To Continue</h3>
        <span className="text-xs text-cream/40">{done ? songChords.length : step + 1}/{songChords.length} chords</span>
      </div>

      <p className="text-cream/50 text-sm mb-4">
        Play each chord in this song's progression in order — we'll listen through your mic to confirm each one before you continue.
      </p>

      <div className="flex gap-1.5 mb-4">
        {songChords.map((c, i) => (
          <div
            key={c.name + i}
            className={`flex-1 h-1.5 rounded-full ${i < step || done ? 'bg-green-500' : i === step ? 'bg-amber-DEFAULT' : 'bg-surface'}`}
          />
        ))}
      </div>

      {done ? (
        <div className="flex items-center gap-2 text-green-400 font-semibold bg-green-900/20 rounded-xl p-3">
          <Check size={20} /> All chords verified — you played through the progression!
        </div>
      ) : (
        <SongChordStep
          key={step}
          chordName={current.name}
          fretboard={current.fretboard}
          targetFreqs={targetFreqs}
          onVerified={handleStepVerified}
        />
      )}
    </div>
  )
}
