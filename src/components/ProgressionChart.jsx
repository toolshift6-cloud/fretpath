const PALETTE = ['#4A9EFF', '#C4832A', '#E8C87A', '#FF6B6B', '#7ED16F']

// Visual bar-by-bar chord chart for progressions described in text
// (e.g. 12-bar blues) — one colored block per bar, chord name labeled,
// same color reused whenever that chord repeats later in the progression.
export default function ProgressionChart({ progression = [] }) {
  if (!progression.length) return null

  const colorMap = {}
  let next = 0
  const colorFor = (name) => {
    if (!colorMap[name]) colorMap[name] = PALETTE[next++ % PALETTE.length]
    return colorMap[name]
  }

  const bars = progression.flatMap((p, pi) =>
    Array.from({ length: p.bars }, (_, bi) => ({ key: `${pi}-${bi}`, chord: p.chord }))
  )

  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        {bars.map((b, i) => (
          <div
            key={b.key}
            className="flex-1 min-w-[40px] rounded-lg py-3 text-center text-xs font-bold border"
            style={{ background: `${colorFor(b.chord)}1A`, color: colorFor(b.chord), borderColor: `${colorFor(b.chord)}40` }}
            title={`Bar ${i + 1}: ${b.chord}`}
          >
            {b.chord}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-cream/30 mt-1.5">
        <span>Bar 1</span>
        <span>Bar {bars.length}</span>
      </div>
    </div>
  )
}
