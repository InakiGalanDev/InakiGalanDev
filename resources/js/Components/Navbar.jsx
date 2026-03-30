import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#sobre-mi', label: 'Sobre Mí' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      dark
        ? scrolled ? 'bg-[#0a0a0a] border-b border-white/10 shadow-lg' : 'bg-[#0a0a0a]'
        : scrolled ? 'bg-white border-b border-emerald-100 shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Iñaki Galan
        </a>

        <div className="hidden md:flex items-center gap-8">
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
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              dark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
            }`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="#contacto"
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Contactar
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              dark ? 'bg-white/10 text-yellow-400' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={dark ? 'text-white' : 'text-slate-700'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`md:hidden border-t px-6 py-4 ${
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
            <a
              href="#contacto"
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-bold text-center"
            >
              Contactar
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
