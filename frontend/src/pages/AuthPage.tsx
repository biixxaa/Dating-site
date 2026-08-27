import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import type { Role } from '../types'

interface AuthPageProps {
  onAuth: (name: string, role: Role, gender?: string) => void
}

export function AuthPage({ onAuth }: AuthPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role>('chooser')
  const [gender, setGender] = useState<'Male' | 'Female' | 'Non-binary'>('Male')
  const isLogin = window.location.pathname === '/login'
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || (!isLogin && !name)) {
      alert('Please fill out all fields.')
      return
    }

    if (isLogin) {
      // Simulate successful login
      const displayName = name || email.split('@')[0]
      const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1)
      const savedGender = localStorage.getItem('gender') || 'Male'
      
      // Auto-detect role on login
      let loginRole: Role = localStorage.getItem('role') as Role
      if (!loginRole) {
        if (email.toLowerCase().includes('admin')) {
          loginRole = 'admin'
        } else if (email.toLowerCase().includes('chosen')) {
          loginRole = 'be-chosen'
        } else {
          loginRole = 'chooser'
        }
      }

      onAuth(capitalizedName, loginRole, savedGender)
      navigate(loginRole === 'admin' ? '/admin' : loginRole === 'chooser' ? '/browse' : '/chat')
    } else {
      // Simulate signup - save temp details to be finalized upon verification
      localStorage.setItem('temp_name', name)
      localStorage.setItem('temp_role', selectedRole)
      localStorage.setItem('temp_gender', gender)
      navigate('/verification')
    }
  }


  return (
    <main className="flex min-h-screen items-center justify-center transition-colors duration-300 bg-[radial-gradient(circle_at_top,_rgba(217,70,239,0.1),_transparent_40%),linear-gradient(135deg,_#f8fafc,_#f1f5f9)] dark:bg-[radial-gradient(circle_at_top,_rgba(217,70,239,0.20),_transparent_40%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-10 text-slate-800 dark:text-slate-100">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-200">
          <ShieldCheck size={18} /> <span className="text-sm uppercase tracking-[0.3em] font-semibold">Secure access</span>
        </div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Identity verification is required before your profile becomes visible to the community.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-355">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-fuchsia-500 transition-colors"
                placeholder="Taylor Brooks"
                required
              />
            </div>
          )}
          
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-355">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-fuchsia-500 transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-355">Password</label>
            <div className="flex items-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 focus-within:border-fuchsia-500 transition-colors">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none"
                placeholder="••••••••"
                required
              />
              <button type="button" className="ml-2 text-slate-400 hover:text-slate-650 dark:hover:text-white" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-355">Select your role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as Role)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-fuchsia-500 transition-colors"
                >
                  <option value="chooser" className="dark:bg-slate-900">Chooser (Browse & Message)</option>
                  <option value="be-chosen" className="dark:bg-slate-900">Be Chosen (Be Discovered)</option>
                  <option value="admin" className="dark:bg-slate-900">Administrator</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-355">Gender</label>
                <div className="flex gap-2">
                  {(['Male', 'Female', 'Non-binary'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 rounded-2xl border py-2.5 text-sm font-medium transition-all ${
                        gender === g
                          ? 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300'
                          : 'border-slate-200 dark:border-white/10 bg-white/20 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-medium">⚠️ Gender selection is permanent and can never be updated.</p>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-400 active:scale-98 shadow-md"
          >
            {isLogin ? 'Login' : 'Continue to verification'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {isLogin ? 'New here?' : 'Already have an account?'}{' '}
          <Link to={isLogin ? '/register' : '/login'} className="text-fuchsia-600 dark:text-fuchsia-300 font-semibold hover:underline">
            {isLogin ? 'Create account' : 'Log in'}
          </Link>
        </p>
      </div>
    </main>
  )
}

