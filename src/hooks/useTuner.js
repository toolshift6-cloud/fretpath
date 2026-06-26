import { useState, useRef, useCallback, useEffect } from 'react'

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const STANDARD_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']

function frequencyToNote(freq) {
  if (!freq || freq < 20) return null
  const noteNum = 12 * (Math.log2(freq / 440)) + 69
  const rounded = Math.round(noteNum)
  const name = NOTE_NAMES[((rounded % 12) + 12) % 12]
  const octave = Math.floor(rounded / 12) - 1
  const cents = Math.round((noteNum - rounded) * 100)
  return { name, octave, cents, full: `${name}${octave}` }
}

export function useTuner() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [frequency, setFrequency] = useState(null)
  const [cents, setCents] = useState(0)
  const [error, setError] = useState(null)

  const streamRef = useRef(null)
  const animRef = useRef(null)
  const analyserRef = useRef(null)
  const ctxRef = useRef(null)

  const detectPitch = useCallback(() => {
    if (!analyserRef.current) return

    const analyser = analyserRef.current
    const bufferLength = analyser.fftSize
    const buffer = new Float32Array(bufferLength)
    analyser.getFloatTimeDomainData(buffer)

    // Autocorrelation pitch detection
    let rms = 0
    for (let i = 0; i < bufferLength; i++) rms += buffer[i] * buffer[i]
    rms = Math.sqrt(rms / bufferLength)
    if (rms < 0.01) {
      animRef.current = requestAnimationFrame(detectPitch)
      return
    }

    const sampleRate = ctxRef.current.sampleRate
    let bestOffset = -1
    let bestCorrelation = 0
    const correlations = new Float32Array(bufferLength / 2)

    for (let offset = 0; offset < bufferLength / 2; offset++) {
      let correlation = 0
      for (let i = 0; i < bufferLength / 2; i++) {
        correlation += buffer[i] * buffer[i + offset]
      }
      correlations[offset] = correlation
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
          setFrequency(Math.round(freq * 10) / 10)
          setNote(detected.full)
          setCents(detected.cents)
        }
      }
    }

    animRef.current = requestAnimationFrame(detectPitch)
  }, [])

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
      setError('Microphone access denied. Please allow microphone access to use the tuner.')
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
    setNote(null)
    setFrequency(null)
    setCents(0)
  }, [])

  useEffect(() => () => stop(), [stop])

  return {
    isListening,
    note,
    frequency,
    cents,
    error,
    start,
    stop,
    standardTuning: STANDARD_TUNING,
  }
}
