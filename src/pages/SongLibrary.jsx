import { useState } from 'react'
import { Search, Music, Clock } from 'lucide-react'
import { SONGS, GENRES, LEVELS_FILTER } from '../data/songs'
import { LEVELS } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import TabViewer from '../components/TabViewer'

// Curriculum "song" lessons can link to a Song Library entry via content.songId
// (e.g. L1-10 -> 's1'). completedSongs stores curriculum lesson ids, not
// Song Library ids, so we need this reverse lookup to mark songs as learned.
const LESSON_SONG_IDS = LEVELS.flatMap(l => l.lessons)
  .filter(l => l.content?.songId)
  .reduce((acc, l) => {
    acc[l.id] = l.content.songId
    return acc
  }, {})

const LEVEL_LABELS = {
  1: 'Beginner',
  2: 'Easy',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
}

const LEVEL_COLORS = {
  1: '#4A9EFF',
  2: '#7ED16F',
  3: '#E8C87A',
  4: '#C4832A',
  5: '#FF6B6B',
}

export default function SongLibrary() {
  const { completedSongs, completedLessons } = useProgress()
  const learnedSongIds = new Set([
    ...(completedSongs || []),
    ...(completedLessons || []).map(id => LESSON_SONG_IDS[id]).filter(Boolean),
  ])
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('all')
  const [level, setLevel] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = SONGS.filter(s => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase())
    const matchGenre = genre === 'all' || s.genre === genre
    const matchLevel = level === 'all' || s.level === parseInt(level)
    return matchSearch && matchGenre && matchLevel
  })

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-bg-card border-b border-white/5 px-5 pt-12 pb-5">
        <h1 className="font-display text-2xl font-bold text-cream">Song Library</h1>
        <p className="text-cream/50 text-sm mt-1">{SONGS.length} songs from beginner to pro</p>

        {/* Search */}
        <div className="relative mt-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/30" />
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field w-full pl-9 text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 py-3 border-b border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                genre === g ? 'bg-amber-DEFAULT text-bg' : 'bg-surface text-cream/50 hover:text-cream'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 mt-2 no-scrollbar">
          {LEVELS_FILTER.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                level === l ? 'bg-amber-DEFAULT text-bg' : 'bg-surface text-cream/50 hover:text-cream'
              }`}
            >
              {l === 'all' ? 'All Levels' : `Level ${l}: ${LEVEL_LABELS[l]}`}
            </button>
          ))}
        </div>
      </div>

      {/* Song list */}
      <div className="px-5 py-4 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-cream/40">
            <Music size={32} className="mx-auto mb-3 opacity-40" />
            <p>No songs match your filters</p>
          </div>
        )}

        {filtered.map(song => {
          const isLearned = learnedSongIds.has(song.id)
          const isOpen = selected === song.id

          return (
            <div key={song.id} className={`card border transition-all ${isOpen ? 'border-amber-DEFAULT/40' : 'border-white/5'}`}>
              <button
                className="w-full text-left"
                onClick={() => setSelected(isOpen ? null : song.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-surface">
                    🎸
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-cream">{song.title}</span>
                      {isLearned && <span className="text-xs text-green-400 font-semibold">✓ Learned</span>}
                    </div>
                    <div className="text-xs text-cream/50">{song.artist}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: `${LEVEL_COLORS[song.level]}20`, color: LEVEL_COLORS[song.level] }}
                      >
                        {LEVEL_LABELS[song.level]}
                      </span>
                      <span className="text-xs text-cream/40 capitalize">{song.genre}</span>
                      <span className="text-xs text-cream/40 flex items-center gap-1">
                        <Clock size={9} /> {song.learnTime}
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <p className="text-sm text-cream/70">{song.description}</p>

                  {/* Chords */}
                  {song.chords.length > 0 && (
                    <div>
                      <div className="text-xs text-cream/40 mb-2 font-semibold uppercase tracking-wider">Chords Used</div>
                      <div className="flex flex-wrap gap-2">
                        {song.chords.map(c => (
                          <span key={c} className="text-xs px-3 py-1 rounded-full bg-amber-DEFAULT/10 text-amber-light border border-amber-DEFAULT/20 font-semibold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Techniques */}
                  <div>
                    <div className="text-xs text-cream/40 mb-2 font-semibold uppercase tracking-wider">Techniques</div>
                    <div className="flex flex-wrap gap-2">
                      {song.techniques.map(t => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-surface text-cream/60">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Tab preview (with visual fretboard + play-order breakdown) */}
                  {song.tabs.length > 0 && <TabViewer tabs={song.tabs} />}

                  {/* BPM */}
                  <div className="flex items-center gap-4 text-xs text-cream/50">
                    <span>⏱ {song.bpm} BPM</span>
                    <span>🎸 {song.learnTime}</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
