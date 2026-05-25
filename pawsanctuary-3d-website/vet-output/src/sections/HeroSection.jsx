import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './HeroSection.css'

// Helper component for animated rolling statistics counters
function AnimatedCounter({ end, duration = 1.8 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp = null
    const endVal = parseInt(end.toString().replace(/[^\d]/g, ''), 10)
    if (isNaN(endVal)) return

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      setCount(Math.floor(progress * endVal))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    
    // Add small delay to start counting when loader is gone
    const delayTimer = setTimeout(() => {
      window.requestAnimationFrame(step)
    }, 1500)

    return () => clearTimeout(delayTimer)
  }, [end, duration])

  const suffix = end.toString().replace(/[\d]/g, '')
  return (
    <>
      {count}
      {suffix && <span>{suffix}</span>}
    </>
  )
}

export default function HeroSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const tl = gsap.timeline()

    // Elite stagger entrance animation
    tl.fromTo(el.querySelectorAll('.sassy-reveal'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4, stagger: 0.12, ease: 'power4.out', delay: 0.6 }
    )
    .fromTo(el.querySelectorAll('.sassy-stat-box'),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
      '-=1.0'
    )
  }, [])

  return (
    <section id="hero" className="sassy-hero-wrapper" ref={containerRef}>
      {/* React Bits inspired mesh background elements */}
      <div className="mesh-gradient-bg">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>
      <div className="hero-glow-spot" />

      {/* Left Column: Text & CTA */}
      <div className="sassy-hero-left">
        <div className="sassy-eyebrow sassy-reveal">
          <span className="sparkle-dot" />
          <span>Care Like No Other</span>
        </div>

        <h1 className="sassy-title sassy-reveal">
          Where every <br />
          <span className="italic-luxury">soul</span> is sacred.
        </h1>

        <p className="sassy-subtitle sassy-reveal">
          A high-end sanctuary where your elite companions receive 
          world-class veterinary care wrapped in pure luxury.
        </p>

        <div className="sassy-btn-group sassy-reveal">
          <button className="sassy-btn-primary magnetic-btn">
            Book Appointment
            <span className="arrow-hover">→</span>
          </button>
          <button className="sassy-btn-secondary">
            Explore Services
          </button>
        </div>
      </div>

      {/* Center Column: Empty space for 3D Models */}
      <div className="sassy-hero-center">
         {/* Scene3D models will float here naturally */}
      </div>

      {/* Right Column: Stats & Trust Badges */}
      <div className="sassy-hero-right">
        <div className="sassy-stats-strip sassy-reveal">
          <div className="sassy-stat-box">
            <h3 className="stat-big-num">
              <AnimatedCounter end="12k" />
            </h3>
            <p className="stat-mini-label">Lives Protected</p>
          </div>
          <div className="sassy-stat-box">
            <h3 className="stat-big-num">
              <AnimatedCounter end="98%" />
            </h3>
            <p className="stat-mini-label">Success Rate</p>
          </div>
          <div className="sassy-stat-box">
            <h3 className="stat-big-num">
              <AnimatedCounter end="24/7" />
            </h3>
            <p className="stat-mini-label">VIP Support</p>
          </div>
        </div>
      </div>

      {/* Premium Scroll down hint */}
      <div className="sassy-scroll-hint sassy-reveal">
        <span className="vertical-bar" />
        <span className="hint-text">Keep Scrolling</span>
      </div>
    </section>
  )
}