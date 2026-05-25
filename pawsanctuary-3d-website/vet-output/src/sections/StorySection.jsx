import { useEffect, useRef } from 'react'
import './StorySection.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StorySection({ id, side, number, title, body, cta }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = el.querySelectorAll('.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right')
    
    // Smooth reveal trigger when sections are scrolled into view
    ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1, 
          y: 0, 
          x: 0,
          duration: 1.4, 
          ease: 'power3.out', 
          stagger: 0.15,
        })
      },
    })
  }, [])

  const cls = `story-card-panel ${side === 'left' ? 'panel-left gsap-reveal-left' : 'panel-right gsap-reveal-right'}`

  return (
    <section id={id} className="story-section" ref={ref}>
      <div className={cls}>
        <span className="panel-number">{number}</span>
        <h2 className="panel-title">{title}</h2>
        <p className="panel-body">{body}</p>
        <button className="btn-outline">
          {cta}
          <span style={{ marginLeft: '10px' }}>→</span>
        </button>
      </div>
    </section>
  )
}
