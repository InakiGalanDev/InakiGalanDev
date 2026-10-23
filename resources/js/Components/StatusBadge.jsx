import { useI18n } from '../i18n'

// Verde si el proyecto está en producción, ámbar si sigue en desarrollo
export default function StatusBadge({ status, className = '' }) {
  const { t } = useI18n()
  const live = status === 'production'

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
      live ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
    } ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${live ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      {t(`status.${status}`)}
    </span>
  )
}
