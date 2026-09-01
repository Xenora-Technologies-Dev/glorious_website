import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' })

    const onMove = (event: MouseEvent) => {
      xTo(event.clientX - 8)
      yTo(event.clientY - 8)
    }

    gsap.set(dot, { autoAlpha: 1 })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-4 rounded-full border border-gold/80 opacity-0 mix-blend-difference md:block"
      aria-hidden="true"
    />
  )
}
