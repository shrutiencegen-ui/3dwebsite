import { useEffect, useRef } from 'react'

export function FloatingParticles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []
    const symbols = ['🐾', '✦', '◆', '·', '•']

    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.cssText = `
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 10 + 6}px;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: 0.15;
        color: #22c55e;
      `
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)]
      container.appendChild(p)
      particles.push(p)
    }

    return () => particles.forEach(p => p.remove())
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1]" />
}