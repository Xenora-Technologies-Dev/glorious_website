import { ProductCatalogueGrid } from '@/components/products/ProductCatalogueGrid'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'
import {
  frozenSections,
  getCategory,
  getFrozenProductsByGroup,
  getProductsByCategory,
} from '@/content/products'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useParams } from 'react-router-dom'

const nonFoodHighlights = [
  {
    title: 'Built for busy kitchens',
    copy: 'Cling film and disposable formats designed for foodservice, catering and retail packing lines that need reliable wrap every shift.',
  },
  {
    title: 'Cleaner today, greener tomorrow',
    copy: 'Glorious Pack focuses on practical disposables that support hygiene standards while reducing unnecessary waste in day-to-day operations.',
  },
  {
    title: 'Trade-ready programmes',
    copy: 'Own-brand and private-label disposable lines for distributors who want a complete non-food offer alongside ambient and frozen FMCG.',
  },
]

const frozenHighlights = [
  {
    title: 'Local and export',
    copy: 'Tash frozen lines support UAE and regional trade as well as containerised export programmes with clear pack specs.',
  },
  {
    title: 'Cold-chain ready',
    copy: 'Chicken, meat, seafood and prepared items packed for freezer logistics from warehouse through to the buyer.',
  },
  {
    title: 'Foodservice packs',
    copy: 'Cut chicken, processed meat, fish fillets and breaded sides sized for kitchens, distributors and retail freezers.',
  },
]

export function ProductCategoryPage() {
  const { category } = useParams()
  const data = category ? getCategory(category) : undefined
  if (!data) return <NotFoundPage />

  const items = getProductsByCategory(data.slug)
  const isFrozen = data.slug === 'frozen'
  const isNonFood = data.slug === 'non-food'

  return (
    <>
      <Seo
        title={`${data.name} | Glorious Ascent`}
        description={data.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: data.name, path: `/products/${data.slug}` },
        ])}
      />
      <PageHero
        eyebrow="Products"
        lines={[data.name]}
        copy={data.description}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: data.name },
        ]}
        cta={{ label: 'Request Product Information', href: '/contact?intent=product' }}
      />
      <section className="bg-cream pb-24 lg:pb-32">
        <Container>
          <div className="mb-10 overflow-hidden border border-line bg-transparent lg:mb-14">
            <img
              src={data.image}
              alt={`${data.name} — Glorious Ascent range`}
              className="mx-auto aspect-[16/9] max-h-[min(52vw,420px)] w-full max-w-3xl object-contain p-6 sm:p-10"
            />
          </div>

          {isNonFood ? (
            <div className="mb-14 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                  Glorious Pack
                </p>
                <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">
                  Disposables for modern trade
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  Glorious Pack is our non-food house brand for cling film and everyday disposables.
                  We supply foodservice, retail and institutional partners who need consistent pack
                  quality, clear sizing and dependable lead times — starting with Glory Wrap and
                  expanding across the disposable aisle.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
                {nonFoodHighlights.map((item) => (
                  <article key={item.title} className="border border-line bg-ivory px-5 py-6">
                    <h3 className="font-display text-xl text-navy">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {isFrozen ? (
            <>
              <div className="mb-16 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                    Tash
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">
                    Frozen & protein, organised for trade
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted">
                    Browse the Tash frozen programme by chicken, meat, seafood and breaded or
                    prepared lines. Each group is packed for foodservice, retail and export partners
                    who need clear categories and reliable cold-chain supply.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
                  {frozenHighlights.map((item) => (
                    <article key={item.title} className="border border-line bg-ivory px-5 py-6">
                      <h3 className="font-display text-xl text-navy">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
                    </article>
                  ))}
                </div>
              </div>

              <nav className="mb-12 flex flex-wrap gap-3" aria-label="Frozen categories">
                {frozenSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="border border-line bg-ivory px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-navy transition-colors hover:border-gold hover:text-gold"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="space-y-20">
                {frozenSections.map((section) => {
                  const sectionProducts = getFrozenProductsByGroup(section.id)
                  return (
                    <section key={section.id} id={section.id} className="scroll-mt-28">
                      <div className="mb-8 grid items-center gap-8 border-t border-line pt-12 lg:grid-cols-12">
                        <div className="overflow-hidden border border-line bg-ivory p-4 lg:col-span-4">
                          <img
                            src={section.image}
                            alt=""
                            className="mx-auto aspect-square max-h-56 w-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="lg:col-span-8">
                          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                            {section.eyebrow}
                          </p>
                          <h2 className="mt-3 font-display text-3xl text-navy sm:text-4xl">
                            {section.title}
                          </h2>
                          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                            {section.copy}
                          </p>
                        </div>
                      </div>
                      {sectionProducts.length > 0 ? (
                        <ProductCatalogueGrid products={sectionProducts} />
                      ) : (
                        <p className="text-muted">Products in this group are available on request.</p>
                      )}
                    </section>
                  )
                })}
              </div>
            </>
          ) : items.length > 0 ? (
            <ProductCatalogueGrid products={items} />
          ) : (
            <p className="max-w-xl text-lg text-muted">
              Products in this category are available on request.
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
