import { useEffect, ReactNode, KeyboardEvent, MouseEvent } from 'react'
import ReactDOM from 'react-dom'

import s from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown as unknown as EventListener)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListener)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <div
      className={s.modalOverlay}
      onClick={handleOverlayClick}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOverlayClick(e as unknown as MouseEvent)
        }
      }}
    >
      <div className={s.modalContent}>
        <button className={s.modalClose} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  )
}
