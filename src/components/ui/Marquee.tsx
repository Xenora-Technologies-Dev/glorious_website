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
  separator = '\u00B7',
  reducedCount = DEFAULT_REDUCED_COUNT,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const loop = [...items, ...items]
  const reducedItems = items.slice(0, Math.min(Math.max(reducedCount, 8), 12))

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // iOS/Safari can stall CSS animations after orientation/resize; nudge a restart.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let timer: ReturnType<typeof window.setTimeout> | undefined
    const restart = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const prev = track.style.animationName
        track.style.animationName = 'none'
        // Force reflow so Safari reapplies the keyframes
        void track.offsetWidth
        track.style.animationName = prev || ''
      }, 80)
    }

    window.addEventListener('orientationchange', restart)
    window.addEventListener('resize', restart, { passive: true })
    window.addEventListener('pageshow', restart)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('orientationchange', restart)
      window.removeEventListener('resize', restart)
      window.removeEventListener('pageshow', restart)
    }
  }, [])

  return (
    <div ref={rootRef} className={cn('min-w-0 overflow-hidden', className)}>
      {/* Animated track - hidden only when prefers-reduced-motion is set */}
      <div className="motion-reduce:hidden" aria-hidden="true">
        <div
          ref={trackRef}
          className={cn(speed === 'slow' ? 'ga-marquee-slow' : 'ga-marquee')}
          data-paused={!inView ? 'true' : 'false'}
        >
          {loop.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-6 pr-6 font-sans text-[12px] font-semibold tracking-[0.22em] uppercase"
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