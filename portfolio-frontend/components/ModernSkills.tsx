'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
    Code2, Server, Database, Layout,
    Shield, Lock, Globe, Key,
    PenTool, Box, Terminal,
    Atom, Smartphone, Container, GitBranch, Cloud, Layers,
} from 'lucide-react'
import { FaJava } from "react-icons/fa"

const skillCategories = [
    {
        id: 'frontend',
        label: 'Frontend',
        skills: [
            { name: 'React', icon: Atom, level: 95, color: '#61DAFB' },
            { name: 'TypeScript', icon: Terminal, level: 92, color: '#3178C6' },
            { name: 'Next.js', icon: Code2, level: 90, color: '#FFFFFF' },
            { name: 'Angular', icon: Layers, level: 82, color: '#DD0031' },
            { name: 'React Native', icon: Smartphone, level: 88, color: '#61DAFB' },
            { name: 'Flutter', icon: Layout, level: 85, color: '#02569B' },
            { name: 'Figma', icon: PenTool, level: 90, color: '#F24E1E' },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        skills: [
            { name: 'Node.js', icon: Server, level: 90, color: '#339933' },
            { name: 'Express', icon: Globe, level: 88, color: '#FFFFFF' },
            { name: 'NestJS', icon: Box, level: 85, color: '#E0234E' },
            { name: 'Java', icon: FaJava, level: 82, color: '#007396' },
            { name: 'REST APIs', icon: Cloud, level: 92, color: '#00A8E1' },
            { name: 'PostgreSQL', icon: Database, level: 85, color: '#4169E1' },
            { name: 'MongoDB', icon: Database, level: 82, color: '#47A248' },
        ],
    },
    {
        id: 'devops',
        label: 'Architecture',
        skills: [
            { name: 'Docker', icon: Container, level: 80, color: '#2496ED' },
            { name: 'Git', icon: GitBranch, level: 95, color: '#F05032' },
            { name: 'Linux', icon: Terminal, level: 85, color: '#FCC624' },
        ],
    },
    {
        id: 'security',
        label: 'Security',
        skills: [
            { name: 'Pentesting', icon: Shield, level: 88, color: '#CC0000' },
            { name: 'SOC Analyst', icon: Lock, level: 85, color: '#007ACC' },
            { name: 'Hardening', icon: Key, level: 82, color: '#FFD700' },
        ],
    },
]

export default function ModernSkills() {
    const [activeTab, setActiveTab] = useState('frontend')

    return (
        <section id="skills" className="py-32 bg-dark text-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cream/5 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-cream/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
                        Technical <span className="text-cream italic">Skills</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Crafting high-performance digital solutions with a focus on modern architectures, security, and exceptional user experiences.
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {skillCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className="relative px-8 py-3 rounded-md text-sm font-medium transition-all duration-300 group"
                        >
                            <span className={`relative z-10 transition-colors duration-300 ${activeTab === category.id ? 'text-dark' : 'text-white/60 group-hover:text-white'}`}>
                                {category.label}
                            </span>
                            {activeTab === category.id && (
                                <motion.div
                                    layoutId="activeTabBg"
                                    className="absolute inset-0 bg-cream rounded-md"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            {activeTab !== category.id && (
                                <div className="absolute inset-0 border border-white/10 rounded-md group-hover:border-white/30 transition-colors" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {skillCategories
                            .find(c => c.id === activeTab)
                            ?.skills.map((skill, index) => (
                                <SkillCard
                                    key={`${activeTab}-${skill.name}`}
                                    skill={skill}
                                    index={index}
                                />
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

function SkillCard({ skill, index }: { skill: any, index: number }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
            }}
            className="group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "1000px",
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-48 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-3xl p-8 transition-colors duration-500 group-hover:bg-white/[0.06] group-hover:border-white/10 flex flex-col justify-between overflow-hidden"
            >
                {/* Glow Effect */}
                <div
                    className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), ${skill.color}15, transparent 40%)`
                    }}
                />

                <div className="relative z-10 flex items-start justify-between">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors duration-500 ring-1 ring-white/10 group-hover:ring-white/20">
                        <skill.icon size={28} className="text-cream" />
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-bold text-white/90 group-hover:text-white transition-colors">
                            {skill.level}%
                        </span>
                        <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium mt-1">Mastery</div>
                    </div>
                </div>

                <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white/80 group-hover:text-white transition-colors mb-4">
                        {skill.name}
                    </h3>

                    {/* Progress Bar Container */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-cream rounded-full"
                            style={{
                                boxShadow: `0 0 15px ${skill.color}50`
                            }}
                        />
                    </div>
                </div>

                {/* Decorative Background Icon */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                    <skill.icon size={120} />
                </div>
            </motion.div>
        </motion.div>
    )
}
