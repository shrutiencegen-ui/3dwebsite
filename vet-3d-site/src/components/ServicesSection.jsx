import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '🩺',
    title: 'General Check-up',
    desc: 'Complete health assessments, vaccinations, and preventive care for your beloved companions.',
    color: '#22c55e',
    tag: 'Preventive'
  },
  {
    icon: '🔬',
    title: 'Lab & Diagnostics',
    desc: 'Advanced blood panels, urinalysis, and rapid diagnostic testing with same-day results.',
    color: '#F5A623',
    tag: 'Diagnostics'
  },
  {
    icon: '🦷',
    title: 'Dental Care',
    desc: 'Professional teeth cleaning, extractions, and oral health maintenance under anesthesia.',
    color: '#60a5fa',
    tag: 'Dental'
  },
  {
    icon: '💉',
    title: 'Surgery & Recovery',
    desc: 'Elective and emergency surgeries with state-of-the-art monitoring and recovery suites.',
    color: '#f472b6',
    tag: 'Surgery'
  },
  {
    icon: '🦴',
    title: 'Orthopedics',
    desc: 'Joint repair, fracture management, and physical therapy for musculoskeletal conditions.',
    color: '#a78bfa',
    tag: 'Specialty'
  },
  {
    icon: '❤️',
    title: 'Emergency Care',
    desc: '24/7 emergency services for urgent situations. Your pet\'s safety never takes a day off.',
    color: '#ef4444',
    tag: '24/7'
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="reveal-on-scroll service-card glass-card p-6 cursor-hover relative overflow-hidden"
      style={{ transitionDelay: `${index * 0.1}s` }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500"
        style={{
          background: `radial-gradient(circle at top, ${service.color}20, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{
              background: `${service.color}20`,
              border: `1px solid ${service.color}40`,
            }}
          >
            {service.icon}
          </div>

          <span
            className="font-mono text-xs px-3 py-1 rounded-full"
            style={{
              color: service.color,
              background: `${service.color}20`,
            }}
          >
            {service.tag}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-2">
          {service.title}
        </h3>

        <p className="font-body text-sm text-white/60 leading-relaxed">
          {service.desc}
        </p>

        <div
          className="mt-5 flex items-center gap-2 text-sm font-medium group"
          style={{ color: service.color }}
        >
          <span className="group-hover:translate-x-1 transition">
            Learn more
          </span>
          <span className="group-hover:translate-x-1 transition">
            →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const titleRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed')
      },
      { threshold: 0.1 }
    )

    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="section-3d min-h-screen py-32 px-6 md:px-20 relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-forest-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 blur-[120px]" />
      </div>

      <div className="content-overlay max-w-6xl mx-auto">
        
        {/* Header */}
        <div ref={titleRef} className="reveal-on-scroll mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">
              What We Do
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Complete <br />
            <span className="gradient-text">veterinary</span> <br />
            services.
          </h2>

          <p className="font-body text-lg text-white/50 max-w-xl">
            From routine wellness to emergency intervention — we're your full-service animal health partner.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}