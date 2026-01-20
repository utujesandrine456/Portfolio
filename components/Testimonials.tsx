'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'


const testimonials = [
  {
    id: 0,
    name: 'UWASE Sonia',
    role: 'Frontend Developer',
    text: "Sandrine is a skilled Frontend Developer who consistently delivers clean, responsive, and well-structured interfaces. Her attention to detail greatly improves overall application quality.",
  },
  {
    id: 1,
    name: 'BUGINGO Derick Erick',
    role: 'Backend Developer',
    text: "Working with Sandrine was seamless. Her frontend implementations integrated smoothly with backend logic, and her understanding of data flow made collaboration efficient.",
  },
  {
    id: 2,
    name: 'Bienvenue Alliance Dieu d\'Amour',
    role: 'CEO, Blink Technologiz',
    text: "Sandrine contributed significantly to our projects through strong frontend development and solid database structuring. She delivered reliable and professional solutions.",
  },
  {
    id: 3,
    name: 'NZABARINDA Theoneste',
    role: 'Software Engineer, AIMS Rwanda',
    text: "Sandrine worked on frontend implementation and database-related tasks for our system. Her work was well-organized, efficient, and easy to maintain.",
  },
  {
    id: 4,
    name: 'Louis Mukama',
    role: 'Instructor at Rwanda Coding Academy',
    text: "Sandrine played a key role in developing the frontend and designing the database for our Internship Management System. The platform was efficient, scalable, and professionally delivered.",
  },
]   



export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0)

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section className="py-32 bg-black text-white relative flex flex-col items-center justify-center min-h-[800px] border-t border-white/5" id="testimonials">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
            </div>

            <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center mb-24 relative"
                >
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-cream/50 font-mono tracking-widest text-sm uppercase mb-4 block"
                    >
                      Endorsements
                    </motion.span>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-5xl md:text-7xl font-bold text-white"
                    >
                      What Clients Say
                    </motion.h2>
                </motion.div>

                <div className="relative">
                    <button
                        onClick={prevTestimonial}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-14 h-14 rounded-full border border-white/10 items-center justify-center text-white/50 hover:text-cream hover:border-cream transition-all z-20"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-14 h-14 rounded-full border border-white/10 items-center justify-center text-white/50 hover:text-cream hover:border-cream transition-all z-20"
                    >
                        <ArrowRight size={24} />
                    </button>

                    {/* Central Card Area */}
                    <div className="min-h-[400px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="w-full max-w-4xl text-center"
                            >
                                <Quote size={64} className="text-cream/20 mx-auto mb-10" />

                                <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-slug tracking-tight text-white mb-12">
                                    "{testimonials[activeIndex].text}"
                                </p>

                                <div className="flex flex-col items-center gap-4">
                                    <h4 className="text-2xl font-bold text-white">{testimonials[activeIndex].name}</h4>
                                    <p className="text-lg text-white/40">{testimonials[activeIndex].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex md:hidden justify-center gap-8 mt-12">
                        <button onClick={prevTestimonial} className="p-4 rounded-full bg-white/5 text-white"><ArrowLeft /></button>
                        <button onClick={nextTestimonial} className="p-4 rounded-full bg-white/5 text-white"><ArrowRight /></button>
                    </div>

                </div>
            </div>
        </section>
    )
}
