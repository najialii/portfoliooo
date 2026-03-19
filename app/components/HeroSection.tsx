'use client'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiDownload } from 'react-icons/fi'

interface HeroSectionProps {
  t: any
  theme: string
}

export default function HeroSection({ t, theme }: HeroSectionProps) {
  const isDark = theme === 'dark'
  const textSecondary = isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-20 blur-[120px] rounded-full pointer-events-none ${isDark ? 'bg-blue-500/30' : 'bg-blue-400/20'}`} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1100px] mx-auto text-center z-10"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0071e3]/20 bg-[#0071e3]/5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071e3]"></span>
          </span>
          <span className={`text-[13px] font-bold tracking-widest uppercase text-[#0071e3]`}>
            {t.hero.location}
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-8 leading-[0.95] md:leading-[1.02]"
        >
          {t.hero.title} <br />
          <span className={`${textSecondary} inline-block`}>
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className={`max-w-3xl mx-auto text-xl md:text-3xl font-medium mb-12 leading-relaxed ${textSecondary}`}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a
            href="/Naji-Ali-Resume.pdf"
            download="Naji-Ali-Resume.pdf"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg bg-[#0071e3] text-white overflow-hidden shadow-2xl shadow-blue-500/20 transition-all active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            <FiDownload className="text-xl" />
            {t.hero.downloadCV}
          </motion.a>

          <motion.a
            href="#work"
            className={`group inline-flex items-center gap-2 text-xl font-semibold transition-colors ${isDark ? 'text-white hover:text-[#0071e3]' : 'text-black hover:text-[#0071e3]'}`}
          >
            {t.nav.solutions}
            <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Hero scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className={`w-[1px] h-16 bg-gradient-to-b from-[#0071e3] to-transparent`} />
      </motion.div>
    </section>
  )
}