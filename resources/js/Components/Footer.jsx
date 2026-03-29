import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { dark } = useTheme()

  return (
    <footer className="bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f172a] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Iñaki Galan
        </div>
        <p className="text-slate-300 max-w-md mx-auto">
          Desarrollador Full Stack especializado en crear experiencias digitales excepcionales
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full" />
        <div className="flex justify-center gap-4 pt-2">
          <a href="mailto:inakigalandev@gmail.com" className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
            <Mail className="w-4 h-4" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
            <FaGithub className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
            <FaLinkedin className="w-4 h-4" />
          </a>
        </div>
        <p className="text-sm text-slate-400 pt-4">
          © {new Date().getFullYear()} Iñaki Galan. Todos los derechos reservados.
        </p>
        <p className="text-sm text-slate-500">
          Desarrollado con Laravel, React e Inertia.js
        </p>
      </div>
    </footer>
  )
}
