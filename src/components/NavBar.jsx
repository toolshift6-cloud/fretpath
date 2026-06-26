import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Music, TrendingUp, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/curriculum', icon: BookOpen, label: 'Learn' },
  { to: '/songs', icon: Music, label: 'Songs' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-bg-card border-t border-white/10 px-2 py-2">
      <div className="flex justify-around max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive ? 'text-amber-DEFAULT' : 'text-cream/40 hover:text-cream/70'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
