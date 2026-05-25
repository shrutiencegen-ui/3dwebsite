import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Loader.css'

export default function Loader() {
  const loaderRef = useRef(null)
  const [percent, setPercent] = useState(0)
  const [message, setMessage] = useState('Initializing sanctuary environment...')

  useEffect(() => {
    // 1. Ticking Percent Counter (0 to 100)
    let start = 0
    const duration = 2600 // 2.6s loading duration
    const intervalTime = 26
    const step = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      start += step
      if (start >= 100) {
        setPercent(100)
        clearInterval(timer)
        // Transition out preloader once loaded
        triggerTransitionOut()
      } else {
        setPercent(Math.floor(start))
      }
    }, intervalTime)

    // 2. Loading messages stages
    const messages = [
      'Cultivating biophilic healing gardens...',
      'Calming clinical environments...',
      'Awakening animal companions...',
      'Welcome to PawSanctuary.'
    ]
    
    let msgIndex = 0
    const msgInterval = setInterval(() => {
      if (messages[msgIndex]) {
        setMessage(messages[msgIndex])
        msgIndex++
      } else {
        clearInterval(msgInterval)
      }
    }, 650)

    const triggerTransitionOut = () => {
      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.4,
        ease: 'power4.inOut',
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none'
        }
      })
    }

    return () => {
      clearInterval(timer)
      clearInterval(msgInterval)
    }
  }, [])

  return (
    <div id="loader" ref={loaderRef}>
      {/* Luxury Biophilic Spinner Ring */}
      <div className="loader-ring" />
      
      {/* Progress Track */}
      <div className="loader-track">
        <div className="loader-bar" style={{ width: `${percent}%` }} />
      </div>
      
      {/* Dynamic text and percentage display */}
      <div className="loader-text">{message}</div>
      <div className="loader-percentage">{percent}%</div>
      
      {/* Core Brand Badge */}
      <div className="loader-logo">
        <span>🌿</span> Paw<span>Sanctuary</span>
      </div>
    </div>
  )
}
