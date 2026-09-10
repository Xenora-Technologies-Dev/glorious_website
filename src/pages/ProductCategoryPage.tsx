import { ProductCatalogueGrid } from '@/components/products/ProductCatalogueGrid'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { getCategory, getProductsByCategory } from '@/content/products'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useParams } from 'react-router-dom'

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
