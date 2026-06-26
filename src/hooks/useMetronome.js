import { useState, useEffect, useRef, useCallback } from 'react'

export function useMetronome() {
  const [bpm, setBpm] = useState(80)
  const [isPlaying, setIsPlaying] = useState(false)
  const [beat, setBeat] = useState(0)
  const [beatsPerBar, setBeatsPerBar] = useState(4)
  const [volume, setVolume] = useState(0.8)

  const ctxRef = useRef(null)
  const nextBeatTimeRef = useRef(0)
  const currentBeatRef = useRef(0)
  const schedulerRef = useRef(null)
  const lookahead = 25 // ms
  const scheduleAheadTime = 0.1 // seconds

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return ctxRef.current
  }

  const scheduleClick = useCallback((time, isAccent) => {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.frequency.value = isAccent ? 1000 : 800
    gainNode.gain.setValueAtTime(volume, time)
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

    osc.start(time)
    osc.stop(time + 0.05)
  }, [volume])

  const scheduler = useCallback(() => {
    const ctx = getCtx()
    while (nextBeatTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const isAccent = currentBeatRef.current % beatsPerBar === 0
      scheduleClick(nextBeatTimeRef.current, isAccent)
      setBeat(currentBeatRef.current % beatsPerBar)
      nextBeatTimeRef.current += 60 / bpm
      currentBeatRef.current++
    }
  }, [bpm, beatsPerBar, scheduleClick])

  useEffect(() => {
    if (isPlaying) {
      const ctx = getCtx()
      nextBeatTimeRef.current = ctx.currentTime
      currentBeatRef.current = 0
      schedulerRef.current = setInterval(scheduler, lookahead)
    } else {
      clearInterval(schedulerRef.current)
    }
    return () => clearInterval(schedulerRef.current)
  }, [isPlaying, scheduler])

  const toggle = useCallback(() => {
    setIsPlaying(p => !p)
  }, [])

  const tap = useCallback(() => {
    // Tap tempo implementation
    const now = Date.now()
    if (!tap._last || now - tap._last > 2000) {
      tap._taps = [now]
    } else {
      tap._taps = [...(tap._taps || []), now]
      if (tap._taps.length > 1) {
        const gaps = tap._taps.slice(1).map((t, i) => t - tap._taps[i])
        const avgGap = gaps.reduce((a, b) => a + b) / gaps.length
        setBpm(Math.round(Math.max(40, Math.min(220, 60000 / avgGap))))
      }
    }
    tap._last = now
  }, [])

  return { bpm, setBpm, isPlaying, toggle, beat, beatsPerBar, setBeatsPerBar, volume, setVolume, tap }
}
