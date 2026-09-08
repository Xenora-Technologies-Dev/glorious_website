import { ProductCatalogueCard } from '@/components/products/ProductCatalogueCard'
import type { Product } from '@/content/products'
import { cn } from '@/lib/cn'

type ProductCatalogueGridProps = {
  products: Product[]
  className?: string
  showBrand?: boolean
}

export function ProductCatalogueGrid({
  products,
  className,
  showBrand = true,
}: ProductCatalogueGridProps) {
  if (products.length === 0) return null

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6',
        className,
      )}
    >
      {products.map((product) => (
        <ProductCatalogueCard key={product.slug} product={product} showBrand={showBrand} />
      ))}
    </div>
  )
}
