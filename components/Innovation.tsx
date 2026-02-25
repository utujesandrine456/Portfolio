'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
    Sparkles,
    Brain,
    Zap,
    Shield,
    Cpu,
    ArrowUpRight,
    Search,
    Terminal,
    Activity,
    Layers
} from 'lucide-react'

// --- Data ---
const HORIZONS = [
    {
        id: 1,
        name: 'WebGPU Renderers',
        category: 'Graphics Architecture',
        status: 'Experimenting',
        percentage: 65,
        description: 'Pioneering hardware-accelerated graphics in the browser to bridge the gap between native and web visualization performance.',
        icon: Sparkles,
        tags: ['WGSL', 'Compute Shaders', 'Next-Gen Web']
    },
    {
        id: 2,
        name: 'Autonomous AI Agents',
        category: 'Machine Intelligence',
        status: 'Prototyping',
        percentage: 45,
        description: 'Architecting goal-oriented agentic systems that leverage LLMs for complex reasoning and workflow automation.',
        icon: Brain,
        tags: ['Agents', 'LLM Chains', 'Cognitive Ops']
    },
    {
        id: 3,
        name: 'Rust Ecosystem',
        category: 'Systems Engineering',
        status: 'Mastering',
        percentage: 80,
        description: 'Integrating memory-safe performance into the web via WebAssembly to handle heavy-compute microservices.',
        icon: Zap,
        tags: ['Wasm', 'Zero-Cost Abstractions', 'Safety']
    },
    {
        id: 4,
        name: 'Zero Knowledge Proofs',
        category: 'Cryptographic Privacy',
        status: 'Researching',
        percentage: 30,
        description: 'Exploring verifiable computation to enable privacy-preserving transitions in decentralized architectures.',
        icon: Shield,
        tags: ['snark/stark', 'Privacy', 'Cryptography']
    },
    {
        id: 5,
        name: 'Edge Intelligence',
        category: 'Distributed Infrastructure',
        status: 'Prototyping',
        percentage: 55,
        description: 'Moving neural network inference to the edge to minimize latency and maximize user data privacy.',
        icon: Cpu,
        tags: ['Local Inference', 'TensorFlow.js', 'Latency']
    }
]

// --- Components ---

function HorizonCard({ horizon, index }: { horizon: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group project-card magnetic relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0a] p-8 transition-all hover:bg-[#0c0c0c] hover:border-cream/20"
        >
            {/* Background Accent */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-cream/5 rounded-full blur-[60px] group-hover:bg-cream/10 transition-colors" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-white/5 text-cream group-hover:scale-110 group-hover:bg-cream/10 transition-all duration-500">
                        <horizon.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-cream animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">{horizon.status}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-cream/60">{horizon.category}</span>
                    <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-cream transition-colors">{horizon.name}</h3>
                </div>

                <p className="text-white/40 text-[15px] leading-relaxed mb-8 h-[72px] line-clamp-3">
                    {horizon.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Research Depth</span>
                        <span className="text-[14px] font-mono text-cream">{horizon.percentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${horizon.percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-cream"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {horizon.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-white/30 border border-white/5 uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default function Innovation() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section
            id="innovation"
            ref={containerRef}
            className="relative min-h-screen w-full bg-black py-32 overflow-hidden"
        >
            {/* Architectural Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-px bg-gradient-to-l from-cream/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-[500px] h-px bg-gradient-to-r from-cream/30 to-transparent" />
                <div className="absolute top-1/2 left-0 w-px h-[400px] bg-gradient-to-b from-transparent via-cream/20 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cream/20 bg-cream/5"
                    >
                        <Layers className="text-cream" size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream">Technical Horizons</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8"
                    >
                        Pushing the <span className="text-cream italic font-serif">Boundaries</span>
                    </motion.h2>
                    <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-3xl">
                        A curated look at the emerging technologies and specialized fields I am currently researching to architect the next generation of digital products.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {HORIZONS.map((horizon, index) => (
                        <HorizonCard key={horizon.id} horizon={horizon} index={index} />
                    ))}

                    {/* Final Abstract Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="mb-6 p-4 rounded-full bg-cream/5 text-cream/40">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-medium text-white/60 mb-2">Continuous Exploration</h3>
                        <p className="text-white/30 text-sm font-light">
                            Always scouting for the next paradigm shift in software architecture and security.
                        </p>
                    </motion.div>
                </div>

                {/* Technical Footnote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-4 text-[11px] font-medium text-white/20 uppercase tracking-[0.5em]">
                        <Terminal size={14} />
                        Active Research Registry
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Activity size={12} className="text-cream animate-pulse" />
                            <span className="text-[11px] font-medium text-white/40 uppercase tracking-widest">Global Synced</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 hidden md:block" />
                        <span className="text-[11px] font-mono text-white/20 select-none">V1.0.4-PHI</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
