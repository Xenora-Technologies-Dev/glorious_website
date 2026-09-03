import { splitLines } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/cn'
import { useRef } from 'react'

type SplitHeadingProps = {
  lines: string[]
  as?: 'h1' | 'h2'
  className?: string
  lineClassName?: string
}

export function SplitHeading({
  lines,
  as: Tag = 'h1',
  className,
  lineClassName,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      splitLines(ref.current.querySelectorAll('[data-line]'))
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={cn('break-word', className)}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden">
          <span data-line className={cn('block will-transform', lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
