import { usePage } from '@inertiajs/react'
import site from './site.json'
import messages from './messages'

export const LOCALES = Object.keys(site.locales)
export const localeInfo = site.locales

const prefix = locale => (locale === site.defaultLocale ? '' : `/${locale}`)

// Mismas rutas que app/Http/Controllers/PortfolioController.php
export const homeUrl = locale => prefix(locale) || '/'
export const sectionUrl = (locale, id) => `${homeUrl(locale)}#${id}`
export const projectUrl = (locale, slug) => `${prefix(locale)}/${site.locales[locale].projectsPath}/${slug}`

const lookup = (dict, key) => key.split('.').reduce((obj, k) => obj?.[k], dict)

export function useI18n() {
  const { props } = usePage()
  const locale = props.locale in site.locales ? props.locale : site.defaultLocale

  // t('nav.about') → texto de la interfaz; tr(project.subtitle) → campo traducible de los datos
  const t = key => lookup(messages[locale], key) ?? lookup(messages[site.defaultLocale], key) ?? key
  const tr = value =>
    value && typeof value === 'object' && !Array.isArray(value) ? value[locale] ?? value[site.defaultLocale] : value

  return { locale, t, tr, alternates: props.alternates ?? {} }
}
