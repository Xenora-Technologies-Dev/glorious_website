import { company } from '@/content/company'
import { cn } from '@/lib/cn'
import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function WhatsAppFab() {
  const { pathname } = useLocation()
  const liftForSticky = pathname === '/private-label'
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current
      if (!root || !(event.target instanceof Node)) return
      if (!root.contains(event.target)) setOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={cn(
        'no-print fixed right-6 z-50',
        liftForSticky
          ? 'bottom-[calc(5.75rem+env(safe-area-inset-bottom))]'
          : 'bottom-[calc(1.5rem+env(safe-area-inset-bottom))]',
      )}
      style={{ marginRight: 'env(safe-area-inset-right)' }}
    >
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="WhatsApp numbers"
          className="absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(18rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-white/15 bg-navy-deep text-ivory shadow-xl"
        >
          <p className="border-b border-white/10 px-4 py-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-gold/90">
            Chat on WhatsApp
          </p>
          <ul>
            {company.whatsapp.map((item) => (
              <li key={item.id}>
                <a
                  role="menuitem"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="flex items-center gap-3 px-4 py-3.5 text-sm transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <span
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
                    aria-hidden="true"
                  >
                    <WhatsAppGlyph size={16} />
                  </span>
                  <span className="font-medium tracking-wide">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        aria-label={open ? 'Close WhatsApp options' : 'Open WhatsApp options'}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <WhatsAppGlyph size={28} />
      </button>
    </div>
  )
}

function WhatsAppGlyph({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
