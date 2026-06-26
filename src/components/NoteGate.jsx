import { useEffect } from 'react'
import { Mic, MicOff, CheckCircle2 } from 'lucide-react'
import { useNoteListener } from '../hooks/useNoteListener'
import SoundButton from './SoundButton'
import { noteToFrequency } from '../utils/audio'

// Gates lesson progress on actually playing a specific note in tune,
// detected via the mic (autocorrelation pitch detection), instead of
// just letting the user click through.
export default function NoteGate({ note, label, onVerified }) {
  const { isListening, detectedNote, verified, error, holdProgress, start, stop } = useNoteListener(note)

  useEffect(() => {
    if (verified) onVerified?.()
  }, [verified, onVerified])

  const displayNote = detectedNote?.replace(/\d/, '') || '—'
  const targetDisplay = note.replace(/\d/, '')

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-cream">Play It To Continue</h3>
        <div className="flex items-center gap-2">
          <SoundButton frequencies={[noteToFrequency(note)]} />
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

      <p className="text-cream/50 text-sm mb-4">{label}</p>

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 rounded-xl p-3 mb-3">{error}</div>
      )}

      {verified ? (
        <div className="flex items-center gap-2 text-green-400 font-semibold bg-green-900/20 rounded-xl p-3">
          <CheckCircle2 size={20} /> Verified — you played it correctly!
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-6 mb-3">
            <div className="text-center">
              <div className="text-xs text-cream/30 mb-1">Target</div>
              <div className="text-3xl font-display font-bold text-amber-DEFAULT">{targetDisplay}</div>
            </div>
            <div className="text-cream/20 text-2xl">→</div>
            <div className="text-center">
              <div className="text-xs text-cream/30 mb-1">Hearing</div>
              <div className="text-3xl font-display font-bold text-cream/70">{displayNote}</div>
            </div>
          </div>

          <div className="h-2 rounded-full bg-surface overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${holdProgress * 100}%`, backgroundColor: '#7ED16F' }}
            />
          </div>
          <p className="text-cream/30 text-xs text-center mt-2">
            {isListening ? 'Pluck the string and hold the note steady...' : 'Press Listen, then play the note.'}
          </p>
        </>
      )}
    </div>
  )
}
