import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/cn'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
  showHeading?: boolean
}

export function Modal({ open, onClose, children, title, className, showHeading = true }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useGSAP(
    () => {
      if (!open || !overlayRef.current || !panelRef.current) return
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 })
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      )
    },
    { dependencies: [open] },
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={title}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-navy-deep/70"
        onClick={onClose}
      />
      <div className="relative flex min-h-full items-center justify-center p-5">
        <div
          ref={panelRef}
          className={cn('relative w-full max-w-lg bg-ivory p-8 text-navy shadow-nav', className)}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 text-navy/50 hover:text-navy"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          {title && showHeading ? <h3 className="font-display mb-4 pr-10 text-3xl">{title}</h3> : null}
          {children}
        </div>
      </div>
    </div>
  )
}
