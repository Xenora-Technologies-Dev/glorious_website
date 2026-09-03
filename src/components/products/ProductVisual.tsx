import { productImage, type Product } from '@/content/products'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/lib/cn'

type ProductVisualProps = {
  product: Product
  className?: string
  eager?: boolean
  src?: string
  compact?: boolean
}

export function ProductVisual({ product, className, eager, src, compact }: ProductVisualProps) {
  return (
    <SmartImage
      src={src ?? productImage(product)}
      alt={`${product.name}${product.packSize ? ` — ${product.packSize}` : ''}`}
      className={cn('h-full w-full bg-ivory', className)}
      imgClassName={cn('object-contain', compact ? 'p-1' : 'p-3 sm:p-5')}
      eager={eager}
    />
  )
}
