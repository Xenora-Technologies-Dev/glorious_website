import { fadeUp } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/cn'
import { useRef, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      fadeUp(ref.current, { delay, y, trigger: ref.current })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
