  'use client'

  import { motion } from 'framer-motion'
  import Image from 'next/image'
  import { FiArrowUpRight } from 'react-icons/fi'

  interface Project {
    title: string
    description: string
    image: string
    link: string
    tags: string[]
  }

  interface AppleSliderProps {
    projects: Project[]
    theme: string
  }

  export default function AppleSlider({ projects, theme }: AppleSliderProps) {
    const isDark = theme === 'dark'

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    }

    const cardVariants = {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1, 
        x: 0,
        transition: { type: 'spring' as const, stiffness: 70, damping: 20 }
      }
    }

    const cardStyle = isDark 
      ? 'bg-[#1d1d1f] border border-[#424245]' 
      : 'bg-[#f5f5f7] border border-[#d2d2d7]'

    const textSecondary = isDark ? 'text-[#a1a1a6]' : 'text-[#6e6e73]'

    return (
      <div className="w-full py-12 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-6 overflow-x-auto pb-12 px-[max(2rem,calc((100vw-1200px)/2))] scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`flex-shrink-0 w-[85vw] md:w-[450px] rounded-[32px] overflow-hidden snap-start transition-all duration-500 ease-out cursor-pointer ${cardStyle}`}
            >
              <div className="relative h-[280px] md:h-[320px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-black/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className={`mt-1 p-2 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                    <FiArrowUpRight />
                  </div>
                </div>
                <p className={`text-base font-medium line-clamp-2 leading-relaxed ${textSecondary}`}>
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    )
  }