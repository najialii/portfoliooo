'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowUpRight, FiCode, FiLayers, FiGlobe, FiSmartphone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp, FaLanguage } from 'react-icons/fa'

const translations = {
  en: {
    nav: {
      solutions: 'Solutions',
      techStack: 'Tech Stack',
      playground: 'Playground',
      hireMe: 'Hire Me'
    },
    hero: {
      location: 'Based in Riyadh & Addis Ababa',
      title: 'Scale Your',
      titleHighlight: 'Vision.',
      subtitle: 'Specializing in high-performance eCommerce and B2B SaaS for the Middle Eastern market. I build the infrastructure that powers Saudi\'s next generation of digital leaders.',
      downloadCV: 'Download CV'
    },
    projects: {
      title: 'Strategic Solutions',
      minimoon: {
        badge: 'Featured Case Study',
        title: 'Minimoon eCommerce',
        desc: 'Next.js + Strapi platform optimized for Saudi payment gateways and high-concurrency vendor management.'
      },
      b2b: {
        title: 'B2B SaaS',
        desc: 'Role-based distribution platforms for the dairy industry in Cairo & Riyadh.'
      },
      mentorship: {
        title: 'Mentorship Platform',
        desc: 'Laravel-based platform with complex RBAC and automated scheduling for high-concurrency user interactions.'
      },
      dairy: {
        title: 'Dairy Distribution',
        desc: 'Mobile-first eCommerce platform streamlining B2B workflows for field sales teams.'
      }
    },
    tech: {
      title: 'Built for Performance',
      subtitle: 'Utilizing a modern stack to ensure 99.9% uptime and <1s load times.',
      yearsExp: 'Years Exp.',
      frontend: { title: 'Frontend', desc: 'React, Next.js, Tailwind' },
      backend: { title: 'Backend', desc: 'Node, Laravel, Strapi' },
      cloud: { title: 'Cloud', desc: 'AWS, Docker, CI/CD' },
      mobile: { title: 'Mobile', desc: 'React Native' }
    },
    experience: {
      title: 'Career Journey',
      minimoon: {
        date: 'Dec 2023 - Nov 2025',
        role: 'Full-Stack Developer',
        company: 'Minimoon Co Ltd, Algeria (Remote)',
        points: [
          'Engineered scalable eCommerce with Next.js + Strapi',
          'Integrated secure payment gateways for MENA region',
          'Managed AWS deployment pipelines (99.9% uptime)'
        ]
      },
      elmasa: {
        date: 'Jan 2022 - Aug 2024',
        role: 'Full-Stack Developer',
        company: 'Elmassri Co Ltd, Egypt/Cairo (Remote)',
        points: [
          'Built B2B dairy distribution platform with React.js',
          'Mobile-first responsive design for field sales teams'
        ]
      },
      nafir: {
        date: 'Dec 2022 - May 2023',
        role: 'Back-End Developer',
        company: 'Nafir CO.LTD, Khartoum, Sudan (Remote)',
        points: [
          'Architected mentorship platform with Laravel + RBAC',
          'Optimized database queries for high-concurrency'
        ]
      }
    },
    contact: {
      title: 'Let\'s Build Together',
      subtitle: 'Available for freelance projects and full-time opportunities across the Middle East.',
      email: 'Email',
      whatsapp: 'WhatsApp',
      location: 'Addis Ababa - Bole - Airport Road',
      languages: 'Arabic & English',
      whatsappTooltip: 'Chat on WhatsApp'
    },
    footer: {
      rights: '© 2026 Naji Ali. All rights reserved.',
      education: 'Hayyat University College (HUC) - IT Graduate 2022'
    }
  },
  ar: {
    nav: {
      solutions: 'الحلول',
      techStack: 'التقنيات',
      playground: 'ساحة التجربة',
      hireMe: 'وظفني'
    },
    hero: {
      location: 'مقيم في الرياض وأديس أبابا',
      title: 'طور',
      titleHighlight: 'رؤيتك.',
      subtitle: 'متخصص في التجارة الإلكترونية عالية الأداء وحلول B2B SaaS لسوق الشرق الأوسط. أبني البنية التحتية التي تدعم الجيل القادم من القادة الرقميين في السعودية.',
      downloadCV: 'تحميل السيرة الذاتية'
    },
    projects: {
      title: 'الحلول الاستراتيجية',
      minimoon: {
        badge: 'مشروع مميز',
        title: 'منصة ميني مون للتجارة الإلكترونية',
        desc: 'منصة Next.js + Strapi محسّنة لبوابات الدفع السعودية وإدارة الموردين عالية التزامن.'
      },
      b2b: {
        title: 'حلول B2B SaaS',
        desc: 'منصات توزيع قائمة على الأدوار لصناعة الألبان في القاهرة والرياض.'
      },
      mentorship: {
        title: 'منصة الإرشاد',
        desc: 'منصة Laravel مع نظام RBAC معقد وجدولة تلقائية للتفاعلات عالية التزامن.'
      },
      dairy: {
        title: 'توزيع الألبان',
        desc: 'منصة تجارة إلكترونية متوافقة مع الجوال تبسط سير عمل B2B لفرق المبيعات الميدانية.'
      }
    },
    tech: {
      title: 'مبني للأداء',
      subtitle: 'استخدام مجموعة تقنيات حديثة لضمان توفر 99.9٪ وأوقات تحميل أقل من ثانية.',
      yearsExp: 'سنوات خبرة',
      frontend: { title: 'الواجهة الأمامية', desc: 'React, Next.js, Tailwind' },
      backend: { title: 'الخادم', desc: 'Node, Laravel, Strapi' },
      cloud: { title: 'السحابة', desc: 'AWS, Docker, CI/CD' },
      mobile: { title: 'الجوال', desc: 'React Native' }
    },
    experience: {
      title: 'رحلة المسيرة المهنية',
      minimoon: {
        date: 'ديسمبر 2023 - نوفمبر 2025',
        role: 'مطور Full-Stack',
        company: 'شركة ميني مون، الجزائر (عن بعد)',
        points: [
          'هندسة حلول تجارة إلكترونية قابلة للتطوير باستخدام Next.js + Strapi',
          'دمج بوابات دفع آمنة لمنطقة الشرق الأوسط وشمال أفريقيا',
          'إدارة خطوط نشر AWS (توفر 99.9٪)'
        ]
      },
      elmasa: {
        date: 'يناير 2022 - أغسطس 2024',
        role: 'مطور Full-Stack',
        company: 'شركة المصري، مصر/القاهرة (عن بعد)',
        points: [
          'بناء منصة توزيع ألبان B2B باستخدام React.js',
          'تصميم متجاوب يركز على الجوال لفرق المبيعات الميدانية'
        ]
      },
      nafir: {
        date: 'ديسمبر 2022 - مايو 2023',
        role: 'مطور Back-End',
        company: 'شركة نفير، الخرطوم، السودان (عن بعد)',
        points: [
          'تصميم منصة إرشاد باستخدام Laravel + RBAC',
          'تحسين استعلامات قاعدة البيانات للتزامن العالي'
        ]
      }
    },
    contact: {
      title: 'لنبني معاً',
      subtitle: 'متاح لمشاريع العمل الحر والفرص بدوام كامل في جميع أنحاء الشرق الأوسط.',
      email: 'البريد الإلكتروني',
      whatsapp: 'واتساب',
      location: 'أديس أبابا - بولي - طريق المطار',
      languages: 'العربية والإنجليزية',
      whatsappTooltip: 'تحدث على واتساب'
    },
    footer: {
      rights: '© 2026 ناجي علي. جميع الحقوق محفوظة.',
      education: 'كلية حياة الجامعية (HUC) - خريج تقنية المعلومات 2022'
    }
  }
}

export default function SaudiStartupPortfolio() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const t = translations[lang]
  const isRTL = lang === 'ar'

  return (
    <div className={`min-h-screen bg-[#0a0c10] text-slate-100 selection:bg-emerald-500/30 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 z-[100]">
        <div className="flex justify-between items-center">
          <span className="font-bold tracking-tighter text-xl">NAJI.</span>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400 items-center">
              <a href="#work" className="hover:text-white transition-colors">{t.nav.solutions}</a>
              <a href="#tech" className="hover:text-white transition-colors">{t.nav.techStack}</a>
              <a href="/playground" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                <FiCode className="text-sm" />
                {t.nav.playground}
              </a>
              <a href="#contact" className="hover:text-emerald-400 transition-colors px-4 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400">{t.nav.hireMe}</a>
            </div>
            <a 
              href="/playground"
              className="md:hidden p-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-full border border-purple-500/20 transition-all"
              title={t.nav.playground}
            >
              <FiCode className="text-lg text-purple-400" />
            </a>
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all flex items-center gap-2"
            >
              <FaLanguage />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            {t.hero.location}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
          >
            {t.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t.hero.titleHighlight}</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
            {t.hero.subtitle}
          </p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            href="/Naji-Ali-Resume.pdf"
            download="Naji-Ali-Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-full font-semibold transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t.hero.downloadCV}
          </motion.a>
        </div>
      </section>

      <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          {t.projects.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            href="https://minimoon.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="md:col-span-8 group relative bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-emerald-500/50 transition-all overflow-hidden cursor-pointer"
          >
            <div className="relative z-10">
              <span className="text-xs font-mono text-emerald-400 uppercase">{t.projects.minimoon.badge}</span>
              <h3 className="text-3xl font-bold mt-2 mb-4">{t.projects.minimoon.title}</h3>
              <p className="text-slate-400 max-w-md">{t.projects.minimoon.desc}</p>
              <div className="flex gap-3 mt-6">
                {['Next.js', 'AWS', 'Redis'].map(t => <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300 border border-white/5">{t}</span>)}
              </div>
            </div>
            <div className="absolute top-8 right-8 text-2xl text-slate-700 group-hover:text-emerald-400 transition-colors">
              <FiArrowUpRight />
            </div>
          </motion.a>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-blue-500/50 transition-all"
          >
            <FiLayers className="text-3xl text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-2">{t.projects.b2b.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{t.projects.b2b.desc}</p>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href="https://portal.nafir.net/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="md:col-span-6 bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-purple-500/50 transition-all cursor-pointer group"
          >
            <FiCode className="text-3xl text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">{t.projects.mentorship.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{t.projects.mentorship.desc}</p>
            <div className="flex gap-2">
              {['Laravel', 'MySQL', 'RBAC'].map(t => <span key={t} className="px-2 py-1 bg-white/5 rounded-full text-xs text-slate-400">{t}</span>)}
            </div>
          </motion.a>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-6 bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-cyan-500/50 transition-all"
          >
            <FiGlobe className="text-3xl text-cyan-400 mb-6" />
            <h3 className="text-xl font-bold mb-2">{t.projects.dairy.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{t.projects.dairy.desc}</p>
            <div className="flex gap-2">
              {['React.js', 'Node.js', 'MongoDB'].map(t => <span key={t} className="px-2 py-1 bg-white/5 rounded-full text-xs text-slate-400">{t}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="tech" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">{t.tech.title}</h2>
              <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: t.tech.subtitle }}></p>
            </div>
            <div className="mt-6 md:mt-0 flex gap-4">
               <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
                  <span className="block text-2xl font-bold text-emerald-400">3+</span>
                  <span className="text-[10px] text-slate-500 uppercase">{t.tech.yearsExp}</span>
               </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <TechItem icon={<FiCode />} title={t.tech.frontend.title} desc={t.tech.frontend.desc} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <TechItem icon={<FiLayers />} title={t.tech.backend.title} desc={t.tech.backend.desc} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <TechItem icon={<FiGlobe />} title={t.tech.cloud.title} desc={t.tech.cloud.desc} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <TechItem icon={<FiSmartphone />} title={t.tech.mobile.title} desc={t.tech.mobile.desc} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          {t.experience.title}
        </motion.h2>
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className={`border-emerald-500/30 pb-8 ${isRTL ? 'border-r-2 pr-8' : 'border-l-2 pl-8'}`}
          >
            <span className="text-sm text-slate-500">{t.experience.minimoon.date}</span>
            <h3 className="text-2xl font-bold mt-2">{t.experience.minimoon.role}</h3>
            <p className="text-emerald-400 mb-4">{t.experience.minimoon.company}</p>
            <ul className="space-y-2 text-slate-400">
              {t.experience.minimoon.points.map((point, i) => <li key={i}>• {point}</li>)}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`border-blue-500/30 pb-8 ${isRTL ? 'border-r-2 pr-8' : 'border-l-2 pl-8'}`}
          >
            <span className="text-sm text-slate-500">{t.experience.elmasa.date}</span>
            <h3 className="text-2xl font-bold mt-2">{t.experience.elmasa.role}</h3>
            <p className="text-blue-400 mb-4">{t.experience.elmasa.company}</p>
            <ul className="space-y-2 text-slate-400">
              {t.experience.elmasa.points.map((point, i) => <li key={i}>• {point}</li>)}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`border-purple-500/30 ${isRTL ? 'border-r-2 pr-8' : 'border-l-2 pl-8'}`}
          >
            <span className="text-sm text-slate-500">{t.experience.nafir.date}</span>
            <h3 className="text-2xl font-bold mt-2">{t.experience.nafir.role}</h3>
            <p className="text-purple-400 mb-4">{t.experience.nafir.company}</p>
            <ul className="space-y-2 text-slate-400">
              {t.experience.nafir.points.map((point, i) => <li key={i}>• {point}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 bg-gradient-to-b from-transparent to-emerald-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">{t.contact.title}</h2>
            <p className="text-slate-400 text-lg mb-10">
              {t.contact.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                href="mailto:Najialii249@gmail.com"
                className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 rounded-full font-semibold transition-all hover:scale-110 flex items-center justify-center"
                title="Email: Najialii249@gmail.com"
              >
                <FiMail className="text-2xl" />
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                href="https://wa.me/251933955241"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition-all hover:scale-110 flex items-center justify-center"
                title="WhatsApp: +251 93 395 5241"
              >
                <FaWhatsapp className="text-2xl" />
              </motion.a>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <FiMapPin className="text-emerald-400" />
                <span>{t.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLanguage className="text-emerald-400" />
                <span>{t.contact.languages}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
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
    </div>
  )
}

function TechItem({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="p-6 bg-slate-900/40 border border-white/5 rounded-2xl hover:bg-slate-800/60 transition-colors">
      <div className="text-emerald-400 mb-4 text-xl">{icon}</div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  )
}