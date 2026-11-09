'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, Github, Play, ChevronRight, FileText } from 'lucide-react'
import Image from 'next/image'

import { projects } from '@/constants/projects'
import ResearchPaperModal from './ResearchPaperModal'

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isPaperOpen, setIsPaperOpen] = useState(false)

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
          <div className="relative lg:sticky lg:top-28 h-[320px] lg:h-[440px]">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] text-left group focus:outline-none focus:ring-2 focus:ring-cream/40"
              aria-label={`Open ${projects[activeProject].title} video preview`}
            >
              <Image
                src={projects[activeProject].image}
                alt={projects[activeProject].title}
                fill
                className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-cream text-black flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-90 group-hover:scale-100 transition-all duration-500">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-6 right-6 md:top-8 md:right-8 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-[10px] text-cream font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Watch video
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/65 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <p className="text-[11px] text-cream uppercase tracking-[0.3em] mb-1">{projects[activeProject].category}</p>
                <h3 className="text-2xl font-bold leading-tight">{projects[activeProject].title}</h3>
              </div>
            </button>
          </div>

          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-8">
              {projects.slice(0, 3).map((project, index) => (
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
                  onOpenResearchPaper={() => {
                    setActiveProject(index)
                    setIsPaperOpen(true)
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="pt-8 flex justify-end"
            >
              <a
                href="/projects"
                className="group flex items-center gap-4 px-6 py-2 rounded-full border border-cream/30 hover:bg-cream hover:text-black transition-all duration-500 text-sm font-medium magnetic"
              >
                Explore All Projects
                <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>


      <ProjectVideoModal
        open={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={projects[activeProject].title}
        subtitle={projects[activeProject].subtitle}
        videoUrl={projects[activeProject].videoUrl}
        researchPaperUrl={projects[activeProject].researchPaperUrl}
        onOpenResearchPaper={() => {
          setIsVideoOpen(false)
          setIsPaperOpen(true)
        }}
      />

      <ResearchPaperModal
        open={isPaperOpen}
        onClose={() => setIsPaperOpen(false)}
        pdfUrl={projects[activeProject].researchPaperUrl || '/UWASE_UTUJE_Sandrine_TradeWise_AI_Research_Paper.pdf'}
        title={projects[activeProject].researchPaperTitle || 'TradeWise AI: An Event-Oriented Artificial Intelligence Framework for Predicting Irish Potato Price Changes in Rwanda'}
      />
    </section>
  )
}

function ProjectItem({ project, index, isActive, onActivate, onOpenVideo, onOpenResearchPaper }: {
  project: any;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onOpenVideo: () => void;
  onOpenResearchPaper: () => void;
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
      className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${isActive
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
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 160px"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-cream text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
              <Play size={18} fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] text-cream font-bold uppercase tracking-tight">
            Video
          </div>
        </button>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-cream uppercase tracking-widest mb-2">{project.category}</p>
            <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
            <p className="text-white/50 text-xs">{project.subtitle}</p>
          </div>

          <p className="text-white/70 text-xs leading-relaxed">{project.description}</p>

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

          <div className="flex flex-wrap gap-3 pt-3">
            {project.researchPaperUrl ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenResearchPaper()
                }}
                className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 bg-cream text-black hover:bg-[#ebd8c0] font-semibold rounded-sm text-xs tracking-wide shadow-[0_10px_25px_rgba(218,197,167,0.25)] hover:shadow-[0_15px_35px_rgba(218,197,167,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <FileText size={15} />
                <span>Explore More</span>
                <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              </button>
            ) : (
              <>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cream/30 rounded-sm transition-all duration-300 text-xs text-white"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 bg-cream text-black hover:bg-cream/90 rounded-sm transition-all duration-300 text-xs font-medium"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </>
            )}
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
  researchPaperUrl,
  onOpenResearchPaper,
}: {
  open: boolean
  onClose: () => void
  title: string
  subtitle: string
  videoUrl: string
  researchPaperUrl?: string
  onOpenResearchPaper?: () => void
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
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-[1fr_350px]">
              {/* Video Area */}
              <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-cream underline decoration-cream/30 decoration-2 underline-offset-8">
                      {title}
                    </h2>
                    <p className="text-white/40 text-sm mt-3">{subtitle}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 transition-all font-bold text-xs uppercase"
                  >
                    Close
                  </button>
                </div>

                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={videoUrl}
                    title={`${title} walkthrough`}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
              </div>

              {/* Details Area - Matching Portfolio Archive */}
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
                  {researchPaperUrl && onOpenResearchPaper && (
                    <button
                      type="button"
                      onClick={onOpenResearchPaper}
                      className="w-full py-3.5 rounded-2xl bg-cream/10 hover:bg-cream/20 border border-cream/30 text-cream font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-sm"
                    >
                      <FileText size={16} />
                      Preview Research Paper (PDF)
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="w-full py-4 rounded-2xl bg-cream text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all text-sm"
                  >
                    Back to Portfolio <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
