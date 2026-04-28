import { useState, useEffect, useRef } from 'react'
import { MainScene } from './scenes/MainScene'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ServicesSection } from './components/ServicesSection'
import { AboutSection } from './components/AboutSection'
import { TeamSection } from './components/TeamSection'
import { TestimonialsSection } from './components/TestimonalsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'
import { FloatingParticles } from './components/FloatingParticles'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useCustomCursor } from './hooks/useCustomCursor'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { scrollProgress, section } = useScrollProgress()
  const { dotRef, ringRef } = useCustomCursor()

  return (
    <>
      {/* Loading Screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Custom Cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Fixed 3D Canvas Background */}
      <div className="canvas-container" style={{ pointerEvents: loaded ? 'auto' : 'none' }}>
        <MainScene scrollProgress={scrollProgress} section={section} />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main content - scrollable */}
      <main className="relative">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Scroll progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 items-center">
        {Array.from({ length: 6 }).map((_, i) => {
          const sectionProgress = 1 / 6
          const isCurrent = Math.floor(scrollProgress * 6) === i
          return (
            <button
              key={i}
              onClick={() => {
                const sections = ['#hero', '#services', '#about', '#team', '#testimonials', '#contact']
                document.querySelector(sections[i])?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`cursor-hover rounded-full transition-all duration-300 ${
                isCurrent ? 'w-1.5 h-6 bg-forest-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          )
        })}
      </div>

      {/* Section label */}
      <div className="fixed bottom-8 right-6 z-40">
        <div className="font-mono text-xs text-white/30 tracking-widest">
          {['HERO', 'SERVICES', 'ABOUT', 'TEAM', 'REVIEWS', 'CONTACT'][Math.min(Math.floor(scrollProgress * 6), 5)]}
        </div>
      </div>
    </>
  )
}