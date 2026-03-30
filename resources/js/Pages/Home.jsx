import { useTheme } from '../context/ThemeContext'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Projects from '../Components/Projects'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'

export default function Home() {
  const { dark } = useTheme()
  return (
    <main className={dark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-slate-900'}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
