'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiArrowUpRight, FiCode, FiLayers, FiGlobe, FiSmartphone, FiMail, FiMapPin, FiSun, FiMoon } from 'react-icons/fi'
import { FaWhatsapp, FaLanguage } from 'react-icons/fa'
import { useTheme } from './context/ThemeContext'
import CursorFollower from './components/CursorFollower'
import ProjectShowcase from './components/ProjectShowcase'

const translations = {
  en: {
    nav: {
      solutions: 'Projects',
      techStack: 'Tech Stack',
      playground: 'The Lab',
      hireMe: "Let's Talk"
    },
    hero: {
      location: 'Based in Riyadh & Addis Ababa',
      title: 'Reliable Code,',
      titleHighlight: 'Real Results.',
      subtitle: "I’m a full-stack developer helping businesses in the MENA region build fast, scalable web and mobile apps. No agency fluff—just clean architecture, 99.9% uptime, and code that actually solves your problems.",
      downloadCV: 'Get My Resume'
    },
    projects: {
      title: 'Selected Work',
      minimoon: {
        badge: 'Case Study',
        title: 'Minimoon eCommerce',
        desc: 'Built a robust Next.js platform that handles high traffic and integrates seamlessly with Saudi payment gateways like Tabby.'
      },
      futurehome: {
        title: 'Future Home Real Estate',
        desc: 'Developed a comprehensive real estate platform with custom CMS dashboard for property listings and content management in Saudi Arabia.'
      },
      wesaaltech: {
        title: 'Wesaal Tech Platform',
        desc: 'Built a modern tech solutions platform with secure authentication and user management systems.'
      },
      b2b: {
        title: 'B2B Logistics SaaS',
        desc: 'Developed a custom distribution system that streamlined supply chain workflows for dairy businesses in Cairo and Riyadh.'
      },
      mentorship: {
        title: 'Mentorship Portal',
        desc: 'Engineered a high-concurrency Laravel backend for automated scheduling and secure user interactions.'
      },
      dairy: {
        title: 'Field Sales Tools',
        desc: 'Created mobile-first solutions that help field sales teams track inventory and orders on the go.'
      }
    },
    tech: {
      title: 'Tech That Works',
      subtitle: 'I stick to a proven stack that ensures your site is fast, secure, and ready to grow without constant maintenance.',
      yearsExp: 'Years in Tech',
      frontend: { title: 'Frontend', desc: 'React, Next.js, Tailwind' },
      backend: { title: 'Backend', desc: 'Laravel, Node.js, Spring Boot' },
      cloud: { title: 'Cloud & Ops', desc: 'AWS, Docker, CI/CD' },
      mobile: { title: 'Mobile', desc: 'React Native' },
      tools: { title: 'Tools & AI', desc: 'Git, GitHub, AI Agents, AI-Assisted Coding' }
    },
    experience: {
      title: 'My Journey',
      minimoon: {
        date: 'Dec 2023 - Nov 2025',
        role: 'Full-Stack Developer',
        company: 'Minimoon (Remote)',
        points: [
          'Built scalable eCommerce systems from scratch',
          'Handled payment gateway integrations for the MENA market',
          'Maintained high-availability servers on AWS'
        ]
      },
      elmasa: {
        date: 'Jan 2022 - Aug 2024',
        role: 'Full-Stack Developer',
        company: 'Elmassri Co (Remote)',
        points: [
          'Developed a B2B distribution platform for dairy supply chains',
          'Designed mobile interfaces that improved field sales efficiency'
        ]
      },
      nafir: {
        date: 'Dec 2022 - May 2023',
        role: 'Backend Developer',
        company: 'Nafir CO.LTD (Remote)',
        points: [
          'Architected a mentorship portal with custom permission levels',
          'Optimized database performance to handle heavy user traffic'
        ]
      }
    },
    contact: {
      title: 'Let’s Build Something',
      subtitle: 'I’m currently open to new freelance projects and long-term partnerships across the Middle East. Send me a message and let’s discuss your vision.',
      email: 'Email Me',
      whatsapp: 'WhatsApp',
      location: 'Addis Ababa - Bole - Airport Road',
      languages: 'Arabic & English',
      whatsappTooltip: 'Send me a message'
    },
    footer: {
      rights: '© 2026 Naji Ali. All rights reserved.',
      education: 'Hayyat University College (HUC) - Information Technology 2019-2022'
    },
    learning: {
      title: 'Currently Learning',
      subtitle: 'Expanding my skill set with new technologies',
      springBoot: {
        title: 'Java Spring Boot',
        desc: 'Building enterprise-grade microservices and RESTful APIs'
      }
    },
    hobby: {
      title: 'Hobby Projects',
      subtitle: 'Side projects I\'m currently building',
      project: {
        title: 'Safqa | Smart Bartering Platform',
        subtitle: 'Exclusive to Saudi Arabia',
        desc: 'A specialized bartering platform for the Saudi market enabling cashless economy through direct high-value item exchanges',
        features: [
          'Next.js + Laravel + MySQL hybrid stack',
          'Smart valuation with internal credit system',
          'Localized UI/UX for Saudi users'
        ],
        status: 'In Active Development'
      }
    }
  },
  ar: {
    nav: {
      solutions: 'أعمالي',
      techStack: 'التقنيات',
      playground: 'المختبر',
      hireMe: 'تواصل معي'
    },
    hero: {
      location: 'مقري في الرياض وأديس أبابا',
      title: 'برمجة عملية،',
      titleHighlight: 'نتائج ملموسة.',
      subtitle: 'مطور Full-Stack أساعد الشركات في المنطقة على بناء منصات ويب وتطبيقات سريعة ومستقرة. هدفي هو تقديم حلول برمجية نظيفة وقابلة للتطوير بعيداً عن تعقيدات الشركات الكبيرة.',
      downloadCV: 'تحميل السيرة الذاتية'
    },
    projects: {
      title: 'أبرز المشاريع',
      minimoon: {
        badge: 'مشروع مختار',
        title: 'منصة ميني مون',
        desc: 'بنيت منصة متكاملة بـ Next.js قادرة على التعامل مع ضغط الزوار وربطها ببوابات الدفع المحلية.'
      },
      futurehome: {
        title: 'فيوتشر هوم العقارية',
        desc: 'تطوير منصة عقارية شاملة مع لوحة تحكم CMS مخصصة لإدارة العقارات والمحتوى في السعودية.'
      },
      wesaaltech: {
        title: 'منصة وصال تك',
        desc: 'بناء منصة حلول تقنية حديثة مع نظام مصادقة آمن وإدارة مستخدمين.'
      },
      b2b: {
        title: 'أنظمة توزيع B2B',
        desc: 'تطوير نظام خاص لسلاسل الإمداد ساهم في تنظيم عمليات التوزيع في الرياض والقاهرة.'
      },
      mentorship: {
        title: 'منصة تدريبية',
        desc: 'تصميم محرك خلفي بـ Laravel يدعم جدولة المواعيد وإدارة المستخدمين بكفاءة.'
      },
      dairy: {
        title: 'أدوات المبيعات الميدانية',
        desc: 'بناء تطبيقات جوال سهلت لفرق المبيعات تتبع الطلبات والمخزون في الميدان.'
      }
    },
    tech: {
      title: 'التقنيات التي أستخدمها',
      subtitle: 'أستخدم أدوات أثق بها لضمان أن يكون موقعك سريعاً وآمناً وسهل التحديث.',
      yearsExp: 'سنوات الخبرة',
      frontend: { title: 'الواجهة الأمامية', desc: 'React, Next.js, Tailwind' },
      backend: { title: 'الأنظمة الخلفية', desc: 'Laravel, Node.js, Spring Boot' },
      cloud: { title: 'السحابة', desc: 'AWS, Docker, CI/CD' },
      mobile: { title: 'تطبيقات الجوال', desc: 'React Native' },
      tools: { title: 'الأدوات والذكاء الاصطناعي', desc: 'Git, GitHub, وكلاء الذكاء الاصطناعي, البرمجة بمساعدة AI' }
    },
    experience: {
      title: 'خبرتي المهنية',
      minimoon: {
        date: 'ديسمبر 2023 - نوفمبر 2025',
        role: 'مطور Full-Stack',
        company: 'شركة ميني مون (عن بعد)',
        points: [
          'بناء أنظمة تجارة إلكترونية متكاملة من الصفر',
          'ربط بوابات الدفع المحلية',
          'إدارة السيرفرات لضمان استمرارية الخدمة'
        ]
      },
      elmasa: {
        date: 'يناير 2022 - أغسطس 2024',
        role: 'مطور Full-Stack',
        company: 'شركة المصري (عن بعد)',
        points: [
          'تطوير نظام توزيع لقطاع المنتجات الغذائية',
          'تصميم واجهات سهلة للاستخدام الميداني'
        ]
      },
      nafir: {
        date: 'ديسمبر 2022 - مايو 2023',
        role: 'مطور Back-End',
        company: 'شركة نفير (عن بعد)',
        points: [
          'بناء بوابة إرشاد مع نظام صلاحيات مخصص',
          'تحسين سرعة قواعد البيانات للتعامل مع الضغط'
        ]
      }
    },
    contact: {
      title: 'لنبدأ العمل سوياً',
      subtitle: 'أستقبل حالياً طلبات للمشاريع الجديدة. إذا كان لديك فكرة وتريد شريكاً تقنياً ينفذها لك، تواصل معي.',
      email: 'راسلني بالبريد',
      whatsapp: 'واتساب',
      location: 'أديس أبابا - بولي - طريق المطار',
      languages: 'العربية والإنجليزية',
      whatsappTooltip: 'تواصل معي مباشرة'
    },
    footer: {
      rights: '© 2026 ناجي علي. جميع الحقوق محفوظة.',
      education: 'كلية حياة الجامعية (HUC) - تقنية المعلومات 2019-2022'
    },
    learning: {
      title: 'أتعلم حالياً',
      subtitle: 'توسيع مهاراتي بتقنيات جديدة',
      springBoot: {
        title: 'Java Spring Boot',
        desc: 'بناء خدمات مصغرة على مستوى المؤسسات وواجهات برمجة RESTful'
      }
    },
    hobby: {
      title: 'مشاريع هواية',
      subtitle: 'مشاريع جانبية أعمل عليها حالياً',
      project: {
        title: 'صفقة | منصة المقايضة الذكية',
        subtitle: 'حصرياً للسوق السعودي',
        desc: 'منصة مقايضة متخصصة للسوق السعودي تتيح اقتصاد بدون نقد من خلال تبادل السلع عالية القيمة مباشرة',
        features: [
          'Next.js + Laravel + MySQL تقنيات متكاملة',
          'نظام تقييم ذكي مع نظام ائتمان داخلي',
          'واجهة مخصصة للمستخدمين السعوديين'
        ],
        status: 'قيد التطوير النشط'
      }
    }
  }
}  


 
export default function SaudiStartupPortfolio() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const { theme, toggleTheme } = useTheme()
  const t = translations[lang]
  const isRTL = lang === 'ar'

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0a0c10] text-slate-100' : 'bg-white text-slate-900'} selection:bg-emerald-500/30 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <CursorFollower />
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 z-[100] transition-all duration-300 hover:shadow-lg">
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
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-slate-700' : 'bg-emerald-500'}`}
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              <motion.div
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} shadow-lg`}
                animate={{ x: theme === 'dark' ? 0 : 28 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {theme === 'dark' ? <FiMoon className="text-xs text-slate-400" /> : <FiSun className="text-xs text-yellow-500" />}
              </motion.div>
            </button>
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
          className="text-3xl font-bold mb-12 text-center"
        >
          {t.projects.title}
        </motion.h2>

        {/* Project Showcase Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ProjectShowcase
            projects={[
              {
                title: t.projects.minimoon.title,
                description: t.projects.minimoon.desc,
                image: '/projects/minimnoon.png',
                link: 'https://minimoon.com',
                tags: ['Next.js', 'AWS', 'Redis', 'Payment Gateway']
              },
              {
                title: t.projects.futurehome.title,
                description: t.projects.futurehome.desc,
                image: '/projects/futuerhomedashboard.png',
                link: 'http://109.199.111.103/admin',
                tags: ['Laravel', 'CMS', 'Real Estate', 'Dashboard']
              },
              {
                title: t.projects.wesaaltech.title,
                description: t.projects.wesaaltech.desc,
                image: '/projects/wesaaltech.png',
                link: 'https://wesaaltech.com',
                tags: ['Laravel', 'Authentication', 'Dashboard']
              },
              {
                title: t.projects.mentorship.title,
                description: t.projects.mentorship.desc,
                image: '/projects/nafirportal.png',
                link: 'https://portal.nafir.net/',
                tags: ['Laravel', 'MySQL', 'RBAC', 'Scheduling']
              },
            ]}
            theme={theme}
          />
        </motion.div>
      </section>

      <section id="tech" className={`py-24 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'} border-y`}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          >
            <div className="flex-1">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.tech.title}</h2>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-base md:text-lg`} dangerouslySetInnerHTML={{ __html: t.tech.subtitle }}></p>
            </div>
            <div className="flex gap-4">
               <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center min-w-[80px]">
                  <span className="block text-2xl font-bold text-emerald-400">3+</span>
                  <span className="text-[10px] text-slate-500 uppercase whitespace-nowrap">{t.tech.yearsExp}</span>
               </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <TechItem icon={<FiCode />} title={t.tech.frontend.title} desc={t.tech.frontend.desc} theme={theme} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <TechItem icon={<FiLayers />} title={t.tech.backend.title} desc={t.tech.backend.desc} theme={theme} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <TechItem icon={<FiGlobe />} title={t.tech.cloud.title} desc={t.tech.cloud.desc} theme={theme} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <TechItem icon={<FiSmartphone />} title={t.tech.mobile.title} desc={t.tech.mobile.desc} theme={theme} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <TechItem icon={<FiCode />} title={t.tech.tools.title} desc={t.tech.tools.desc} theme={theme} />
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

      <section className={`py-20 px-6 ${theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.learning.title}</h2>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-8`}>{t.learning.subtitle}</p>
              
              <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-white/5' : 'bg-white border-slate-200'} border rounded-2xl p-6 hover:shadow-lg transition-all`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <FiCode className="text-2xl text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.learning.springBoot.title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{t.learning.springBoot.desc}</p>
                    <div className="mt-4 flex gap-2">
                      <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-700'} rounded-full text-xs`}>Java</span>
                      <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-700'} rounded-full text-xs`}>Spring Boot</span>
                      <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-700'} rounded-full text-xs`}>Microservices</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.hobby.title}</h2>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-8`}>{t.hobby.subtitle}</p>
              
              <div className={`${theme === 'dark' ? 'bg-slate-800/50 border-white/5' : 'bg-white border-slate-200'} border rounded-2xl p-6 hover:shadow-lg transition-all`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <FiLayers className="text-2xl text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.hobby.project.title}</h3>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-3 font-medium`}>{t.hobby.project.subtitle}</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-4`}>{t.hobby.project.desc}</p>
                    
                    <div className="space-y-2 mb-4">
                      {t.hobby.project.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 ${theme === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-700'} rounded-full text-xs font-medium`}>
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        {t.hobby.project.status}
                      </span>
                      <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-700'} rounded-full text-xs`}>Next.js</span>
                      <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-700'} rounded-full text-xs`}>Laravel</span>
                      <span className={`px-3 py-1 ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-700'} rounded-full text-xs`}>MySQL</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className={`py-20 md:py-32 px-6 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-emerald-500/5' : 'bg-gradient-to-b from-transparent to-emerald-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.contact.title}</h2>
            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-base md:text-lg mb-8 md:mb-10 px-4`}>
              {t.contact.subtitle}
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                href="mailto:Najialii249@gmail.com"
                className="w-14 h-14 md:w-16 md:h-16 bg-emerald-500 hover:bg-emerald-600 rounded-full font-semibold transition-all hover:scale-110 flex items-center justify-center shadow-lg"
                title="Email: Najialii249@gmail.com"
              >
                <FiMail className="text-xl md:text-2xl text-white" />
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                href="https://wa.me/251933955241"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 md:w-16 md:h-16 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition-all hover:scale-110 flex items-center justify-center shadow-lg"
                title="WhatsApp: +251 93 395 5241"
              >
                <FaWhatsapp className="text-xl md:text-2xl text-white" />
              </motion.a>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs md:text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}
            >
              <div className="flex items-center gap-2">
                <FiMapPin className="text-emerald-400 flex-shrink-0" />
                <span className="text-center sm:text-left">{t.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLanguage className="text-emerald-400 flex-shrink-0" />
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

function TechItem({ icon, title, desc, theme }: { icon: any; title: string; desc: string; theme: string }) {
  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-slate-900/40 border-white/5 hover:bg-slate-800/60' : 'bg-white border-slate-200 hover:bg-slate-50'} border rounded-2xl transition-colors`}>
      <div className="text-emerald-400 mb-4 text-xl">{icon}</div>
      <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
      <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{desc}</p>
    </div>
  )
}