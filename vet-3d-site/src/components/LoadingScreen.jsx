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
            setTimeout(onComplete, 600)
          }, 300)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0a1a0e' }}
        >
          {/* Paw animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-8"
          >
            🐾
          </motion.div>

          <div className="font-display text-3xl font-black text-white mb-2">PawCare</div>
          <div className="font-mono text-xs text-forest-400 tracking-widest uppercase mb-12">
            Loading your experience...
          </div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-forest-600 to-forest-400"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="font-mono text-xs text-white/30 mt-3">
            {Math.min(Math.round(progress), 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}