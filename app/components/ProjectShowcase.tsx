'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'

interface Project {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

interface ProjectShowcaseProps {
  projects: Project[]
  theme: string
}

export default function ProjectShowcase({ projects, theme }: ProjectShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = projects.length - 1
      if (nextIndex >= projects.length) nextIndex = 0
      return nextIndex
    })
  }, [projects.length])

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000)
    return () => clearInterval(timer)
  }, [paginate])

  const isDark = theme === 'dark'

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Ambient Background Glow */}
      <div className={`absolute -inset-4 blur-[100px] opacity-20 transition-colors duration-1000 ${isDark ? 'bg-emerald-500' : 'bg-emerald-300'}`} />

      <div 
        className={`relative w-full rounded-[2.5rem] overflow-hidden border backdrop-blur-xl shadow-2xl transition-colors duration-500 cursor-pointer md:cursor-default ${
          isDark 
            ? 'bg-slate-950/80 border-white/10 shadow-emerald-500/5' 
            : 'bg-white/80 border-slate-200 shadow-slate-900/10'
        }`}
        onClick={() => window.innerWidth < 768 && paginate(1)}
      >
        <div className="grid md:grid-cols-2 gap-0 min-h-[550px]">
          
          <div className="relative group h-[300px] md:h-auto w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${isDark ? 'from-black/60' : 'from-black/40'} via-transparent to-transparent`} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-8 md:p-16 flex flex-col justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="h-[1px] w-8 bg-emerald-500" />
                  <span className="text-emerald-500 font-bold tracking-[0.2em] text-xs uppercase">Featured Project</span>
                </motion.div>

                <h3 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {projects[currentIndex].title}
                </h3>
                
                <p className={`text-lg mb-8 leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {projects[currentIndex].description}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {projects[currentIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isDark
                          ? 'bg-white/5 text-white/70 border border-white/10'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={projects[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-bold transition-all hover:gap-5 active:scale-95 shadow-xl shadow-emerald-500/20"
                >
                  Explore Work
                  <FiArrowRight className="text-xl transition-transform group-hover:rotate-[-45deg]" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 items-center gap-4 z-20">
          <button
            onClick={() => paginate(-1)}
            className={`p-3 md:p-4 rounded-2xl border transition-all active:scale-90 shadow-lg ${
              isDark 
                ? 'bg-slate-900/50 border-white/10 text-white hover:bg-emerald-500 hover:text-slate-950 shadow-black/20' 
                : 'bg-white/50 border-slate-200 text-slate-900 hover:bg-emerald-500 hover:text-white shadow-slate-900/10'
            } backdrop-blur-xl`}
          >
            <FiChevronLeft className="text-lg md:text-xl" />
          </button>
          
          <div className="flex gap-1.5">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-emerald-500 w-8'
                    : isDark ? 'bg-white/10 w-4' : 'bg-slate-300 w-4'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className={`p-3 md:p-4 rounded-2xl border transition-all active:scale-90 shadow-lg ${
              isDark 
                ? 'bg-slate-900/50 border-white/10 text-white hover:bg-emerald-500 hover:text-slate-950 shadow-black/20' 
                : 'bg-white/50 border-slate-200 text-slate-900 hover:bg-emerald-500 hover:text-white shadow-slate-900/10'
            } backdrop-blur-xl`}
          >
            <FiChevronRight className="text-lg md:text-xl" />
          </button>
        </div>
      </div>
    </div>
  )
}