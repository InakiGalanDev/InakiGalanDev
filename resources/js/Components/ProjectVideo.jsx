import { useEffect, useRef, useState } from 'react'

// Vídeo de demostración de un proyecto: sin sonido, en bucle y solo mientras está en pantalla.
// Con "reducir movimiento" activado no arranca solo y muestra los controles.
export default function ProjectVideo({ src, poster, label, className = '' }) {
  const ref = useRef(null)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  )

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true // React no siempre pone el atributo muted, y sin él el navegador bloquea el autoplay
    if (reduceMotion || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.25 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [src, reduceMotion])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      controls={reduceMotion}
      preload={reduceMotion ? 'none' : 'metadata'}
      className={className}
    />
  )
}
