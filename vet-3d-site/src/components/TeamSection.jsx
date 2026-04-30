import { motion } from 'framer-motion'
import { useRef } from 'react'

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Veterinarian',
    specialty: 'Surgery & Internal Medicine',
    years: '18 years exp.',
    avatar: '👩‍⚕️',
    color: '#22c55e',
  },
  {
    name: 'Dr. Marcus Rivera',
    role: 'Lead Surgeon',
    specialty: 'Orthopedics & Neurology',
    years: '14 years exp.',
    avatar: '👨‍⚕️',
    color: '#F5A623',
  },
  {
    name: 'Dr. Priya Nair',
    role: 'Emergency Specialist',
    specialty: 'Critical Care & Cardiology',
    years: '11 years exp.',
    avatar: '👩‍⚕️',
    color: '#60a5fa',
  },
  {
    name: 'Dr. Liam O\'Brien',
    role: 'Dental Specialist',
    specialty: 'Oral & Dental Surgery',
    years: '9 years exp.',
    avatar: '👨‍⚕️',
    color: '#f472b6',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

function TeamCard({ member }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10 }}
      className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20"
    >
      {/* Visual Depth - Corner Accent */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${member.color}, transparent 70%)`
        }}
      />

      {/* Avatar - Circular "Lens" Design */}
      <div className="relative mb-8 flex justify-center">
        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ 
            background: `linear-gradient(135deg, ${member.color}20, ${member.color}05)`, 
            border: `1px solid ${member.color}40`,
            boxShadow: `0 20px 40px -10px ${member.color}30`
          }}
        >
          {member.avatar}
        </div>
        {/* Decorative Ring */}
        <div className="absolute inset-0 w-24 h-24 mx-auto rounded-3xl border border-white/5 scale-125 group-hover:scale-150 transition-transform duration-700 opacity-50" />
      </div>

      {/* Content */}
      <div className="text-center relative z-10">
        <h3 className="font-display text-2xl font-bold text-white mb-2 tracking-tight">
          {member.name}
        </h3>
        
        <div 
          className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-4"
          style={{ color: member.color }}
        >
          {member.role}
        </div>

        <p className="font-body text-sm text-white/40 leading-relaxed mb-6 px-2">
          {member.specialty}
        </p>

        {/* Experience Tag */}
        <div
          className="inline-flex items-center gap-2 font-mono text-[10px] px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-white/60 group-hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: member.color }} />
          {member.years}
        </div>
      </div>

      {/* Social Links - Modern Floating Style */}
      <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-white/5">
        {['LinkedIn', 'Pubs'].map(s => (
          <button
            key={s}
            className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors duration-300"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="relative min-h-screen py-32 px-6 md:px-20 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Aligned to the Left for an Editorial Feel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            <span className="font-mono text-[10px] text-blue-300 tracking-[0.3em] uppercase font-black">Medical Board</span>
          </div>

          <h2 className="font-display text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8">
            Meet your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              care team.
            </span>
          </h2>
          <p className="font-body text-xl text-white/40 max-w-2xl border-l border-white/10 pl-8">
            Our board-certified specialists represent the pinnacle of veterinary medicine, 
            driven by a shared commitment to clinical excellence.
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>

        {/* Join team CTA - Modern Glass Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden group bg-gradient-to-r from-white/[0.03] to-transparent backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="relative z-10">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Join the Mission</h3>
            <p className="font-body text-lg text-white/40 max-w-md">We’re expanding our surgical and emergency wings. Join a world-class clinical team.</p>
          </div>
          
          <button className="group relative px-10 py-5 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="relative z-10">View Careers →</span>
            <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {/* Background Decorative Element */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-700" />
        </motion.div>
      </div>
    </section>
  )
}