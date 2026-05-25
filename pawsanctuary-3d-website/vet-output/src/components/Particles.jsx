export default function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${5 + (i * 5.5) % 90}%`,
    bottom: `${Math.random() * 20}%`,
    dur: `${7 + (i % 5) * 2}s`,
    delay: `${(i * 0.7) % 6}s`,
    drift: `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 8)}px`,
  }))

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            '--dur': p.dur,
            '--delay': p.delay,
            '--drift': p.drift,
          }}
        />
      ))}
    </>
  )
}

import './Cursor.css'
