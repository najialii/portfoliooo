'use client'
import { motion } from 'framer-motion'

interface ExperienceSectionProps {
  t: any
  theme: string
}

export default function ExperienceSection({ t, theme }: ExperienceSectionProps) {
  const isDark = theme === 'dark'
  
  const jobs = [
    { ...t.experience.minimoon, delay: 0 },
    { ...t.experience.elmasa, delay: 0.1 },
    { ...t.experience.nafir, delay: 0.2 },
  ]

  const textMuted = isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 opacity-20 ${isDark ? 'bg-white' : 'bg-black'}`} />

          <div className="space-y-24">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                className={`relative flex flex-col md:flex-row items-start ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full -translate-x-1/2 z-10 border-4 ${
                  isDark ? 'bg-white border-black' : 'bg-black border-white'
                }`} />

                {/* Content Side */}
                <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${
                  i % 2 === 0 ? 'md:text-left' : 'md:text-right'
                }`}>
                  <span className={`text-[13px] font-bold tracking-[0.2em] uppercase mb-4 block ${textMuted}`}>
                    {job.date}
                  </span>
                  <h3 className="text-3xl font-semibold tracking-tight mb-2">
                    {job.role}
                  </h3>
                  <p className="text-[#0071e3] text-xl font-medium mb-6">
                    {job.company}
                  </p>
                  
                  <ul className={`space-y-4 ${i % 2 === 0 ? '' : 'md:flex md:flex-col md:items-end'}`}>
                    {job.points.map((point: string, j: number) => (
                      <li key={j} className={`flex items-start gap-3 text-lg leading-relaxed font-medium ${textMuted} ${
                        i % 2 === 0 ? '' : 'md:flex-row-reverse md:text-right'
                      }`}>
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#0071e3] shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Empty Side for Spacing */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}