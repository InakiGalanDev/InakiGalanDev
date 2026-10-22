import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Send, CheckCircle2, XCircle, Copy, Check, ArrowUpRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useI18n } from '../i18n'
import { trackSpotlight } from '../utils/spotlight'

const EMAIL = 'inakigalandev@gmail.com'
const SOCIALS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/i%C3%B1aki-galan-586a2b228/', icon: FaLinkedin },
  { name: 'GitHub', href: 'https://github.com/InakiGalanDev', icon: FaGithub },
]

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const MAX_LENGTH = { name: 100, email: 150, message: 2000 }
const MIN_FILL_TIME_MS = 3000
const COOLDOWN_MS = 60 * 1000
const LAST_SENT_KEY = 'contact_last_sent'

// Elimina caracteres de control/formato invisibles que no aportan nada a un mensaje legítimo
const sanitize = (value) => value.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()

export default function Contact() {
  const { dark } = useTheme()
  const { t } = useI18n()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error | cooldown
  const [errors, setErrors] = useState({})
  const [honeypot, setHoneypot] = useState('')
  const [copied, setCopied] = useState(false)
  const loadedAtRef = useRef(Date.now())

  const handleChange = (field) => (e) => {
    const value = e.target.value.slice(0, MAX_LENGTH[field])
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot relleno o formulario enviado demasiado rápido → comportamiento típico de un bot
    const filledInMs = Date.now() - loadedAtRef.current
    if (honeypot || filledInMs < MIN_FILL_TIME_MS) {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      return
    }

    let lastSent = 0
    try { lastSent = Number(localStorage.getItem(LAST_SENT_KEY) || 0) } catch {}
    if (Date.now() - lastSent < COOLDOWN_MS) {
      setStatus('cooldown')
      return
    }

    const name = sanitize(formData.name)
    const email = sanitize(formData.email)
    const message = sanitize(formData.message)

    const newErrors = {}
    if (!name) newErrors.name = t('contact.errName')
    if (!isValidEmail(email)) newErrors.email = t('contact.errEmail')
    if (!message) newErrors.message = t('contact.errMessage')
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, message },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      try { localStorage.setItem(LAST_SENT_KEY, String(Date.now())) } catch {}
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  const muted = dark ? 'text-slate-400' : 'text-slate-600'
  const card = dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100 shadow-lg'
  const fieldClass = (field) => `w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm md:text-base ${
    dark ? 'bg-black/30 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-800 placeholder-slate-400'
  } ${
    errors[field]
      ? 'border-red-500'
      : dark ? 'border-white/10 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
  }`
  const labelClass = `block text-xs font-mono uppercase tracking-widest mb-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`

  return (
    <section id="contacto" className={`relative overflow-hidden py-16 md:py-28 px-4 ${dark ? 'bg-[#0d0d0d]' : 'bg-slate-50'}`}>
      <div className="absolute -bottom-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl pointer-events-none bg-emerald-500/10" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        {/* Texto + vías de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="min-w-0"
        >
          <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-4">{t('contact.eyebrow')}</p>
          <h2 className={`text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5 ${dark ? 'text-white' : 'text-slate-900'}`}>
            {t('contact.title')}{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{t('contact.titleHighlight')}</span>
          </h2>
          <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-md ${muted}`}>{t('contact.subtitle')}</p>

          <div className="space-y-3">
            {/* Email con copiar */}
            <div className={`flex items-center gap-4 p-4 rounded-2xl ${card}`}>
              <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-mono uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{t('contact.emailLabel')}</p>
                <a href={`mailto:${EMAIL}`} className={`font-semibold text-sm sm:text-base truncate block hover:text-emerald-500 transition-colors ${dark ? 'text-white' : 'text-slate-900'}`}>
                  {EMAIL}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? t('contact.copied') : t('contact.copy')}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : dark ? 'bg-white/10 text-slate-300 hover:bg-white/15' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? t('contact.copied') : t('contact.copy')}</span>
              </button>
            </div>

            {/* Ubicación */}
            <div className={`flex items-center gap-4 p-4 rounded-2xl ${card}`}>
              <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-slate-100'}`}>
                <MapPin className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className={`text-xs font-mono uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{t('contact.location')}</p>
                <p className={`font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{t('contact.locationValue')}</p>
              </div>
            </div>

            {/* Redes */}
            <div className="grid grid-cols-2 gap-3">
              {SOCIALS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-4 rounded-2xl transition-all hover:-translate-y-0.5 ${card} ${dark ? 'hover:border-emerald-400/40' : 'hover:shadow-xl'}`}
                >
                  <Icon className={`w-5 h-5 ${dark ? 'text-white' : 'text-slate-800'}`} />
                  <span className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-900'}`}>{name}</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onMouseMove={trackSpotlight}
          className={`group relative min-w-0 rounded-3xl p-6 md:p-10 overflow-hidden ${card}`}
        >
          <div className="spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
            {/* Honeypot — invisible para personas, los bots que autorellenan formularios caen aquí */}
            <div className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style={{ clip: 'rect(0,0,0,0)' }} aria-hidden="true">
              <label htmlFor="company">{t('contact.honeypot')}</label>
              <input
                type="text"
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className={labelClass}>{t('contact.name')}</label>
                <input id="contact-name" type="text" placeholder={t('contact.namePlaceholder')}
                  autoComplete="name"
                  maxLength={MAX_LENGTH.name}
                  value={formData.name}
                  onChange={handleChange('name')}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass('name')}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>{t('contact.email')}</label>
                <input id="contact-email" type="email" placeholder={t('contact.emailPlaceholder')}
                  autoComplete="email"
                  maxLength={MAX_LENGTH.email}
                  value={formData.email}
                  onChange={handleChange('email')}
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass('email')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className={labelClass}>{t('contact.message')}</label>
              <textarea id="contact-message" rows={6} placeholder={t('contact.messagePlaceholder')}
                maxLength={MAX_LENGTH.message}
                value={formData.message}
                onChange={handleChange('message')}
                aria-invalid={Boolean(errors.message)}
                className={`${fieldClass('message')} resize-none`}
              />
              <div className="flex justify-between mt-1">
                {errors.message ? <p className="text-red-500 text-xs">{errors.message}</p> : <span />}
                <span className={`text-xs font-mono ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
                  {formData.message.length}/{MAX_LENGTH.message}
                </span>
              </div>
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 font-bold text-base md:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
            <div aria-live="polite">
              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-500 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> {t('contact.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
                  <XCircle className="w-4 h-4 shrink-0" /> {t('contact.error')}
                </div>
              )}
              {status === 'cooldown' && (
                <div className="flex items-center gap-2 text-amber-500 text-sm font-semibold">
                  <XCircle className="w-4 h-4 shrink-0" /> {t('contact.cooldown')}
                </div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
