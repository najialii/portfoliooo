'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

export default function AppleCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Storage for the target button's dimensions
  const [targetDim, setTargetDim] = useState({ w: 12, h: 12, r: 99 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // High-performance spring physics
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const closestAction = target.closest('a, button, [role="button"]')

    if (closestAction) {
      const rect = closestAction.getBoundingClientRect()
      // Center the cursor exactly in the middle of the button
      mouseX.set(rect.left + rect.width / 2)
      mouseY.set(rect.top + rect.height / 2)
    } else {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    if (!isVisible) setIsVisible(true)
  }, [mouseX, mouseY, isVisible])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const closestAction = target.closest('a, button, [role="button"]')
      const closestProjectCard = target.closest('.group')

      if (closestAction) {
        setCursorType('pointer')
        const rect = closestAction.getBoundingClientRect()
        // Capture exact size and approximate border radius
        setTargetDim({ 
          w: rect.width + 8, // slight padding for "absorption" look
          h: rect.height + 8, 
          r: 12 
        })
      } else if (closestProjectCard) {
        setCursorType('view')
        setTargetDim({ w: 100, h: 40, r: 20 })
      } else {
        setCursorType('default')
        setTargetDim({ w: 12, h: 12, r: 99 })
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseenter', () => setIsVisible(true))
    document.addEventListener('mouseleave', () => setIsVisible(false))

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('resize', checkMobile)
    }
  }, [updateMousePosition])

  if (isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            animate={{
              width: targetDim.w,
              height: targetDim.h,
              borderRadius: targetDim.r,
              // Background becomes semi-transparent white
              // mix-blend-difference creates the "reverse color" effect on text
              backgroundColor: cursorType === 'default' ? '#fff' : 'rgba(255, 255, 255, 0.2)',
            }}
            transition={{ 
              type: 'spring', 
              bounce: 0.2, 
              duration: 0.4 
            }}
            className="flex items-center justify-center backdrop-blur-[2px] mix-blend-difference"
          >
            {cursorType === 'view' && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] font-bold tracking-[0.2em] text-white uppercase"
              >
                VIEW
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}