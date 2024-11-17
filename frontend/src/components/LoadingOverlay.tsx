import s from './LoadingOverlay.module.css'

interface LoadingOverlayProps {
  show: boolean
}

export function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null

  return (
    <div className={s.loadingOverlay}>
      <div className={s.loader}></div>
    </div>
  )
}
