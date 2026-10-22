// Guarda la posición del ratón en la tarjeta para el brillo .spotlight (app.css)
export const trackSpotlight = e => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
