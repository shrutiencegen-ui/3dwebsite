import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="section-3d min-h-screen flex items-center justify-start px-6 md:px-20 pointer-events-none"
    >
      <div className="content-overlay max-w-3xl pointer-events-auto relative">

        {/* Glow background */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-forest-500/20 blur-[120px] rounded-full z-0" />

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 bg-forest-400 rounded-full animate-pulse" />
          <span className="font-mono text-xs text-forest-400 tracking-widest uppercase">
            Trusted since 2008
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative z-10 font-display text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95] mb-6"
        >
          <span className="text-white">Your pet's</span>
          <br />
          <span className="gradient-text">health</span>
          <br />
          <span className="text-white/40 italic text-3xl sm:text-5xl md:text-7xl">
            is our story.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 font-body text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl"
        >
          Expert veterinary care with compassion and precision. We treat every animal as family — because they are.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 flex flex-wrap gap-4"
        >
          <button
            className="btn-primary cursor-hover"
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Book a Visit →
          </button>

          <button
            className="glass-card px-6 sm:px-8 py-3 text-white/80 font-body hover:text-white transition cursor-hover rounded-full"
            onClick={() =>
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Explore Services
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 1 }}
          className="relative z-10 flex flex-wrap gap-8 sm:gap-12 mt-14 pt-8 border-t border-white/10"
        >
          {[
            { num: '15+', label: 'Years of Care' },
            { num: '8K+', label: 'Happy Pets' },
            { num: '12', label: 'Specialists' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="stat-number">{stat.num}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] sm:text-xs text-white/30 tracking-widest uppercase">
          Scroll to explore
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-forest-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}