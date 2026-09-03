import { ProductVisual } from '@/components/products/ProductVisual'
import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { getCategory, getProductsByCategory, productHref } from '@/content/products'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

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
          <div className="mb-10 overflow-hidden border border-line bg-ivory lg:mb-14">
            <img
              src={data.image}
              alt={`${data.name} — Glorious Ascent range`}
              className="mx-auto aspect-[16/9] max-h-[min(52vw,420px)] w-full max-w-3xl object-contain p-6 sm:p-10"
            />
          </div>
          {items.map((product) => (
            <Link
              key={product.slug}
              to={productHref(product)}
              className="group grid grid-cols-12 items-center gap-4 border-b border-line py-8 sm:gap-6"
            >
              <div className="col-span-4 overflow-hidden sm:col-span-4">
                <div className="overflow-hidden">
                  <ProductVisual
                    product={product}
                    className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="col-span-7 sm:col-span-7">
                <h2 className="font-display text-[clamp(1.35rem,3.4vw,2.25rem)] break-word text-navy group-hover:text-gold">
                  {product.name}
                </h2>
                <p className="mt-3 hidden text-sm text-muted sm:block">
                  {product.packSize ?? 'Pack size and origin are available on request.'}
                </p>
              </div>
              <span className="col-span-1 flex justify-end">
                <ArrowUpRight className="size-5 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </Container>
      </section>
    </>
  )
}
