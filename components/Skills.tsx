'use client'

import { motion, useMotionValue, animate, useInView } from 'framer-motion'
import { useState, MouseEvent, useEffect, useRef } from 'react'
import {
  Code2, Server, Database, Layout,
  Shield, Lock, Globe, Key,
  PenTool, Box, Terminal,
  Atom, Smartphone, Container, GitBranch, Cloud
} from 'lucide-react'

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend & Mobile',
    skills: [
      { name: 'React', icon: Atom, level: 95 },
      { name: 'TypeScript', icon: Terminal, level: 92 },
      { name: 'Next.js', icon: Code2, level: 90 },
      { name: 'React Native', icon: Smartphone, level: 88 },
      { name: 'Flutter', icon: Layout, level: 85 },
      { name: 'Figma', icon: PenTool, level: 90 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & DB',
    skills: [
      { name: 'Node.js', icon: Server, level: 90 },
      { name: 'Express', icon: Globe, level: 88 },
      { name: 'NestJS', icon: Box, level: 85 },
      { name: 'REST APIs', icon: Cloud, level: 92 },
      { name: 'PostgreSQL', icon: Database, level: 85 },
      { name: 'MongoDB', icon: Database, level: 82 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skills: [
      { name: 'Docker', icon: Container, level: 80 },
      { name: 'Git Control', icon: GitBranch, level: 95 },
      { name: 'Linux', icon: Terminal, level: 85 },
    ],
  },
  {
    id: 'security',
    label: 'Cyber Security',
    skills: [
      { name: 'Pentration Testing', icon: Shield, level: 88 },
      { name: 'SOC Analysis', icon: Lock, level: 85 },
      { name: 'System Hardening', icon: Key, level: 82 },
    ],
  },
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <section id="skills" className="pt-32 bg-black text-white relative overflow-hidden group" onMouseMove={handleMouseMove}>

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cream/20 rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              opacity: 0.2
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-6 text-cream inline-block relative">
            Technical Expertise
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-cream/50 rounded-full"></span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            Mastering the tools of the trade to build secure, scalable, and beautiful digital experiences.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20 border-b border-white/5 pb-6">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className="relative pb-2 text-lg md:text-xl font-medium transition-colors"
            >
              <span className={activeTab === category.id ? 'text-cream' : 'text-white/40 hover:text-white/80'}>
                {category.label}
              </span>
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cream"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12 max-w-[1400px] mx-auto place-items-center"
          >
            {skillCategories
              .find(c => c.id === activeTab)
              ?.skills.map((skill, index) => (
                <SkillOrb
                  key={`${activeTab}-${index}`}
                  skill={skill}
                  index={index}
                />
              ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

function SkillOrb({ skill, index }: { skill: any, index: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, skill.level, {
        duration: 1.5,
        onUpdate: (value) => setCount(Math.floor(value)),
        ease: "easeOut"
      })
      return controls.stop
    }
  }, [isInView, skill.level])

  // Orb Radius
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (count / 100) * circumference

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col items-center justify-center gap-4"
    >
      {/* 1. The Floating Orb */}
      <div className="relative w-32 h-32 flex items-center justify-center">

        {/* Glass Background Orb */}
        <div className="absolute inset-0 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/5 group-hover:bg-cream/[0.05] group-hover:border-cream/30 transition-all duration-500 shadow-2xl" />

        {/* Rotating Dynamic Border (Progress) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(218,197,167,0.3)]">
          <circle
            cx="50%" cy="50%" r={radius}
            stroke="currentColor" strokeWidth="1" fill="transparent"
            className="text-white/5"
          />
          <circle
            cx="50%" cy="50%" r={radius}
            stroke="currentColor" strokeWidth="2" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-cream transition-all duration-100"
          />
        </svg>

        {/* Icon */}
        <div className="relative z-10 text-white/50 group-hover:text-cream group-hover:scale-110 transition-all duration-500">
          <skill.icon size={36} strokeWidth={1.5} />
        </div>

        {/* Percentage (Floating inside or just subtle) */}
        <div className="absolute -bottom-2 bg-black px-2 py-0.5 rounded-full border border-white/10 text-xs font-mono text-cream/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {count}%
        </div>
      </div>

      {/* 2. Text (Floating Below) */}
      <span className="text-lg font-medium text-white/60 tracking-wide group-hover:text-cream transition-colors duration-300 text-center">
        {skill.name}
      </span>

    </motion.div>
  )
}
