import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
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
          copy="Brands as they appear in the company catalogue. Hover imagery is atmospheric, not packaging photography."
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={brand.href}
              data-brand
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-ivory px-7 py-8 sm:min-h-[300px]"
            >
              <img
                src={images[brand.atmosphere]}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-navy-deep/0 transition-colors duration-500 group-hover:bg-navy-deep/50" />
              <p className="relative mb-8 text-[10px] font-semibold tracking-[0.22em] uppercase text-muted group-hover:text-gold">
                {brand.hasPortfolio ? 'Catalogue brand' : 'Artwork only'}
              </p>
              <h3 className="relative font-display text-3xl text-navy transition-colors group-hover:text-ivory sm:text-4xl">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
