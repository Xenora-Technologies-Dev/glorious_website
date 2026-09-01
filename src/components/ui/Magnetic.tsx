import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const node = ref.current
      if (!node) return
      if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
        return
      }

      const xTo = gsap.quickTo(node, 'x', { duration: 0.55, ease: 'power3' })
      const yTo = gsap.quickTo(node, 'y', { duration: 0.55, ease: 'power3' })

      const onMove = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect()
        const relX = event.clientX - rect.left - rect.width / 2
        const relY = event.clientY - rect.top - rect.height / 2
        xTo(relX * strength)
        yTo(relY * strength)
      }

      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      node.addEventListener('mousemove', onMove)
      node.addEventListener('mouseleave', onLeave)

      return () => {
        node.removeEventListener('mousemove', onMove)
        node.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('inline-flex', className)}>
      {children}
    </div>
  )
}
