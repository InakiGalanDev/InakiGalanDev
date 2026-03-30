import { motion } from 'motion/react'
import { Mail, MapPin, Send } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const { dark } = useTheme()

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
            {/* <div className="space-y-4 md:space-y-6">
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Nombre</label>
                <input type="text" placeholder="Tu nombre"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-sm md:text-base ${
                    dark ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-emerald-400' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Email</label>
                <input type="email" placeholder="tu@email.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-sm md:text-base ${
                    dark ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-emerald-400' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${dark ? 'text-white' : 'text-slate-800'}`}>Mensaje</label>
                <textarea rows={4} placeholder="Cuéntame sobre tu proyecto..."
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors resize-none text-sm md:text-base ${
                    dark ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-emerald-400' : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
              <button type="button"
                className="w-full flex items-center justify-center gap-2 px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-all shadow-lg font-bold text-base md:text-lg"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                Enviar Mensaje
              </button>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
