import { ProductLook } from '@/components/products/ProductLook'
import { ProductVisual } from '@/components/products/ProductVisual'
import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import {
  getProductsByCategory,
  productCategories,
  productHref,
  products,
  type Product,
} from '@/content/products'
import { cn } from '@/lib/cn'
import { prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function ProductsPage() {
  const [active, setActive] = useState('all')
  const [preview, setPreview] = useState<Product>(products[0])
  const [look, setLook] = useState<Product | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const filtered = useMemo(
    () => (active === 'all' ? products : getProductsByCategory(active)),
    [active],
  )

  useGSAP(
    () => {
      if (!listRef.current || prefersReducedMotion()) return
      gsap.fromTo(
        listRef.current.querySelectorAll('[data-product-row]'),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.04, ease: 'power4.out' },
      )
    },
    { dependencies: [active] },
  )

  return (
    <>
      <Seo
        title={pageMeta.products.title}
        description={pageMeta.products.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ])}
      />
      <PageHero
        eyebrow="Products"
        lines={['Products for', 'Every Market.']}
        copy="An editorial catalogue. Specifications appear only where the company catalogue states them."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' },
        ]}
        cta={{ label: 'Request Product Information', href: '/contact?intent=product' }}
      />
      <section className="bg-cream pb-24 lg:pb-32">
        <Container>
          <div
            role="group"
            aria-label="Filter products"
            className="hide-scrollbar sticky top-[72px] z-20 -mx-5 mb-6 flex gap-2 overflow-x-auto bg-cream/95 px-5 py-3 backdrop-blur-md sm:top-20 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            <FilterChip label="All" active={active === 'all'} onClick={() => setActive('all')} />
            {productCategories.map((category) => (
              <FilterChip
                key={category.slug}
                label={category.navLabel}
                active={active === category.slug}
                onClick={() => setActive(category.slug)}
              />
            ))}
          </div>
          <div className="grid gap-12 lg:grid-cols-12">
            <div ref={listRef} className="lg:col-span-7">
              {filtered.map((product) => (
                <div
                  key={product.slug}
                  data-product-row
                  className="group grid grid-cols-12 items-center gap-4 border-b border-line py-5"
                  onMouseEnter={() => setPreview(product)}
                >
                  <button
                    type="button"
                    onClick={() => setLook(product)}
                    onFocus={() => setPreview(product)}
                    className="col-span-4 overflow-hidden sm:col-span-2"
                    aria-label={`Quick look: ${product.name}`}
                  >
                    <div className="overflow-hidden">
                      <ProductVisual
                        product={product}
                        className="aspect-square transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </button>
                  <Link
                    to={productHref(product)}
                    onFocus={() => setPreview(product)}
                    className="col-span-7 sm:col-span-8"
                  >
                    <p className="text-[10px] tracking-[0.18em] uppercase text-gold-muted sm:text-[11px]">
                      {productCategories.find((item) => item.slug === product.categorySlug)?.name}
                    </p>
                    <h2 className="mt-1 font-display text-[1.5rem] text-navy group-hover:text-gold sm:text-4xl">
                      {product.name}
                    </h2>
                  </Link>
                  <Link
                    to={productHref(product)}
                    className="col-span-1 flex justify-end"
                    aria-label={`View ${product.name}`}
                  >
                    <ArrowUpRight className="size-4 text-navy/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                  </Link>
                </div>
              ))}
            </div>
            <aside className="hidden lg:col-span-5 lg:block">
              <div className="sticky top-28">
                <button
                  type="button"
                  className="block w-full"
                  onClick={() => setLook(preview)}
                  aria-label={`Quick look: ${preview.name}`}
                >
                  <ProductVisual product={preview} className="aspect-[4/5]" />
                </button>
                <p className="mt-5 font-display text-4xl text-navy">{preview.name}</p>
                <p className="mt-3 text-sm text-muted">
                  Catalogue specifications available on request.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={productHref(preview)} variant="navy">
                    View product
                  </Button>
                  <Button href="/contact?intent=product" variant="ghost" magnetic={false}>
                    Request Product Information
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      {look ? <ProductLook product={look} onClose={() => setLook(null)} /> : null}
    </>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'h-10 shrink-0 px-4 text-[11px] font-semibold tracking-[0.16em] uppercase',
        active ? 'bg-navy text-ivory' : 'bg-transparent text-navy hover:bg-ivory-deep',
      )}
    >
      {label}
    </button>
  )
}
