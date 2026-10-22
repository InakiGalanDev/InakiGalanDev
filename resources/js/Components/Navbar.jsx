import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Search } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useI18n, homeUrl, sectionUrl } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
const openPalette = () => window.dispatchEvent(new Event('portfolio:open-palette'))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggleTheme } = useTheme()
  const { locale, t } = useI18n()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: sectionUrl(locale, 'sobre-mi'), label: t('nav.about') },
    { href: sectionUrl(locale, 'proyectos'), label: t('nav.projects') },
    { href: sectionUrl(locale, 'contacto'), label: t('nav.contact') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      dark
        ? scrolled ? 'bg-[#0a0a0a] border-b border-white/10 shadow-lg' : 'bg-[#0a0a0a]'
        : scrolled ? 'bg-white border-b border-emerald-100 shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href={homeUrl(locale)} className="text-xl font-black">
            <span className={dark ? 'text-white' : 'text-slate-900'}>IñakiGalan</span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Dev</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                dark ? 'text-gray-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={openPalette}
            aria-label={t('nav.openPalette')}
            className={`flex items-center gap-2 pl-3 pr-1.5 h-9 rounded-full text-sm transition-colors ${
              dark ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-400/40' : 'bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t('nav.search')}</span>
            <kbd className="font-mono text-xs px-1.5 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400">{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>

          <LanguageSwitcher />

          <button
            onClick={toggleTheme}
            aria-label={t('nav.toggleTheme')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              dark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
            }`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href={sectionUrl(locale, 'contacto')}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            {t('nav.contactCta')}
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={openPalette}
            aria-label={t('nav.openPalette')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              dark ? 'bg-white/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={toggleTheme}
            aria-label={t('nav.toggleTheme')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              dark ? 'bg-white/10 text-yellow-400' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('nav.menu')}
            aria-expanded={menuOpen}
            className={dark ? 'text-white' : 'text-slate-700'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`lg:hidden border-t px-6 py-4 ${
          dark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-emerald-100'
        }`}>
          <div className="flex flex-col gap-4">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`transition-colors ${
                  dark ? 'text-gray-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher className="self-start" />
            <a
              href={sectionUrl(locale, 'contacto')}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold text-center"
            >
              {t('nav.contactCta')}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
