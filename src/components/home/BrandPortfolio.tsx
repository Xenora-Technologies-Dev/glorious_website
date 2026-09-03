import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { brands } from '@/content/brands'
import { images } from '@/content/images'
import { fadeUp } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export function BrandPortfolio() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      fadeUp(ref.current.querySelectorAll('[data-brand]'), {
        y: 28,
        stagger: 0.08,
        trigger: ref.current,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-ivory py-24 lg:py-32">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="Our brands"
          title="A house of food brands."
          copy="Owned and private-label brands from the Glorious Ascent house. Hover to see the atmosphere behind each name."
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={brand.href}
              data-brand
              className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-ivory px-6 py-8 sm:min-h-[300px] sm:px-7"
            >
              <img
                src={images[brand.atmosphere]}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-navy-deep/0 transition-colors duration-500 group-hover:bg-navy-deep/55" />
              <p className="relative text-[10px] font-semibold tracking-[0.22em] uppercase text-muted group-hover:text-gold">
                {brand.hasPortfolio ? 'House brand' : 'On request'}
              </p>
              <div className="relative flex flex-1 items-center py-6">
                <BrandLogo
                  brand={brand}
                  size="lg"
                  plate
                  className="shadow-none transition duration-500 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                />
              </div>
              <h3 className="relative font-display text-[clamp(1.6rem,3vw,2.25rem)] break-word text-navy transition-colors group-hover:text-ivory">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
