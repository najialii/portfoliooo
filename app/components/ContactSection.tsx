'use client'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp, FaLanguage } from 'react-icons/fa'

interface ContactSectionProps {
  t: any
  theme: string
}

export default function ContactSection({ t, theme }: ContactSectionProps) {
  const isDark = theme === 'dark'
  
  const cardTheme = isDark 
    ? 'bg-[#1c1c1e] border-white/[0.05]' 
    : 'bg-[#f5f5f7] border-black/[0.03]'
    
  const textSecondary = isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'

  return (
    <section id="contact" className="py-32 px-6 overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8">
            {t.contact.title}
          </h2>
          <p className={`text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium ${textSecondary}`}>
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email Card */}
          <motion.a
            href="mailto:Najialii249@gmail.com"
            whileHover={{ y: -5 }}
            className={`group p-10 rounded-[40px] border flex flex-col justify-between h-[240px] transition-all duration-500 ${cardTheme}`}
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-[#0071e3] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0071e3]/20">
                <FiMail size={24} />
              </div>
              <FiArrowRight size={24} className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ${isDark ? 'text-white' : 'text-black'}`} />
            </div>
            <div>
              <p className={`text-sm font-bold uppercase tracking-[0.2em] mb-2 ${textSecondary}`}>Email Me</p>
              <h3 className="text-2xl font-semibold tracking-tight">Najialii249@gmail.com</h3>
            </div>
          </motion.a>

          {/* WhatsApp Card */}
          <motion.a
            href="https://wa.me/251933955241"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className={`group p-10 rounded-[40px] border flex flex-col justify-between h-[240px] transition-all duration-500 ${cardTheme}`}
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#25D366]/20">
                <FaWhatsapp size={24} />
              </div>
              <FiArrowRight size={24} className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ${isDark ? 'text-white' : 'text-black'}`} />
            </div>
            <div>
              <p className={`text-sm font-bold uppercase tracking-[0.2em] mb-2 ${textSecondary}`}>Let's Chat</p>
              <h3 className="text-2xl font-semibold tracking-tight">+251 933 955 241</h3>
            </div>
          </motion.a>
        </div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8 border-t ${isDark ? 'border-white/10' : 'border-black/5'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <FiMapPin className={isDark ? 'text-white' : 'text-black'} />
            </div>
            <span className={`text-base font-medium ${textSecondary}`}>{t.contact.location}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <FaLanguage className={isDark ? 'text-white' : 'text-black'} />
            </div>
            <span className={`text-base font-medium ${textSecondary}`}>{t.contact.languages}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}