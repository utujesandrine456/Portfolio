'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: "ZERO",
    subtitle: "E-Commerce Platform",
    description: "A complete online shopping solution with Inventory management, payment processing, and analytics.",
    image: "/ZERO.png",
    category: "E-Commerce",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://zero-pink.vercel.app/",
    githubUrl: "https://github.com/utujesandrine456/ZERO"
  },
  {
    id: 2,
    title: "TradeWise",
    subtitle: "Trading & Finance",
    description: "A comprehensive trading platform with real-time market data, portfolio management, and advanced analytics.",
    image: "/TradeWise_overview.png",
    category: "Trading & Finance",
    technologies: ["React.js", "Nest.js", "Prisma"],
    liveUrl: "https://tradewise-cyan.vercel.app/",
    githubUrl: "https://github.com/utujesandrine456/TradeWise"
  },
  {
    id: 3,
    title: "Lumina",
    subtitle: "Agriculture & Transport",
    description: "A transport solution for booking rides, tracking drivers, and secure payments.",
    image: "/Lumina.png",
    category: "Transport",
    technologies: ["React Native", "Express.js"],
    liveUrl: "https://tradewise-cyan.vercel.app/",
    githubUrl: "https://github.com/utujesandrine456/Lumina"
  },
  {
    id: 4,
    title: "Aroena",
    subtitle: "Hotel Management System",
    description: "A smart food management system to reduce waste and suggest recipes.",
    image: "/Aroena.png",
    category: "Health & Wellness",
    technologies: ["Vue.js", "Node.js", "MongoDB"],
    liveUrl: "https://tradewise-cyan.vercel.app/",
    githubUrl: "https://github.com/utujesandrine456/Aroena"
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-black pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-cream mb-2">Selected Works</h2>
          <p className="text-white/50 text-lg">A gallery of digital craftsmanship.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Sticky Image Display */}
          <div className="relative lg:sticky lg:top-32 h-[500px] lg:h-[600px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900 group">
              <Image
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-700 pointer-events-none" />

              {/* Floating Label */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl">
                <p className="text-xs text-cream uppercase tracking-widest mb-1">{projects[activeProject].category}</p>
                <h3 className="text-2xl font-bold">{projects[activeProject].title}</h3>
              </div>
            </div>
          </div>

          {/* Right: Scrollable Project List */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={index}
                isActive={activeProject === index}
                onActivate={() => setActiveProject(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectItem({ project, index, isActive, onActivate }: {
  project: any,
  index: number,
  isActive: boolean,
  onActivate: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" })

  // Trigger activation when in view
  useEffect(() => {
    if (inView && !isActive) {
      onActivate()
    }
  }, [inView, isActive, onActivate])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${isActive
        ? 'bg-white/5 border-cream/30 shadow-[0_0_30px_rgba(218,197,167,0.15)]'
        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
        }`}
      onClick={onActivate}
    >
      {/* Number Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-black border border-cream/20 flex items-center justify-center">
        <span className="text-cream font-bold">0{index + 1}</span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-cream uppercase tracking-widest mb-2">{project.category}</p>
          <h3 className="text-3xl font-bold mb-1">{project.title}</h3>
          <p className="text-white/50 text-sm">{project.subtitle}</p>
        </div>

        <p className="text-white/70 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cream/30 rounded-lg transition-all duration-300 text-sm"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-cream text-black hover:bg-cream/90 rounded-lg transition-all duration-300 text-sm font-medium"
          >
            <span>Live Demo</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
