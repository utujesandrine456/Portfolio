'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'

export default function CustomCursor() {
    const [cursorVariant, setCursorVariant] = useState('default')
    const [isVisible, setIsVisible] = useState(false)
    const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null)

    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Three concentric circles with different spring configs for a layered trail
    const springOuter = { damping: 20, stiffness: 150 }
    const springMiddle = { damping: 25, stiffness: 200 }
    const springInner = { damping: 30, stiffness: 300 }

    const outerX = useSpring(mouseX, springOuter)
    const outerY = useSpring(mouseY, springOuter)

    const middleX = useSpring(mouseX, springMiddle)
    const middleY = useSpring(mouseY, springMiddle)

    const innerX = useSpring(mouseX, springInner)
    const innerY = useSpring(mouseY, springInner)

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            let x = e.clientX
            let y = e.clientY

            if (magneticTarget) {
                const rect = magneticTarget.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                x += (centerX - x) * 0.35
                y += (centerY - y) * 0.35
            }

            mouseX.set(x)
            mouseY.set(y)
            if (!isVisible) setIsVisible(true)
        }

        const mouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const projectCard = target.closest('.project-card')
            const contactBtn = target.closest('.contact-btn')
            const magnetic = target.closest('.magnetic, button, a') as HTMLElement

            if (projectCard) setCursorVariant('project')
            else if (contactBtn) setCursorVariant('contact')
            else if (magnetic) setCursorVariant('pointer')
            else setCursorVariant('default')

            if (magnetic) setMagneticTarget(magnetic)
            else setMagneticTarget(null)
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseover', mouseOver)
        return () => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseover', mouseOver)
        }
    }, [isVisible, magneticTarget])

    if (!isVisible) return null

    const variants = {
        default: {
            outerSize: 32,
            middleSize: 20,
            innerSize: 8,
            outerOpacity: 0.1,
            middleOpacity: 0.3,
            innerOpacity: 1,
        },
        pointer: {
            outerSize: 48,
            middleSize: 32,
            innerSize: 12,
            outerOpacity: 0.2,
            middleOpacity: 0.5,
            innerOpacity: 1,
        },
        project: {
            outerSize: 80,
            middleSize: 60,
            innerSize: 16,
            outerOpacity: 0.1,
            middleOpacity: 0.2,
            innerOpacity: 0.8,
        },
        contact: {
            outerSize: 100,
            middleSize: 70,
            innerSize: 40,
            outerOpacity: 0.1,
            middleOpacity: 0.2,
            innerOpacity: 0.7,
        }
    }

    const currentVariant = variants[cursorVariant as keyof typeof variants] || variants.default

    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block overflow-hidden">
                {/* Outer Circle - Solid */}
                <motion.div
                    className="absolute bg-cream rounded-full"
                    animate={{
                        width: currentVariant.outerSize,
                        height: currentVariant.outerSize,
                        opacity: currentVariant.outerOpacity,
                    }}
                    style={{
                        x: outerX,
                        y: outerY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                />

                {/* Middle Circle - Solid */}
                <motion.div
                    className="absolute bg-cream rounded-full"
                    animate={{
                        width: currentVariant.middleSize,
                        height: currentVariant.middleSize,
                        opacity: currentVariant.middleOpacity,
                    }}
                    style={{
                        x: middleX,
                        y: middleY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                />

                {/* Inner Circle / Core - Solid */}
                <motion.div
                    className="absolute bg-cream rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-black/20"
                    animate={{
                        width: currentVariant.innerSize,
                        height: currentVariant.innerSize,
                        opacity: currentVariant.innerOpacity,
                    }}
                    style={{
                        x: innerX,
                        y: innerY,
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                >
                    <AnimatePresence mode="wait">
                        {cursorVariant === 'contact' && (
                            <motion.div
                                key="contact"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                <Mail size={20} className="text-black" />
                            </motion.div>
                        )}
                        {cursorVariant === 'pointer' && (
                            <motion.div
                                key="pointer"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                <ArrowUpRight size={14} className="text-black" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <style jsx global>{`
                @media (min-width: 1024px) {
                    * {
                        cursor: none !important;
                    }
                }
                .magnetic {
                    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                }
            `}</style>
        </>
    )
}
