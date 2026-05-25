import { useEffect, useRef, useState } from 'react'
import './ScrollProgress.css'

const SECTIONS = ['hero', 'story-1', 'story-2', 'services', 'team', 'testimonials', 'contact']

export default function ScrollProgress() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observers = SECTIONS.map((id, i) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <div id="scroll-progress">
      {SECTIONS.map((id, i) => (
        <div
          key={id}
          className={`progress-dot${active === i ? ' active' : ''}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
        />
      ))}
    </div>
  )
}
