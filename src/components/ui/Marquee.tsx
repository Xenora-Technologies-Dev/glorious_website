import { cn } from '@/lib/cn'
import { useEffect, useRef, useState } from 'react'

type MarqueeProps = {
  items: readonly string[]
  className?: string
  speed?: 'normal' | 'slow'
  separator?: string
}

export function Marquee({
  items,
  className,
  speed = 'normal',
  separator = '·',
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const loop = [...items, ...items]

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
    <div ref={rootRef} className={cn('overflow-hidden', className)}>
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

      {/* Static fallback for prefers-reduced-motion */}
      <div className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-2 py-0.5 motion-reduce:flex" aria-hidden="true">
        {items.map((item) => (
          <span
            key={item}
            className="font-sans text-[12px] font-semibold tracking-[0.22em] uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
