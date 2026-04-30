import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // detect active section
      navLinks.forEach(link => {
        const el = document.querySelector(link.href)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(link.href)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`mx-3 md:mx-8  rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl shadow-black/20 py-3 px-6'
            : 'py-5 px-8'
        }`}
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center shadow-lg">
              🐾
            </div>
            <div>
              <div className="font-display text-lg font-bold">PawCare</div>
              <div className="text-[10px] tracking-widest text-forest-400 uppercase">
                Veterinary Clinic
              </div>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 relative">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-2 py-1 text-sm transition ${
                  active === link.href
                    ? 'text-forest-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}

                {/* Active underline animation */}
                {active === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-forest-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* CTA */}
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="hidden md:block btn-primary text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Appointment
            </motion.button>

            {/* Mobile Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            >
              <span className={`w-6 h-0.5 bg-white transition ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden  glass-card p-4"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map(link => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left py-2 ${
                      active === link.href
                        ? 'text-forest-400'
                        : 'text-white/70'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn-primary "
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}