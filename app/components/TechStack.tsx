'use client'
import { motion } from 'framer-motion'
import { FiCode, FiLayers, FiGlobe, FiSmartphone } from 'react-icons/fi'

interface TechStackProps {
  t: any
  theme: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring' as const, 
      stiffness: 60, 
      damping: 20,
      mass: 1
    } 
  }
}

export default function TechStack({ t, theme }: TechStackProps) {
  const isDark = theme === 'dark'
  
  const cardBase = `rounded-[32px] p-8 md:p-10 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] border shadow-sm`
  const cardTheme = isDark 
    ? 'bg-[#1d1d1f] border-white/[0.05] hover:bg-[#252527] shadow-black/20' 
    : 'bg-[#f5f5f7] border-black/[0.03] hover:bg-white shadow-black/5'
  
  const textSecondary = isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'

  return (
    <section id="tech" className="py-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="mb-20 text-left md:text-center"
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">{t.tech.title}</h2>
          <p className={`text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed ${textSecondary}`}>
            {t.tech.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Hero Bento Item */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -8 }}
            className="md:col-span-4 rounded-[32px] p-12 flex flex-col justify-center items-center bg-[#0071e3] text-white overflow-hidden relative group shadow-xl shadow-[#0071e3]/20"
          >
            <span className="text-8xl font-bold tracking-tighter z-10">3+</span>
            <span className="text-sm font-bold uppercase tracking-[0.3em] opacity-80 mt-4 z-10">
              {t.tech.yearsExp}
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -8 }}
            className={`md:col-span-8 ${cardBase} ${cardTheme}`}
          >
            <FiCode className="text-4xl mb-6 text-[#0071e3]" />
            <h3 className="text-3xl font-semibold mb-4 tracking-tight">{t.tech.frontend.title}</h3>
            <p className={`text-lg font-medium leading-relaxed ${textSecondary}`}>
              {t.tech.frontend.desc}
            </p>
          </motion.div>

          {/* Grid Layout */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -8 }}
            className={`md:col-span-6 ${cardBase} ${cardTheme}`}
          >
            <FiLayers className="text-3xl mb-6 text-[#0071e3]" />
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">{t.tech.backend.title}</h3>
            <p className={`text-base font-medium leading-relaxed ${textSecondary}`}>
              {t.tech.backend.desc}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -8 }}
            className={`md:col-span-6 ${cardBase} ${cardTheme}`}
          >
            <FiGlobe className="text-3xl mb-6 text-[#0071e3]" />
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">{t.tech.cloud.title}</h3>
            <p className={`text-base font-medium leading-relaxed ${textSecondary}`}>
              {t.tech.cloud.desc}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -8 }}
            className={`md:col-span-6 ${cardBase} ${cardTheme}`}
          >
            <FiSmartphone className="text-3xl mb-6 text-[#0071e3]" />
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">{t.tech.mobile.title}</h3>
            <p className={`text-base font-medium leading-relaxed ${textSecondary}`}>
              {t.tech.mobile.desc}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            whileHover={{ y: -8 }}
            className={`md:col-span-6 ${cardBase} ${cardTheme}`}
          >
            <FiCode className="text-3xl mb-6 text-[#0071e3]" />
            <h3 className="text-2xl font-semibold mb-3 tracking-tight">{t.tech.tools.title}</h3>
            <p className={`text-base font-medium leading-relaxed ${textSecondary}`}>
              {t.tech.tools.desc}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}