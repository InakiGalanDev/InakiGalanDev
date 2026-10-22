// Los datos viven en projects.json para que Laravel también los lea (rutas y SEO de /proyectos/{slug}).
// Campos de cada caso: challenge, solution, highlights y results (si results está vacío, esa sección no se muestra).
import projects from './projects.json'

export const featuredProjects = projects

export const isLive = url => Boolean(url && url !== '#')
