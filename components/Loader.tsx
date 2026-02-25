'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'
import gsap from 'gsap'

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 25)

    const tl = gsap.timeline()

    tl.fromTo('.loader-circle',
      {
        scale: 0,
        rotation: -180
      },
      {
        duration: 1.2,
        scale: 1,
        rotation: 0,
        ease: 'elastic.out(1, 0.5)'
      }
    )
      .fromTo('.loading-text',
        {
          opacity: 0,
          y: 10
        },
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: 'power2.out'
        },
        '-=0.5'
      )
      .to('.loader-container',
        {
          duration: 0.8,
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)',
          ease: 'power3.inOut',
          onComplete: () => setIsLoading(false)
        },
        '+=0.5'
      )

    return () => clearInterval(progressInterval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black dark:bg-black">
      <div className="loader-container relative">
        <div className="relative w-48 h-48">
          <div className="loader-circle absolute inset-0 rounded-full border-2 border-black/20 dark:border-cream/20">
            <div
              className="absolute -inset-2 rounded-full border-2 border-transparent"
              style={{
                background: `conic-gradient(from 0deg, transparent ${progress}%, ${theme === 'dark' ? 'rgba(255,253,208,0.8)' : 'rgba(0,0,0,0.8)'
                  } ${progress}%, transparent ${progress + 0.1}%)`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
              }}
            />

            <div className="absolute inset-4 rounded-full border border-dashed border-black/10 dark:border-cream/10" />

            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45) + (progress * 3.6)
                const radius = 5.5
                const x = Math.cos(angle * Math.PI / 180) * radius
                const y = Math.sin(angle * Math.PI / 180) * radius

                return (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-black dark:bg-cream transition-all duration-300"
                    style={{
                      top: `calc(50% + ${y}rem)`,
                      left: `calc(50% + ${x}rem)`,
                      opacity: 0.6 + (Math.sin(Date.now() / 500 + i) * 0.3),
                      transform: `scale(${0.8 + (progress / 200)})`
                    }}
                  />
                )
              })}
            </div>

            {/* Center Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Percentage */}
                <div className="text-3xl font-light text-black dark:text-cream text-center">
                  {progress}
                  <span className="text-xl">%</span>
                </div>

                {/* Micro Animation */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-black/20 dark:bg-cream/20 overflow-hidden">
                  <div
                    className="h-full bg-black dark:bg-cream"
                    style={{
                      width: '40%',
                      animation: 'slide 1s ease-in-out infinite alternate',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Loading Text */}
        <div className="loading-text mt-8 text-center">
          <div className="text-lg font-light tracking-widest text-black/70 dark:text-cream/70">
            LOADING
          </div>
          {/* Minimal Progress Bar */}
          <div className="mt-2 w-32 h-px bg-black/10 dark:bg-cream/10">
            <div
              className="h-full bg-black dark:bg-cream transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}