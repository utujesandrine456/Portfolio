'use client'

import { useEffect, useRef } from 'react'
import { Code2, Database, Shield, Layout } from 'lucide-react'

const services = [
    {
      id: 1,
      title: 'Frontend & Mobile Development',
      description:
        'React, Next.js, React Native, Flutter – Crafting fast, responsive, and user-focused web and mobile applications.',
      icon: Code2,
      color: 'from-cream/10 to-cream/5',
      borderColor: 'border-cream/30',
    },
    {
      id: 2,
      title: 'UI / UX Design',
      description:
        'Designing intuitive, visually engaging interfaces with a strong focus on usability, accessibility, and user experience.',
      icon: Layout,
      color: 'from-cream/15 to-cream/8',
      borderColor: 'border-cream/35',
    },
    {
      id: 3,
      title: 'System Hardening',
      description:
        'Securing systems through configuration hardening, vulnerability reduction, and security best practices.',
      icon: Shield,
      color: 'from-cream/12 to-cream/6',
      borderColor: 'border-cream/32',
    },
    {
      id: 4,
      title: 'Database Design',
      description:
        'Designing efficient, scalable, and well-structured databases optimized for performance and reliability.',
      icon: Database,
      color: 'from-cream/10 to-cream/5',
      borderColor: 'border-cream/30',
    },
  ]
  

export default function RotatingServiceCards() {
  const slidesRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)

  useEffect(() => {
    if (!slidesRef.current) return

    let animationId: number
    let rotation = 0
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      if (!isPausedRef.current) {
        const deltaTime = currentTime - lastTime
        lastTime = currentTime
        
        rotation += (360 / 18000) * deltaTime
        
        if (slidesRef.current) {
          slidesRef.current.style.transform = `rotateY(${rotation}deg)`
        }
      } else {
        lastTime = currentTime
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)


    const handleMouseEnter = () => {
      isPausedRef.current = true
    }
    const handleMouseLeave = () => {
      isPausedRef.current = false
    }

    if (slidesRef.current) {
      slidesRef.current.addEventListener('mouseenter', handleMouseEnter)
      slidesRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (slidesRef.current) {
        slidesRef.current.removeEventListener('mouseenter', handleMouseEnter)
        slidesRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
      <div 
        className="relative w-[280px] h-[180px] md:w-[320px] md:h-[220px]"
        style={{
          perspective: '1200px',
        }}
      >
        <div
          ref={slidesRef}
          className="absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)',
          }}
        >
          {services.map((service, index) => {
            const angle = (360 / services.length) * index
            const radius = 200 

            return (
              <div
                key={service.id}
                className="absolute"
                style={{
                  width: '240px',
                  height: '300px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-120px',
                  marginTop: '-150px',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className={`relative w-full h-full rounded-2xl  backdrop-blur-xl border ${service.borderColor} p-5 md:p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden hover:text-black`}
                  style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(218, 197, 167, 0.08)',
                  }}
                >
                  <div className={`absolute inset-0 bg-cream/40 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-center mb-4">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${service.color} border ${service.borderColor} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cream/20 group-hover:border-cream/50 transition-all duration-500`}>
                        <service.icon className="w-7 h-7 md:w-8 md:h-8 text-cream group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-base md:text-xl font-bold text-cream mb-2 text-center group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/60 text-xs md:text-sm text-center leading-relaxed group-hover:text-white/80 transition-colors duration-300 line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-cream/40 group-hover:bg-cream group-hover:scale-150 transition-all duration-300" />
                    <div className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-cream/30 group-hover:bg-cream/80 group-hover:scale-150 transition-all duration-300" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

