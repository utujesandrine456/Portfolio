'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ThreeBackground from './ThreeBackground'
import RotatingServiceCards from './RotatingServiceCards'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      )

    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-black ml-8"
    >
      <ThreeBackground />
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 px-2 pt-20">
        <div className="flex-1 text-left max-w-2xl lg:max-w-xl">
          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl font-bold mb-8 text-cream leading-tight"
          >
            From Idea To
            <br />
            Secure Software
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl mb-12 text-white/80 leading-relaxed"
          >
            Full-Stack Developer & Ethical Hacker building strong, scalable
            applications with clean code, secure design, always keeping
            systems safe, grabbing every opportunity to create and protect
            the software I work on.
          </p>

          <div className="flex flex-wrap gap-6 mb-16">
            <button
              ref={buttonRef}
              onClick={scrollToProjects}
              className="px-6 py-3 text-lg bg-cream text-black font-medium rounded-md hover:scale-105 transition-transform duration-300">
              View My Work
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3 bg-transparent border border-cream text-lg text-cream font-medium rounded-md hover:bg-cream/10 transition-colors duration-300">
              Contact Me
            </button>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/utujesandrine456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-cream hover:text-cream text-white/60 transition-all"
            >
              <Github size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/uwase-utuje-sandrine-5842b8386/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-cream hover:text-cream text-white/60 transition-all"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="mailto:utujesandrine456@gmail.com"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-cream hover:text-cream text-white/60 transition-all"
            >
              <Mail size={20} />
            </a>

            <a
              href="https://instagram.com/utuje_001"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-cream hover:text-cream text-white/60 transition-all"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center lg:items-end lg:justify-end mt-12 lg:mt-0">
          <RotatingServiceCards />
        </div>
      </div>
    </section>
  )
}

