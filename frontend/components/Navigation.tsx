'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
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
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <div className="fixed top-6 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl border-white/10 py-2' : 'bg-transparent border-cream/10 py-3'} border rounded-md px-2 flex items-center justify-between min-w-[300px] md:min-w-0`}>
          <div className="hidden md:block w-px h-5 bg-white/10 mr-2" />
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative z-10 px-5 py-2 text-md font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-white' : 'text-white/50 hover:text-white/80'
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
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden md:block group relative px-6 py-2 bg-cream text-black text-sm font-bold rounded-md overflow-hidden transition-transform hover:scale-105 magnetic mx-4"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-white/10 text-white border border-white/10"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col gap-8 w-full max-w-xs">
              {/* Mobile Brand */}
              <div className="mb-4">
                <span className="text-2xl font-bold tracking-tight text-white">Utuje</span>
                <span className="text-2xl font-bold tracking-tight text-cream">.</span>
                <span className="text-2xl font-bold tracking-tight text-white/50">dev</span>
              </div>
              <div className="h-px bg-white/10" />
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg font-light text-left ${activeSection === item.id ? 'text-cream' : 'text-white/60'
                    }`}
                >
                  {item.name}
                </motion.button>
              ))}

              <div className="h-px bg-white/10 my-4 " />

              <button
                onClick={() => scrollToSection('contact')}
                className="py-4 bg-cream text-black text-center font-bold rounded-md flex items-center justify-center gap-2 group mx-2"
              >
                Let's Talk
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

