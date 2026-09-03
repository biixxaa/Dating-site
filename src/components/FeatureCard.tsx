import type { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/10 p-6 shadow-[0_15px_60px_-20px_rgba(15,23,42,0.05)] dark:shadow-[0_15px_60px_-20px_rgba(15,23,42,0.65)] backdrop-blur-xl">
      <div className="mb-4 inline-flex rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-3 text-fuchsia-600 dark:text-fuchsia-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  )
}
