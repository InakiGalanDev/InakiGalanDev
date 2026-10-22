import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Projects from '../Components/Projects'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'
import CommandPalette from '../Components/CommandPalette'

export default function Home({ pageTitle }) {
  const { dark } = useTheme()

  // Al volver a la portada sin recargar, Laravel no vuelve a pintar el <title>; usamos el que calcula PortfolioController
  useEffect(() => {
    if (pageTitle) document.title = pageTitle
  }, [pageTitle])
  return (
    <main className={dark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-slate-900'}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <CommandPalette />
    </main>
  )
}
