import { motion } from 'motion/react'
import { Database, Sparkles, Command } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { trackSpotlight } from '../utils/spotlight'
import { useI18n } from '../i18n'

function LaravelIcon() {
  return (
    <svg viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.408 39.944A.8.8 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.209.006-.02.018-.037.026-.057.015-.043.029-.088.053-.128.02-.033.049-.06.073-.089.025-.03.044-.065.073-.09.001 0 .001-.001.002-.001L9.98.2a.796.796 0 0 1 .8 0l9.498 5.481a.43.43 0 0 1 .003.002c.029.026.049.06.073.089.024.029.054.056.073.089.024.04.038.085.053.127.008.02.02.038.026.058.018.068.028.137.028.209v21.427l8.007-4.615V11.772c0-.072.01-.142.028-.209.006-.02.018-.038.026-.057.015-.043.029-.087.052-.128.02-.033.05-.06.074-.089.024-.03.044-.065.073-.09.001 0 .001-.001.002-.001l9.456-5.455a.798.798 0 0 1 .8 0l9.428 5.435a.432.432 0 0 1 .003.002c.029.025.05.06.073.089.024.029.054.056.073.089.025.041.039.085.053.127.009.02.02.038.027.058zm-1.574 10.272v-9.18l-3.363 1.938-4.646 2.677v9.18l8.01-4.615zm-9.61 16.505v-9.187l-4.57 2.622-13.05 7.476v9.27l17.62-10.181zM1.602 7.719v31.53l17.62 10.182v-9.27l-9.204-5.248-.003-.002-.003-.002c-.028-.026-.049-.06-.072-.089-.024-.029-.054-.056-.073-.089-.025-.04-.038-.085-.053-.127-.008-.02-.02-.038-.026-.058-.018-.067-.028-.137-.028-.209V7.719l-4.647 2.677L1.602 7.72zm8.8-5.994L2.405 6.334l7.998 4.614 7.998-4.614-7.998-4.609zm4.224 24.485l4.645-2.677V7.719l-3.363 1.938-4.646 2.677v16.104l3.364-1.938zM39.43 5.765l-7.997 4.609 7.997 4.614 7.997-4.614-7.997-4.61zm-.801 10.605l-4.646-2.677-3.363-1.938v9.18l4.645 2.677 3.364 1.938v-9.18zM20.22 38.51l11.743-6.733 5.87-3.365-7.99-4.607-9.211 5.303-8.395 4.836 7.983 4.566z" fill="#ef4444"/>
    </svg>
  )
}

const skills = [
  { type: 'img', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', key: 'frontend', description: 'React, TypeScript, Tailwind CSS, Bootstrap, Vite', bg: 'from-cyan-500 to-blue-500' },
  { type: 'laravel', key: 'backend', description: 'Laravel, Symfony, Yii, PHP, APIs REST, Inertia.js, Next.js', bg: 'from-red-900 to-red-800' },
  { type: 'lucide', key: 'database', description: 'MySQL, PostgreSQL, SQL Server, Oracle, Supabase', bg: 'from-blue-500 to-indigo-500' },
  { type: 'img', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', key: 'devops', description: 'Git, GitHub, Docker, Vercel, Laravel Cloud, EmailJS', bg: 'from-emerald-500 to-teal-500', invert: true },
]

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

function Cell({ dark, className = '', delay = 0, children }) {
  return (
    <motion.div
      onMouseMove={trackSpotlight}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-3xl overflow-hidden group ${
        dark ? 'bg-white/5 border border-white/10 hover:border-emerald-400/40' : 'bg-white border border-slate-100 shadow-lg hover:shadow-xl'
      } transition-all ${className}`}
    >
      <div className="spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {children}
    </motion.div>
  )
}

function SkillCell({ skill, title, dark, delay }) {
  return (
    <Cell dark={dark} delay={delay} className="p-5 md:p-6">
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.bg} opacity-0 group-hover:opacity-10 transition-opacity`} />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform"
        style={skill.type === 'laravel' ? { background: '#1a0a0a', border: '1px solid rgba(239,68,68,0.3)' } : {}}
      >
        {skill.type !== 'laravel' && (
          <div className={`w-12 h-12 bg-gradient-to-br ${skill.bg} rounded-xl flex items-center justify-center`}>
            {skill.type === 'lucide' && <Database className="w-6 h-6 text-white" />}
            {skill.type === 'img' && <img src={skill.icon} alt={title} className={`w-6 h-6 ${skill.invert ? 'invert' : ''}`} />}
          </div>
        )}
        {skill.type === 'laravel' && <LaravelIcon />}
      </div>
      <h3 className={`text-base md:text-lg font-bold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
      <p className={`text-xs md:text-sm ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{skill.description}</p>
    </Cell>
  )
}

export default function About() {
  const { dark } = useTheme()
  const { t } = useI18n()
  const skillTitle = skill => t(`about.skills.${skill.key}`)
  const muted = dark ? 'text-slate-400' : 'text-slate-600'

  return (
    <section id="sobre-mi" className={`py-16 md:py-24 px-4 ${dark ? 'bg-[#0d0d0d]' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {/* Intro — celda grande */}
          <Cell dark={dark} className="col-span-2 md:row-span-2 p-6 md:p-10 flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">{t('about.eyebrow')}</p>
              <h3 className={`text-2xl md:text-4xl font-black leading-tight mb-5 ${dark ? 'text-white' : 'text-slate-900'}`}>
                {t('about.headline1')}{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{t('about.headlineHighlight')}</span>{' '}
                {t('about.headline2')}
              </h3>
              <p className={`text-sm md:text-base leading-relaxed mb-3 ${muted}`}>
                {t('about.p1')}
              </p>
              <p className={`text-sm md:text-base leading-relaxed ${muted}`}>
                {t('about.p2')}
              </p>
            </div>
            <div className="relative flex flex-wrap gap-2 mt-6">
              {t('about.chips').map(chip => (
                <span key={chip} className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">{chip}</span>
              ))}
            </div>
          </Cell>

          <SkillCell skill={skills[0]} title={skillTitle(skills[0])} dark={dark} delay={0.1} />
          <SkillCell skill={skills[1]} title={skillTitle(skills[1])} dark={dark} delay={0.15} />

          {/* IA */}
          <Cell dark={dark} delay={0.2} className="col-span-2 p-5 md:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-base md:text-lg font-bold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>{t('about.aiTitle')}</h3>
                <p className={`text-xs md:text-sm leading-relaxed ${muted}`}>
                  {t('about.aiText1')} <span className="text-emerald-400 font-semibold">Claude</span> {t('about.aiText2')}
                </p>
              </div>
            </div>
          </Cell>

          <SkillCell skill={skills[2]} title={skillTitle(skills[2])} dark={dark} delay={0.25} />
          <SkillCell skill={skills[3]} title={skillTitle(skills[3])} dark={dark} delay={0.3} />

          {/* Disponibilidad + atajo */}
          <Cell dark={dark} delay={0.35} className="col-span-2 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </span>
                <h3 className={`text-base md:text-lg font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>{t('about.availableTitle')}</h3>
              </div>
              <p className={`text-xs md:text-sm ${muted}`}>{t('about.availableText')}</p>
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event('portfolio:open-palette'))}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                dark ? 'bg-white/10 hover:bg-white/15 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Command className="w-4 h-4" />
              <span className="sm:hidden">{t('about.openSearch')}</span>
              <span className="hidden sm:inline">{t('about.navigateWith')}</span>
              <kbd className="hidden sm:inline font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-400/15 text-emerald-400">{isMac ? '⌘' : 'Ctrl'} K</kbd>
            </button>
          </Cell>
        </div>
      </div>
    </section>
  )
}
