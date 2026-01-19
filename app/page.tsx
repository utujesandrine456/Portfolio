'use client'

import { useEffect } from 'react'
import Loader from '@/components/Loader'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Journey from '@/components/Journey'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <main className="relative bg-black">
      <Loader />
      <Navigation />
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Process />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

