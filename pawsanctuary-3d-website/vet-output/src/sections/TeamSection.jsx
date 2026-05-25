import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TeamSection.css'

gsap.registerPlugin(ScrollTrigger)

const TEAM = [
  { emoji: '👩‍⚕️', name: 'Dr. Priya Nair', role: 'Chief Veterinarian · Surgery' },
  { emoji: '👨‍⚕️', name: 'Dr. Rohan Mehta', role: 'Internal Medicine · Oncology' },
  { emoji: '👩‍🔬', name: 'Dr. Ananya Sharma', role: 'Diagnostics · Radiology' },
  { emoji: '🧑‍⚕️', name: 'Dr. Vikram Das', role: 'Holistic · Rehabilitation' },
]

export default function TeamSection() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll('.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right')
    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1, y: 0, x: 0,
          duration: 1.3, ease: 'power3.out', stagger: 0.1,
        })
      },
    })
  }, [])

  return (
    <section id="team" className="story-section" style={{ minHeight: '100vh' }} ref={ref}>
      <div className="team-container">
        <div className="team-text gsap-reveal-left">
          <span className="label">04 / Our Team</span>
          <h2 className="display-md" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            Healers who<br /><em style={{ fontStyle: 'italic', color: 'var(--sage-light)' }}>truly care</em>
          </h2>
          <p className="body-text" style={{ maxWidth: '380px', marginBottom: '2.5rem' }}>
            Our specialists bring decades of combined expertise from top veterinary 
            institutions across the world. Each one chosen not just for their skill — 
            but for their heart.
          </p>
          <button className="btn-outline">Meet everyone →</button>
        </div>
        <div className="team-members gsap-reveal-right">
          {TEAM.map((m) => (
            <div className="team-member" key={m.name}>
              <div className="member-avatar">{m.emoji}</div>
              <div className="member-info">
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
