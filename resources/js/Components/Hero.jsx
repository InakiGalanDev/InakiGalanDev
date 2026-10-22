import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { featuredProjects } from '../data/projects'
import { useI18n } from '../i18n'
import { trackSpotlight } from '../utils/spotlight'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

// Tarjeta de código: cada línea es una lista de [texto, clase de color]; las claves se traducen
const k = 'text-sky-300', s = 'text-amber-200', p = 'text-slate-400', v = 'text-emerald-300', b = 'text-fuchsia-300'
const buildCodeLines = c => [
  [['const ', b], [c.name, v], [' = {', p]],
  [[`  ${c.role}: `, k], ["'Full Stack Developer'", s], [',', p]],
  [['  stack: ', k], ['[', p], ["'Laravel'", s], [', ', p], ["'React'", s], [', ', p], ["'TS'", s], ['],', p]],
  [[`  ${c.ai}: `, k], ["'Claude'", s], [',', p]],
  [[`  ${c.clients}: `, k], ['[', p]],
  ...featuredProjects.map(pr => [[`    '${pr.title}'`, s], [',', p]]),
  [['  ],', p]],
  [[`  ${c.available}: `, k], ['true', b], [',', p]],
  [['}', p]],
]

export default function Hero() {
  const { dark } = useTheme()
  const { t } = useI18n()
  const codeLines = buildCodeLines(t('hero.code'))

  return (
    <section className={`min-h-screen flex items-center relative overflow-hidden px-4 pt-28 pb-24 ${dark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className={`hero-grid absolute inset-0 pointer-events-none ${dark ? 'hero-grid-dark' : 'hero-grid-light'}`} />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[28rem] rounded-full blur-3xl pointer-events-none ${
          dark ? 'bg-emerald-500/25' : 'bg-emerald-300/40'
        }`}
      />

      <div className="max-w-6xl w-full mx-auto relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 ${
              dark ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-emerald-50 border border-emerald-100 text-emerald-800'
            }`}
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            {t('hero.available')}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-500 tracking-widest text-xs md:text-sm font-mono uppercase mb-3"
          >
            {t('hero.hello')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}
          >
            Iñaki{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Galan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={`text-xl md:text-2xl font-semibold leading-snug mb-4 max-w-xl ${dark ? 'text-slate-200' : 'text-slate-800'}`}
          >
            {t('hero.role')}{' '}
            <span className="text-emerald-500">{t('hero.roleHighlight')}</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className={`text-base md:text-lg leading-relaxed max-w-xl mb-8 ${dark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {t('hero.sub')}{' '}
            <span className="text-emerald-500 font-semibold">Laravel</span>,{' '}
            <span className="text-emerald-500 font-semibold">React</span> {t('hero.and')}{' '}
            <span className="text-emerald-500 font-semibold">{t('hero.ai')}</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-5"
          >
            {/* Mismo ancho y alto para los dos botones en cualquier idioma */}
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(2,12rem)] gap-3">
              <a
                href="#proyectos"
                className="h-12 inline-flex items-center justify-center px-6 border-2 border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-emerald-500/20"
              >
                {t('hero.viewProjects')}
              </a>
              <a
                href="#contacto"
                className={`h-12 inline-flex items-center justify-center px-6 border-2 rounded-full font-bold hover:-translate-y-0.5 transition-all ${
                  dark ? 'border-white/15 text-white hover:border-emerald-400 hover:text-emerald-400' : 'border-slate-200 text-slate-800 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {t('hero.contact')}
              </a>
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event('portfolio:open-palette'))}
              className={`hidden md:inline-flex items-center gap-2 text-xs font-mono transition-colors ${
                dark ? 'text-slate-500 hover:text-emerald-300' : 'text-slate-400 hover:text-emerald-600'
              }`}
            >
              {t('hero.orPress')}
              <kbd className={`px-1.5 py-0.5 rounded border ${dark ? 'bg-white/5 border-white/10 text-emerald-300' : 'bg-slate-50 border-slate-200 text-emerald-600'}`}>
                {isMac ? '⌘' : 'Ctrl'} K
              </kbd>
              {t('hero.toNavigate')}
            </button>
          </motion.div>
        </div>

        {/* Tarjeta de código */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 1.5 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          onMouseMove={trackSpotlight}
          className="group relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl shadow-emerald-900/20"
        >
          <div className="spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs font-mono text-slate-500">inakigalandev.ts</span>
          </div>
          <pre className="relative p-5 md:p-6 text-[11px] sm:text-sm leading-relaxed font-mono overflow-x-auto">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.12 }}
                className="flex"
              >
                <span className="select-none w-6 shrink-0 text-slate-600">{i + 1}</span>
                <span>
                  {line.map(([text, cls], j) => <span key={j} className={cls}>{text}</span>)}
                  {i === codeLines.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block w-2 h-4 ml-1 align-middle bg-emerald-400"
                    />
                  )}
                </span>
              </motion.div>
            ))}
          </pre>
        </motion.div>
      </div>

      <motion.a
        href="#sobre-mi"
        aria-label={t('hero.scrollDown')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
        </motion.div>
      </motion.a>
    </section>
  )
}
