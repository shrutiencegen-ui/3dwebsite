import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CTASection.css'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', pet: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  /* ── 3D Wave Canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let time = 0

    const drawWaves = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // 4 layered diagonal sine waves with a dark, bold palette
      const waves = [
        { amp: 36, freq: 0.011, speed: 0.6, yBase: H * 0.16, color: 'rgba(35, 96, 155, 0.34)', lineWidth: 4.2 },
        { amp: 28, freq: 0.015, speed: 0.88, yBase: H * 0.30, color: 'rgba(118, 182, 143, 0.26)', lineWidth: 3.6 },
        { amp: 22, freq: 0.019, speed: 1.12, yBase: H * 0.50, color: 'rgba(212, 186, 155, 0.24)', lineWidth: 3.0 },
        { amp: 16, freq: 0.024, speed: 1.45, yBase: H * 0.72, color: 'rgba(255, 255, 255, 0.18)', lineWidth: 2.4 },
      ]

      waves.forEach(({ amp, freq, speed, yBase, color, lineWidth }) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.shadowColor = color
        ctx.shadowBlur = 18

        for (let x = 0; x <= W; x += 2) {
          const progress = x / W
          const tilt = progress * H * 0.55
          const y = yBase + tilt + amp * Math.sin(freq * x - time * speed)
          const xPos = W - x
          x === 0 ? ctx.moveTo(xPos, y) : ctx.lineTo(xPos, y)
        }
        ctx.stroke()
      })

      time += 0.03
      animRef.current = requestAnimationFrame(drawWaves)
    }

    drawWaves()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Scroll entrance ── */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          el.querySelectorAll('.contact-reveal'),
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12 }
        )
      },
    })
  }, [])

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="cta-section-wrapper" ref={ref}>
      {/* ── Wave canvas behind everything ── */}
      <canvas className="wave-canvas" ref={canvasRef} />

      <section id="contact" className="contact-layout">

        {/* ── LEFT: info panel ── */}
        <div className="contact-info-panel">
          <span className="label contact-reveal" style={{ opacity: 0 }}>06 / Begin Your Journey</span>
          <h2 className="cta-title contact-reveal" style={{ opacity: 0 }}>
            Your companion<br />
            deserves a<br />
            <em className="italic-luxury">sanctuary</em>
          </h2>
          <p className="cta-sub contact-reveal" style={{ opacity: 0 }}>
            Step into a high-end biophilic sanctuary where veterinary science meets nature.
          </p>

          <div className="contact-details-list contact-reveal" style={{ opacity: 0 }}>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">📞</span>
              <div>
                <div className="contact-detail-label">Call Us</div>
                <div className="contact-detail-value">+91 98765 43210</div>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">📍</span>
              <div>
                <div className="contact-detail-label">Location</div>
                <div className="contact-detail-value">Baner, Pune · Maharashtra</div>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">🕐</span>
              <div>
                <div className="contact-detail-label">Open Daily</div>
                <div className="contact-detail-value">8:00 am – 10:00 pm</div>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">🌿</span>
              <div>
                <div className="contact-detail-label">Emergency</div>
                <div className="contact-detail-value">24 / 7 On-call Team</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: premium form ── */}
        <div className="contact-form-panel contact-reveal" style={{ opacity: 0 }}>
          {submitted ? (
            <div className="form-success">
              <span className="form-success-icon">🌿</span>
              <h3>Booking Received</h3>
              <p>We'll reach out within 24 hours to confirm your sanctuary visit.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-heading">
                <h3>Reserve Your Visit</h3>
                <p>Complete the form and our concierge will reach out.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="f-name">Your Name</label>
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Aishwarya Rai"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="f-email">Email Address</label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="f-pet">Pet's Name & Breed</label>
                <input
                  id="f-pet"
                  name="pet"
                  type="text"
                  placeholder="e.g. Coco · Golden Retriever"
                  value={formState.pet}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="f-message">How Can We Help?</label>
                <textarea
                  id="f-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your pet's needs, concerns, or preferred visit date..."
                  value={formState.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-submit">
                <span>🌿</span> Reserve My Sanctuary Visit
              </button>
            </form>
          )}
        </div>

      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-copy">© 2026 PawSanctuary Veterinary. All rights reserved.</div>
        <div className="footer-copy footer-loc">Pune, Maharashtra, India</div>
        <div className="nav-logo" style={{ fontSize: '1rem' }}>
          <span>🌿</span> Paw<span>Sanctuary</span>
        </div>
      </footer>
    </div>
  )
}
