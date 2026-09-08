import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { brands } from '@/content/brands'
import { images } from '@/content/images'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import { gsap, useGSAP } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function BrandsPage() {
  const [active, setActive] = useState(brands[0].slug)
  const current = brands.find((brand) => brand.slug === active) ?? brands[0]
  const imageRef = useRef<HTMLImageElement>(null)
  const washRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.08, autoAlpha: 0.35 },
          { scale: 1, autoAlpha: 1, duration: 0.85, ease: 'power4.out' },
        )
      }
      if (washRef.current) {
        gsap.fromTo(
          washRef.current,
          { autoAlpha: 0.2 },
          { autoAlpha: 1, duration: 0.7, ease: 'power3.out' },
        )
      }
    },
    { dependencies: [active] },
  )

  return (
    <>
      <Seo
        title={pageMeta.brands.title}
        description={pageMeta.brands.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Brands', path: '/brands' },
        ])}
      />
      <PageHero
        eyebrow="Brands"
        lines={['The brand', 'house.']}
        copy="Owned and private-label brands from the Glorious Ascent house."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Brands' },
        ]}
      />
      <section className="bg-navy-deep text-ivory">
        <Container className="grid min-h-[70svh] gap-10 py-16 lg:grid-cols-12 lg:py-0">
          <div className="relative aspect-[16/10] overflow-hidden lg:hidden">
            <img
              src={images[current.atmosphere]}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-gold/15" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
                {current.hasPortfolio ? 'House brand' : 'On request'}
              </p>
              <div className="mt-4 w-fit">
                <BrandLogo brand={current} size="md" plate />
              </div>
              <p className="mt-3 font-display text-3xl">{current.name}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center lg:col-span-5 lg:min-h-[70svh]">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={brand.href}
                onMouseEnter={() => setActive(brand.slug)}
                onFocus={() => setActive(brand.slug)}
                className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 border-b border-line-light py-5 first:border-t"
              >
                <BrandLogo brand={brand} size="sm" plate />
                <span
                  className={
                    active === brand.slug
                      ? 'font-display text-[clamp(1.5rem,4vw,3rem)] text-gold'
                      : 'font-display text-[clamp(1.5rem,4vw,3rem)] text-ivory/55 transition-colors duration-500 group-hover:text-ivory'
                  }
                >
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="relative hidden overflow-hidden lg:col-span-7 lg:block lg:min-h-[70svh]">
            <img
              ref={imageRef}
              src={images[current.atmosphere]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              ref={washRef}
              className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/35 to-gold/20"
            />
            <div className="absolute inset-x-0 bottom-0 p-10">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
                {current.hasPortfolio ? 'House brand' : 'On request'}
              </p>
              <div className="mt-5 w-fit">
                <BrandLogo brand={current} size="lg" plate />
              </div>
              <p className="mt-4 font-display text-3xl">{current.name}</p>
              <p className="mt-3 max-w-md text-sm text-ivory/75">
                {current.note ??
                  `${current.name} is part of the Glorious Ascent brand house. Product lines are confirmed on request.`}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
