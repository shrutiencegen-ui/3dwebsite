import { useRef, useEffect } from 'react'

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

function TeamCard({ member, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed')
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="reveal-on-scroll service-card glass-card p-6 cursor-hover"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Avatar */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5 mx-auto"
        style={{ background: `${member.color}15`, border: `2px solid ${member.color}30` }}
      >
        {member.avatar}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-white mb-1">{member.name}</h3>
        <div className="font-mono text-xs tracking-wide mb-1" style={{ color: member.color }}>
          {member.role}
        </div>
        <div className="font-body text-sm text-white/40 mb-3">{member.specialty}</div>
        <div
          className="inline-block font-mono text-xs px-3 py-1 rounded-full"
          style={{ background: `${member.color}10`, color: member.color }}
        >
          {member.years}
        </div>
      </div>

      {/* Social */}
      <div className="flex justify-center gap-3 mt-5 pt-5 border-t border-white/10">
        {['LinkedIn', 'Research', 'Email'].map(s => (
          <button
            key={s}
            className="font-mono text-xs text-white/30 hover:text-white/70 transition-colors cursor-hover"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

export function TeamSection() {
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
    <section id="team" className="section-3d min-h-screen py-32 px-8 md:px-20">
      <div className="content-overlay max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal-on-scroll text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="font-mono text-xs text-blue-400 tracking-widest uppercase">The Experts</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Meet your<br />
            <span className="gradient-text">care team.</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-xl mx-auto">
            Board-certified specialists united by one passion: keeping your pets healthy, happy, and full of life.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Join team CTA */}
        <div className="mt-16 glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Join Our Team</h3>
            <p className="font-body text-white/50">We're always looking for passionate veterinary professionals.</p>
          </div>
          <button className="btn-primary whitespace-nowrap cursor-hover">View Careers →</button>
        </div>
      </div>
    </section>
  )
}