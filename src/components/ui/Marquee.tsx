import { cn } from '@/lib/cn'
import { useEffect, useRef, useState } from 'react'

type MarqueeProps = {
  items: readonly string[]
  className?: string
  speed?: 'normal' | 'slow'
  separator?: string
  /** Max names shown under prefers-reduced-motion (single-line strip). */
  reducedCount?: number
}

const DEFAULT_REDUCED_COUNT = 10

export function Marquee({
  items,
  className,
  speed = 'normal',
  separator = '·',
  reducedCount = DEFAULT_REDUCED_COUNT,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const loop = [...items, ...items]
  const reducedItems = items.slice(0, Math.min(Math.max(reducedCount, 8), 12))

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={cn('min-w-0 overflow-hidden', className)}>
      {/* Animated track — hidden when user prefers reduced motion */}
      <div className="motion-reduce:hidden" aria-hidden="true">
        <div
          className={cn(
            'flex w-max items-center',
            speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
            !inView && '[animation-play-state:paused]',
          )}
        >
          {loop.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-6 pr-6 font-sans text-[12px] font-semibold tracking-[0.22em] uppercase"
            >
              <span>{item}</span>
              <span className="text-gold">{separator}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Reduced-motion: short curated single-line strip (no flex-wrap of full catalogue) */}
      <div
        className="hidden min-w-0 overflow-hidden motion-reduce:block"
        aria-hidden="true"
      >
        <p className="truncate whitespace-nowrap font-sans text-[12px] font-semibold tracking-[0.22em] uppercase">
          {reducedItems.map((item, index) => (
            <span key={item}>
              {index > 0 ? <span className="mx-3 text-gold">{separator}</span> : null}
              {item}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}