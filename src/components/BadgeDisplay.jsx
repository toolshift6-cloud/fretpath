import { BADGES, getBadgeById } from '../data/badges'

export default function BadgeDisplay({ earnedBadgeIds = [], compact = false }) {
  if (compact) {
    const recent = earnedBadgeIds.slice(-5).map(id => getBadgeById(id)).filter(Boolean)
    return (
      <div className="flex gap-2">
        {recent.map(b => (
          <div key={b.id} title={b.name} className="text-2xl">{b.icon}</div>
        ))}
        {earnedBadgeIds.length > 5 && (
          <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-xs text-cream/50">
            +{earnedBadgeIds.length - 5}
          </div>
        )}
      </div>
    )
  }

  const categories = [...new Set(BADGES.map(b => b.category))]

  return (
    <div className="space-y-4">
      {categories.map(cat => (
        <div key={cat}>
          <h4 className="text-xs font-semibold text-cream/40 uppercase tracking-wider mb-2">{cat}</h4>
          <div className="grid grid-cols-4 gap-3">
            {BADGES.filter(b => b.category === cat).map(badge => {
              const earned = earnedBadgeIds.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  title={badge.description}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                    earned ? 'bg-amber-DEFAULT/10 border border-amber-DEFAULT/30' : 'bg-surface opacity-40'
                  }`}
                >
                  <div className={`text-2xl ${earned ? '' : 'grayscale'}`}>{badge.icon}</div>
                  <div className="text-[9px] text-center text-cream/70 leading-tight">{badge.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
