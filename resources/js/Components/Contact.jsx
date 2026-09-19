import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Send, CheckCircle2, XCircle } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const MAX_LENGTH = { name: 100, email: 150, message: 2000 }
const MIN_FILL_TIME_MS = 3000
const COOLDOWN_MS = 60 * 1000
const LAST_SENT_KEY = 'contact_last_sent'

// Elimina caracteres de control/formato invisibles que no aportan nada a un mensaje legítimo
const sanitize = (value) => value.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()

export default function Contact() {
  const { dark } = useTheme()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error | cooldown
  const [errors, setErrors] = useState({})
  const [honeypot, setHoneypot] = useState('')
  const loadedAtRef = useRef(Date.now())

  const handleChange = (field) => (e) => {
    const value = e.target.value.slice(0, MAX_LENGTH[field])
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
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

    const lastSent = Number(localStorage.getItem(LAST_SENT_KEY) || 0)
    if (Date.now() - lastSent < COOLDOWN_MS) {
      setStatus('cooldown')
      return
    }

    const name = sanitize(formData.name)
    const email = sanitize(formData.email)
    const message = sanitize(formData.message)

    const newErrors = {}
    if (!name) newErrors.name = 'Introduce tu nombre'
    if (!isValidEmail(email)) newErrors.email = 'Introduce un email válido'
    if (!message) newErrors.message = 'Escribe un mensaje'
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
      localStorage.setItem(LAST_SENT_KEY, String(Date.now()))
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className={`py-16 md:py-24 px-4 ${dark ? 'bg-[#0d0d0d]' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4 md:mb-6" />
          <p className={`text-base md:text-xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            ¿Tienes un proyecto en mente? Hablemos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-3xl p-6 md:p-12 ${dark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-2xl'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Info */}
            <div className="space-y-1 md:space-y-">
              <div>
                <h3 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${dark ? 'text-white' : 'text-slate-800'}`}>
                  Información de Contacto
                </h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 text-sm md:text-base ${dark ? 'text-white' : 'text-slate-800'}`}>Email</h4>
                      <a href="mailto:inakigalandev@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm md:text-base break-all">
                        inakigalandev@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 text-sm md:text-base ${dark ? 'text-white' : 'text-slate-800'}`}>Ubicación</h4>
                      <p className={`text-sm md:text-base ${dark ? 'text-slate-400' : 'text-slate-600'}`}>España</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className={`font-bold mb-4 text-sm md:text-base ${dark ? 'text-white' : 'text-slate-800'}`}>Redes Sociales</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/i%C3%B1aki-galan-586a2b228/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                    <FaLinkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </a>
                  <a href="https://github.com/InakiGalanDev" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                    <FaGithub className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-6">
              {/* Honeypot — invisible para personas, los bots que autorellenan formularios caen aquí */}
              <div className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style={{ clip: 'rect(0,0,0,0)' }} aria-hidden="true">
                <label htmlFor="company">No rellenar este campo</label>
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

              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Nombre</label>
                <input type="text" placeholder="Tu nombre"
                  maxLength={MAX_LENGTH.name}
                  value={formData.name}
                  onChange={handleChange('name')}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-sm md:text-base ${
                    dark ? 'bg-white/5 text-white placeholder-slate-500' : 'bg-white text-slate-800 placeholder-slate-400'
                  } ${
                    errors.name ? 'border-red-500' : dark ? 'border-white/10 focus:border-emerald-400' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Email</label>
                <input type="email" placeholder="tu@email.com"
                  maxLength={MAX_LENGTH.email}
                  value={formData.email}
                  onChange={handleChange('email')}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-sm md:text-base ${
                    dark ? 'bg-white/5 text-white placeholder-slate-500' : 'bg-white text-slate-800 placeholder-slate-400'
                  } ${
                    errors.email ? 'border-red-500' : dark ? 'border-white/10 focus:border-emerald-400' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Mensaje</label>
                <textarea rows={4} placeholder="Cuéntame sobre tu proyecto..."
                  maxLength={MAX_LENGTH.message}
                  value={formData.message}
                  onChange={handleChange('message')}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors resize-none text-sm md:text-base ${
                    dark ? 'bg-white/5 text-white placeholder-slate-500' : 'bg-white text-slate-800 placeholder-slate-400'
                  } ${
                    errors.message ? 'border-red-500' : dark ? 'border-white/10 focus:border-emerald-400' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-all shadow-lg font-bold text-base md:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Mensaje enviado. ¡Gracias! Te responderé pronto.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
                  <XCircle className="w-4 h-4" /> No se pudo enviar el mensaje. Prueba de nuevo o escríbeme directamente por email.
                </div>
              )}
              {status === 'cooldown' && (
                <div className="flex items-center gap-2 text-amber-500 text-sm font-semibold">
                  <XCircle className="w-4 h-4" /> Espera un momento antes de enviar otro mensaje.
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
