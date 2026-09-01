import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { PageHero } from '@/components/ui/PageHero'
import { getBrand } from '@/content/brands'
import { images } from '@/content/images'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { productHref, products } from '@/content/products'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Link, useParams } from 'react-router-dom'

export function BrandDetailPage() {
  const { brand } = useParams()
  const data = brand ? getBrand(brand) : undefined
  if (!data) return <NotFoundPage />

  const linkedProducts = products.filter((item) => item.brandSlug === data.slug)

  return (
    <>
      <Seo
        title={`${data.name} | Glorious Ascent`}
        description={`${data.name} is part of the Glorious Ascent brand portfolio presented in the company catalogue.`}
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
          `${data.name} appears in the Glorious Ascent catalogue. Product assignment, pack formats and origin are shown only where the catalogue states them.`
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
              <ImageReveal
                src={images[data.atmosphere]}
                alt=""
                className="h-[380px] w-full min-h-[240px]"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                {data.hasPortfolio ? 'Catalogue brand' : 'Artwork only'}
              </p>
              <h2 className="mt-4 font-display text-4xl text-navy">Catalogue presence</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {data.hasPortfolio
                  ? `${data.name} is presented as part of the Glorious Ascent brand house. A written brand history is not published here beyond what the catalogue supports.`
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
            <ul className="mt-10 space-y-4">
              {linkedProducts.map((item) => (
                <li key={item.slug} className="border-b border-line py-4">
                  <Link to={productHref(item)} className="font-display text-3xl text-navy hover:text-gold">
                    {item.name}
                    {item.packSize ? ` · ${item.packSize}` : ''}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-xl text-lg text-muted">
              Individual products are not assigned to this brand on the website, because those
              mappings were not confirmed from the catalogue file in this workspace. Request the
              current range for {data.name}.
            </p>
          )}
          <div className="mt-12">
            <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-muted">
              Formats
            </h3>
            <p className="mt-3 max-w-xl text-muted">
              Available pack formats are provided on request from the current catalogue.
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
