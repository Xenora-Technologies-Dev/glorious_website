import { cn } from '@/lib/cn'

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
  const loop = [...items, ...items]

  return (
    <div className={cn('overflow-hidden', className)} aria-hidden="true">
      <div
        className={cn(
          'flex w-max items-center',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
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
  )
}
