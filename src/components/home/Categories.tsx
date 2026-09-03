import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { homeCategories } from '@/content/products'
import { pinHorizontal, prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export function Categories() {
  const ref = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pin = pinRef.current
      const track = trackRef.current
      if (!pin || !track) return

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion()) return
        pinHorizontal(track, pin)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-cream py-24 lg:overflow-hidden lg:py-0">
      <Container className="lg:pt-28">
        <SectionHeader
          index="03"
          eyebrow="What we offer"
          title={
            <>
              Food categories
              <br />
              for trade.
            </>
          }
          copy="A focused FMCG food range. Browse the categories, then open a product page for the full detail."
        />
      </Container>

      <div ref={pinRef} className="lg:h-svh lg:overflow-hidden">
        <div
          ref={trackRef}
          className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:px-8 lg:mt-0 lg:h-full lg:w-max lg:items-center lg:overflow-visible lg:px-16"
        >
          {homeCategories.map((category) => (
            <Link
              key={category.slug}
              to={category.href}
              className="group relative flex h-[58vw] min-h-[240px] w-[min(78vw,320px)] shrink-0 snap-start flex-col overflow-hidden border border-line bg-ivory sm:h-[380px] sm:w-[320px] lg:h-[460px] lg:w-[340px]"
            >
              <div className="relative min-h-0 flex-1">
                <img
                  src={category.image}
                  alt={`${category.name} — Glorious Ascent range`}
                  className="h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-105 sm:p-7"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex items-end justify-between bg-navy-deep px-5 py-4">
                <h3 className="font-display text-2xl text-ivory sm:text-3xl">{category.name}</h3>
                <ArrowUpRight className="size-5 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
