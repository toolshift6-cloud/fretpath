// Interactive SVG Fretboard component
const STRING_COLORS = ['#F2EDE4', '#E8C87A', '#C4832A', '#E8C87A', '#F2EDE4', '#F2EDE4']
const FINGER_COLORS = ['#4A9EFF', '#C4832A', '#E8C87A', '#FF6B6B', '#7ED16F']
const OPEN_DOT_COLOR = '#4A9EFF'
const MUTED_COLOR = '#FF4444'
const BARRE_COLOR = '#C4832A'
const SCALE_COLOR = '#4A9EFF'

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
// Pitch class of each open string in standard tuning (string 1 = high e ... 6 = low E)
const OPEN_STRING_PITCH = { 1: 4, 2: 11, 3: 7, 4: 2, 5: 9, 6: 4 }

// Every note marked on a fretboard diagram gets its letter name labeled —
// helps people connect fret positions to actual music theory as they go.
function noteNameAt(string, fret) {
  const open = OPEN_STRING_PITCH[string]
  if (open === undefined) return ''
  return NOTE_NAMES[(open + fret) % 12]
}

const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17]
const DOUBLE_MARKERS = [12]

export default function Fretboard({
  chord = null,         // { fingers: [{string, fret, finger, barre?}], openStrings: [], mutedStrings: [] }
  scale = null,         // { notes: [{string, fret}] }
  compact = false,      // small chord diagram mode
  startFret = 0,        // for displaying higher positions
  numFrets = 5,
  highlightStrings = [],
}) {
  if (compact && chord) {
    return <CompactChordDiagram chord={chord} />
  }

  const frets = numFrets
  const strings = 6
  const w = compact ? 200 : 500
  const h = compact ? 180 : 220
  const paddingLeft = 60
  const paddingTop = 30
  const paddingBottom = 30
  const paddingRight = 20
  const fretWidth = (w - paddingLeft - paddingRight) / frets
  const stringSpacing = (h - paddingTop - paddingBottom) / (strings - 1)

  const fretX = (f) => paddingLeft + f * fretWidth
  const stringY = (s) => paddingTop + (s - 1) * stringSpacing

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Fret lines */}
      {Array.from({ length: frets + 1 }, (_, i) => (
        <line
          key={`fret-${i}`}
          x1={fretX(i)} y1={paddingTop}
          x2={fretX(i)} y2={h - paddingBottom}
          stroke={i === 0 ? '#F2EDE4' : '#444'}
          strokeWidth={i === 0 ? 3 : 1}
        />
      ))}

      {/* String lines */}
      {Array.from({ length: strings }, (_, i) => (
        <line
          key={`str-${i}`}
          x1={paddingLeft} y1={stringY(i + 1)}
          x2={w - paddingRight} y2={stringY(i + 1)}
          stroke={highlightStrings.includes(i + 1) ? '#C4832A' : '#666'}
          strokeWidth={i >= 3 ? 1 + (i - 3) * 0.5 : 1}
        />
      ))}

      {/* Fret markers */}
      {FRET_MARKERS.map(m => {
        if (m <= startFret || m > startFret + frets) return null
        const x = fretX(m - startFret - 0.5)
        const isDbl = DOUBLE_MARKERS.includes(m)
        return isDbl ? (
          <g key={`marker-${m}`}>
            <circle cx={x} cy={stringY(2)} r={5} fill="#333" />
            <circle cx={x} cy={stringY(5)} r={5} fill="#333" />
          </g>
        ) : (
          <circle key={`marker-${m}`} cx={x} cy={(stringY(3) + stringY(4)) / 2} r={5} fill="#333" />
        )
      })}

      {/* Fret numbers */}
      {Array.from({ length: frets }, (_, i) => (
        <text
          key={`fn-${i}`}
          x={fretX(i + 0.5)}
          y={h - 5}
          textAnchor="middle"
          fontSize={10}
          fill="#888"
        >
          {startFret + i + 1}
        </text>
      ))}

      {/* String labels — string 1 (high e) at top, string 6 (low E) at bottom */}
      {['e', 'B', 'G', 'D', 'A', 'E'].map((name, i) => (
        <text key={`sn-${i}`} x={paddingLeft - 10} y={stringY(i + 1) + 4} textAnchor="middle" fontSize={10} fill="#888">
          {name}
        </text>
      ))}

      {/* Open / Muted string indicators */}
      {chord?.openStrings?.map(s => (
        <g key={`open-${s}`}>
          <circle cx={paddingLeft - 30} cy={stringY(s)} r={6} fill="none" stroke={OPEN_DOT_COLOR} strokeWidth={2} />
          <text x={paddingLeft - 30} y={stringY(s) - 12} textAnchor="middle" fontSize={9} fontWeight="bold" fill={OPEN_DOT_COLOR}>
            {noteNameAt(s, 0)}
          </text>
        </g>
      ))}
      {chord?.mutedStrings?.map(s => (
        <g key={`muted-${s}`}>
          <line x1={paddingLeft - 36} y1={stringY(s) - 6} x2={paddingLeft - 24} y2={stringY(s) + 6} stroke={MUTED_COLOR} strokeWidth={2} />
          <line x1={paddingLeft - 36} y1={stringY(s) + 6} x2={paddingLeft - 24} y2={stringY(s) - 6} stroke={MUTED_COLOR} strokeWidth={2} />
        </g>
      ))}

      {/* Chord finger dots */}
      {chord?.fingers?.map((finger, idx) => {
        const x = fretX(finger.fret - startFret - 0.5)
        const y = stringY(finger.string)
        if (finger.barre) {
          // Draw barre across all strings
          return (
            <rect
              key={`barre-${idx}`}
              x={x - fretWidth * 0.3}
              y={stringY(1)}
              width={fretWidth * 0.6}
              height={stringY(6) - stringY(1)}
              rx={8}
              fill={BARRE_COLOR}
              opacity={0.9}
            />
          )
        }
        return (
          <g key={`finger-${idx}`}>
            <circle cx={x} cy={y} r={12} fill={FINGER_COLORS[finger.finger - 1] || '#C4832A'} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize={10} fill="#1A1814" fontWeight="bold">
              {finger.finger > 0 ? finger.finger : ''}
            </text>
            <text x={x} y={y - 18} textAnchor="middle" fontSize={9} fontWeight="bold" fill={FINGER_COLORS[finger.finger - 1] || '#C4832A'}>
              {noteNameAt(finger.string, finger.fret)}
            </text>
          </g>
        )
      })}

      {/* Scale notes */}
      {scale?.notes?.map((n, idx) => {
        const x = fretX(n.fret - startFret - 0.5)
        const y = stringY(n.string)
        const isRoot = n.isRoot
        return (
          <g key={`scale-${idx}`}>
            <circle
              cx={x} cy={y} r={10}
              fill={isRoot ? '#C4832A' : SCALE_COLOR}
              opacity={0.85}
            />
            <text x={x} y={y + 3} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#1A1814">
              {noteNameAt(n.string, n.fret)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Compact chord diagram (vertical, like in songbooks)
function CompactChordDiagram({ chord }) {
  const strings = 6
  const frets = 4
  const w = 130
  const h = 130
  const pl = 25, pr = 15, pt = 20, pb = 20
  const fw = (w - pl - pr) / (strings - 1)
  const fh = (h - pt - pb) / frets

  // string positions: string 6 (low E) on left, string 1 (high e) on right — standard chord-diagram orientation
  const sx = (s) => pl + (strings - s) * fw
  const fy = (f) => pt + (f - 1) * fh

  // Determine start fret
  const maxFret = Math.max(...(chord.fingers?.map(f => f.fret) || [1]))
  const startFret = maxFret > 4 ? maxFret - 3 : 0

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Nut or fret number */}
      <line x1={pl} y1={pt} x2={w - pr} y2={pt} stroke="#F2EDE4" strokeWidth={startFret === 0 ? 4 : 1} />
      {startFret > 0 && (
        <text x={pl - 5} y={pt + fh * 0.5 + 4} textAnchor="end" fontSize={9} fill="#888">{startFret + 1}fr</text>
      )}

      {/* Fret lines */}
      {Array.from({ length: frets }, (_, i) => (
        <line key={`fl-${i}`} x1={pl} y1={pt + (i + 1) * fh} x2={w - pr} y2={pt + (i + 1) * fh} stroke="#444" strokeWidth={1} />
      ))}

      {/* String lines */}
      {Array.from({ length: strings }, (_, i) => (
        <line key={`sl-${i}`} x1={sx(i + 1)} y1={pt} x2={sx(i + 1)} y2={h - pb} stroke="#666" strokeWidth={1} />
      ))}

      {/* Open / Muted */}
      {chord.openStrings?.map(s => (
        <g key={`o-${s}`}>
          <circle cx={sx(s)} cy={pt - 8} r={4} fill="none" stroke={OPEN_DOT_COLOR} strokeWidth={1.5} />
          <text x={sx(s)} y={pt - 16} textAnchor="middle" fontSize={6} fontWeight="bold" fill={OPEN_DOT_COLOR}>
            {noteNameAt(s, 0)}
          </text>
        </g>
      ))}
      {chord.mutedStrings?.map(s => (
        <text key={`x-${s}`} x={sx(s)} y={pt - 4} textAnchor="middle" fontSize={10} fill={MUTED_COLOR}>×</text>
      ))}

      {/* Fingers */}
      {chord.fingers?.map((finger, i) => {
        const y = fy(finger.fret - startFret) - fh / 2
        if (finger.barre) {
          return (
            <rect
              key={`barre-${i}`}
              x={sx(strings)}
              y={y - fh * 0.25}
              width={sx(1) - sx(strings)}
              height={fh * 0.5}
              rx={6}
              fill={BARRE_COLOR}
              opacity={0.9}
            />
          )
        }
        const x = sx(finger.string)
        return (
          <g key={`f-${i}`}>
            <circle cx={x} cy={y} r={8} fill={BARRE_COLOR} />
            <text x={x} y={y + 3} textAnchor="middle" fontSize={7} fontWeight="bold" fill="#1A1814">
              {noteNameAt(finger.string, finger.fret)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
