import { useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Check } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { featuredProjects, isLive } from '../data/projects'
import { trackSpotlight } from '../utils/spotlight'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import CommandPalette from '../Components/CommandPalette'
import { useI18n, projectUrl, sectionUrl } from '../i18n'

const CLAUDE = '#D97757'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function SectionTitle({ eyebrow, children, dark }) {
  return (
    <div className="mb-4">
      <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest mb-2">{eyebrow}</p>
      <h2 className={`text-2xl md:text-3xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>{children}</h2>
    </div>
  )
}

export default function Project({ slug, pageTitle }) {
  const { dark } = useTheme()
  const { locale, t, tr } = useI18n()
  const index = featuredProjects.findIndex(p => p.slug === slug)
  const project = featuredProjects[index]
  const next = featuredProjects[(index + 1) % featuredProjects.length]
  const live = isLive(project.demo)

  // Al navegar sin recargar, Laravel no vuelve a pintar el <title>; usamos el que calcula PortfolioController
  useEffect(() => {
    if (pageTitle) document.title = pageTitle
  }, [pageTitle])

  const muted = dark ? 'text-slate-400' : 'text-slate-600'
  const card = dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100 shadow-lg'

  return (
    <main className={dark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-slate-900'}>
      <Navbar />

      {/* Cabecera */}
      <header className="relative overflow-hidden px-4 pt-28 md:pt-32 pb-12">
        <div className={`hero-grid absolute inset-0 pointer-events-none ${dark ? 'hero-grid-dark' : 'hero-grid-light'}`} />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[28rem] rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: project.color }}
        />
        <div className="relative max-w-6xl mx-auto">
          <a href={sectionUrl(locale, 'proyectos')} className={`inline-flex items-center gap-2 text-sm mb-8 transition-colors ${dark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>
            <ArrowLeft className="w-4 h-4" /> {t('project.back')}
          </a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.ai && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg shadow-black/20" style={{ background: CLAUDE }}>
                  <Sparkles className="w-3.5 h-3.5" /> {tr(project.ai)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {t(`status.${project.status}`)}
              </span>
            </div>
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
              {project.title}
            </h1>
            <p className={`text-lg md:text-2xl font-semibold mb-8 max-w-3xl ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
              {tr(project.summary)}
            </p>
            <div className="flex flex-wrap gap-3">
              {live && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20">
                  <ExternalLink className="w-4 h-4" /> {t('project.visitSite')}
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold border-2 transition-all ${dark ? 'border-white/15 hover:border-emerald-400' : 'border-slate-200 hover:border-emerald-500'}`}>
                  <FaGithub className="w-4 h-4" /> {t('project.viewCode')}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Captura en marco de navegador */}
      <section className="px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117]"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            {live && (
              <span className="ml-3 px-3 py-0.5 rounded-md bg-white/5 text-xs font-mono text-slate-400 truncate">
                {project.demo.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </span>
            )}
          </div>
          <img src={project.images[0]} alt={`${t('project.screenshotAlt')} ${project.title}`} className="w-full block" />
        </motion.div>
      </section>

      {/* Reto, solución y ficha */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">
          <div className="space-y-12">
            <motion.div {...fadeUp}>
              <SectionTitle eyebrow={t('project.challengeEyebrow')} dark={dark}>{t('project.challengeTitle')}</SectionTitle>
              <p className={`text-base md:text-lg leading-relaxed ${muted}`}>{tr(project.challenge)}</p>
            </motion.div>

            <motion.div {...fadeUp}>
              <SectionTitle eyebrow={t('project.solutionEyebrow')} dark={dark}>{t('project.solutionTitle')}</SectionTitle>
              <p className={`text-base md:text-lg leading-relaxed mb-6 ${muted}`}>{tr(project.solution)}</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {tr(project.highlights).map(h => (
                  <li key={h} className={`flex items-start gap-3 p-4 rounded-2xl ${card}`}>
                    <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    </span>
                    <span className={`text-sm font-medium ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Ficha */}
          <aside>
            <div className={`lg:sticky lg:top-24 rounded-3xl p-6 ${card}`}>
              <dl className="space-y-5">
                {[
                  [t('project.client'), project.title],
                  [t('project.sector'), tr(project.subtitle)],
                  [t('project.type'), tr(project.type)],
                  [t('project.status'), t(`status.${project.status}`)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className={`text-xs font-mono uppercase tracking-widest mb-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</dt>
                    <dd className={`text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-800'}`}>{value}</dd>
                  </div>
                ))}
                <div>
                  <dt className={`text-xs font-mono uppercase tracking-widest mb-2 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{t('project.stack')}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-emerald-400/10 text-emerald-500 rounded-full text-xs font-mono">{tag}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Resultados: solo si hay datos en projects.json */}
      {project.results?.length > 0 && (
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <SectionTitle eyebrow={t('project.resultsEyebrow')} dark={dark}>{t('project.resultsTitle')}</SectionTitle>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {project.results.map(r => (
                <div key={tr(r.label)} className={`rounded-3xl p-6 ${card}`}>
                  <p className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">{tr(r.value)}</p>
                  <p className={`text-sm ${muted}`}>{tr(r.label)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Siguiente proyecto + contacto */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 md:gap-6">
          {next.slug !== project.slug && (
            <Link
              href={projectUrl(locale, next.slug)}
              onMouseMove={trackSpotlight}
              className={`group relative rounded-3xl overflow-hidden min-h-56 flex items-end p-6 ${card}`}
            >
              <img src={next.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/10" />
              <div className="relative text-white">
                <p className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-1">{t('project.next')}</p>
                <p className="text-2xl font-black flex items-center gap-2">
                  {next.title} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          )}
          <div className="rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white min-h-56">
            <div>
              <p className="text-2xl md:text-3xl font-black mb-2">{t('project.ctaTitle')}</p>
              <p className="text-emerald-50">{t('project.ctaText')}</p>
            </div>
            <a href={sectionUrl(locale, 'contacto')} className="self-start inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-colors">
              {t('project.ctaButton')} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <CommandPalette />
    </main>
  )
}
