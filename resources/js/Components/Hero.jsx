import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const { dark } = useTheme()

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f172a] px-4">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-emerald-500 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-teal-500 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl w-full mx-auto text-center relative z-10 space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-400 tracking-widest text-xs md:text-sm font-mono uppercase"
          >
            Hola, soy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-tight"
          >
            Iñaki{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Galan
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-1 w-24 md:w-32 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-3xl text-emerald-200 font-semibold"
          >
            Desarrollador Full Stack
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto px-4"
          >
            Transformo ideas en experiencias digitales excepcionales con{' '}
            <span className="text-emerald-400 font-semibold">Laravel</span> y{' '}
            <span className="text-emerald-400 font-semibold">React</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2 px-4"
          >
            <a
              href="#proyectos"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:opacity-90 transition-all shadow-lg hover:scale-105 text-center"
            >
              Ver Proyectos
            </a>
            <a
              href="#contacto"
              className="px-8 py-3 border-2 border-emerald-400/50 text-emerald-400 rounded-full hover:bg-emerald-400 hover:text-black transition-all font-bold text-center"
            >
              Contactar
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
