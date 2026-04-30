import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 800) // Slightly longer for the fade-out feel
          }, 500)
          return 100
        }
        // Smoother increments for a "premium" feel
        const diff = Math.random() * 8
        return prev + diff
      })
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050a06]"
        >
          {/* Subtle Background Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-[500px] h-[500px] bg-forest-500/20 blur-[120px] rounded-full"
          />

          <div className="relative flex flex-col items-center">
            
            {/* Circular Progress SVG */}
            <div className="relative w-32 h-32 mb-12">
              <svg className="w-full h-full -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="64" cy="64" r="60"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-white/5"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="64" cy="64" r="60"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="377" // 2 * PI * r
                  animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                  fill="transparent"
                  strokeLinecap="round"
                  className="text-forest-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                />
              </svg>
              
              {/* Central Icon */}
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center text-3xl"
              >
                🐾
              </motion.div>
            </div>

            {/* Brand Reveal */}
            <div className="text-center overflow-hidden">
              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-4xl font-black text-white tracking-tighter mb-2"
              >
                PAWCARE
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-3">
                    <span className="w-8 h-px bg-forest-800" />
                    <span className="font-mono text-[10px] text-forest-400 tracking-[0.4em] uppercase">
                        Clinical Excellence
                    </span>
                    <span className="w-8 h-px bg-forest-800" />
                </div>

                {/* Percentage with Monospaced font */}
                <div className="font-mono text-xs text-white/20 tabular-nums">
                   {Math.min(Math.round(progress), 100).toString().padStart(3, '0')}%
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 font-mono text-[9px] text-white/10 tracking-[0.2em] uppercase"
          >
            EST. 2008 — Pune, MH
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}