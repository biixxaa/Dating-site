import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navigation } from './components/Navigation'
import { AdminPage } from './pages/AdminPage'
import { AuthPage } from './pages/AuthPage'
import { BrowsePage } from './pages/BrowsePage'
import { ChatPage } from './pages/ChatPage'
import { LandingPage } from './pages/LandingPage'
import { VerificationPage } from './pages/VerificationPage'
import type { Role } from './types'

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('isDark')
    return saved !== null ? saved === 'true' : true
  })
  const [role, setRole] = useState<Role>(() => (localStorage.getItem('role') as Role) || 'chooser')
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true')
  const [_userName, setUserName] = useState(() => localStorage.getItem('userName') || '')
  const [gender, setGender] = useState(() => localStorage.getItem('gender') || '')
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('isDark', String(isDark))
  }, [isDark])

  const handleLogin = (name: string, selectedRole: Role, selectedGender?: string) => {
    setIsAuthenticated(true)
    setRole(selectedRole)
    setUserName(name)
    if (selectedGender) {
      setGender(selectedGender)
      localStorage.setItem('gender', selectedGender)
    }
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('role', selectedRole)
    localStorage.setItem('userName', name)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setRole('chooser')
    setUserName('')
    setGender('')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    localStorage.removeItem('gender')
    localStorage.removeItem('temp_name')
    localStorage.removeItem('temp_role')
    localStorage.removeItem('temp_gender')
  }

  const routes = useMemo(
    () => (
      <Routes>
        <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
        <Route
          path="/login"
          element={<AuthPage onAuth={handleLogin} />}
        />
        <Route
          path="/register"
          element={<AuthPage onAuth={handleLogin} />}
        />
        <Route
          path="/verification"
          element={
            <VerificationPage
              onComplete={() =>
                handleLogin(
                  localStorage.getItem('temp_name') || 'Taylor Brooks',
                  (localStorage.getItem('temp_role') as Role) || 'chooser',
                  localStorage.getItem('temp_gender') || 'Male'
                )
              }
            />
          }
        />
        <Route
          path="/browse"
          element={
            isAuthenticated && role === 'chooser' ? (
              <BrowsePage role={role} onStartChat={(id) => setActiveChatId(id)} />
            ) : isAuthenticated ? (
              <Navigate to="/chat" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/chat"
          element={
            isAuthenticated ? (
              <ChatPage activeChatId={activeChatId} onClearActiveChat={() => setActiveChatId(null)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && role === 'admin' ? (
              <AdminPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    ),
    [role, activeChatId, isAuthenticated]
  )

  return (
    <BrowserRouter>
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        {/* Background decorative glow blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-fuchsia-500/10 dark:bg-fuchsia-500/[0.07] blur-[100px] sm:blur-[130px] pointer-events-none select-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/[0.07] blur-[100px] sm:blur-[130px] pointer-events-none select-none" />
        
        <Navigation
          role={role}
          isAuthenticated={isAuthenticated}
          isDark={isDark}
          toggleTheme={() => setIsDark((prev) => !prev)}
          onLogout={handleLogout}
          gender={gender}
        />
        <div className="relative z-10">
          {routes}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App


