import { ProductVisual } from '@/components/products/ProductVisual'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { productCategories, productHref, type Product } from '@/content/products'

type ProductLookProps = {
  product: Product
  onClose: () => void
}

export function ProductLook({ product, onClose }: ProductLookProps) {
  const category = productCategories.find((item) => item.slug === product.categorySlug)

  return (
    <Modal open onClose={onClose} title={product.name} showHeading={false} className="max-w-4xl overflow-hidden p-0">
      <div className="grid lg:grid-cols-2">
        <ProductVisual product={product} className="aspect-[4/5]" eager />
        <div className="flex flex-col justify-end px-6 py-10 sm:px-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-muted">
            {category?.name}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Pack formats and origin are listed only where the catalogue states them.
          </p>
          <dl className="mt-8 space-y-4 border-t border-line pt-6 text-sm">
            <div className="flex justify-between gap-4 border-b border-line pb-4">
              <dt className="text-muted">Available formats</dt>
              <dd className="text-right text-navy">
                {product.packSize ?? 'On request'}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Origin</dt>
              <dd className="text-right text-navy">{product.origin ?? 'On request'}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact?intent=product" variant="navy">
              Request Product Information
            </Button>
            <Button href={productHref(product)} variant="ghost" magnetic={false}>
              View product
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
