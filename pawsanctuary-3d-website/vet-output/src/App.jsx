import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene3D from './components/Scene3D'
import HeroSection from './sections/HeroSection'
import StorySection from './sections/StorySection'
import ServicesSection from './sections/ServicesSection'
import TeamSection from './sections/TeamSection'
import TestimonialCarousel from './sections/TestimonialCarousel'
import CTASection from './sections/CTASection'
import Nav from './components/Nav'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Particles from './components/Particles'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Smooth scroll with Lenis
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    lenis.scrollTo(0, { immediate: true })

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <>
      <Loader />
      <Cursor />
      <Particles />
      <div className="gradient-left" />
      <div className="gradient-bottom" />

      {/* 3D Canvas — fixed behind everything */}
      <div id="canvas-container">
        <Scene3D />
      </div>

      <Nav />
      <ScrollProgress />

      {/* Scroll story */}
      <div id="scroll-container">
        <HeroSection />
        <StorySection
          id="story-1"
          side="left"
          number="01 / Care"
          title={<>Where <em>love</em><br />meets science</>}
          body="Every animal that walks through our doors is treated with the same devotion as family. Our garden sanctuary is designed to calm, comfort, and heal."
          cta="Our Philosophy"
        />
        <StorySection
          id="story-2"
          side="right"
          number="02 / Garden"
          title={<>Healing<br />in <em>nature</em></>}
          body="Surrounded by living greenery, natural light, and flowing water — our clinic is the world's first fully biophilic veterinary environment."
          cta="Explore Space"
        />
        <ServicesSection />
        <TeamSection />
        <TestimonialCarousel />
        <CTASection />
      </div>
    </>
  )
}
