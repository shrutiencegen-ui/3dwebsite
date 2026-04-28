import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollProgress: 0,
    section: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0
      const section = Math.floor(scrollProgress * 6) // 6 sections

      setScrollData({ scrollY, scrollProgress, section })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollData
}

export function useSectionProgress(sectionIndex, totalSections = 6) {
  const { scrollProgress } = useScrollProgress()
  const sectionSize = 1 / totalSections
  const sectionStart = sectionIndex * sectionSize
  const sectionEnd = sectionStart + sectionSize
  const progress = Math.max(0, Math.min(1,
    (scrollProgress - sectionStart) / sectionSize
  ))
  return progress
}