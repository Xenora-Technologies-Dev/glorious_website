import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { homeCategories } from '@/content/products'
import { images } from '@/content/images'
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
          copy="A focused FMCG food range. Scroll through the categories, then open a product page for catalogue detail."
        />
      </Container>

      <div ref={pinRef} className="lg:h-svh lg:overflow-hidden">
        <div
          ref={trackRef}
          className="hide-scrollbar mt-12 flex gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:mt-0 lg:h-full lg:w-max lg:items-center lg:overflow-visible lg:px-16"
        >
        {homeCategories.map((category) => (
          <Link
            key={category.slug}
            to={category.href}
            className="group relative h-[58vw] min-h-[280px] w-[78vw] shrink-0 overflow-hidden sm:h-[380px] sm:w-[320px] lg:h-[460px] lg:w-[340px]"
          >
            <img
              src={images[category.imageKey]}
              alt={`${category.name} — atmospheric food photography`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-navy-deep/45 transition-colors group-hover:bg-navy-deep/30" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <h3 className="font-display text-3xl text-ivory transition-transform duration-500 group-hover:-translate-y-1">
                {category.name}
              </h3>
              <ArrowUpRight className="size-5 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  )
}
