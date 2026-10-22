import { Link } from '@inertiajs/react'
import { Mail, ArrowUp } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useI18n, homeUrl, sectionUrl, projectUrl } from '../i18n'
import { featuredProjects } from '../data/projects'
import LanguageSwitcher from './LanguageSwitcher'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

const SOCIALS = [
  { label: 'Email', href: 'mailto:inakigalandev@gmail.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com/InakiGalanDev', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/i%C3%B1aki-galan-586a2b228/', icon: FaLinkedin },
]

export default function Footer() {
  const { dark } = useTheme()
  const { locale, t } = useI18n()

  const heading = `text-xs font-mono uppercase tracking-widest mb-4 ${dark ? 'text-slate-500' : 'text-slate-400'}`
  const link = `text-sm transition-colors ${dark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'}`

  return (
    <footer className={`relative overflow-hidden px-4 pt-16 pb-8 border-t ${dark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-slate-200'}`}>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-64 rounded-full blur-3xl pointer-events-none bg-emerald-500/10" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Marca */}
          <div className="col-span-2 md:col-span-1">
            <a href={homeUrl(locale)} className="inline-block text-2xl font-black mb-3">
              <span className={dark ? 'text-white' : 'text-slate-900'}>IñakiGalan</span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Dev</span>
            </a>
            <p className={`text-sm leading-relaxed max-w-xs mb-5 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{t('footer.tagline')}</p>
            <div className="flex gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5 ${
                    dark ? 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-400/50' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-emerald-500/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <nav>
            <p className={heading}>{t('footer.navigate')}</p>
            <ul className="space-y-2.5">
              <li><a href={sectionUrl(locale, 'sobre-mi')} className={link}>{t('nav.about')}</a></li>
              <li><a href={sectionUrl(locale, 'proyectos')} className={link}>{t('nav.projects')}</a></li>
              <li><a href={sectionUrl(locale, 'contacto')} className={link}>{t('nav.contact')}</a></li>
            </ul>
          </nav>

          {/* Proyectos */}
          <nav>
            <p className={heading}>{t('footer.projects')}</p>
            <ul className="space-y-2.5">
              {featuredProjects.map(p => (
                <li key={p.slug}><Link href={projectUrl(locale, p.slug)} className={link}>{p.title}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Contacto + idioma */}
          <div className="col-span-2 md:col-span-1">
            <p className={heading}>{t('footer.contact')}</p>
            <a href="mailto:inakigalandev@gmail.com" className={`${link} block mb-4 break-all`}>inakigalandev@gmail.com</a>
            <LanguageSwitcher className="inline-flex" />
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row items-center gap-4 pt-6 border-t text-xs ${dark ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
          <p>© {new Date().getFullYear()} Iñaki Galan. {t('footer.rights')}</p>
          <p className="sm:before:content-['·'] sm:before:mr-4">{t('footer.builtWith')}</p>
          <div className="sm:ml-auto flex items-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new Event('portfolio:open-palette'))}
              className="hidden md:inline-flex items-center gap-1.5 font-mono hover:text-emerald-500 transition-colors"
            >
              <kbd className={`px-1.5 py-0.5 rounded border ${dark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>{isMac ? '⌘' : 'Ctrl'} K</kbd>
              {t('footer.pressToSearch')}
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" /> {t('footer.backToTop')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
