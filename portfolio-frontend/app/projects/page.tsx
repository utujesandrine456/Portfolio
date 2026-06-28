'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, Play, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/constants/projects'
import CustomCursor from '@/components/CustomCursor'

const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))]

export default function AllProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

    const filteredProjects = useMemo(() => {
        return activeCategory === "All"
            ? projects
            : projects.filter(p => p.category === activeCategory)
    }, [activeCategory])

    return (
        <main className="min-h-screen bg-black text-white py-20 px-6 md:px-12 lg:px-24">
            <CustomCursor />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-cream hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest">Back to Home</span>
                </Link>
                <h1 className="text-5xl md:text-7xl font-bold text-cream mb-6 tracking-tight">
                    Portfolio Archive
                </h1>
                <p className="text-white/50 text-xl max-w-2xl font-light">
                    A deep dive into my technical journey, showcasing specialized solutions across e-commerce, finance, and security.
                </p>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full border text-sm transition-all duration-300 ${activeCategory === cat
                            ? 'bg-cream text-black border-cream'
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Project Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group relative bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-cream/30 transition-all duration-500 flex flex-col"
                        >
                            {/* Image Reveal */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 p-4"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="p-4 rounded-full bg-cream text-black hover:scale-110 transition-transform"
                                    >
                                        <Play size={24} fill="currentColor" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <span className="text-[10px] tracking-[0.3em] text-cream uppercase mb-2 font-bold opacity-60">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-cream transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {project.technologies.slice(0, 2).map(t => (
                                            <span key={t} className="text-[10px] text-white/20 border border-white/10 px-2 py-1 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="text-cream text-sm flex items-center gap-1 hover:gap-2 transition-all font-bold"
                                    >
                                        View Story <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Video Walkthrough Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 40 }}
                        >
                            <div className="grid lg:grid-cols-[1fr_350px]">
                                {/* Video Area */}
                                <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h2 className="text-3xl font-bold text-cream underline decoration-cream/30 decoration-2 underline-offset-8">
                                                {selectedProject.title}
                                            </h2>
                                            <p className="text-white/40 text-sm mt-3">{selectedProject.subtitle}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 transition-all font-bold text-xs uppercase"
                                        >
                                            Close
                                        </button>
                                    </div>

                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black">
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src={selectedProject.videoUrl}
                                            title={`${selectedProject.title} walkthrough`}
                                            allowFullScreen
                                        />
                                    </div>
                                </div>

                                {/* Details Area */}
                                <div className="p-8 lg:p-10 flex flex-col bg-white/[0.02]">
                                    <h4 className="text-xs uppercase tracking-[0.3em] text-cream mb-6 font-bold">Process & Step-by-Step</h4>

                                    <div className="space-y-8 flex-1">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-cream/10 border border-cream/30 flex items-center justify-center text-[10px] font-bold text-cream shrink-0">01</div>
                                            <div>
                                                <p className="text-sm font-bold mb-1 italic">Architecture & Planning</p>
                                                <p className="text-[11px] text-white/40 leading-relaxed">Designing the core foundations and data models for scalability.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-cream/10 border border-cream/30 flex items-center justify-center text-[10px] font-bold text-cream shrink-0">02</div>
                                            <div>
                                                <p className="text-sm font-bold mb-1 italic">Security & Logic</p>
                                                <p className="text-[11px] text-white/40 leading-relaxed">Implementing system hardening and robust backend functionality.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-cream/10 border border-cream/30 flex items-center justify-center text-[10px] font-bold text-cream shrink-0">03</div>
                                            <div>
                                                <p className="text-sm font-bold mb-1 italic">UI & Refinement</p>
                                                <p className="text-[11px] text-white/40 leading-relaxed">Polishing interactions and ensuring a premium user experience.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 space-y-3">
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            className="w-full py-4 rounded-2xl bg-cream text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all text-sm"
                                        >
                                            Launch Interactive Demo <ArrowUpRight size={18} />
                                        </a>
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm"
                                        >
                                            <Github size={18} /> Source Repository
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
