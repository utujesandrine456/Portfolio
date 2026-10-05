'use client'

import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'
import gsap from 'gsap'

export default function Loader({ onComplete }: { onComplete?: () => void }) {
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
          duration: 1,
          opacity: 0,
          scale: 1.2,
          filter: 'blur(20px)',
          ease: 'power4.inOut',
          onComplete: () => {
            setIsLoading(false)
            if (onComplete) onComplete()
          }
        },
        '+=0.3'
      )


    return () => clearInterval(progressInterval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cream/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cream/5 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="loader-container relative flex flex-col items-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cream/5" />
          <div className="absolute inset-4 rounded-full border border-cream/10" />
          <div className="absolute inset-8 rounded-full border border-cream/20" />

          <div
            className="loader-circle absolute inset-0 rounded-full border-t-2 border-cream/40 blur-[1px]"
            style={{
              transform: `rotate(${progress * 3.6}deg)`,
              boxShadow: '0 0 20px rgba(218, 197, 167, 0.2)'
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="text-5xl font-extralight text-cream tracking-tighter flex items-baseline">
              <span className="tabular-nums">{progress}</span>
              <span className="text-xl ml-1 opacity-40">%</span>
            </div>
            <div className="mt-2 text-[12px] text-cream/40">
              System Initialization
            </div>
          </div>

          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-cream/30 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-120px)`,
                  opacity: (progress / 100) > (i / 12) ? 1 : 0.1,
                  transition: 'opacity 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        <div className="loading-text mt-16 flex flex-col items-center max-w-xs text-center">
          <p className="text-xs text-cream/60 font-light leading-relaxed tracking-wider">
            {progress < 30 && "Gathering architectural specs..."}
            {progress >= 30 && progress < 60 && "Forging secure code foundations..."}
            {progress >= 60 && progress < 90 && "Optimizing performance layers..."}
            {progress >= 90 && "Finalizing premium experience..."}
          </p>

          <div className="mt-8 relative w-48 h-[1px] bg-cream/10 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-cream/60 shadow-[0_0_8px_rgba(218,197,167,0.8)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}