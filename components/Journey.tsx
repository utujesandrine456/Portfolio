'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const journeyData = [
  {
    year: '2024',
    title: 'Started Coding',
    description:
      'Began my software development journey by learning HTML, CSS, and JavaScript fundamentals through consistent practice.',
  },
  {
    year: '2025',
    title: 'Frontend Development Focus',
    description:
      'Strengthened frontend skills by building hands-on projects using React (JavaScript & TypeScript), Next.js, React Native, and Flutter.',
  },
  {
    year: '2025',
    title: 'System Hardening',
    description:
      'Applied system hardening techniques and secure backend development practices using Node.js, Express, NestJS, Prisma, and PostgreSQL.',
  },
  {
    year: '2026',
    title: 'Database Design',
    description:
      'Designed scalable databases and system architectures for personal projects, collaborations, and real-world problem-solving.',
  },
]



export default function Journey() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    return (
        <section ref={containerRef} className="py-32 bg-black text-white overflow-hidden relative" id="journey">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0">
                <h2 className="text-[15vw] font-black text-white/[0.02] text-center tracking-tighter leading-none whitespace-nowrap">
                    MY JOURNEY
                </h2>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="relative max-w-5xl mx-auto min-h-[800px]">
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-full pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 200 800" preserveAspectRatio="none">
                            <motion.path
                                d="M 100 0 C 100 0, 150 100, 100 200 C 50 300, 100 400, 100 400 C 100 400, 150 500, 100 600 C 50 700, 100 800, 100 800"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                style={{ pathLength: scrollYProgress }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="10%" stopColor="#DAC5A7" stopOpacity="0.5" />
                                    <stop offset="90%" stopColor="#DAC5A7" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="space-y-32 py-12">
                        {journeyData.map((item, index) => (
                            <JourneyItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function JourneyItem({ item, index }: { item: any, index: number }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["center end", "center center"]
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const glow = useTransform(scrollYProgress, [0, 1], [0, 1])

    const isEven = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 relative ${isEven ? 'md:flex-row-reverse' : ''
                }`}
        >
            <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                <h3 className="text-3xl font-bold text-white mb-3 tracking-wide">{item.title}</h3>
                <p className="text-white/60 leading-relaxed font-light text-lg">
                    {item.description}
                </p>
            </div>

            <div className="relative flex items-center justify-center w-16 h-16 shrink-0 z-20">
                <motion.div
                    style={{ opacity: glow }}
                    className="absolute inset-0 bg-cream/30 rounded-full blur-md"
                />
                <div className="w-4 h-4 bg-cream rounded-full z-10 shadow-[0_0_20px_rgba(218,197,167,0.5)]" />
            </div>

            <div className={`flex-1 text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-6xl md:text-8xl font-black text-white/20 select-none font-serif">
                    {item.year}
                </span>
            </div>
        </motion.div>
    )
}
