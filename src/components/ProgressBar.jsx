export default function ProgressBar({ value, max, color = '#C4832A', height = 8, label, showPercent = false }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div>
      {(label || showPercent) && (
        <div className="flex justify-between text-xs text-cream/50 mb-1">
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="bg-surface rounded-full overflow-hidden" style={{ height }}>
        <div
          className="h-full rounded-full xp-bar-fill transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}
