import { useState } from 'react'
import { Check, X, ShieldAlert, Sparkles, UserCheck, ShieldX } from 'lucide-react'
import { adminStats as initialStats } from '../data/mockData'

interface PendingUser {
  id: string
  name: string
  age: number
  city: string
  score: number
  occupation: string
}

export function AdminPage() {
  const [stats, setStats] = useState(initialStats)
  const [queue, setQueue] = useState<PendingUser[]>([
    { id: 'p1', name: 'Chloe', age: 25, city: 'London', score: 98, occupation: 'Product Designer' },
    { id: 'p2', name: 'Liam', age: 28, city: 'Paris', score: 94, occupation: 'Software Engineer' },
    { id: 'p3', name: 'Emma', age: 30, city: 'Stockholm', score: 89, occupation: 'Data Analyst' },
  ])
  const [alerts, setAlerts] = useState([
    { id: 'a1', message: 'Liveness mismatch on signup attempt (IP match failed)', type: 'error', time: '10m ago' },
    { id: 'a2', message: 'Chooser membership upgrade processed for user #819', type: 'info', time: '45m ago' },
    { id: 'a3', message: 'Report resolved: content checked and cleared for user #113', type: 'success', time: '2h ago' },
  ])

  const handleAction = (id: string, name: string, approve: boolean) => {
    // Remove from queue
    setQueue((prev) => prev.filter((user) => user.id !== id))
    
    // Add an alert
    const newAlert = {
      id: String(Date.now()),
      message: `User ${name} ${approve ? 'approved' : 'rejected'} for membership`,
      type: approve ? 'success' : 'error',
      time: 'Just now',
    }
    setAlerts((prev) => [newAlert, ...prev])

    // If approved, increment verified members percentage slightly as a joke/feedback
    if (approve) {
      setStats((prev) =>
        prev.map((s) => (s.label === 'Verified members' ? { ...s, value: '92.6%' } : s))
      )
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10 text-slate-800 dark:text-slate-100 transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Banner */}
        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-600 dark:text-fuchsia-300 font-semibold">Administration</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Protecting members with verification, moderation, and insight.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-650 dark:text-slate-300">The admin experience gives operators the ability to review verification submissions, moderate reports, manage memberships, and inspect signals for fake accounts or scam behavior.</p>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/70 p-5 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Admin Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Verification Queue */}
          <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-6 shadow-md flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Verification review queue</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-405">Approve or reject identity submissions based on facial liveness and trust metrics.</p>
            </div>
            
            <div className="flex-1 space-y-3 min-h-[250px]">
              {queue.length > 0 ? (
                queue.map((user) => (
                  <div key={user.id} className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 transition duration-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{user.name}, {user.age}</span>
                        <span className="text-3xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                          {user.score}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user.city} · {user.occupation}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(user.id, user.name, false)}
                        className="rounded-full bg-red-500/10 text-red-600 dark:text-red-300 border border-red-500/20 p-2 transition hover:bg-red-500/20"
                        title="Reject user"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => handleAction(user.id, user.name, true)}
                        className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 p-2 transition hover:bg-emerald-500/20"
                        title="Approve user"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                  <UserCheck size={32} className="text-slate-400" />
                  <p className="text-slate-550 dark:text-slate-400 text-sm mt-3 font-medium">All caught up!</p>
                  <p className="text-slate-450 text-xs mt-1">No identity verification submissions currently in queue.</p>
                </div>
              )}
            </div>
          </div>

          {/* Security and Alerts */}
          <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-6 shadow-md flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Security & moderation</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-405">Monitor flags, membership state, security status, and system event logs.</p>
              </div>
              <ShieldAlert size={20} className="text-fuchsia-550" />
            </div>

            <div className="flex-1 space-y-3 max-h-[350px] overflow-y-auto">
              {alerts.map((alert) => {
                const isErr = alert.type === 'error'
                const isSuccess = alert.type === 'success'
                return (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-xs leading-5 transition-all duration-200 ${
                      isErr
                        ? 'border-red-200/50 bg-red-500/5 text-red-700 dark:text-red-300'
                        : isSuccess
                        ? 'border-emerald-250 bg-emerald-550/5 text-emerald-705 dark:text-emerald-300'
                        : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-650 dark:text-slate-350'
                    }`}
                  >
                    {isErr ? (
                      <ShieldX size={16} className="text-red-500 mt-0.5" />
                    ) : (
                      <Sparkles size={16} className="text-fuchsia-505 dark:text-fuchsia-300 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p>{alert.message}</p>
                      <span className="mt-1 block text-3xs text-slate-450 dark:text-slate-500">{alert.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

