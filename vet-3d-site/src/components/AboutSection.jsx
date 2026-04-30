import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

const milestones = [
  { year: '2008', title: 'Founded', desc: 'Started as a small clinic with a big dream — every animal deserves expert care.' },
  { year: '2012', title: 'Expanded', desc: 'Opened our 24/7 emergency wing and added surgical facilities.' },
  { year: '2017', title: 'Specialized', desc: 'Introduced orthopedic, cardiology, and neurology specialty services.' },
  { year: '2022', title: 'Innovated', desc: 'Launched telemedicine consultations and AI-assisted diagnostics.' },
  { year: '2024', title: 'Growing', desc: 'Serving over 8,000 patients with 12 board-certified specialists.' },
]

export function AboutSection() {
  const containerRef = useRef(null)
  
  // Create a scroll-linked progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen py-32 px-6 md:px-20 overflow-hidden">
      
      {/* 🌌 Background Depth Layers */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-forest-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* LEFT SIDE: Editorial Content (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-forest-400 rounded-full shadow-[0_0_10px_#22c55e]" />
              <span className="font-mono text-[10px] text-forest-300 tracking-[0.3em] uppercase font-bold">
                Legacy of Care
              </span>
            </div>

            {/* Heading with Masked Animation */}
            <h2 className="font-display text-5xl sm:text-7xl font-black text-white leading-[0.9] mb-10 tracking-tighter">
              Healing with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-400 to-emerald-200 italic font-light">
                heart & science.
              </span>
            </h2>

            {/* Body Text with subtle border-left accent */}
            <div className="space-y-6 text-white/50 text-lg leading-relaxed border-l border-white/10 pl-8 mb-12">
              <p>
                PawCare was born from a simple belief: <span className="text-white/80">every animal deserves the same quality of care</span> as any human patient.
              </p>
              <p>
                Our team combines decades of expertise with cutting-edge diagnostics. We don’t just treat symptoms — we build lifelong bonds.
              </p>
            </div>

            {/* Value Tiles */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '🔬', label: 'Evidence', color: 'from-emerald-500/20' },
                { icon: '💚', label: 'Care', color: 'from-forest-500/20' },
                { icon: '⚡', label: 'Fast', color: 'from-teal-500/20' },
              ].map((v, i) => (
                <motion.div
                  key={v.label}
                  whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className={`bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl transition-all duration-300`}
                >
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    {v.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Interactive Timeline (Span 7) */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-16">
            
            {/* Animated Timeline Line */}
            <div className="absolute left-0 sm:left-6 top-4 bottom-4 w-[2px] bg-white/5">
              <motion.div 
                style={{ scaleY, originY: 0 }}
                className="w-full h-full bg-gradient-to-b from-forest-400 via-emerald-500 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              />
            </div>

            <div className="space-y-16">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative"
                >
                  {/* Floating Year Bubble */}
                  <div className="absolute -left-[3.2rem] sm:-left-[5.2rem] top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border border-white/10 flex items-center justify-center z-10 group-hover:border-forest-400/50 transition-colors duration-500">
                    <div className="text-[10px] sm:text-xs font-mono font-bold text-forest-400">
                      {m.year.slice(2)}'
                    </div>
                  </div>

                  {/* Glass Card */}
                  <div className="relative bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md border border-white/5 p-8 rounded-[2rem] transition-all duration-500 group-hover:translate-x-2">
                    <div className="font-mono text-[10px] text-forest-400 tracking-[0.3em] uppercase mb-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Phase {i + 1}
                    </div>
                    <h4 className="font-display text-2xl font-bold text-white mb-3 tracking-tight">
                      {m.title}
                    </h4>
                    <p className="text-white/40 text-base leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                      {m.desc}
                    </p>
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