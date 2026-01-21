'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
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
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
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
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
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
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
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
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Health & Wellness",
    technologies: ["Vue.js", "Node.js", "MongoDB"],
    liveUrl: "https://tradewise-cyan.vercel.app/",
    githubUrl: "https://github.com/utujesandrine456/Aroena"
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

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
          {/* Left: Featured Visual */}
          <div className="relative lg:sticky lg:top-28 h-[480px] lg:h-[560px]">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 via-black to-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] text-left group focus:outline-none focus:ring-2 focus:ring-cream/40"
              aria-label={`Open ${projects[activeProject].title} video preview`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(218,197,167,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(218,197,167,0.05),transparent_40%)] pointer-events-none" />
              <div className="absolute inset-0 p-8 md:p-12">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-cream/20 transition-colors duration-500">
                  <Image
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    fill
                    className="object-contain p-6 md:p-10 opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
              <div className="absolute top-6 right-6 md:top-8 md:right-8 px-3 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-xs text-white/80 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Click to watch
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/65 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <p className="text-[11px] text-cream uppercase tracking-[0.3em] mb-1">{projects[activeProject].category}</p>
                <h3 className="text-2xl font-bold leading-tight">{projects[activeProject].title}</h3>
              </div>
            </button>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={index}
                isActive={activeProject === index}
                onActivate={() => setActiveProject(index)}
                onOpenVideo={() => {
                  setActiveProject(index)
                  setIsVideoOpen(true)
                }}
              />
            ))}
          </div>
        </div>
      </div>


      <ProjectVideoModal
        open={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={projects[activeProject].title}
        subtitle={projects[activeProject].subtitle}
        videoUrl={projects[activeProject].videoUrl}
      />
    </section>
  )
}

function ProjectItem({ project, index, isActive, onActivate, onOpenVideo }: {
  project: any;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onOpenVideo: () => void;
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" })

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
        ? 'bg-white/[0.06] border-cream/30 shadow-[0_20px_60px_rgba(218,197,167,0.15)]'
        : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
        }`}
      onClick={onActivate}
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-black border border-cream/30 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
        <span className="text-cream font-bold">0{index + 1}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-start">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenVideo()
          }}
          className="relative w-full h-[120px] md:h-[140px] rounded-xl overflow-hidden border border-white/10 bg-black/40 focus:outline-none focus:ring-2 focus:ring-cream/40"
          aria-label={`Open ${project.title} video preview`}
        >
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 100vw, 160px"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 border border-white/10 text-[11px] text-white/80">
            Video
          </div>
        </button>

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
      </div>
    </motion.div>
  )
}

function ProjectVideoModal({
  open,
  onClose,
  title,
  subtitle,
  videoUrl,
}: {
  open: boolean
  onClose: () => void
  title: string
  subtitle: string
  videoUrl: string
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence >
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-5xl max-h-[calc(100vh-60px)] rounded-3xl border border-white/10 bg-black/80 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="px-6 md:px-8 py-4 border-b border-white/10 flex items-center justify-between gap-6">
              <div>
                <p className="text-[11px] text-cream uppercase tracking-[0.3em]">{subtitle}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/80"
              >
                Close
              </button>
            </div>

            <div className="p-4 md:p-10">
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(218,197,167,0.15),transparent_45%)] pointer-events-none z-10" />
                <div className="relative w-full aspect-video z-0">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={videoUrl}
                    title={`${title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-white/40 italic">
                  Project demonstration & walkthrough
                </p>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-cream animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
