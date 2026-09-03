import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Heart, ShieldCheck, Sparkles, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { featuredProfiles } from '../data/mockData'
import type { Role } from '../types'

interface BrowsePageProps {
  role: Role
  onStartChat: (id: string) => void
}

export function BrowsePage({ role, onStartChat }: BrowsePageProps) {
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('All')
  const [selectedCity, setSelectedCity] = useState('All')
  const [onlyOnline, setOnlyOnline] = useState(false)

  const cities = ['All', 'Copenhagen', 'Berlin', 'Stockholm']
  const goals = ['All', 'Long-term connection', 'Intentional partnership', 'Committed relationship']

  const filteredProfiles = featuredProfiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.interests.some((interest) => interest.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCity = selectedCity === 'All' || profile.city === selectedCity
    const matchesGoal = selectedGoal === 'All' || profile.relationshipGoal === selectedGoal
    const matchesOnline = !onlyOnline || profile.online

    return matchesSearch && matchesCity && matchesGoal && matchesOnline
  })

  const handleStartChat = (profileId: string) => {
    onStartChat(profileId)
    navigate('/chat')
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10 text-slate-800 dark:text-slate-100 transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/10 p-6 shadow-2xl shadow-black/5 dark:shadow-black/30 backdrop-blur-xl md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-600 dark:text-fuchsia-300">Curated discovery</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Browse verified people who are ready to connect.</h1>
          </div>
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className={`flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
              showFilters
                ? 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300'
                : 'border-slate-300 dark:border-white/10 bg-white/30 dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Filter size={16} /> Advanced filters
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 p-6 shadow-xl backdrop-blur-md"
            >
              <div className="grid gap-6 md:grid-cols-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Search profiles</label>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/70 px-3 py-2">
                    <Search size={16} className="text-slate-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none dark:text-white"
                      placeholder="Name, bio, interest..."
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-slate-950/70 px-3 py-2.5 text-sm outline-none dark:text-white"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city} className="dark:bg-slate-900">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Relationship Goal</label>
                  <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-slate-950/70 px-3 py-2.5 text-sm outline-none dark:text-white"
                  >
                    {goals.map((goal) => (
                      <option key={goal} value={goal} className="dark:bg-slate-900">
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6 md:pt-8">
                  <input
                    type="checkbox"
                    id="onlineOnly"
                    checked={onlyOnline}
                    onChange={(e) => setOnlyOnline(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
                  />
                  <label htmlFor="onlineOnly" className="text-sm font-medium text-slate-700 dark:text-slate-300 select-none cursor-pointer">
                    Only online members
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="grid gap-5">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile, index) => (
                <motion.article
                  key={profile.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-6 shadow-xl dark:shadow-[0_20px_80px_-30px_rgba(0,0,0,0.7)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{profile.name}, {profile.age}</h2>
                        {profile.verified ? <ShieldCheck size={16} className="text-fuchsia-500 dark:text-fuchsia-300" /> : null}
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{profile.city} · {profile.distance} km away</p>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-sm ${profile.online ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                      {profile.online ? 'Online' : 'Away'}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{profile.bio}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span key={interest} className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs text-slate-650 dark:text-slate-300">{interest}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-4">
                    <div>
                      <p className="text-sm font-medium text-slate-850 dark:text-white">{profile.relationshipGoal}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{profile.vibe}</p>
                    </div>
                    {role === 'chooser' ? (
                      <button
                        onClick={() => handleStartChat(profile.id)}
                        className="flex items-center gap-2 rounded-full bg-fuchsia-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-fuchsia-400 active:scale-95"
                      >
                        <Heart size={16} /> Send first message
                      </button>
                    ) : (
                      <div className="text-xs text-slate-450 italic">Only Choosers can initiate messages</div>
                    )}
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-12 text-center">
                <p className="text-slate-500 dark:text-slate-400">No profiles match your search criteria.</p>
              </div>
            )}
          </section>

          <aside className="h-fit rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/10 p-6 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-200">
              <Sparkles size={18} /> <span className="font-medium">Why this works</span>
            </div>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-650 dark:text-slate-300">
              <li>• Choosers see only Be Chosen profiles and can message immediately.</li>
              <li>• Be Chosen members stay visible only after full verification.</li>
              <li>• Every profile includes a verified badge, identity assurance, and privacy-first controls.</li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  )
}

