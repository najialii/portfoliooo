'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi'

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

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = projects.length - 1
      if (nextIndex >= projects.length) nextIndex = 0
      return nextIndex
    })
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex])

  return (
    <div className="relative w-full">
      <div className={`relative w-full rounded-3xl overflow-hidden ${theme === 'dark' ? 'bg-slate-900/50 border-white/5' : 'bg-slate-50 border-slate-200'} border shadow-2xl`}>
        <div className="grid md:grid-cols-2 gap-0 min-h-[400px] md:min-h-[500px]">
          {/* Image Section */}
          <div className="relative h-64 md:h-auto w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentIndex}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-full h-full"
              >
                <Image
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {projects[currentIndex].title}
                </h3>
                
                <p className={`text-base md:text-lg mb-6 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {projects[currentIndex].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[currentIndex].tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'dark'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <a
                  href={projects[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg w-fit"
                >
                  View Project
                  <FiExternalLink className="text-lg" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full ${
            theme === 'dark' ? 'bg-black/70 hover:bg-black/90' : 'bg-white/70 hover:bg-white/90'
          } backdrop-blur-md transition-all z-10 hover:scale-110 shadow-lg`}
          aria-label="Previous project"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={() => paginate(1)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full ${
            theme === 'dark' ? 'bg-black/70 hover:bg-black/90' : 'bg-white/70 hover:bg-white/90'
          } backdrop-blur-md transition-all z-10 hover:scale-110 shadow-lg`}
          aria-label="Next project"
        >
          <FiChevronRight className="text-2xl" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-emerald-400 w-8'
                  : theme === 'dark'
                  ? 'bg-white/30 hover:bg-white/50 w-2'
                  : 'bg-black/30 hover:bg-black/50 w-2'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
