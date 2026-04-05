import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const featuredProjects = [
  {
    title: 'Tandem',
    subtitle: 'Gestión de proyectos con IA',
    description: 'Plataforma donde el cliente ve en tiempo real el progreso de su software. La IA divide el proyecto en fases automáticamente, gestiona presupuestos y centraliza la comunicación programador-cliente.',
    tags: ['Laravel', 'React','Supabase', 'TypeScript', 'PostgreSQL'],
    images: [
          '/img/Tandem/LandingPage.png',

    ],
    screenLabels: ['Landing'],
    status: 'En desarrollo',
    gradient: 'from-red-600 to-rose-500',
    color: '#E8352A',
    github: 'https://github.com/InakiGalanDev/tandem-app',
    demo: 'https://tandem-main-kk8oxg.laravel.cloud/',
  },
]

function ImageCarousel({ project }) {
  const [current, setCurrent] = useState(0)
  const total = project.images.length

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 5000)
    return () => clearInterval(timer)
  }, [total])

  const prev = () => setCurrent(c => (c - 1 + total) % total)
  const next = () => setCurrent(c => (c + 1) % total)

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '560px' }}>
      {/* Images */}
      {project.images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover object-top" />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
        <div className="flex items-center gap-2 mb-3">
            <div className={`inline-block px-4 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-xs font-bold`}>
                Proyecto Destacado
            </div>
            {project.status && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-bold text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block"></span>
                {project.status}
                </div>
            )}
        </div>
        <h3 className="text-3xl font-black mb-1">{project.title}</h3>
        <p style={{ color: project.color }} className="text-sm font-semibold mb-3">{project.subtitle}</p>
        <p className="text-slate-200 text-sm leading-relaxed mb-4 max-w-2xl">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">{tag}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            className="flex items-center gap-2 px-5 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-100 transition-all"
          >
            <FaGithub size={14} /> Ver Código
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-sm hover:bg-white/30 transition-all"
          >
            <ExternalLink className="w-4 h-4" /> Demo en Vivo
          </a>
        </div>
      </div>

      {/* Arrows — solo si hay más de 1 imagen */}
      {total > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-4 z-20 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
            <ChevronLeft className="w-4 h-4 text-slate-800" />
          </button>
          <button onClick={next} className="absolute right-4 top-4 z-20 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
            <ChevronRight className="w-4 h-4 text-slate-800" />
          </button>

          {/* Dots */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Label */}
      {total > 1 && (
        <div className="absolute top-4 right-16 z-20 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {current + 1} / {total}
        </div>
      )}
    </div>
  )
}

// ── MOBILE VERSION ──────────────────────────────────────────────
function MobileProjects({ dark }) {
  return (
    <div className="flex flex-col gap-6">
      {featuredProjects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`rounded-2xl overflow-hidden ${dark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-lg border border-slate-100'}`}
        >
          <div className="relative h-48 overflow-hidden">
            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <h3 className="text-xl font-black text-white">{project.title}</h3>
              <p className="text-sm" style={{ color: project.color }}>{project.subtitle}</p>
            </div>
          </div>
          <div className="p-5">
            <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-red-400/10 text-red-400 rounded-full text-xs font-mono">{tag}</span>
              ))}
            </div>
            <div className="flex gap-3">
                <a href={project.github}
                    onClick={e => { e.preventDefault(); window.open(project.github, '_blank') }}
                    className="flex items-center gap-2 px-5 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-100 transition-all"
                    >
                    <FaGithub size={14} /> Ver Código
                </a>

                <a href={project.demo}
                    onClick={e => { e.preventDefault(); window.open(project.demo, '_blank') }}
                    className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-sm hover:bg-white/30 transition-all"
                    >
                    <ExternalLink className="w-4 h-4" /> Demo en Vivo
                </a>

            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Projects() {
  const { dark } = useTheme()
  const [activeProject, setActiveProject] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="proyectos" className={`py-16 md:py-24 px-4 ${dark ? 'bg-[#0a0a0a]' : 'bg-gradient-to-b from-white to-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
            Proyectos Destacados
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4 md:mb-6" />
          <p className={`text-base md:text-xl max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            Soluciones reales desarrolladas para resolver problemas de negocio
          </p>
        </motion.div>

        {isMobile ? (
          <MobileProjects dark={dark} />
        ) : (
          <>
            {/* Tabs — solo si hay más de 1 proyecto */}
            {featuredProjects.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {featuredProjects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                      activeProject === index
                        ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg'
                        : dark
                          ? 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                          : 'bg-white text-slate-600 border border-slate-200 shadow-sm hover:text-slate-900'
                    }`}
                  >
                    {project.title}
                  </button>
                ))}
              </div>
            )}

            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <ImageCarousel project={featuredProjects[activeProject]} />
            </motion.div>

            {/* Mini cards — solo si hay más de 1 proyecto */}
            {featuredProjects.length > 1 && (
              <div className="grid md:grid-cols-3 gap-6">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveProject(index)}
                    className={`group rounded-2xl overflow-hidden transition-all cursor-pointer ${
                      activeProject === index
                        ? 'ring-2 ring-red-500 shadow-lg'
                        : dark
                          ? 'bg-white/5 border border-white/10 hover:border-red-500/40'
                          : 'bg-white shadow-lg hover:shadow-xl border border-slate-100'
                    }`}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-3">
                        <p className="text-white font-black text-sm">{project.title}</p>
                        <p className="text-xs" style={{ color: project.color }}>{project.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-red-400/10 text-red-400 rounded-full text-xs font-mono">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
