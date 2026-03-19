'use client'
import { useState, useEffect } from 'react'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  lang: 'en' | 'ar'
  theme: string
  toggleTheme: () => void
  setLang: (lang: 'en' | 'ar') => void
  t: any
}

export default function Header({ lang, theme, toggleTheme, setLang, t }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isOpen])

  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-[20px] transition-all duration-500 border-b ${
        isDark ? 'bg-[#000000]/70 border-white/[0.08]' : 'bg-[#ffffff]/80 border-black/[0.08]'
      }`}>
        <div className="max-w-[1024px] mx-auto h-[48px] flex justify-between items-center px-6">
          <span className="font-semibold tracking-tight text-[19px] z-[101]">Naji Ali</span>
          
          <div className="hidden md:flex items-center gap-8 text-[12px] font-medium tracking-wide uppercase">
            <a href="#work" className="opacity-60 hover:opacity-100 transition-opacity">{t.nav.solutions}</a>
            <a href="#tech" className="opacity-60 hover:opacity-100 transition-opacity">{t.nav.techStack}</a>
            <a href="/playground" className="opacity-60 hover:opacity-100 transition-opacity">{t.nav.playground}</a>
            <div className={`h-3 w-[1px] ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="opacity-60 hover:opacity-100 font-bold w-6">
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button onClick={toggleTheme} className={`p-1.5 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
              {isDark ? <FiSun className="text-[18px]" /> : <FiMoon className="text-[18px]" />}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-4 z-[101]">
            <button onClick={toggleTheme} className="p-2">
              {isDark ? <FiSun /> : <FiMoon />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl p-1">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[99] md:hidden backdrop-blur-3xl ${isDark ? 'bg-black/95' : 'bg-white/95'}`}
          >
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-start justify-center h-full px-12 gap-8"
            >
              {[
                { name: t.nav.solutions, href: "#work" },
                { name: t.nav.techStack, href: "#tech" },
                { name: t.nav.playground, href: "/playground" }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={itemVariants}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                variants={itemVariants}
                onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setIsOpen(false); }}
                className={`text-xl font-bold py-2 px-6 rounded-full border ${isDark ? 'border-white/10' : 'border-black/10'}`}
              >
                {lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}