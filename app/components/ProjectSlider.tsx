'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface ProjectSliderProps {
  images: string[]
  projectName: string
  theme: string
}

export default function ProjectSlider({ images, projectName, theme }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${projectName} screenshot ${currentIndex + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
              theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/50 hover:bg-white/70'
            } backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={next}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
              theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/50 hover:bg-white/70'
            } backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <FiChevronRight className="text-xl" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-emerald-400 w-6'
                    : theme === 'dark'
                    ? 'bg-white/30 hover:bg-white/50'
                    : 'bg-black/30 hover:bg-black/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
