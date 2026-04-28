import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animId

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      animId = requestAnimationFrame(animateRing)
    }

    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button, .cursor-hover').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animId = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(animId)
    }
  }, [])

  return { dotRef, ringRef }
}