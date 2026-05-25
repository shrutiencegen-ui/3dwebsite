import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TestimonialCarousel.css'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    rating: 5,
    quote: '"The biophilic garden sanctuary completely cured my retriever\'s clinical anxiety. The level of care here is truly unmatched."',
    name: "Aishwarya Rai",
    pet: "Coco · Golden Retriever",
    initials: "AR",
  },
  {
    rating: 5,
    quote: '"Surgical excellence wrapped in pure luxury. The veterinarians treated my Persian cat with absolute royal devotion and precision."',
    name: "Aditya Roy Kapur",
    pet: "Cleo · Persian Cat",
    initials: "AK",
  },
  {
    rating: 5,
    quote: '"Unmatched 24/7 expertise. Having a dedicated elite overnight clinical team saved our puppy during a sudden midnight crisis."',
    name: "Ranbir Kapoor",
    pet: "Max · Siberian Husky",
    initials: "RK",
  },
]

export default function TestimonialCarousel() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    ScrollTrigger.create({
      trigger: el,
      start: 'top 72%',
      onEnter: () => {
        // Header stagger
        gsap.fromTo(
          el.querySelectorAll('.testimonial-header-el'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }
        )
        // Cards stagger with cascade — each card pops in with a slight vertical offset
        gsap.fromTo(
          el.querySelectorAll('.testimonial-stagger-card'),
          { opacity: 0, y: 70, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            stagger: { each: 0.18, from: 'start' },
            delay: 0.25,
          }
        )
      },
    })
  }, [])

  return (
    <section id="testimonials" className="testimonials-section" ref={ref}>
      <div className="testimonials-container">

        {/* Header — centered */}
        <div className="testimonials-header">
          <span className="label testimonial-header-el" style={{ opacity: 0 }}>
            05 / Elite Testimonials
          </span>
          <h2 className="display-md testimonial-header-el" style={{ opacity: 0 }}>
            Stories from our <em className="italic-luxury">VIP families</em>
          </h2>
          <p className="body-text testimonial-header-el" style={{ opacity: 0 }}>
            Real experiences from the families who trust us with their most cherished companions.
          </p>
        </div>

        {/* Staggered 3-column card grid */}
        <div className="testimonials-stagger-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div
              className="testimonial-stagger-card"
              key={idx}
              style={{ opacity: 0 }}
            >
              <span className="testimonial-quote-icon">"</span>

              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="testimonial-text">{t.quote}</p>

              <div className="testimonial-meta">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-pet">{t.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
