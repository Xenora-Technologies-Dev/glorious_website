import { ProductCatalogueGrid } from '@/components/products/ProductCatalogueGrid'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { getCategory, getProductsByCategory } from '@/content/products'
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

export function ProductCategoryPage() {
  const { category } = useParams()
  const data = category ? getCategory(category) : undefined
  if (!data) return <NotFoundPage />

  const items = getProductsByCategory(data.slug)

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
          {data.slug === 'non-food' ? (
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
          {items.length > 0 ? (
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
