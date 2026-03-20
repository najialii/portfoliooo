'use client'
import { useState } from 'react'
import { useTheme } from './context/ThemeContext'
import { translations } from './lib/translations'
import CursorFollower from './components/CursorFollower'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import InfiniteProjectScroll from './components/InfiniteProjectScroll'
import TechStack from './components/TechStack'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'
import FooterSection from './components/FooterSection'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCode, FiLayers } from 'react-icons/fi'

export default function Portfolio() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const { theme, toggleTheme } = useTheme()
  const t = translations[lang]
  const isRTL = lang === 'ar'
  const isDark = theme === 'dark'

  const projects = [
    { title: t.projects.minimoon.title, description: t.projects.minimoon.desc, image: '/projects/minimnoon.png', link: 'https://minimoon.com', tags: ['Next.js', 'AWS', 'Redis', 'Payment Gateway'] },
    { title: t.projects.futurehome.title, description: t.projects.futurehome.desc, image: '/projects/futuerhomes.png', link: 'https://futurehomessa.com', tags: ['Next.js', 'Real Estate'] },
    { title: t.projects.futurehomedashboard.title, description: t.projects.futurehomedashboard.desc, image: '/projects/futuerhomedashboard.png', link: 'http://109.199.111.103/admin', tags: ['Laravel', 'CMS', 'Dashboard'] },
    { title: t.projects.wesaaltech.title, description: t.projects.wesaaltech.desc, image: '/projects/wesaaltech.png', link: 'https://wesaaltech.com', tags: ['Laravel', 'Authentication'] },
    { title: t.projects.mentorship.title, description: t.projects.mentorship.desc, image: '/projects/nafirportal.png', link: 'https://portal.nafir.net/', tags: ['Laravel', 'MySQL', 'RBAC'] },
  ]

  const githubRepos = [
    { title: '🇸🇩 Sudan Regions & Cities GeoJSON', desc: 'High-precision geospatial dataset covering 35,000+ settlements in Sudan.', tech: ['Python', 'GeoJSON', 'GIS'], link: 'https://github.com/najialii/Sudan-Regions-and-Cities-GeoJSON' },
    { title: '🔍 Baaeed Job Monitor', desc: 'Chrome extension for real-time job alerts on the Baaeed platform.', tech: ['JavaScript', 'Chrome API'], link: 'https://github.com/najialii/Baaeed-Job-Monitor' },
    { title: '🛍️ Bloomcart', desc: 'High-performance eCommerce solution with clean, minimalist design.', tech: ['Laravel', 'Filament', 'Tailwind'], link: 'https://github.com/najialii/Bloomcartsa' },
    { title: '🤝 Nafir Teaser', desc: 'Community-driven platform teaser with high-impact messaging.', tech: ['Next.js', 'Framer Motion'], link: 'https://github.com/najialii/nafirteaser' },
  ]

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-black text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'} selection:bg-blue-500/30 font-sans`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <CursorFollower />
      <Header lang={lang} theme={theme} toggleTheme={toggleTheme} setLang={setLang} t={t} />
      <HeroSection t={t} theme={theme} />

      {/* Projects */}
      <section id="work" className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="text-center mb-12 px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{t.projects.title}</h2>
          <p className={`text-xl ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>Featured work and case studies</p>
        </motion.div>
        <InfiniteProjectScroll projects={projects} theme={theme} isRTL={isRTL} />
      </section>

      <TechStack t={t} theme={theme} />
      <ExperienceSection t={t} theme={theme} />

      {/* <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              whileHover={{ scale: 1.02 }}
              className={`md:col-span-6 rounded-[28px] p-8 ${isDark ? 'bg-[#1d1d1f] border border-white/[0.03]' : 'bg-white border border-black/[0.03]'}`}
            >
              <div className="p-3 bg-orange-500/10 rounded-2xl w-fit mb-6">
                <FiCode className="text-2xl text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">{t.learning.title}</h2>
              <p className={`text-sm mb-4 ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>{t.learning.subtitle}</p>
              <h3 className="text-xl font-bold mb-2">{t.learning.springBoot.title}</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>{t.learning.springBoot.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {['Java', 'Spring Boot', 'Microservices'].map(tag => (
                  <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/5 text-[#86868b]' : 'bg-black/5 text-[#6e6e73]'}`}>{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`md:col-span-6 rounded-[28px] p-8 ${isDark ? 'bg-[#1d1d1f] border border-white/[0.03]' : 'bg-white border border-black/[0.03]'}`}
            >
              <div className="p-3 bg-purple-500/10 rounded-2xl w-fit mb-6">
                <FiLayers className="text-2xl text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">{t.hobby.title}</h2>
              <p className="text-xs font-semibold text-purple-500 mb-2">{t.hobby.project.subtitle}</p>
              <h3 className="text-xl font-bold mb-2">{t.hobby.project.title}</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>{t.hobby.project.desc}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                  {t.hobby.project.status}
                </span>
                {['Next.js', 'Laravel', 'MySQL'].map(tag => (
                  <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/5 text-[#86868b]' : 'bg-black/5 text-[#6e6e73]'}`}>{tag}</span>
                ))}
              </div>
            </motion.div>

            {githubRepos.map((repo, i) => (
              <motion.a
                key={i}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`md:col-span-6 rounded-[28px] p-8 group cursor-pointer ${isDark ? 'bg-[#1d1d1f] border border-white/[0.03]' : 'bg-white border border-black/[0.03]'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold tracking-tight">{repo.title}</h3>
                  <FiArrowUpRight className="text-lg opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <p className={`text-sm mb-4 ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>{repo.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {repo.tech.map(tag => (
                    <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/5 text-[#86868b]' : 'bg-black/5 text-[#6e6e73]'}`}>{tag}</span>
                  ))}
                </div>
              </motion.a>
            ))}

            <motion.a
              href="https://github.com/najialii"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-12 rounded-[28px] p-8 bg-[#0071e3] text-white flex items-center justify-between group cursor-pointer"
            >
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">View All on GitHub</h3>
                <p className="text-white/70 text-sm">More open source projects and experiments</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <FiArrowUpRight className="text-3xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.a>
          </div>
        </div>
      </section> */}

      <ContactSection t={t} theme={theme} />
      <FooterSection t={t} theme={theme} />
    </div>
  )
}
