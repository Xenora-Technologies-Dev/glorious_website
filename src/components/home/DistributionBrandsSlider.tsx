import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { partnerBrands } from '@/content/brands'
import { useEffect, useMemo, useRef, useState } from 'react'

const SLIDER_COUNT = 30

export function DistributionBrandsSlider() {
  const logos = useMemo(() => partnerBrands.slice(0, SLIDER_COUNT), [])
  const track = useMemo(() => [...logos, ...logos], [logos])
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = marqueeRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

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

      {/* Continuous marquee - CSS only; pauses on hover; hidden under reduced-motion */}
      <div ref={marqueeRef} className="mt-12 motion-reduce:hidden">
        <div className="ga-marquee-pause overflow-hidden">
          <div
            className="ga-marquee gap-3 py-1"
            data-paused={!inView ? 'true' : 'false'}
          >
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

      {/* Reduced-motion: horizontal scrollport on coarse (phones); static grid on fine pointer */}
      <div className="mt-12 hidden motion-reduce:block">
        <div className="hidden pointer-coarse:block">
          <div className="relative w-full min-w-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-cream to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-cream to-transparent"
            />
            <div className="scrollport-x hide-scrollbar flex gap-3 px-4 pb-2 pe-10 sm:px-8 sm:pe-12 lg:px-16 lg:pe-16">
              {logos.map((brand) => (
                <div
                  key={brand.slug}
                  className="flex h-[88px] w-[148px] shrink-0 items-center justify-center border border-line bg-ivory p-3 sm:h-[100px] sm:w-[168px]"
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
          </div>
        </div>
        <Container className="pointer-coarse:hidden">
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
      </div>
    </section>
  )
}