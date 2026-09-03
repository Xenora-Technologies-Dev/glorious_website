import { ProductVisual } from '@/components/products/ProductVisual'
import { Seo } from '@/components/seo/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { getBrand } from '@/content/brands'
import { breadcrumbJsonLd, productJsonLd } from '@/content/jsonld'
import {
  getCategory,
  getProduct,
  getRelatedProducts,
  productGallery,
  productHref,
  productImage,
} from '@/content/products'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { category, product: productSlug } = useParams()
  const product = productSlug ? getProduct(productSlug) : undefined
  const visualRef = useRef<HTMLDivElement>(null)
  const [shot, setShot] = useState(0)

  useEffect(() => {
    setShot(0)
  }, [productSlug])

  useGSAP(
    () => {
      if (!visualRef.current || prefersReducedMotion()) return
      gsap.fromTo(
        visualRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' },
      )
    },
    { dependencies: [productSlug], scope: visualRef },
  )

  if (!product || product.categorySlug !== category) return <NotFoundPage />

  const cat = getCategory(product.categorySlug)
  const brand = product.brandSlug ? getBrand(product.brandSlug) : undefined
  const related = getRelatedProducts(product)
  const shots = productGallery(product)
  const activeShot = shots[Math.min(shot, shots.length - 1)]

  return (
    <>
      <Seo
        title={`${product.name} | Glorious Ascent`}
        description={`${product.name} from the Glorious Ascent food range.`}
        image={productImage(product)}
        type="product"
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: cat?.name ?? 'Category', path: `/products/${product.categorySlug}` },
            { name: product.name, path: productHref(product) },
          ]),
          productJsonLd(product.name, productHref(product), productImage(product)),
        ]}
      />
      <section className="bg-ivory pt-[calc(7.5rem+env(safe-area-inset-top))] pb-20 sm:pt-32 lg:pt-40 lg:pb-32">
        <Container>
          <Breadcrumbs
            className="mb-10"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: cat?.name ?? 'Category', href: `/products/${product.categorySlug}` },
              { label: product.name },
            ]}
          />
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div ref={visualRef} className="lg:col-span-7">
              <ProductVisual
                product={product}
                src={activeShot}
                className="aspect-[4/5] lg:aspect-[5/6]"
                eager
              />
              {shots.length > 1 ? (
                <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
                  {shots.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setShot(index)}
                      aria-label={`View image ${index + 1} of ${product.name}`}
                      aria-pressed={index === Math.min(shot, shots.length - 1)}
                      className={
                        index === Math.min(shot, shots.length - 1)
                          ? 'border border-gold bg-ivory'
                          : 'border border-line bg-ivory hover:border-gold'
                      }
                    >
                      <ProductVisual product={product} src={src} compact className="aspect-square" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                {cat?.name}
              </p>
              {brand ? (
                <Link
                  to={brand.href}
                  className="mt-3 inline-flex items-center gap-3 text-sm tracking-[0.16em] uppercase text-navy hover:text-gold"
                >
                  <BrandLogo brand={brand} size="sm" />
                  {brand.name}
                </Link>
              ) : null}
              <h1 className="font-display mt-4 text-[clamp(2rem,5vw,3.75rem)] break-word text-navy">{product.name}</h1>
              <dl className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-muted">Available formats</dt>
                  <dd className="max-w-[min(14rem,52%)] text-right text-navy">
                    {product.packSize ?? 'Available on request'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-muted">Origin / manufacturing</dt>
                  <dd className="max-w-[min(14rem,52%)] text-right text-navy">
                    {product.origin ?? 'Available on request'}
                  </dd>
                </div>
              </dl>
              <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:w-full sm:[&>a]:w-auto">
                <Button href="/contact?intent=product" variant="navy" size="lg">
                  Request Product Information
                </Button>
                <Button href="/contact?intent=quote" variant="gold" size="lg">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {related.length > 0 ? (
        <section className="bg-cream py-24">
          <Container>
            <h2 className="font-display text-4xl text-navy">Related products</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} to={productHref(item)} className="group">
                  <div className="overflow-hidden">
                    <ProductVisual
                      product={item}
                      className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(1.5rem,3vw,1.875rem)] break-word text-navy group-hover:text-gold">
                    {item.name}
                  </h3>
                  {item.packSize ? <p className="mt-1 text-sm text-muted">{item.packSize}</p> : null}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
