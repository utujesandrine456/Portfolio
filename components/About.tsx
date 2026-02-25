'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-8 bg-black text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-cream/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-cream/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cream mb-8 inline-block relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-20 after:h-1 after:bg-cream">
              About Me
            </h2>

            <div className="space-y-8 text-xl leading-loose text-white/80 font-light">
              <p>
                I am a <span className="text-cream font-normal">Software Developer</span> currently studying at Rwanda Coding Academy with a passion for building scalable, high-performance applications. I focus on clean, maintainable code and designing systems that are both functional and secure.
              </p>

              <p>
                As a cybersecurity enthusiast, I specialize in <span className="text-cream font-normal">Penetration Testing</span> and <span className="text-cream font-normal">SOC Analysis</span> to ensure the software and systems I build remain safe from threats. I combine development and security practices to deliver reliable, end-to-end solutions.
              </p>

              <p>
                I grab every <span className="text-cream font-normal">Opportunity</span> to create, innovate, and protect the digital products I work on, turning complex ideas into software that works seamlessly and securely.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-sm relative group"
          >
            <div className="relative p-4">
              <div className="absolute inset-0 border border-cream/20 rounded-full scale-[1.1] rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 border border-cream/10 rounded-full scale-[1.2] -rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100" />

              <div className="relative z-10 mx-auto aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a] project-card" data-cursor="ABOUT ME">
                <div className="absolute inset-0 border border-cream/20 z-20 rounded-2xl transition-all duration-500 group-hover:border-cream/40" />
                <Image
                  src="/SandrineWhite.jpg"
                  alt="Sandrine - Software Developer"
                  fill
                  className="object-cover object-center grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-cream/30 rounded-br-3xl -z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-cream/30 rounded-tl-3xl -z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

