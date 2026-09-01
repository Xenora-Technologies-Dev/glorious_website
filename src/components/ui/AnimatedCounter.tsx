import { prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/cn'
import { useRef } from 'react'

type AnimatedCounterProps = {
  value: number
  suffix?: string
  prefix?: string
  label: string
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = numberRef.current
      if (!el) return

      if (prefersReducedMotion()) {
        el.textContent = `${prefix}${value}${suffix}`
        return
      }

      const state = { n: 0 }
      gsap.to(state, {
        n: value,
        duration: 1.6,
        ease: 'power2.out',
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.n)}${suffix}`
        },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('min-w-0', className)}>
      <span ref={numberRef} className="font-display text-5xl text-navy sm:text-6xl">
        {prefix}0{suffix}
      </span>
      <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-muted">{label}</p>
    </div>
  )
}
