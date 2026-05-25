import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Nav.css'

export default function Nav() {
  const navRef = useRef(null)
  const [activeSection, setActiveSection] = useState('story-1')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -20,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.8
    })

    const sectionIds = ['story-1', 'services', 'team', 'contact']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const updateActive = () => {
      const position = window.scrollY + window.innerHeight * 0.35
      let current = sections[0].id

      sections.forEach((section) => {
        if (section.offsetTop <= position) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className={scrolled ? 'active' : ''}>
      <div className="nav-logo">
        <span>🌿</span> Paw<span>Sanctuary</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#story-1" className={activeSection === 'story-1' ? 'active' : ''}>
            Philosophy
          </a>
        </li>
        <li>
          <a href="#services" className={activeSection === 'services' ? 'active' : ''}>
            Services
          </a>
        </li>
        <li>
          <a href="#team" className={activeSection === 'team' ? 'active' : ''}>
            Team
          </a>
        </li>
        <li>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
            Contact
          </a>
        </li>
      </ul>
      <button className="nav-cta">Book Visit</button>
    </nav>
  )
}
