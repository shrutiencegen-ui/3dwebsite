import { useRef, useEffect, useState } from 'react'

export function ContactSection() {
  const titleRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', pet: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', pet: '', message: '' })
  }

  const inputClass = "w-full glass-card px-5 py-4 text-white/80 font-body text-sm placeholder:text-white/25 focus:outline-none focus:border-forest-500/50 transition-all duration-300 rounded-2xl"

  return (
    <section id="contact" className="section-3d min-h-screen py-32 px-8 md:px-20">
      <div className="content-overlay max-w-6xl mx-auto">
        <div ref={titleRef} className="reveal-on-scroll mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-forest-400 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-forest-400 tracking-widest uppercase">Get In Touch</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Let's care for<br />
            <span className="gradient-text">your family.</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-xl">
            Book an appointment, ask a question, or reach out anytime. We're always here for you and your pet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="glass-card p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">We've got your message!</h3>
                <p className="font-body text-white/50">Our team will call you within 2 hours. Your pet is in good paws.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-white mb-6">Book an Appointment</h3>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    className={inputClass}
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                  <input
                    className={inputClass}
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>

                <input
                  className={inputClass}
                  placeholder="Pet's Name & Type (e.g. Max, Golden Retriever)"
                  value={form.pet}
                  onChange={e => setForm(p => ({ ...p, pet: e.target.value }))}
                />

                <select
                  className={inputClass + ' bg-transparent'}
                  style={{ background: 'rgba(255,248,240,0.04)' }}
                >
                  <option value="" className="bg-gray-900">Select Service</option>
                  <option className="bg-gray-900">General Check-up</option>
                  <option className="bg-gray-900">Emergency Care</option>
                  <option className="bg-gray-900">Surgery</option>
                  <option className="bg-gray-900">Dental Care</option>
                  <option className="bg-gray-900">Diagnostics</option>
                </select>

                <textarea
                  className={inputClass + ' resize-none'}
                  rows={4}
                  placeholder="Tell us about your pet and what you need..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                />

                <button type="submit" className="btn-primary w-full cursor-hover">
                  Book My Appointment →
                </button>

                <p className="font-mono text-xs text-white/30 text-center">
                  Emergency? Call us at{' '}
                  <a href="tel:+912012345678" className="text-forest-400 hover:underline">+91 20 1234 5678</a>
                </p>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {[
              {
                icon: '📍',
                title: 'Find Us',
                lines: ['PawCare Veterinary Clinic', 'Sector 7, Pimpri-Chinchwad', 'Pune, Maharashtra 411018'],
                color: '#22c55e',
              },
              {
                icon: '⏰',
                title: 'Hours',
                lines: ['Mon–Sat: 8am – 8pm', 'Sunday: 10am – 4pm', 'Emergency: 24 / 7 / 365'],
                color: '#F5A623',
              },
              {
                icon: '📞',
                title: 'Contact',
                lines: ['+91 20 1234 5678', 'hello@pawcare.vet', 'Emergency: +91 20 9876 5432'],
                color: '#60a5fa',
              },
            ].map(info => (
              <div key={info.title} className="glass-card p-6 flex gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                >
                  {info.icon}
                </div>
                <div>
                  <div className="font-display font-bold text-white mb-2">{info.title}</div>
                  {info.lines.map(line => (
                    <div key={line} className="font-body text-sm text-white/50">{line}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Emergency banner */}
            <div
              className="p-6 rounded-2xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(245,166,35,0.1))', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <div className="text-3xl mb-2">🚨</div>
              <div className="font-display text-lg font-bold text-white mb-1">Pet Emergency?</div>
              <div className="font-body text-sm text-white/50 mb-4">Our emergency team is on standby 24/7</div>
              <a href="tel:+919876543210" className="btn-primary inline-block cursor-hover">
                Call Emergency Line
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}