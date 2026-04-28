import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const milestones = [
  { year: '2008', title: 'Founded', desc: 'Started as a small clinic with a big dream — every animal deserves expert care.' },
  { year: '2012', title: 'Expanded', desc: 'Opened our 24/7 emergency wing and added surgical facilities.' },
  { year: '2017', title: 'Specialized', desc: 'Introduced orthopedic, cardiology, and neurology specialty services.' },
  { year: '2022', title: 'Innovated', desc: 'Launched telemedicine consultations and AI-assisted diagnostics.' },
  { year: '2024', title: 'Growing', desc: 'Serving over 8,000 patients with 12 board-certified specialists.' },
]

export function AboutSection() {
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.1 }
    )

    refs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section-3d min-h-screen py-24 px-6 md:px-20 relative">

      {/* 🌟 Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-forest-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400/10 blur-[120px]" />
      </div>

      <div className="content-overlay max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT SIDE */}
          <div>

            {/* Badge */}
            <div
              ref={el => refs.current[0] = el}
              className="reveal-on-scroll inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-forest-400 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-forest-400 tracking-widest uppercase">
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={el => refs.current[1] = el}
              className="reveal-on-scroll font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
            >
              Healing with <br />
              <span className="gradient-text italic">heart & science.</span>
            </h2>

            {/* Text */}
            <div
              ref={el => refs.current[2] = el}
              className="reveal-on-scroll space-y-4 text-white/60 leading-relaxed text-sm sm:text-base"
            >
              <p>
                PawCare was born from a simple belief: every animal deserves the same quality of care as any human patient.
              </p>
              <p>
                Our team combines decades of expertise with cutting-edge diagnostics. We don’t just treat symptoms — we build lifelong bonds.
              </p>
              <p>
                With advanced imaging, on-site pharmacy, and recovery suites, we merge science with compassion.
              </p>
            </div>

            {/* Values */}
            <div
              ref={el => refs.current[3] = el}
              className="reveal-on-scroll grid grid-cols-3 gap-3 sm:gap-4 mt-8"
            >
              {[
                { icon: '🔬', label: 'Evidence' },
                { icon: '💚', label: 'Care' },
                { icon: '⚡', label: 'Fast' },
              ].map(v => (
                <motion.div
                  key={v.label}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-xl sm:text-2xl mb-2">{v.icon}</div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 tracking-wide">
                    {v.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE TIMELINE */}
          <div
            ref={el => refs.current[4] = el}
            className="reveal-on-scroll relative pl-6 sm:pl-10"
          >

            {/* Line */}
            <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-forest-500/50 via-forest-500/20 to-transparent" />

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">
              Our Journey
            </h3>

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="timeline-dot absolute -left-[1.2rem] sm:-left-[1.5rem] top-1" />

                  {/* Card */}
                  <div className="glass-card p-4 sm:p-5">
                    <div className="font-mono text-[10px] sm:text-xs text-forest-400 tracking-widest mb-1">
                      {m.year}
                    </div>
                    <div className="font-display text-base sm:text-lg font-bold text-white mb-1">
                      {m.title}
                    </div>
                    <div className="text-sm text-white/50 leading-relaxed">
                      {m.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}