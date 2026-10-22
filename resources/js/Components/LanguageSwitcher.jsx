import { useTheme } from '../context/ThemeContext'
import { useI18n, LOCALES, localeInfo, homeUrl } from '../i18n'

// Enlaza a la misma página en otro idioma. Recarga completa a propósito: así Laravel
// vuelve a pintar <html lang>, el título y las etiquetas SEO del idioma elegido.
export default function LanguageSwitcher({ className = '' }) {
  const { dark } = useTheme()
  const { locale, alternates, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={`flex items-center rounded-full p-0.5 text-xs font-bold ${dark ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-200'} ${className}`}
    >
      {LOCALES.map(l => (
        <a
          key={l}
          href={alternates[l] ?? homeUrl(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? 'true' : undefined}
          title={localeInfo[l].label}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            l === locale
              ? 'bg-emerald-500 text-white'
              : dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {localeInfo[l].short}
        </a>
      ))}
    </div>
  )
}
