import { productImage, type Product } from '@/content/products'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/lib/cn'

type ProductVisualProps = {
  product: Product
  className?: string
  eager?: boolean
}

export function ProductVisual({ product, className, eager }: ProductVisualProps) {
  return (
    <SmartImage
      src={product.catalogueImage ?? productImage(product)}
      fallback={product.catalogueImage ? productImage(product) : undefined}
      alt={`${product.name} — Glorious Ascent catalogue range`}
      className={cn('h-full w-full', className)}
      eager={eager}
    />
  )
}
