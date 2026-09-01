import { ProductVisual } from '@/components/products/ProductVisual'
import { Seo } from '@/components/seo/Seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getBrand } from '@/content/brands'
import { breadcrumbJsonLd, productJsonLd } from '@/content/jsonld'
import {
  getCategory,
  getProduct,
  getRelatedProducts,
  productHref,
  productImage,
} from '@/content/products'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { category, product: productSlug } = useParams()
  const product = productSlug ? getProduct(productSlug) : undefined
  const visualRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <Seo
        title={`${product.name} | Glorious Ascent`}
        description={`${product.name} from the Glorious Ascent food catalogue.`}
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
      <section className="bg-ivory pt-32 pb-24 lg:pt-40 lg:pb-32">
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
            <div ref={visualRef} className="overflow-hidden lg:col-span-7">
              <ProductVisual product={product} className="aspect-[4/5] lg:aspect-[5/6]" eager />
            </div>
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                {cat?.name}
              </p>
              {brand ? (
                <Link
                  to={brand.href}
                  className="mt-3 inline-block text-sm tracking-[0.16em] uppercase text-navy hover:text-gold"
                >
                  {brand.name}
                </Link>
              ) : null}
              <h1 className="font-display mt-4 text-[2.4rem] text-navy sm:text-6xl">{product.name}</h1>
              <dl className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-muted">Available formats</dt>
                  <dd className="max-w-[14rem] text-right text-navy">
                    {product.packSize ?? 'Available on request from the current catalogue'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-muted">Origin / manufacturing</dt>
                  <dd className="max-w-[14rem] text-right text-navy">
                    {product.origin ?? 'Stated only where the catalogue specifies it'}
                  </dd>
                </div>
              </dl>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                  <h3 className="mt-4 font-display text-3xl text-navy group-hover:text-gold">
                    {item.name}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
