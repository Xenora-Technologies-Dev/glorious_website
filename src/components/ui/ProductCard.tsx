import { cn } from '@/lib/cn'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

type ProductCardProps = {
  name: string
  category: string
  href: string
  image?: string
  className?: string
}

export function ProductCard({ name, category, href, image, className }: ProductCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        'group relative flex min-h-[280px] flex-col justify-end overflow-hidden border-b border-line pb-6 pt-10 transition-colors',
        className,
      )}
    >
      {image ? (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-navy-deep/55" />
        </div>
      ) : null}
      <div className="relative z-10">
        <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted group-hover:text-gold">
          {category}
        </p>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-3xl text-navy group-hover:text-ivory sm:text-4xl">
            {name}
          </h3>
          <ArrowUpRight className="mb-1 size-5 text-navy/40 transition-colors group-hover:text-gold" />
        </div>
      </div>
    </Link>
  )
}
