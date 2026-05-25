import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.1)
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.1)

      dot.style.left = posRef.current.x + 'px'
      dot.style.top = posRef.current.y + 'px'
      ring.style.left = ringPosRef.current.x + 'px'
      ring.style.top = ringPosRef.current.y + 'px'

      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dot.style.width = '20px'
      dot.style.height = '20px'
      ring.style.width = '60px'
      ring.style.height = '60px'
      ring.style.opacity = '0.3'
    }
    const onLeave = () => {
      dot.style.width = '12px'
      dot.style.height = '12px'
      ring.style.width = '44px'
      ring.style.height = '44px'
      ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .service-card, .team-member').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
