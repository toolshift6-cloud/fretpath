import { useState, useRef, useCallback, useEffect } from 'react'

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const HOLD_MS = 600
const TOLERANCE_CENTS = 30

function frequencyToNote(freq) {
  if (!freq || freq < 20) return null
  const noteNum = 12 * Math.log2(freq / 440) + 69
  const rounded = Math.round(noteNum)
  const name = NOTE_NAMES[((rounded % 12) + 12) % 12]
  const octave = Math.floor(rounded / 12) - 1
  const cents = Math.round((noteNum - rounded) * 100)
  return { name, octave, cents, full: `${name}${octave}` }
}

// Listens to the mic and confirms the target note (e.g. "E4") was held in tune
// for HOLD_MS before flipping `verified` — used to gate lesson progress on
// actually playing the right note, not just clicking through.
export function useNoteListener(targetNote) {
  const [isListening, setIsListening] = useState(false)
  const [detectedNote, setDetectedNote] = useState(null)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)
  const [holdProgress, setHoldProgress] = useState(0)

  const streamRef = useRef(null)
  const animRef = useRef(null)
  const analyserRef = useRef(null)
  const ctxRef = useRef(null)
  const matchStartRef = useRef(null)

  const detectPitch = useCallback(() => {
    if (!analyserRef.current) return
    const analyser = analyserRef.current
    const bufferLength = analyser.fftSize
    const buffer = new Float32Array(bufferLength)
    analyser.getFloatTimeDomainData(buffer)

    let rms = 0
    for (let i = 0; i < bufferLength; i++) rms += buffer[i] * buffer[i]
    rms = Math.sqrt(rms / bufferLength)
    if (rms < 0.01) {
      setDetectedNote(null)
      matchStartRef.current = null
      setHoldProgress(0)
      animRef.current = requestAnimationFrame(detectPitch)
      return
    }

    const sampleRate = ctxRef.current.sampleRate
    let bestOffset = -1
    let bestCorrelation = 0
    for (let offset = 0; offset < bufferLength / 2; offset++) {
      let correlation = 0
      for (let i = 0; i < bufferLength / 2; i++) {
        correlation += buffer[i] * buffer[i + offset]
      }
      if (correlation > bestCorrelation) {
        bestCorrelation = correlation
        bestOffset = offset
      }
    }

    if (bestOffset > 0 && bestCorrelation > 0.9) {
      const freq = sampleRate / bestOffset
      if (freq > 60 && freq < 1500) {
        const detected = frequencyToNote(freq)
        if (detected) {
          setDetectedNote(detected.full)
          // Match on pitch class (note name) only, not octave — autocorrelation
          // pitch detection is prone to octave errors (picking up a harmonic),
          // but the note letter it lands on is reliable.
          const targetName = targetNote.replace(/\d/, '')
          const isMatch = detected.name === targetName && Math.abs(detected.cents) <= TOLERANCE_CENTS
          if (isMatch) {
            if (!matchStartRef.current) matchStartRef.current = performance.now()
            const elapsed = performance.now() - matchStartRef.current
            setHoldProgress(Math.min(1, elapsed / HOLD_MS))
            if (elapsed >= HOLD_MS) setVerified(true)
          } else {
            matchStartRef.current = null
            setHoldProgress(0)
          }
        }
      }
    }

    animRef.current = requestAnimationFrame(detectPitch)
  }, [targetNote])

  const start = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctxRef.current = ctx
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      source.connect(analyser)
      analyserRef.current = analyser
      setIsListening(true)
      detectPitch()
    } catch (e) {
      setError('Microphone access denied. Please allow microphone access to verify this note.')
    }
  }, [detectPitch])

  const stop = useCallback(() => {
    cancelAnimationFrame(animRef.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (ctxRef.current) {
      ctxRef.current.close()
      ctxRef.current = null
    }
    setIsListening(false)
    setDetectedNote(null)
    setHoldProgress(0)
  }, [])

  useEffect(() => () => stop(), [stop])

  return { isListening, detectedNote, verified, error, holdProgress, start, stop }
}
