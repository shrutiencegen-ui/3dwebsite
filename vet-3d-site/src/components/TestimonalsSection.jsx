import { useRef, useEffect, useState } from 'react'

const testimonials = [
  {
    name: 'Anjali Sharma',
    pet: 'Golden Retriever - Max',
    text: 'PawCare literally saved Max\'s life. Their emergency team was extraordinary — calm, fast, and unbelievably skilled. I\'m forever grateful.',
    stars: 5,
    avatar: '🧑‍🦱',
    location: 'Mumbai',
  },
  {
    name: 'Rahul Mehta',
    pet: 'Persian Cat - Luna',
    text: 'Dr. Chen\'s diagnosis was spot-on. What other clinics missed in weeks, she found in 20 minutes. Luna is thriving now!',
    stars: 5,
    avatar: '👨',
    location: 'Pune',
  },
  {
    name: 'Priya Kulkarni',
    pet: 'Labrador - Bruno',
    text: 'The orthopedic surgery was a success. Bruno went from not being able to walk to running in the park. Incredible team.',
    stars: 5,
    avatar: '👩',
    location: 'Nashik',
  },
  {
    name: 'David Thomas',
    pet: 'Rabbit - Snowball',
    text: 'Never thought a vet would take a rabbit so seriously. They treated Snowball with the same care as any dog or cat. Outstanding!',
    stars: 5,
    avatar: '👨‍🦳',
    location: 'Pimpri',
  },
  {
    name: 'Sneha Patil',
    pet: 'Beagle - Coco',
    text: 'Transparent pricing, gentle staff, and results that speak for themselves. PawCare is the only clinic I trust with Coco.',
    stars: 5,
    avatar: '👩‍🦰',
    location: 'Chinchwad',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const titleRef = useRef(null)
  const intervalRef = useRef(null)

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const t = testimonials[active]

  return (
    <section id="testimonials" className="section-3d min-h-screen py-32 px-8 md:px-20">
      <div className="content-overlay max-w-5xl mx-auto">
        <div ref={titleRef} className="reveal-on-scroll text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">Pet Parents Love Us</span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-black text-white leading-tight">
            Stories of<br />
            <span className="gradient-text">healing.</span>
          </h2>
        </div>

        {/* Featured testimonial */}
        <div className="glass-card p-10 md:p-14 mb-8 relative overflow-hidden">
          {/* Big quote mark */}
          <div className="absolute top-6 left-8 font-display text-8xl text-forest-500/10 font-black leading-none select-none">"</div>

          <div className="relative">
            <Stars count={t.stars} />

            <blockquote className="font-display text-2xl md:text-3xl text-white leading-relaxed my-6 italic">
              "{t.text}"
            </blockquote>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-2xl">
                {t.avatar}
              </div>
              <div>
                <div className="font-display font-bold text-white">{t.name}</div>
                <div className="font-mono text-xs text-forest-400">{t.pet} · {t.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selector dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`cursor-hover transition-all duration-300 rounded-full ${
                i === active
                  ? 'w-8 h-2 bg-forest-500'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Mini cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { stat: '4.9★', label: 'Google Rating', sub: 'From 1,200+ reviews' },
            { stat: '98%', label: 'Would Recommend', sub: 'Based on patient surveys' },
            { stat: '8K+', label: 'Pets Treated', sub: 'Since 2008' },
          ].map(item => (
            <div key={item.label} className="glass-card p-6 text-center">
              <div className="stat-number mb-1">{item.stat}</div>
              <div className="font-display font-bold text-white text-sm mb-1">{item.label}</div>
              <div className="font-mono text-xs text-white/40">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}