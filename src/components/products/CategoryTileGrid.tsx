import type { ProductCategory } from '@/content/products'
import { cn } from '@/lib/cn'
import { Link } from 'react-router-dom'

type CategoryTileGridProps = {
  categories: ProductCategory[]
  className?: string
}

export function CategoryTileGrid({ categories, className }: CategoryTileGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6',
        className,
      )}
    >
      {categories.map((category) => (
        <Link
          key={category.slug}
          to={`/products/${category.slug}`}
          className="group flex flex-col overflow-hidden border border-line bg-cream transition-colors duration-300 hover:border-gold hover:bg-ivory"
        >
          <div className="relative aspect-square overflow-hidden bg-transparent sm:aspect-[4/5]">
            <img
              src={category.image}
              alt={`${category.name} — Glorious Ascent range`}
              className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105 sm:p-6"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="border-t border-line px-4 py-4 sm:px-5 sm:py-5">
            <h3 className="font-display text-[clamp(1.15rem,2.4vw,1.5rem)] leading-snug text-navy transition-colors group-hover:text-gold">
              {category.name}
            </h3>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] uppercase text-muted group-hover:text-navy">
              View range
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
