'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Loader from '@/components/Loader'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ModernSkills from '@/components/ModernSkills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Journey from '@/components/Journey'
import Process from '@/components/Process'
import Booking from '@/components/Booking'
import Testimonials from '@/components/Testimonials'
import StatsShowcase from '@/components/StatsShowcase'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <main className="relative bg-black min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100]"
          >
            <Loader onComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className={isLoading ? "hidden" : "block"}
      >
        <Navigation />
        <Hero />
        <About />
        <StatsShowcase />
        <Journey />
        <ModernSkills />
        <Process />
        <Booking />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  )
}
