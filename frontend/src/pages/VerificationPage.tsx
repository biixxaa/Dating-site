import { useState } from 'react'
import { CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface VerificationPageProps {
  onComplete: () => void
}

export function VerificationPage({ onComplete }: VerificationPageProps) {
  const [verifyingStep, setVerifyingStep] = useState<number | null>(null)
  const navigate = useNavigate()
  
  const steps = [
    'Government ID verification',
    'Selfie verification',
    '5–10 second video selfie',
    'Face matching',
    'Age 18+',
    'Real profile photo',
    'Community guidelines',
  ]

  const verificationStages = [
    'Extracting Government ID data...',
    'Analyzing facial features and liveness...',
    'Matching face signatures...',
    'Updating profile trust metrics...',
    'Identity verified successfully!',
  ]

  const handleVerify = () => {
    setVerifyingStep(0)
    
    const runStage = (stageIndex: number) => {
      if (stageIndex >= verificationStages.length) {
        onComplete()
        const tempRole = localStorage.getItem('temp_role') || 'chooser'
        navigate(tempRole === 'admin' ? '/admin' : tempRole === 'chooser' ? '/browse' : '/chat')
        return
      }
      setTimeout(() => {
        setVerifyingStep(stageIndex + 1)
        runStage(stageIndex + 1)
      }, 1000)
    }

    runStage(0)
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10 text-slate-800 dark:text-slate-100 transition-colors duration-300 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {verifyingStep === null ? (
          <>
            <div className="flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-200">
              <ShieldCheck size={18} /> <span className="text-sm uppercase tracking-[0.3em] font-semibold">Verification required</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Complete the identity flow before you go live.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">Every account must complete the full verification checklist to ensure a safer, more trusted community.</p>

            <div className="mt-8 space-y-3">
              {steps.map((step) => (
                <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-3">
                  <CheckCircle2 size={18} className="text-emerald-500 dark:text-emerald-300" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">{step}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="mt-8 w-full rounded-full bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-400 active:scale-98 shadow-md"
            >
              Submit verification
            </button>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-6">
            {verifyingStep < verificationStages.length - 1 ? (
              <Loader2 className="h-12 w-12 text-fuchsia-500 animate-spin" />
            ) : (
              <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
            )}
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {verifyingStep < verificationStages.length - 1 ? 'Securing your identity' : 'Trust score generated'}
              </h2>
              <p className="text-slate-500 dark:text-slate-450 text-sm max-w-md">
                We use secure liveness detection to ensure all profiles belong to authentic members.
              </p>
            </div>

            <div className="w-full max-w-md mt-4 space-y-3">
              {verificationStages.map((stage, idx) => {
                const isCompleted = idx < verifyingStep
                const isCurrent = idx === verifyingStep
                
                return (
                  <div
                    key={stage}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
                      isCompleted
                        ? 'border-emerald-200/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-300'
                        : isCurrent
                        ? 'border-fuchsia-300 bg-fuchsia-500/5 text-fuchsia-605 dark:text-fuchsia-200 font-medium'
                        : 'border-transparent text-slate-400 opacity-50'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : isCurrent ? (
                      <Loader2 size={16} className="animate-spin text-fuchsia-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-slate-300" />
                    )}
                    <span className="text-sm">{stage}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

