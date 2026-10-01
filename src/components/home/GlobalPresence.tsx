import { Container } from '@/components/ui/Container'
import { ExportWorldMap, ExportMarketsList, MapLegend } from '@/components/ui/ExportWorldMap'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { useRef } from 'react'

export function GlobalPresence() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root || prefersReducedMotion()) return

      gsap.from(root.querySelectorAll('[data-pin]'), {
        scale: 0.2,
        autoAlpha: 0,
        transformOrigin: 'center bottom',
        duration: 0.65,
        stagger: 0.035,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 68%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-navy py-20 text-ivory sm:py-24 lg:py-32">
      <Container>
        <SectionHeader
          index="07"
          eyebrow="Where we export"
          tone="light"
          title="Connecting Markets Across the World."
          copy="Glorious Ascent exports branded and private-label FMCG products from Dubai. We manage packaging, labeling and documentation so every shipment reaches our buyers ready for distribution."
        />
        <div className="mt-12 overflow-hidden border border-line-light bg-navy-deep">
          {/* Taller aspect on mobile so pins remain readable without SVG labels */}
          <div className="aspect-[5/4] min-h-[260px] sm:aspect-[3/2] sm:min-h-[280px] lg:aspect-[2/1] lg:min-h-[240px]">
            <ExportWorldMap />
          </div>
          <MapLegend />
          <ExportMarketsList />
        </div>
      </Container>
    </section>
  )
}
