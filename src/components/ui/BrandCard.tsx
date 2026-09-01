import { cn } from '@/lib/cn'
import { Link } from 'react-router-dom'

type BrandCardProps = {
  name: string
  href: string
  className?: string
}

export function BrandCard({ name, href, className }: BrandCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        'group flex min-h-[180px] items-end border border-line px-6 py-6 transition-colors duration-300 hover:border-gold hover:bg-navy',
        className,
      )}
    >
      <div>
        <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] uppercase text-muted group-hover:text-gold">
          Brand
        </p>
        <h3 className="font-display text-3xl text-navy transition-colors group-hover:text-ivory">
          {name}
        </h3>
      </div>
    </Link>
  )
}
