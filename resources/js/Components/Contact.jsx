import { motion } from 'motion/react'
import { Mail, MapPin, Send } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const { dark } = useTheme()

  return (
    <section
      id="contacto"
      className={`py-24 px-4 ${dark ? 'bg-[#0d0d0d]' : 'bg-gradient-to-b from-slate-50 to-white'}`}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-6" />
          <p className={`text-xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-3xl p-8 md:p-12 ${
            dark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-2xl'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-800'}`}>
                  Información de Contacto
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>Email</h4>
                      <a href="mailto:inakigalandev@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                        inakigalandev@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 ${dark ? 'text-white' : 'text-slate-800'}`}>Ubicación</h4>
                      <p className={dark ? 'text-slate-400' : 'text-slate-600'}>España</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className={`font-bold mb-4 ${dark ? 'text-white' : 'text-slate-800'}`}>Redes Sociales</h4>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <FaLinkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <FaGithub className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors ${
                    dark
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-emerald-400'
                      : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors ${
                    dark
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-emerald-400'
                      : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Mensaje</label>
                <textarea
                  rows={5}
                  placeholder="Cuéntame sobre tu proyecto..."
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors resize-none ${
                    dark
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-emerald-400'
                      : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-emerald-500/25 font-bold text-lg"
              >
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
