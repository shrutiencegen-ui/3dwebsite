import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Anjali Sharma',
    pet: 'Golden Retriever - Max',
    text: "PawCare literally saved Max's life. Their emergency team was extraordinary — calm, fast, and unbelievably skilled. I'm forever grateful.",
    stars: 5,
    avatar: '🧑‍🦱',
    location: 'Mumbai',
  },
  {
    name: 'Rahul Mehta',
    pet: 'Persian Cat - Luna',
    text: "Dr. Chen's diagnosis was spot-on. What other clinics missed in weeks, she found in 20 minutes. Luna is thriving now!",
    stars: 5,
    avatar: '👨',
    location: 'Pune',
  },
  {
    name: 'Priya Kulkarni',
    pet: 'Labrador - Bruno',
    text: "The orthopedic surgery was a success. Bruno went from not being able to walk to running in the park. Incredible team.",
    stars: 5,
    avatar: '👩',
    location: 'Nashik',
  },
  {
    name: 'David Thomas',
    pet: 'Rabbit - Snowball',
    text: "Never thought a vet would take a rabbit so seriously. They treated Snowball with the same care as any dog or cat. Outstanding!",
    stars: 5,
    avatar: '👨‍🦳',
    location: 'Pimpri',
  },
  {
    name: 'Sneha Patil',
    pet: 'Beagle - Coco',
    text: "Transparent pricing, gentle staff, and results that speak for themselves. PawCare is the only clinic I trust with Coco.",
    stars: 5,
    avatar: '👩‍🦰',
    location: 'Chinchwad',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          key={i} 
          className="text-amber-400 text-base"
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActive(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setActive(prev => (prev + newDirection + testimonials.length) % testimonials.length)
  }

  const t = testimonials[active]

  return (
    <section id="testimonials" className="relative min-h-screen py-32 px-6 md:px-20 overflow-hidden">
      
      {/* Decorative Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-forest-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header - Centered & Bold */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
            <span className="font-mono text-[10px] text-amber-200 tracking-[0.3em] uppercase font-bold">Community Voice</span>
          </div>

          <h2 className="font-display text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
            Stories of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-400">
              healing.
            </span>
          </h2>
        </motion.div>

        {/* Featured Testimonial with AnimatePresence */}
        <div className="relative h-[450px] md:h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl flex flex-col justify-center relative overflow-hidden">
                
                {/* Visual Flair: Large Quote Mark */}
                <div className="absolute -top-4 -left-2 font-display text-[15rem] text-white/[0.03] font-black leading-none pointer-events-none">
                  “
                </div>

                <div className="relative z-10">
                  <Stars count={t.stars} />

                  <blockquote className="font-display text-2xl md:text-4xl text-white font-medium leading-snug my-8 tracking-tight italic">
                    “{t.text}”
                  </blockquote>

                  <div className="flex items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl flex items-center justify-center text-3xl border border-white/10">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-display text-xl font-bold text-white tracking-tight">{t.name}</div>
                        <div className="font-mono text-[10px] text-amber-400 uppercase tracking-widest mt-1">
                          {t.pet} <span className="mx-2 text-white/10">|</span> {t.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-12 px-4">
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1)
                  setActive(i)
                }}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === active ? 'w-12 bg-amber-400' : 'w-4 bg-white/10 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all active:scale-90"
            >
              ←
            </button>
            <button 
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all active:scale-90"
            >
              →
            </button>
          </div>
        </div>

        {/* Professional Trust Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
        >
          {[
            { stat: '4.9★', label: 'Google Rating', sub: 'Verified across 1,200+ clients', color: 'text-amber-400' },
            { stat: '98%', label: 'Would Recommend', sub: 'Based on 2023 exit surveys', color: 'text-forest-400' },
            { stat: '8K+', label: 'Successful Cases', sub: 'Primary care to neuro-surgery', color: 'text-blue-400' },
          ].map(item => (
            <div key={item.label} className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 p-8 rounded-3xl transition-all duration-500">
              <div className={`text-4xl md:text-5xl font-black mb-3 tracking-tighter ${item.color}`}>
                {item.stat}
              </div>
              <div className="font-display font-bold text-white text-lg mb-1 tracking-tight">{item.label}</div>
              <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}