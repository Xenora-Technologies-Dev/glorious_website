import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { partnerBrands } from '@/content/brands'
import { useMemo } from 'react'

const SLIDER_COUNT = 30

export function DistributionBrandsSlider() {
  const logos = useMemo(() => partnerBrands.slice(0, SLIDER_COUNT), [])
  const track = useMemo(() => [...logos, ...logos], [logos])

  return (
    <section className="bg-cream py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="04b"
            eyebrow="Distribution"
            title="International brands we work with"
            copy="A selection of international brands in our trading and distribution conversations."
            className="max-w-2xl"
          />
          <Button href="/brands#distribution" variant="navy" size="md" className="shrink-0 self-start lg:self-auto">
            View more
          </Button>
        </div>
      </Container>

      {/* Continuous marquee - CSS only; pauses on hover; static grid when reduced-motion */}
      <div className="mt-12 motion-reduce:hidden">
        <div className="group/marquee overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 py-1 will-transform group-hover/marquee:[animation-play-state:paused]">
            {track.map((brand, index) => (
              <div
                key={`${brand.slug}-${index}`}
                className="flex h-[88px] w-[148px] shrink-0 items-center justify-center border border-line bg-ivory p-3 sm:h-[100px] sm:w-[168px]"
                aria-hidden={index >= logos.length}
              >
                <img
                  src={brand.logo}
                  alt={index < logos.length ? brand.name : ''}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reduced-motion fallback: static grid of the same logos */}
      <Container className="mt-12 hidden motion-reduce:block">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {logos.map((brand) => (
            <div
              key={brand.slug}
              className="flex aspect-[5/3] items-center justify-center border border-line bg-ivory p-3"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}