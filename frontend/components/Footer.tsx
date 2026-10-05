'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black text-white py-8 overflow-hidden border-t border-white/5">

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center mb-8"
          >
            <h1 className="text-[10vw] leading-[0.8] font-black text-cream/40 select-none pointer-events-none">
              UWASE UTUJE SANDRINE
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-8 mb-12"
          >
            <SocialLink href="https://www.linkedin.com/in/uwase-utuje-sandrine-5842b8386/" icon={Linkedin} />
            <SocialLink href="https://github.com/utujesandrine456" icon={Github} />
            <SocialLink href="mailto:utujesandrine456@gmail.com" icon={Mail} />
            <SocialLink href="https://instagram.com/utuje_001" icon={Instagram} />
          </motion.div>

          <p className="text-white/30 text-sm font-mono tracking-widest mb-8">
            © {currentYear} Sandrine. All Right Reserved.
          </p>          
        </div>
      </div>
    </footer>
  )
}


function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <a
      href={href}
      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-black hover:bg-cream hover:border-cream hover:scale-110 transition-all duration-300"
    >
      <Icon size={20} />
    </a>
  )
}

