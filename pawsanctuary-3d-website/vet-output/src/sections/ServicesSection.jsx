import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicesSection.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { icon: '🩺', name: 'General Wellness', desc: 'Comprehensive annual check-ups, vaccinations, and preventive care tailored to your pet\'s unique biology and lifestyle.', tag: 'Preventive' },
  { icon: '🔬', name: 'Diagnostics', desc: 'State-of-the-art imaging, bloodwork, and pathology — answers in hours, not days. Knowledge is the first medicine.', tag: 'Advanced' },
  { icon: '🌿', name: 'Holistic Therapy', desc: 'Acupuncture, hydrotherapy, and herbal medicine that work alongside conventional treatment for whole-body healing.', tag: 'Integrative' },
  { icon: '⚕️', name: 'Surgery', desc: 'Minimally invasive surgical techniques performed by board-certified surgeons in our dedicated garden-view theatre.', tag: 'Specialist' },
  { icon: '🌙', name: 'Night Care', desc: '24/7 emergency response with a dedicated overnight team — because emergencies don\'t follow business hours.', tag: 'Emergency' },
  { icon: '🧬', name: 'Genetics & Oncology', desc: 'Cutting-edge DNA screening and cancer treatment protocols developed in collaboration with leading research institutes.', tag: 'Pioneering' },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll('.service-card')

    // Parallax background scroll effect
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translateY(${progress * -80}px)`
        }
      },
    })

    // Staggered reveal animation on scroll
    ScrollTrigger.create({
      trigger: el,
      start: 'top 65%',
      onEnter: () => {
        gsap.to(el.querySelectorAll('.gsap-reveal-header'), { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
        gsap.to(cards, {
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          ease: 'power3.out',
          stagger: 0.1, 
          delay: 0.2,
        })
      },
    })
  }, [])

  // Spotlight mouse-follow glow
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section id="services" className="story-section" style={{ minHeight: '100vh', alignItems: 'center', position: 'relative', overflow: 'hidden' }} ref={ref}>
      {/* Dynamic biophilic parallax background */}
      <div ref={parallaxRef} className="services-parallax-bg" />

      <div className="services-container">
        {/* Services Header — title LEFT, description RIGHT */}
        <div className="services-header">
          <div className="services-header-left gsap-reveal-header" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <span className="label">03 / Services</span>
            <h2 className="display-md">
              Complete <br />
              <em className="italic-luxury">sanctuary</em> care
            </h2>
          </div>
          <div className="services-header-right gsap-reveal-header" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <p className="body-text">
              Every service we offer is designed around a single philosophy — 
              your pet deserves the same elite standard of care as any human patient. 
              Precision, compassion, and innovation at every step.
            </p>
          </div>
        </div>

        {/* 3-column Satin Cards Grid */}
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div 
              className="service-card" 
              key={s.name} 
              onMouseMove={handleMouseMove}
              style={{ opacity: 0, transform: 'translateY(40px) scale(0.97)' }}
            >
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
              <div className="service-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
