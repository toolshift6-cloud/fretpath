import { useState, useRef, useCallback, useEffect } from 'react'

const HOLD_MS = 500
const MIN_RMS = 0.02
const BIN_TOLERANCE_HZ = 6
const ENERGY_THRESHOLD_DB = -55
const MATCH_RATIO = 0.7 // fraction of the chord's notes that must be detected

// Verifies a strummed chord by checking for energy at each expected note's
// fundamental frequency (and its first overtone) via FFT, rather than trying
// to identify a single pitch — autocorrelation can't resolve multiple
// simultaneous notes, but presence-of-energy-at-known-frequencies works
// reasonably well for "did roughly the right notes ring out."
export function useChordListener(targetFreqs) {
  const [isListening, setIsListening] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)
  const [holdProgress, setHoldProgress] = useState(0)
  const [matchedCount, setMatchedCount] = useState(0)

  const streamRef = useRef(null)
  const animRef = useRef(null)
  const analyserRef = useRef(null)
  const ctxRef = useRef(null)
  const matchStartRef = useRef(null)

  const analyze = useCallback(() => {
    if (!analyserRef.current) return
    const analyser = analyserRef.current
    const sampleRate = ctxRef.current.sampleRate
    const bufferLength = analyser.fftSize
    const timeData = new Float32Array(bufferLength)
    analyser.getFloatTimeDomainData(timeData)

    let rms = 0
    for (let i = 0; i < bufferLength; i++) rms += timeData[i] * timeData[i]
    rms = Math.sqrt(rms / bufferLength)

    if (rms < MIN_RMS) {
      setMatchedCount(0)
      matchStartRef.current = null
      setHoldProgress(0)
      animRef.current = requestAnimationFrame(analyze)
      return
    }

    const freqData = new Float32Array(analyser.frequencyBinCount)
    analyser.getFloatFrequencyData(freqData)
    const binHz = sampleRate / analyser.fftSize

    let matched = 0
    for (const target of targetFreqs) {
      const candidates = [target, target * 2]
      let found = false
      for (const f of candidates) {
        const centerBin = Math.round(f / binHz)
        const spreadBins = Math.max(1, Math.round(BIN_TOLERANCE_HZ / binHz))
        let peak = -Infinity
        for (let b = centerBin - spreadBins; b <= centerBin + spreadBins; b++) {
          if (b >= 0 && b < freqData.length) peak = Math.max(peak, freqData[b])
        }
        if (peak > ENERGY_THRESHOLD_DB) { found = true; break }
      }
      if (found) matched++
    }
    setMatchedCount(matched)

    const ratio = targetFreqs.length ? matched / targetFreqs.length : 0
    if (ratio >= MATCH_RATIO) {
      if (!matchStartRef.current) matchStartRef.current = performance.now()
      const elapsed = performance.now() - matchStartRef.current
      setHoldProgress(Math.min(1, elapsed / HOLD_MS))
      if (elapsed >= HOLD_MS) setVerified(true)
    } else {
      matchStartRef.current = null
      setHoldProgress(0)
    }

    animRef.current = requestAnimationFrame(analyze)
  }, [targetFreqs])

  const start = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctxRef.current = ctx
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 4096
      analyser.smoothingTimeConstant = 0.2
      source.connect(analyser)
      analyserRef.current = analyser
      setIsListening(true)
      analyze()
    } catch (e) {
      setError('Microphone access denied. Please allow microphone access to verify this chord.')
    }
  }, [analyze])

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
    setHoldProgress(0)
    setMatchedCount(0)
  }, [])

  useEffect(() => () => stop(), [stop])

  return {
    isListening,
    verified,
    error,
    holdProgress,
    matchedCount,
    total: targetFreqs.length,
    start,
    stop,
  }
}
