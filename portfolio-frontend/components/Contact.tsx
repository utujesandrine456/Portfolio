'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    alert('Thank you for reaching out! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-cream">
              Ready To Transform Your Idea To Reality
            </h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed max-w-md">
              Have an idea? I can help you build it. Send me a message and let's create something extraordinary.
            </p>

            <div className="space-y-6">
              <ContactItem icon={Mail} title="Email" value="utujesandrine456@gmail.com" />
              <ContactItem icon={Phone} title="Phone" value="+250 785 805 869" />
              <ContactItem icon={MapPin} title="Location" value="Musanze, Rwanda" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group"
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-mono text-cream/70 uppercase tracking-wider ml-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cream/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono text-cream/70 uppercase tracking-wider ml-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cream/50 focus:bg-white/10 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono text-cream/70 uppercase tracking-wider ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cream/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-cream text-black font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(218,197,167,0.3)] hover:shadow-[0_0_40px_rgba(218,197,167,0.5)] disabled:opacity-70 disabled:cursor-not-allowed contact-btn"
                data-cursor="GO!"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send size={20} />}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon: Icon, title, value }: { icon: any, title: string, value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-6 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300 group cursor-default"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-cream group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-1">{title}</p>
        <p className="text-lg font-medium text-white group-hover:text-cream transition-colors">{value}</p>
      </div>
    </motion.div>
  )
}

