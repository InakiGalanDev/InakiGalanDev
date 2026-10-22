import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { router } from '@inertiajs/react'
import { Search, Home, User, FolderOpen, Mail, Copy, Check, Sun, Moon, ExternalLink, CornerDownLeft, Languages } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { featuredProjects, isLive } from '../data/projects'
import { useI18n, LOCALES, localeInfo, homeUrl, sectionUrl, projectUrl } from '../i18n'

const EMAIL = 'inakigalandev@gmail.com'

// En la portada hace scroll; desde otra página (p. ej. un caso de estudio) vuelve a la portada del idioma
const scrollTo = (locale, id) => {
  if (window.location.pathname !== homeUrl(locale)) {
    window.location.href = id ? sectionUrl(locale, id) : homeUrl(locale)
    return
  }
  const el = id ? document.getElementById(id) : null
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Normaliza para que "proyectos" encuentre "Proyectos" y "mas" encuentre "Más"
const normalize = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export default function CommandPalette() {
  const { dark, toggleTheme } = useTheme()
  const { locale, t, alternates } = useI18n()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const g = key => t(`palette.groups.${key}`)
  const commands = useMemo(() => [
    { id: 'home', group: g('navigate'), label: t('palette.home'), icon: Home, run: () => scrollTo(locale, null) },
    { id: 'about', group: g('navigate'), label: t('palette.about'), icon: User, run: () => scrollTo(locale, 'sobre-mi') },
    { id: 'projects', group: g('navigate'), label: t('palette.projects'), icon: FolderOpen, run: () => scrollTo(locale, 'proyectos') },
    { id: 'contact', group: g('navigate'), label: t('palette.contact'), icon: Mail, run: () => scrollTo(locale, 'contacto') },
    ...featuredProjects.map(p => ({
      id: `case-${p.slug}`,
      group: g('projects'),
      label: p.title,
      hint: t('palette.viewCase'),
      icon: FolderOpen,
      color: p.color,
      run: () => router.visit(projectUrl(locale, p.slug)),
    })),
    ...featuredProjects.filter(p => isLive(p.demo)).map(p => ({
      id: `visit-${p.slug}`,
      group: g('projects'),
      label: `${t('palette.visit')} ${p.title}`,
      hint: p.demo.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      icon: ExternalLink,
      run: () => window.open(p.demo, '_blank', 'noopener'),
    })),
    {
      id: 'copy-email',
      group: g('contact'),
      label: t('palette.copyEmail'),
      hint: EMAIL,
      icon: Copy,
      keepOpen: true,
      run: async () => {
        try {
          await navigator.clipboard.writeText(EMAIL)
          setCopied(true)
          setTimeout(() => { setCopied(false); setOpen(false) }, 900)
        } catch {
          window.location.href = `mailto:${EMAIL}`
        }
      },
    },
    { id: 'send-email', group: g('contact'), label: t('palette.sendEmail'), icon: Mail, run: () => { window.location.href = `mailto:${EMAIL}` } },
    { id: 'github', group: g('contact'), label: 'GitHub', hint: 'InakiGalanDev', icon: FaGithub, run: () => window.open('https://github.com/InakiGalanDev', '_blank', 'noopener') },
    { id: 'linkedin', group: g('contact'), label: 'LinkedIn', icon: FaLinkedin, run: () => window.open('https://www.linkedin.com/in/inakigalandev', '_blank', 'noopener') },
    { id: 'theme', group: g('preferences'), label: dark ? t('palette.lightMode') : t('palette.darkMode'), icon: dark ? Sun : Moon, run: toggleTheme },
    ...LOCALES.filter(l => l !== locale).map(l => ({
      id: `lang-${l}`,
      group: g('language'),
      label: localeInfo[l].label,
      hint: localeInfo[l].short,
      icon: Languages,
      run: () => { window.location.href = alternates[l] ?? homeUrl(l) },
    })),
  ], [dark, toggleTheme, locale, alternates])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return commands
    return commands.filter(c => normalize(`${c.group} ${c.label} ${c.hint ?? ''}`).includes(q))
  }, [commands, query])

  // Atajo ⌘K / Ctrl+K y apertura desde otros componentes
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('portfolio:open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('portfolio:open-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Se limpia al cerrar para que al reabrir ya esté vacía aunque se escriba de inmediato
    return () => {
      document.body.style.overflow = prevOverflow
      setQuery('')
      setSelected(0)
      setCopied(false)
    }
  }, [open])

  useEffect(() => setSelected(0), [query])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${selected}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const execute = cmd => {
    if (!cmd) return
    if (!cmd.keepOpen) setOpen(false)
    cmd.run()
  }

  const onInputKey = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => (s + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => (s - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      execute(results[selected])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  let lastGroup = null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] bg-black/60 backdrop-blur-sm"
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('palette.dialog')}
            onMouseDown={e => e.stopPropagation()}
            className={`w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl ${
              dark ? 'bg-[#111] border border-white/10' : 'bg-white border border-slate-200'
            }`}
          >
            <div className={`flex items-center gap-3 px-4 border-b ${dark ? 'border-white/10' : 'border-slate-200'}`}>
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={t('palette.placeholder')}
                className={`w-full py-4 bg-transparent outline-none text-base ${dark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'}`}
              />
              <kbd className={`hidden sm:block text-[10px] font-mono px-1.5 py-0.5 rounded ${dark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>ESC</kbd>
            </div>

            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className={`px-3 py-8 text-center text-sm ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {t('palette.noResults')} “{query}”
                </p>
              )}
              {results.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null
                lastGroup = cmd.group
                const active = i === selected
                const Icon = cmd.id === 'copy-email' && copied ? Check : cmd.icon
                return (
                  <div key={cmd.id}>
                    {header && (
                      <p className={`px-3 pt-3 pb-1 text-[11px] font-mono uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {header}
                      </p>
                    )}
                    <button
                      data-index={i}
                      onMouseMove={() => setSelected(i)}
                      onClick={() => execute(cmd)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                        active
                          ? dark ? 'bg-emerald-400/10 text-white' : 'bg-emerald-50 text-slate-900'
                          : dark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-400' : dark ? 'text-slate-500' : 'text-slate-400'}`}
                        style={cmd.color && !active && dark ? { color: cmd.color } : undefined}
                      />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {cmd.id === 'copy-email' && copied ? t('palette.copied') : cmd.label}
                      </span>
                      {cmd.hint && (
                        <span className={`hidden sm:block ml-auto text-xs truncate ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{cmd.hint}</span>
                      )}
                      {active && <CornerDownLeft className={`w-3.5 h-3.5 shrink-0 text-emerald-400 ${cmd.hint ? 'sm:ml-0 ml-auto' : 'ml-auto'}`} />}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className={`flex items-center gap-4 px-4 py-2.5 text-[11px] font-mono border-t ${
              dark ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-400'
            }`}>
              <span>↑↓ {t('palette.move')}</span>
              <span>↵ {t('palette.run')}</span>
              <span className="ml-auto">IñakiGalan<span className="text-emerald-400">Dev</span></span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
