'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Journey', id: 'journey' },
  { name: 'Skills', id: 'skills' },
  { name: 'Process', id: 'process' },
  { name: 'Projects', id: 'projects' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)

          const scrollPosition = window.scrollY + 200
          let currentSection = 'about'


          for (let i = navItems.length - 1; i >= 0; i--) {
            const item = navItems[i]
            const element = document.getElementById(item.id)

            if (element) {
              const offsetTop = element.offsetTop

              if (scrollPosition >= offsetTop) {
                currentSection = item.id
                break
              }
            }
          }

          setActiveSection(currentSection)
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <nav className={`pointer-events-auto transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl border-white/10 py-2' : 'bg-transparent border-cream/30 py-3'} border rounded-md px-2`}>
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`relative z-10 px-5 py-2 text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
              >
                {item.name}

                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-md -z-10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}

          <li className="ml-2 pl-2 border-l border-white/10">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative px-6 py-2 bg-cream text-black text-sm font-bold rounded-md overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </li>

        </ul>
      </nav>
    </div>
  )
}

