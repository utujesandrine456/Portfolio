'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useTransform, useInView } from 'framer-motion'
import { Award, Briefcase, Users } from 'lucide-react'

const BlueprintStat = ({ icon: Icon, value, label, index, mouseX }: { icon: any, value: number, label: string, index: number, mouseX: any }) => {
    const statRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(statRef, { once: true, margin: "-50px" })

    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 })
    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

    useEffect(() => {
        if (isInView) motionValue.set(value)
    }, [isInView, value, motionValue])
    const [distance, setDistance] = useState(1000)

    useEffect(() => {
        const updateDistance = () => {
            if (!statRef.current) return
            const rect = statRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const d = Math.abs(mouseX.get() - centerX)
            setDistance(d)
        }
        const unsubscribe = mouseX.on('change', updateDistance)
        return () => unsubscribe()
    }, [mouseX])

    const opacity = useTransform(mouseX, () => {
        if (!statRef.current) return 0.3
        const rect = statRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const d = Math.abs(mouseX.get() - centerX)
        return Math.max(0.3, 1 - d / 400)
    })

    const scale = useTransform(mouseX, () => {
        if (!statRef.current) return 1
        const rect = statRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const d = Math.abs(mouseX.get() - centerX)
        return Math.max(1, 1.1 - d / 2000)
    })

    return (
        <motion.div
            ref={statRef}
            style={{ opacity, scale }}
            className="flex flex-col items-center relative py-12 px-4 group cursor-default"
        >
            {/* Measurement Line (Vertical) */}
            <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100px' } : { height: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="absolute top-0 w-px bg-gradient-to-b from-cream/40 to-transparent"
                style={{ transform: `translateY(-100%)` }}
            />

            {/* Icon Circle */}
            <div className="mb-4 text-cream/50 group-hover:text-cream transition-colors duration-300">
                <Icon size={20} strokeWidth={1.5} />
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-1">
                <motion.span className="text-6xl md:text-7xl font-bold text-white tracking-tighter">
                    {displayValue}
                </motion.span>
                <span className="text-2xl font-medium text-cream">+</span>
            </div>

            {/* Label */}
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2 font-light group-hover:text-white/70 transition-colors duration-300">
                {label}
            </span>

            {/* Subtle Coordinate Marker */}
            <div className="absolute -bottom-1.5 w-3 h-3 border border-cream/30 rounded-full flex items-center justify-center bg-black">
                <div className="w-1 h-1 bg-cream rounded-full" />
            </div>
        </motion.div>
    )
}

export default function StatsShowcase() {
    const mouseX = useMotionValue(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX])

    const stats = [
        { icon: Award, value: 2, label: "Years Experience" },
        { icon: Briefcase, value: 4, label: "Total Projects" },
        { icon: Users, value: 6, label: "Happy Partners" }
    ]

    return (
        <section className="py-8 px-6 relative overflow-visible border-b border-white/[0.03]">
            <div className="max-w-4xl mx-auto relative h-64 flex flex-col justify-end">

                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center"
                />

                {/* Grid Mapping */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                    {stats.map((stat, index) => (
                        <BlueprintStat
                            key={index}
                            {...stat}
                            index={index}
                            mouseX={mouseX}
                        />
                    ))}
                </div>

                <div className="absolute -bottom-2 -left-2 w-8 h-px bg-cream/10" />
                <div className="absolute bottom-[-9px] left-0 w-px h-8 bg-cream/10" />
                <div className="absolute -bottom-2 -right-2 w-8 h-px bg-cream/10" />
                <div className="absolute bottom-[-9px] right-0 w-px h-8 bg-cream/10" />
            </div>
        </section>
    )
}
