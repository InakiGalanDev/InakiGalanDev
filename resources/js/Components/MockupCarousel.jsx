import { useState, useEffect } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export default function MockupCarousel({ project }) {
  const [current, setCurrent] = useState(0)

  // Total slides = imagen real (si existe) + mockups
  const hasRealImage = !!project.image
  const totalSlides = hasRealImage ? project.screens.length + 1 : project.screens.length
  const allLabels = hasRealImage ? ['Vista real', ...project.screenLabels] : project.screenLabels

  useEffect(() => {
    setCurrent(0)
  }, [project.title])

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % totalSlides), 5000)
    return () => clearInterval(timer)
  }, [totalSlides])

  const prev = () => setCurrent(c => (c - 1 + totalSlides) % totalSlides)
  const next = () => setCurrent(c => (c + 1) % totalSlides)

  // Determina qué mostrar en el slide actual
  const isRealImageSlide = hasRealImage && current === 0
  const mockupIndex = hasRealImage ? current - 1 : current
  const Screen = !isRealImageSlide ? project.screens[mockupIndex] : null

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '560px' }}>
      <div style={{ height: '100%', position: 'relative' }}>

        {/* Imagen real de la app */}
        {isRealImageSlide ? (
          <img
            src={project.image}
            alt={`${project.title} — vista real`}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <Screen />
        )}

        {/* Overlay gradiente para el contenido inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Contenido inferior */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
          <div className={`inline-block px-4 py-1 bg-gradient-to-r ${project.gradient} rounded-full text-xs font-bold mb-3`}>
            Proyecto Destacado
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-1">{project.title}</h3>
          <p className="text-sm font-semibold mb-2" style={{ color: project.color }}>{project.subtitle}</p>
          <p className="text-slate-200 text-sm leading-relaxed mb-4 max-w-2xl hidden md:block">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">{tag}</span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-100 transition-all"
              >
                <FaGithub size={14} /> Ver Código
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-sm hover:bg-white/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Ver web
              </a>
            )}
            {(!project.demo || project.demo === '#') && (
              <span className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/50 rounded-full text-sm">
                Próximamente
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Flechas */}
      <button onClick={prev} className="absolute left-4 top-4 z-20 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
        <ChevronLeft className="w-4 h-4 text-slate-800" />
      </button>
      <button onClick={next} className="absolute right-4 top-4 z-20 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
        <ChevronRight className="w-4 h-4 text-slate-800" />
      </button>

      {/* Labels de navegación */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center px-16">
        {allLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              i === current
                ? 'bg-white text-slate-900'
                : 'bg-white/30 text-white hover:bg-white/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
