'use client'
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'

interface Project {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

interface InfiniteProjectScrollProps {
  projects: Project[]
  theme: string
}

export default function InfiniteProjectScroll({ projects, theme }: InfiniteProjectScrollProps) {
  const isDark = theme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  
  const baseVelocity = -0.5
  const baseX = useMotionValue(0)
  
  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2)
    }
  }, [projects])

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 16)
    baseX.set(baseX.get() + moveBy)

    if (contentWidth > 0) {
      if (baseX.get() <= -contentWidth) {
        baseX.set(0)
      }
    }
  })

  const x = useSpring(baseX, { stiffness: 400, damping: 90 })

  const cardTheme = isDark 
    ? 'bg-[#1c1c1e] border-white/[0.05] hover:bg-[#252527]' 
    : 'bg-[#f5f5f7] border-black/[0.03] hover:bg-white'
  
  const textSecondary = isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'

  return (
    <div className="w-full overflow-hidden py-12 relative">
      {/* Edge Gradient Masks for the Apple Look */}
      <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r ${isDark ? 'from-black' : 'from-white'} to-transparent`} />
      <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l ${isDark ? 'from-black' : 'from-white'} to-transparent`} />

      <motion.div 
        ref={containerRef}
        className="flex gap-6 whitespace-nowrap"
        style={{ x }}
      >
        {[...projects, ...projects].map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 w-[380px] md:w-[480px] rounded-[36px] overflow-hidden group border transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${cardTheme}`}
          >
            <div className="relative h-[240px] md:h-[280px] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              />
              <div className="absolute top-5 left-5 flex gap-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-black/20 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-semibold tracking-tight leading-tight">{project.title}</h3>
                <div className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10 group-hover:bg-white text-white group-hover:text-black' : 'bg-black/5 group-hover:bg-black text-black group-hover:text-white'}`}>
                  <FiArrowUpRight className="text-xl" />
                </div>
              </div>
              <p className={`text-base font-medium leading-relaxed mb-6 line-clamp-2 ${textSecondary}`}>
                {project.description}
              </p>
              
              <div className="flex gap-4">
                <span className="text-[11px] font-bold text-[#0071e3] uppercase tracking-widest">
                  View Project
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}