import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Camera, Lock, MessageSquareText, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FeatureCard } from '../components/FeatureCard'
import { featuredProfiles } from '../data/mockData'

interface LandingPageProps {
  isAuthenticated: boolean
}

export function LandingPage({ isAuthenticated }: LandingPageProps) {
  return (
    <main className="min-h-screen transition-colors duration-300 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.12),_transparent_40%),linear-gradient(135deg,_#f8fafc,_#f1f5f9_60%,_#eaeef4)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.25),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_50%,_#0f172a)] text-slate-800 dark:text-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-2 text-sm text-fuchsia-600 dark:text-fuchsia-200">
            <Sparkles size={16} /> Premium identity-first dating for modern adults
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl leading-[1.15]">
            Meet the people you <span className="text-gradient-premium">choose</span>, with privacy built in.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Spicy Pick reimagines intimacy for high-value users. Choosers browse verified profiles and message immediately, while Be Chosen members receive thoughtful attention without sacrificing safety.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="flex items-center gap-2 rounded-full bg-fuchsia-500 px-5 py-3 font-semibold text-white transition hover:bg-fuchsia-400 active:scale-95 shadow-lg shadow-fuchsia-500/25">
              Create account <ArrowRight size={18} />
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className="rounded-full border border-slate-300 dark:border-white/15 px-5 py-3 font-medium text-slate-700 dark:text-slate-200 transition hover:border-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-white dark:hover:border-fuchsia-450 active:scale-95">
                Log in to explore
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-xl rounded-[2rem] glass-panel p-4 glow-fuchsia">
          <div className="rounded-[1.5rem] border border-slate-100/50 dark:border-white/5 bg-white/70 dark:bg-slate-950/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-600 dark:text-fuchsia-300 font-semibold">Verified live now</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">A curated circle of serious people</h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-300">
                <BadgeCheck size={18} />
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {featuredProfiles.slice(0, 2).map((profile) => (
                <div key={profile.id} className="flex items-center justify-between rounded-2xl border border-slate-150 dark:border-white/5 bg-white/80 dark:bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{profile.name}, {profile.age}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{profile.city} · {profile.occupation}</p>
                  </div>
                  <div className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-200">{profile.distance} km</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard title="Identity verified" description="Government ID, selfie, liveness, and face match are all part of the approval flow." icon={<ShieldCheck size={18} />} />
          <FeatureCard title="Private by default" description="Encrypted messaging, disappearing chats, screenshot protection, and blur-first photos keep intimacy safe." icon={<Lock size={18} />} />
          <FeatureCard title="Choose your pace" description="Choosers can message immediately while Be Chosen members can reply freely and stay protected." icon={<MessageSquareText size={18} />} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/60 p-8 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-600 dark:text-fuchsia-300">Built for premium rituals</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">A refined experience from profile to voice and video.</h2>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2 text-sm text-slate-600 dark:text-slate-300">
              <Camera size={16} /> HD calls and private content controls
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Chooser premium</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Unlimited swipes, unlimited messaging, advanced filters, incognito mode, and priority support for the premium side of the experience.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/5 p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Be Chosen free</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Create profile, receive messages, respond for free, and join voice and video conversations without being exposed to other free members.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
