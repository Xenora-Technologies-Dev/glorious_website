import { ProductVisual } from '@/components/products/ProductVisual'
import { getBrand } from '@/content/brands'
import { productHref, type Product } from '@/content/products'
import { cn } from '@/lib/cn'
import { Link } from 'react-router-dom'

type ProductCatalogueCardProps = {
  product: Product
  className?: string
  showBrand?: boolean
}

export function ProductCatalogueCard({
  product,
  className,
  showBrand = true,
}: ProductCatalogueCardProps) {
  const brand = product.brandSlug ? getBrand(product.brandSlug) : undefined

  return (
    <Link
      to={productHref(product)}
      className={cn(
        'group flex h-full flex-col overflow-hidden border border-line bg-cream transition-colors duration-300 hover:border-gold hover:bg-ivory',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-transparent sm:aspect-[4/5]">
        <ProductVisual
          product={product}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-line px-4 py-4 sm:px-5 sm:py-5">
        {showBrand && brand ? (
          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gold-muted">
            {brand.name}
          </p>
        ) : null}
        <h3 className="font-display text-[clamp(1.15rem,2.4vw,1.5rem)] leading-snug break-word text-navy transition-colors group-hover:text-gold">
          {product.name}
        </h3>
        {product.packSize ? (
          <p className="mt-auto pt-1 text-sm text-muted">{product.packSize}</p>
        ) : null}
      </div>
    </Link>
  )
}
