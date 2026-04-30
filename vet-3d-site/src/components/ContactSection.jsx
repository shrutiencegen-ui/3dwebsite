import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', pet: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', pet: '', service: '', message: '' })
  }

  const inputClass = "w-full bg-white/[0.03] border border-white/10 px-6 py-4 text-white font-body text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-forest-500/40 focus:bg-white/[0.07] transition-all duration-300 placeholder:text-white/20"

  return (
    <section id="contact" className="relative min-h-screen py-24 md:py-32 px-6 md:px-20 overflow-hidden">
      
      {/* 🌌 Atmospheric Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-500/5 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-400"></span>
            </span>
            <span className="font-mono text-[10px] text-forest-300 tracking-[0.3em] uppercase font-bold">Inquiry Portal</span>
          </div>

          <h2 className="font-display text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8">
            Let’s care for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-400 via-emerald-300 to-teal-500">your family.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: Contact Information (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 order-2 lg:order-1"
          >
            {[
              { icon: '📍', title: 'Clinic Location', lines: ['PawCare Vet Clinic, Sector 7', 'Pimpri-Chinchwad, Pune 411018'], color: '#22c55e' },
              { icon: '⏰', title: 'Consultation Hours', lines: ['Mon–Sat: 08:00 - 20:00', 'Sun: 10:00 - 16:00 (Emergency 24/7)'], color: '#F5A623' },
              { icon: '📞', title: 'Direct Lines', lines: ['General: +91 20 1234 5678', 'Email: hello@pawcare.vet'], color: '#60a5fa' },
            ].map((info, idx) => (
              <div key={idx} className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] flex gap-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3"
                     style={{ background: `${info.color}10`, border: `1px solid ${info.color}20` }}>
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white mb-2 tracking-tight">{info.title}</h4>
                  {info.lines.map(l => <p key={l} className="font-body text-white/40 text-sm leading-relaxed">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Emergency Quick-Action */}
            <div className="p-8 rounded-[2.5rem] border border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <h4 className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">Urgent Care</h4>
              </div>
              <p className="text-white/60 text-sm mb-6">In the event of a critical emergency, skip the form and call our 24/7 trauma line immediately.</p>
              <a href="tel:+919876543210" className="flex items-center justify-center gap-3 w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-[0_10px_30px_-10px_rgba(239,68,68,0.3)] hover:scale-[1.02] active:scale-95">
                <span>Call +91 9876 543 210</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Modern Form (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-20 text-center"
                  >
                    <div className="text-7xl mb-6">✨</div>
                    <h3 className="font-display text-3xl font-bold text-white mb-4 italic">Message Transmitted</h3>
                    <p className="text-white/40 max-w-xs mx-auto">Our coordination team will reach out within the hour. Keep your phone handy.</p>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/30 uppercase pl-2">Full Name</label>
                        <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/30 uppercase pl-2">Email Address</label>
                        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} placeholder="john@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/30 uppercase pl-2">Pet Particulars</label>
                        <input value={form.pet} onChange={e => setForm({...form, pet: e.target.value})} className={inputClass} placeholder="Max (Retriever)" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] text-white/30 uppercase pl-2">Service Required</label>
                        <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className={`${inputClass} appearance-none cursor-pointer`}>
                          <option className="bg-[#0a0a0a]" value="">Select Category</option>
                          <option className="bg-[#0a0a0a]">Surgical Oncology</option>
                          <option className="bg-[#0a0a0a]">Diagnostic Imaging</option>
                          <option className="bg-[#0a0a0a]">Routine Wellness</option>
                          <option className="bg-[#0a0a0a]">Emergency Triage</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-white/30 uppercase pl-2">Medical Notes</label>
                      <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputClass} resize-none`} placeholder="Describe the situation..." />
                    </div>

                    <button type="submit" className="relative group w-full py-5 overflow-hidden rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all hover:scale-[1.01] active:scale-95 shadow-xl">
                      <span className="relative z-10">Request Appointment →</span>
                      <div className="absolute inset-0 bg-forest-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}