import { ProductCatalogueGrid } from '@/components/products/ProductCatalogueGrid'
import { ProductVisual } from '@/components/products/ProductVisual'
import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { PageHero } from '@/components/ui/PageHero'
import { getBrand } from '@/content/brands'
import { images } from '@/content/images'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { products } from '@/content/products'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useParams } from 'react-router-dom'

export function BrandDetailPage() {
  const { brand } = useParams()
  const data = brand ? getBrand(brand) : undefined
  if (!data) return <NotFoundPage />

  const linkedProducts = products.filter((item) => item.brandSlug === data.slug)

  return (
    <>
      <Seo
        title={`${data.name} | Glorious Ascent`}
        description={`${data.name} is part of the Glorious Ascent brand portfolio.`}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Brands', path: '/brands' },
          { name: data.name, path: data.href },
        ])}
      />
      <PageHero
        tone="dark"
        eyebrow="Brand"
        lines={[data.name]}
        copy={
          data.note ??
          `${data.name} is part of the Glorious Ascent brand house. Product lines and pack formats are available on request.`
        }
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Brands', href: '/brands' },
          { label: data.name },
        ]}
        cta={{ label: 'Request Product Information', href: '/contact?intent=product' }}
      />
      <section className="bg-ivory py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              {linkedProducts[0] ? (
                <ProductVisual
                  product={linkedProducts[0]}
                  className="h-[min(58vw,380px)] w-full min-h-[220px] border border-line"
                  eager
                />
              ) : (
                <ImageReveal
                  src={images[data.atmosphere]}
                  alt=""
                  className="h-[min(58vw,380px)] w-full min-h-[220px]"
                />
              )}
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <BrandLogo brand={data} size="xl" eager className="mb-8" />
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                {data.hasPortfolio ? 'House brand' : 'On request'}
              </p>
              <h2 className="mt-4 font-display text-4xl text-navy">The brand</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {data.hasPortfolio
                  ? `${data.name} is part of the Glorious Ascent brand house, offered alongside private-label programmes for partners who need a finished food product under their own name.`
                  : data.note}
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-cream py-20 sm:py-24 lg:py-32">
        <Container>
          <h2 className="font-display text-4xl text-navy">Product portfolio</h2>
          {linkedProducts.length > 0 ? (
            <ProductCatalogueGrid
              products={linkedProducts}
              showBrand={false}
              className="mt-10"
            />
          ) : (
            <p className="mt-6 max-w-xl text-lg text-muted">
              The current {data.name} range is available on request. Share the products you need and we
              will confirm pack formats, origin and lead time.
            </p>
          )}
          <div className="mt-12">
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-muted">
              Formats
            </h3>
            <p className="mt-3 max-w-xl text-muted">
              Pack formats for {data.name} are confirmed with each enquiry.
            </p>
            <div className="mt-8">
              <Button href="/contact?intent=quote" variant="navy">
                Request a Quote
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
