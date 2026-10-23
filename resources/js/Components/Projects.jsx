import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from '@inertiajs/react'
import { ExternalLink, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { featuredProjects, isLive } from '../data/projects'
import { trackSpotlight } from '../utils/spotlight'
import { useI18n, projectUrl } from '../i18n'
import ProjectVideo from './ProjectVideo'
import StatusBadge from './StatusBadge'

function ImageCarousel({ project, dark }) {
  const { locale, t, tr } = useI18n()
  const [current, setCurrent] = useState(0)
  const total = project.images.length
  const labels = tr(project.screenLabels) ?? []

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 5000)
    return () => clearInterval(timer)
  }, [total])

  const prev = () => setCurrent(c => (c - 1 + total) % total)
  const next = () => setCurrent(c => (c + 1) % total)
  const muted = dark ? 'text-slate-400' : 'text-slate-600'

  return (
    <div className={`grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-8 lg:gap-10 items-center rounded-3xl p-6 lg:p-8 ${
      dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100 shadow-xl'
    }`}>
      {/* Texto */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.ai && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D97757] text-white shadow-lg shadow-black/10">
              <Sparkles className="w-3.5 h-3.5" /> {tr(project.ai)}
            </span>
          )}
          <StatusBadge status={project.status} />
        </div>
        <h3 className={`text-3xl font-black mb-1 ${dark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
        <p style={dark ? { color: project.color } : undefined} className={`text-sm font-semibold mb-4 ${dark ? '' : 'text-slate-500'}`}>{tr(project.subtitle)}</p>
        <p className={`text-sm leading-relaxed mb-5 ${muted}`}>{tr(project.description)}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-emerald-400/10 text-emerald-500 rounded-full text-xs font-mono">{tag}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={projectUrl(locale, project.slug)}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-full font-bold text-sm hover:bg-emerald-400 transition-all"
          >
            {t('projects.viewCase')} <ArrowRight className="w-4 h-4" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${
                dark ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-700'
              }`}
            >
              <FaGithub size={14} /> {t('projects.viewCode')}
            </a>
          )}
          {isLive(project.demo) && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm border transition-all ${
                dark ? 'border-white/15 text-white hover:border-emerald-400' : 'border-slate-200 text-slate-800 hover:border-emerald-500'
              }`}
            >
              <ExternalLink className="w-4 h-4" /> {project.status === 'production' ? t('projects.viewSite') : t('projects.liveDemo')}
            </a>
          )}
        </div>
      </div>

      {/* Captura completa, en su proporción real, dentro de un marco de navegador */}
      <div className="order-first lg:order-last min-w-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117]">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          {isLive(project.demo) && (
            <span className="ml-3 px-3 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-slate-400 truncate">
              {project.demo.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
          )}
          {total > 1 && <span className="ml-auto text-[11px] font-mono text-slate-500">{current + 1} / {total}</span>}
        </div>
        <div className="relative">
          {project.video ? (
            <ProjectVideo key={project.video} src={project.video} poster={project.images[0]} label={project.title} className="w-full aspect-[16/10] object-cover block" />
          ) : project.images.map((img, i) => (
            <img
              key={img}
              src={img}
              alt={`${project.title} — ${labels[i] ?? i + 1}`}
              className={`w-full h-auto block transition-opacity duration-700 ${i === 0 ? 'relative' : 'absolute inset-0'} ${i === current ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          {total > 1 && (
            <>
              <button onClick={prev} aria-label="‹" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
                <ChevronLeft className="w-4 h-4 text-slate-800" />
              </button>
              <button onClick={next} aria-label="›" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
                <ChevronRight className="w-4 h-4 text-slate-800" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MOBILE VERSION ──────────────────────────────────────────────
function MobileProjects({ dark }) {
  const { locale, t, tr } = useI18n()
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
          <div className="relative overflow-hidden">
            {project.video
              ? <ProjectVideo src={project.video} poster={project.images[0]} label={project.title} className="w-full aspect-[16/10] object-cover block" />
              : <img src={project.images[0]} alt={project.title} className="w-full h-auto block" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <h3 className="text-xl font-black text-white">{project.title}</h3>
              <p className="text-sm" style={{ color: project.color }}>{tr(project.subtitle)}</p>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.ai && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D97757] text-white shadow-lg shadow-black/20">
                  <Sparkles className="w-3.5 h-3.5" /> {tr(project.ai)}
                </span>
              )}
              <StatusBadge status={project.status} />
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{tr(project.description)}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-red-400/10 text-red-400 rounded-full text-xs font-mono">{tag}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
                <Link
                    href={projectUrl(locale, project.slug)}
                    className="flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-full font-bold text-sm hover:bg-emerald-400 transition-all"
                    >
                    {t('projects.viewCase')} <ArrowRight className="w-4 h-4" />
                </Link>
                {project.github && (
                    <a href={project.github}
                        onClick={e => { e.preventDefault(); window.open(project.github, '_blank') }}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${
                          dark ? 'bg-white text-slate-900 hover:bg-slate-100' : 'border border-slate-300 text-slate-900 hover:bg-slate-50'
                        }`}
                        >
                        <FaGithub size={14} /> {t('projects.viewCode')}
                    </a>
                )}

                {isLive(project.demo) && (
                  <a href={project.demo}
                      onClick={e => { e.preventDefault(); window.open(project.demo, '_blank') }}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${
                        dark ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30' : 'bg-slate-900 text-white hover:bg-slate-700'
                      }`}
                      >
                      <ExternalLink className="w-4 h-4" /> {project.status === 'production' ? t('projects.viewSite') : t('projects.liveDemo')}
                  </a>
                )}

            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Projects() {
  const { dark } = useTheme()
  const { t, tr } = useI18n()
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
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4 md:mb-6" />
          <p className={`text-base md:text-xl max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('projects.subtitle')}
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
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
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
              <ImageCarousel project={featuredProjects[activeProject]} dark={dark} />
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
                    onMouseMove={trackSpotlight}
                    className={`group relative rounded-2xl overflow-hidden transition-all cursor-pointer ${
                      activeProject === index
                        ? 'ring-2 ring-emerald-500 shadow-lg'
                        : dark
                          ? 'bg-white/5 border border-white/10 hover:border-emerald-500/40'
                          : 'bg-white shadow-lg hover:shadow-xl border border-slate-100'
                    }`}
                  >
                    <div className="spotlight absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative h-32 overflow-hidden">
                      <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-3">
                        <p className="text-white font-black text-sm">{project.title}</p>
                        <p className="text-xs" style={{ color: project.color }}>{tr(project.subtitle)}</p>
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
