import { CategoryTileGrid } from '@/components/products/CategoryTileGrid'
import { ProductCatalogueGrid } from '@/components/products/ProductCatalogueGrid'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import {
  getProductsByCategory,
  productCategories,
  products,
} from '@/content/products'
import { cn } from '@/lib/cn'
import { useMemo, useState } from 'react'

export function ProductsPage() {
  const [active, setActive] = useState('all')
  const filtered = useMemo(
    () => (active === 'all' ? products : getProductsByCategory(active)),
    [active],
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
        copy="A focused FMCG range for international trade. Specifications are available on request."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' },
        ]}
        cta={{ label: 'Request Product Information', href: '/contact?intent=product' }}
      />
      <section className="bg-cream pb-16 lg:pb-20">
        <Container>
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                Categories
              </p>
              <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">Shop by category</h2>
            </div>
          </div>
          <CategoryTileGrid categories={productCategories} />
        </Container>
      </section>
      <section className="bg-ivory pb-24 lg:pb-32">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                Catalogue
              </p>
              <h2 className="mt-2 font-display text-3xl text-navy sm:text-4xl">All products</h2>
            </div>
            <div
              role="group"
              aria-label="Filter products"
              className="hide-scrollbar flex gap-2 overflow-x-auto py-1 sm:flex-wrap sm:overflow-visible"
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
          </div>
          <ProductCatalogueGrid products={filtered} />
        </Container>
      </section>
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
