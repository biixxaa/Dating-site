import { Link, useLocation } from 'react-router-dom'
import { Bell, Crown, LogOut, ShieldCheck, Sparkles, SunMoon } from 'lucide-react'
import type { Role } from '../types'

interface NavigationProps {
  role: Role
  isAuthenticated: boolean
  isDark: boolean
  toggleTheme: () => void
  onLogout: () => void
  gender?: string
}

export function Navigation({ role, isAuthenticated, isDark, toggleTheme, onLogout, gender }: NavigationProps) {
  const location = useLocation()

  const links = [
    { title: 'Home', to: '/' },
    ...(isAuthenticated ? [
      ...(role === 'chooser' ? [{ title: 'Browse', to: '/browse' }] : []),
      { title: 'Chat', to: '/chat' },
      ...(role === 'admin' ? [{ title: 'Admin', to: '/admin' }] : []),
    ] : [])
  ]

  return (
    <header className={`sticky top-0 z-20 border-b transition-colors duration-300 ${isDark ? 'border-white/10 bg-slate-950/80 text-white' : 'border-slate-200 bg-white/80 text-slate-800'} backdrop-blur-xl`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className={`flex items-center gap-3 text-lg font-semibold tracking-wide transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>
          <div className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 p-2 text-fuchsia-300">
            <Sparkles size={18} />
          </div>
          Spicy Pick
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors duration-200 ${
                location.pathname === link.to
                  ? (isDark ? 'text-white font-medium' : 'text-slate-950 font-medium')
                  : (isDark ? 'text-slate-400 hover:text-fuchsia-300' : 'text-slate-600 hover:text-fuchsia-500')
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-full border p-2 transition ${isDark ? 'border-white/10 bg-white/10 text-slate-200 hover:bg-white/20' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <SunMoon size={16} />
          </button>

          {isAuthenticated && gender && (
            <span
              className="hidden sm:inline-flex items-center gap-1 rounded-full border border-fuchsia-200 dark:border-fuchsia-500/25 bg-fuchsia-50/50 dark:bg-fuchsia-500/5 px-2.5 py-1 text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-300"
              title="This gender selection is locked and cannot be updated"
            >
              Gender: {gender} 🔒
            </span>
          )}
          
          <Link
            to={isAuthenticated ? (role === 'admin' ? '/admin' : role === 'chooser' ? '/browse' : '/chat') : '/login'}
            className="flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/15 px-3 py-2 text-xs sm:text-sm font-medium text-fuchsia-200 transition hover:bg-fuchsia-500/25"
          >
            {role === 'admin' ? <ShieldCheck size={16} /> : role === 'chooser' ? <Crown size={16} /> : <Bell size={16} />}
            {isAuthenticated ? (role === 'admin' ? 'Admin' : role === 'chooser' ? 'Chooser' : 'Be Chosen') : 'Join now'}
          </Link>

          {isAuthenticated && (
            <button
              onClick={onLogout}
              className="rounded-full border border-red-500/30 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/25"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

