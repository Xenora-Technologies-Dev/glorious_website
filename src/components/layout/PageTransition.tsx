import { prefersReducedMotion } from '@/lib/animations'
import { gsap } from '@/lib/gsap'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const node = curtainRef.current
    if (!node) return
    if (first.current) {
      first.current = false
      gsap.set(node, { yPercent: -100 })
      return
    }
    if (prefersReducedMotion()) return

    const tl = gsap.timeline()
    tl.fromTo(
      node,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.38, ease: 'power4.inOut' },
    ).to(node, { yPercent: -100, duration: 0.5, ease: 'power4.inOut' })
  }, [location.pathname])

  return (
    <div
      ref={curtainRef}
      className="pointer-events-none fixed inset-0 z-[70] bg-navy-deep"
      style={{ transform: 'translateY(-100%)' }}
      aria-hidden="true"
    />
  )
}
