import { fadeUp } from '@/lib/animations'
import { cn } from '@/lib/cn'
import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  copy?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  index?: string
  /** Optional id for the h2 so the section can reference it via aria-labelledby. */
  titleId?: string
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = 'left',
  tone = 'dark',
  className,
  index,
  titleId,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      fadeUp(ref.current.querySelectorAll('[data-reveal]'), {
        stagger: 0.08,
        y: 28,
        trigger: ref.current,
      })
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className={cn('max-w-4xl', align === 'center' && 'mx-auto text-center', className)}
    >
      <div className="mb-6 flex items-center gap-4" data-reveal>
        {index ? (
          <span
            className={cn(
              'font-sans text-[11px] font-semibold tracking-[0.24em] uppercase',
              tone === 'dark' ? 'text-gold-muted' : 'text-gold',
            )}
          >
            {index}
          </span>
        ) : null}
        {eyebrow ? (
          <span
            className={cn(
              'font-sans text-[11px] font-semibold tracking-[0.24em] uppercase',
              tone === 'dark' ? 'text-muted' : 'text-gold-bright',
            )}
          >
            {eyebrow}
          </span>
        ) : null}
      </div>
      <h2
        id={titleId}
        data-reveal
        className={cn(
          'font-display text-[clamp(2.1rem,3.8vw+0.7rem,3.75rem)] leading-[1.08] tracking-[-0.02em]',
          tone === 'dark' ? 'text-navy' : 'text-ivory',
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          data-reveal
          className={cn(
            'mt-6 max-w-xl text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-muted' : 'text-ivory/72',
            align === 'center' && 'mx-auto',
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  )
}
