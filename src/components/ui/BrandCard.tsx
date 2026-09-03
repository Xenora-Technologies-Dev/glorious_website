import { cn } from '@/lib/cn'
import { BrandLogo } from '@/components/ui/BrandLogo'
import type { Brand } from '@/content/brands'
import { Link } from 'react-router-dom'

type BrandCardProps = {
  brand: Brand
  className?: string
}

export function BrandCard({ brand, className }: BrandCardProps) {
  return (
    <Link
      to={brand.href}
      className={cn(
        'group flex min-h-[180px] flex-col justify-between border border-line px-6 py-6 transition-colors duration-300 hover:border-gold hover:bg-navy',
        className,
      )}
    >
      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-muted group-hover:text-gold">
        Brand
      </p>
      <BrandLogo brand={brand} size="md" plate />
      <h3 className="font-display text-3xl text-navy transition-colors group-hover:text-ivory">
        {brand.name}
      </h3>
    </Link>
  )
}
