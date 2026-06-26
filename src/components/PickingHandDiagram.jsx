// Visual map of which picking-hand finger plays which string — clears up the
// classical p-i-m-a notation (thumb/index/middle/ring), and makes explicit
// that this is the picking hand (right hand for right-handed players),
// separate from the fretting hand (left hand) that shapes the chord.
const STRING_NAMES = { 1: 'e', 2: 'B', 3: 'G', 4: 'D', 5: 'A', 6: 'E' }

export default function PickingHandDiagram({ assignments = [] }) {
  const stringToAssignment = {}
  assignments.forEach(a => a.strings.forEach(s => { stringToAssignment[s] = a }))

  const w = 320
  const h = 140
  const stringXs = { 6: 30, 5: 78, 4: 126, 3: 174, 2: 222, 1: 270 }

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Strumming-hand label */}
        <text x={w / 2} y={14} textAnchor="middle" fontSize={10} fill="#888">
          Picking hand (right hand) — looking at the strings from the front
        </text>

        {/* Strings */}
        {[6, 5, 4, 3, 2, 1].map(s => (
          <line key={`s-${s}`} x1={stringXs[s]} y1={30} x2={stringXs[s]} y2={100} stroke="#666" strokeWidth={s >= 4 ? 2 : 1} />
        ))}

        {/* String name labels */}
        {[6, 5, 4, 3, 2, 1].map(s => (
          <text key={`n-${s}`} x={stringXs[s]} y={114} textAnchor="middle" fontSize={10} fill="#888">
            {STRING_NAMES[s]}
          </text>
        ))}

        {/* Finger dots + letters at the top of each string */}
        {[6, 5, 4, 3, 2, 1].map(s => {
          const a = stringToAssignment[s]
          if (!a) return null
          return (
            <g key={`f-${s}`}>
              <circle cx={stringXs[s]} cy={30} r={13} fill={a.color} />
              <text x={stringXs[s]} y={34} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#1A1814">
                {a.finger}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-3">
        {assignments.map(a => (
          <div key={a.finger} className="flex items-center gap-1.5 text-xs text-cream/70">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: a.color }} />
            <span className="font-semibold" style={{ color: a.color }}>{a.finger}</span> = {a.label}
          </div>
        ))}
      </div>
    </div>
  )
}
