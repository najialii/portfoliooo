'use client'
import { FaWhatsapp } from 'react-icons/fa'

interface FooterSectionProps {
  t: any
  theme: string
}

export default function FooterSection({ t, theme }: FooterSectionProps) {
  const isDark = theme === 'dark'

  return (
    <>
      <footer className={`py-8 px-6 border-t ${isDark ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
        <div className={`max-w-[980px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>
          <p>{t.footer.rights}</p>
          <p className="mt-2 md:mt-0">{t.footer.education}</p>
        </div>
      </footer>

      <a
        href="https://wa.me/251933955241"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all z-50 flex items-center justify-center group"
        aria-label={t.contact.whatsappTooltip}
      >
        <FaWhatsapp className="text-3xl" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {t.contact.whatsappTooltip}
        </span>
      </a>
    </>
  )
}
