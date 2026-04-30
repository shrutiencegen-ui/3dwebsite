import { motion } from 'framer-motion'
import { useRef } from 'react'

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
    desc: "24/7 emergency services for urgent situations. Your pet's safety never takes a day off.",
    color: '#ef4444',
    tag: '24/7'
  },
]

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
}

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -12, 
        transition: { duration: 0.4, ease: "easeOut" } 
      }}
      className="group relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden flex flex-col justify-between min-h-[320px]"
    >
      {/* 1. Dynamic Hover Glow - Follows the 3D aesthetic */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}15, transparent 40%)`,
        }}
      />

      {/* 2. Animated Border Gradient (Unique Premium Touch) */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          {/* Icon Container */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
              boxShadow: `0 8px 20px -6px ${service.color}40`,
              border: `1px solid ${service.color}40`,
            }}
          >
            {service.icon}
          </div>

          <span
            className="font-mono text-[10px] tracking-widest px-3 py-1 rounded-full uppercase font-bold border"
            style={{
              color: service.color,
              borderColor: `${service.color}30`,
              backgroundColor: `${service.color}05`,
            }}
          >
            {service.tag}
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors">
          {service.title}
        </h3>

        <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
          {service.desc}
        </p>
      </div>

      <div
        className="relative z-10 mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden"
        style={{ color: service.color }}
      >
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          Explore Detail
        </span>
        <span className="transform group-hover:translate-x-2 transition-transform duration-500">
          →
        </span>
        
        {/* Underline animation */}
        <div 
          className="absolute bottom-[-4px] left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
          style={{ backgroundColor: service.color }}
        />
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="relative min-h-screen py-32 px-6 md:px-20 overflow-hidden">
      
      {/* Background depth - subtly darkens the background to let 3D model stay visible but not clash with text */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 space-y-6"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs text-amber-400 tracking-[0.3em] uppercase font-bold">
              Service Portfolio
            </span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-400 to-emerald-300">
              Medical
            </span> <br />
            solutions.
          </h2>

          <p className="font-body text-lg text-white/40 max-w-2xl border-l border-white/10 pl-8 ml-2">
            Blending cutting-edge technology with gentle hands. We provide a full spectrum of 
            care designed to keep your family's story going.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>

      {/* Aesthetic Grain Overlay for high-end feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-5" />
    </section>
  )
}