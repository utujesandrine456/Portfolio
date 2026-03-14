'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Database, Shield, Layout, ArrowRight, Plus } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Frontend & Mobile',
    subtitle: 'APPS & WEB',
    description:
      'React, Next.js, React Native, Flutter – Crafting fast, responsive, and user-focused web and mobile applications.',
    icon: Code2,
  },
  {
    id: 2,
    title: 'UI / UX Design',
    subtitle: 'INTERFACES',
    description:
      'Designing intuitive, visually engaging interfaces with a strong focus on usability, accessibility, and user experience.',
    icon: Layout,
  },
  {
    id: 3,
    title: 'System Hardening',
    subtitle: 'SECURITY',
    description:
      'Securing systems through configuration hardening, vulnerability reduction, and security best practices.',
    icon: Shield,
  },
  {
    id: 4,
    title: 'Database Design',
    subtitle: 'SCALABILITY',
    description:
      'Designing efficient, scalable, and well-structured databases optimized for performance and reliability.',
    icon: Database,
  },
]

export default function RotatingServiceCards() {
  const slidesRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    if (!slidesRef.current) return

    let animationId: number
    let rotation = 0
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      if (!isPausedRef.current) {
        const deltaTime = currentTime - lastTime
        lastTime = currentTime
        rotation += (360 / 15000) * deltaTime
        if (slidesRef.current) {
          slidesRef.current.style.transform = `rotateY(${rotation}deg)`
        }
      } else {
        lastTime = currentTime
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-visible">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-cream/5 blur-[120px] rounded-full pointer-events-none" />

      <div
        className="relative w-[300px] h-[200px] md:w-[350px] md:h-[250px]"
        style={{ perspective: '2000px' }}
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
            const radius = 220

            return (
              <div
                key={service.id}
                className="absolute"
                style={{
                  width: '260px',
                  height: '340px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-130px',
                  marginTop: '-170px',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => {
                  isPausedRef.current = true
                  setHoveredId(service.id)
                }}
                onMouseLeave={() => {
                  isPausedRef.current = false
                  setHoveredId(null)
                }}
              >
                <motion.div
                  className={`project-card magnetic relative w-full h-full rounded-2xl border transition-all duration-700 overflow-hidden bg-black/40 backdrop-blur-xl ${hoveredId === service.id ? 'border-cream' : 'border-white/10'
                    }`}
                  style={{
                    boxShadow: hoveredId === service.id
                      ? '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px -5px rgba(218, 197, 167, 0.4)'
                      : '0 10px 30px -10px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Grid Pattern Background */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Subtle Cream Gradient Reveal */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cream/10 to-transparent opacity-0 transition-opacity duration-700"
                    animate={{ opacity: hoveredId === service.id ? 1 : 0 }}
                  />

                  {/* Top Bar Architectural Detail */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-cream"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredId === service.id ? '100%' : '20%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>

                  <div className="relative z-10 flex flex-col h-full p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] tracking-[0.3em] text-cream mb-1 font-bold">
                          {service.subtitle}
                        </span>
                        <div className="h-px w-8 bg-cream/30" />
                      </div>
                      <Plus size={14} className="text-white/20" />
                    </div>

                    {/* Icon Container */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 blur-3xl opacity-20 rounded-full bg-cream"
                          animate={{
                            scale: hoveredId === service.id ? [1, 1.4, 1.2] : 1,
                            opacity: hoveredId === service.id ? 0.4 : 0.1
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        />
                        <div className={`relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center group transition-all duration-700 overflow-hidden backdrop-blur-md shadow-2xl`}>
                          <div className="absolute inset-0 bg-cream/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                          <service.icon
                            size={38}
                            className="text-cream transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_8px_rgba(218,197,167,0.5)]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center">
                      <h3 className="text-xl font-bold text-white mb-3 text-center tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-white/40 text-[13px] text-center leading-relaxed font-light line-clamp-4">
                        {service.description}
                      </p>
                    </div>

                    {/* Footer / CTA */}
                    <motion.div
                      className="mt-6 flex items-center justify-center gap-2 text-cream text-[11px] font-bold tracking-widest uppercase"
                      animate={{ y: hoveredId === service.id ? 0 : 10, opacity: hoveredId === service.id ? 1 : 0 }}
                    >
                      Explore More
                      <ArrowRight size={14} />
                    </motion.div>
                  </div>

                  {/* Corner Bits */}
                  <div className="absolute top-4 right-4 text-[8px] text-white/10 font-mono">0{service.id}</div>
                  <div className="absolute bottom-4 left-4 w-4 h-px bg-white/10" />
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
