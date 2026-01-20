'use client'

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Search, Compass, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react'

const steps = [
    {
        number: '01',
        title: 'Call Discovery',
        description:
            'Initial discovery call conducted and received by Uwase Utuje Sandrine to understand project goals, scope, and expectations.',
        icon: Search,
    },
    {
        number: '02',
        title: 'UI/UX Design',
        description:
            'User interface and experience design crafted by the Blink Technologiz team, focusing on usability and visual clarity.',
        icon: PenTool,
    },
    {
        number: '03',
        title: 'Web Development',
        description:
            'Frontend and backend development handled by the Blink Technologiz team using modern, scalable technologies.',
        icon: Code2,
    },
    {
        number: '04',
        title: 'Deployment',
        description:
            'Application deployment and environment setup executed by Blink Technologiz to ensure performance and reliability.',
        icon: Compass,
    },
    {
        number: '05',
        title: 'Project Launch',
        description:
            'Final launch and delivery completed by Blink Technologiz Team with quality checks and client readiness.',
        icon: Rocket,
    },
]



export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    return (
        <section ref={containerRef} className="py-24 bg-black text-white relative" id="process">

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 text-cream inline-block relative">
                        Your Project In 5 Steps
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-cream/50 rounded-full"></span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
                        A comprehensive approach ensuring transparency, quality, and excellence at every step.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative pb-24">
                    {steps.map((step, index) => {
                        const targetScale = 1 - ((steps.length - index) * 0.05)
                        return (
                            <Card
                                key={index}
                                i={index}
                                step={step}
                                progress={scrollYProgress}
                                range={[index * 0.25, 1]}
                                targetScale={targetScale}
                            />
                        )
                    })}
                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center mt-20"
                >
                    <p className="text-white/50 text-lg mb-8 font-light">Ready to bring your vision to life?</p>
                    <Link
                        href="https://github.com/utujesandrine456"
                        className="group relative flex items-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-cream hover:text-black hover:border-cream hover:shadow-[0_0_40px_rgba(218,197,167,0.3)]"
                    >
                        <span className="relative z-10 font-bold text-xl">Let's Work Together</span>
                        <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

function Card({ i, step, progress, range, targetScale }: { i: number, step: any, progress: MotionValue<number>, range: number[], targetScale: number }) {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const scale = useTransform(progress, range, [1, targetScale])

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5% + ${i * 25}px)` }}
                className="flex flex-col relative -top-[15%] h-[400px] w-full max-w-[800px] rounded-3xl p-10 origin-top bg-white/[0.02] backdrop-blur-2xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-cream/20 transition-colors duration-500"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cream/50 to-transparent opacity-20 group-hover:opacity-50 transition-opacity duration-500" />

                <div className="flex flex-col md:flex-row h-full gap-8 md:gap-12">
                    <div className="w-full md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-6">
                        <span className="text-8xl font-black text-white/5 font-serif select-none absolute left-6 -top-4 md:static md:top-auto md:left-auto group-hover:text-white/10 transition-colors duration-500">
                            {step.number}
                        </span>
                        <div className="mt-8 relative z-10 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-cream group-hover:scale-110 group-hover:bg-cream/10 transition-all duration-500">
                            <step.icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mt-auto tracking-tight">{step.title}</h3>
                    </div>

                    <div className="w-full md:w-2/3 flex items-center p-4">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-white/70 group-hover:text-white/90 transition-colors duration-500">
                            {step.description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
