'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface InfiniteSliderProps {
  images: { src: string; alt: string; link?: string }[]
  theme: string
}

export default function InfiniteSlider({ images, theme }: InfiniteSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollAmount += scrollSpeed
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount
        
        // Reset when reaching halfway (since we duplicate items)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0
        }
      }
    }

    const intervalId = setInterval(scroll, 20)

    return () => clearInterval(intervalId)
  }, [])

  // Duplicate images for infinite effect
  const duplicatedImages = [...images, ...images]

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[250px] rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-slate-800/50 border-white/5' : 'bg-slate-100 border-slate-200'
            } border hover:scale-105 transition-transform cursor-pointer group`}
            whileHover={{ scale: 1.05 }}
          >
            {image.link ? (
              <a href={image.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </a>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
