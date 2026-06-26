// Parses 6-line ASCII guitar tab blocks (e|---0-3---|, B|...|, etc.) into a
// list of { string, fret, col } note events, so we can render a visual
// fretboard representation alongside the raw text — not everyone can read
// tab notation fluently yet.
const STRING_LETTER_TO_NUM = { e: 1, B: 2, G: 3, D: 4, A: 5, E: 6 }

function parseStringRow(row) {
  const events = []
  let i = 0
  while (i < row.length) {
    if (/\d/.test(row[i])) {
      let j = i
      let digits = ''
      while (j < row.length && /\d/.test(row[j])) {
        digits += row[j]
        j++
      }
      events.push({ col: i, fret: Number(digits) })
      i = j
    } else {
      i++
    }
  }
  return events
}

// `tabLines` is an array of strings, one per tab line (a single lesson/song
// tab is often split across several array entries — they all get scanned).
export function parseTabNotes(tabLines = []) {
  const stringRows = {}
  tabLines.forEach(line => {
    const m = line.match(/^([eEBGDA])\|(.*?)\|?\s*$/)
    if (!m) return
    const num = STRING_LETTER_TO_NUM[m[1]]
    if (num !== undefined) stringRows[num] = m[2]
  })

  const events = []
  Object.entries(stringRows).forEach(([numStr, row]) => {
    parseStringRow(row).forEach(({ col, fret }) => {
      events.push({ string: Number(numStr), fret, col })
    })
  })
  events.sort((a, b) => a.col - b.col)
  return events
}
