'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
    Terminal,
    Cpu,
    Activity,
    Lock,
    Shield,
    Globe,
    Zap,
    Brain,
    Database,
    Network,
    ChevronRight,
    Command,
    AlertCircle,
    Boxes
} from 'lucide-react'

// --- Types ---
interface SystemNode {
    id: string;
    label: string;
    details: string;
    icon: any;
    coords: { x: number, y: number };
}

// --- Data ---
const SYSTEM_NODES: SystemNode[] = [
    { id: 'core', label: 'NEURAL_CORE', details: 'Cognitive LLM processing & Agentic reasoning layers.', icon: Brain, coords: { x: 50, y: 50 } },
    { id: 'graphics', label: 'GPU_RENDER_PIPELINE', details: 'Hardware-accelerated visualization via WebGPU/WGSL.', icon: Boxes, coords: { x: 20, y: 30 } },
    { id: 'security', label: 'ZERO_TRUST_PROTO', details: 'Automated threat detection and cryptographic verification.', icon: Shield, coords: { x: 80, y: 30 } },
    { id: 'network', label: 'MESH_NETWORK', details: 'Decentralized node distribution and edge execution.', icon: Network, coords: { x: 20, y: 70 } },
    { id: 'storage', label: 'VECTOR_VAULT', details: 'High-dimensional semantic vector storage and retrieval.', icon: Database, coords: { x: 80, y: 70 } }
]

const LOG_MESSAGES = [
    "[SYSTEM] Mounting encryption volumes...",
    "[NETWORK] Handshake established with node-774-PHI",
    "[CORE] Loading weight tensors into VRAM...",
    "[SECURITY] Verifying zero-knowledge proofs...",
    "[READY] Global environment synchronized."
]

// --- Components ---

function LiveLogs() {
    const [logs, setLogs] = useState<string[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString('en-GB', { hour12: false })
            const randomLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]
            setLogs(prev => [...prev.slice(-15), `[${time}] ${randomLog}`])
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden p-4 font-mono text-[10px] space-y-1">
            {logs.map((log, i) => (
                <div key={i} className="whitespace-nowrap">{log}</div>
            ))}
        </div>
    )
}

function HudModule({ title, icon: Icon, children, className = "" }: { title: string, icon: any, children: React.ReactNode, className?: string }) {
    return (
        <div className={`p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <Icon size={14} className="text-cream/50" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{title}</span>
            </div>
            {children}
        </div>
    )
}

function NexusNodes({ activeId, onNodeClick }: { activeId: string, onNodeClick: (node: SystemNode) => void }) {
    return (
        <div className="relative w-full aspect-square md:aspect-video mb-12 border border-white/5 rounded-3xl bg-[#030303] overflow-hidden group">
            {/* Circuit Background */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Connecting Lines */}
                {SYSTEM_NODES.map((node, i) => (
                    node.id !== 'core' && (
                        <motion.line
                            key={`line-${node.id}`}
                            x1="50%" y1="50%"
                            x2={`${node.coords.x}%`} y2={`${node.coords.y}%`}
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-cream/20"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                        />
                    )
                ))}
            </svg>

            {/* Interactive Points */}
            <div className="absolute inset-0">
                {SYSTEM_NODES.map((node) => (
                    <motion.button
                        key={node.id}
                        onClick={() => onNodeClick(node)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 p-4 rounded-full border transition-all duration-500 group/node
                            ${activeId === node.id
                                ? 'bg-cream text-black border-cream shadow-[0_0_30px_rgba(238,227,203,0.4)]'
                                : 'bg-white/5 text-white/40 border-white/10 hover:border-cream/40 hover:text-cream'}`}
                        style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <node.icon size={20} strokeWidth={1.5} />
                        <span className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest transition-opacity
                            ${activeId === node.id ? 'opacity-100' : 'opacity-40 group-hover/node:opacity-100'}`}>
                            {node.label}
                        </span>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

export default function Innovation() {
    const [selectedNode, setSelectedNode] = useState<SystemNode>(SYSTEM_NODES[0])
    const [isDecrypted, setIsDecrypted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => setIsDecrypted(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section
            id="innovation"
            ref={containerRef}
            className="relative min-h-screen w-full bg-black py-32 overflow-hidden selection:bg-cream/30"
        >
            <LiveLogs />

            <div className="container relative z-10 mx-auto px-6">
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
