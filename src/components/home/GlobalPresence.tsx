import { Container } from '@/components/ui/Container'
import { ExportWorldMap } from '@/components/ui/ExportWorldMap'
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
          index="02"
          eyebrow="Where we export"
          tone="light"
          title="From Dubai to the world."
          copy="Glorious Ascent exports branded and private-label food products from Dubai. We manage packaging, labeling and documentation so every shipment reaches our buyers ready for distribution."
        />
        <div className="mt-12 overflow-hidden border border-line-light bg-navy-deep">
          <div className="aspect-[2/1] min-h-[240px]">
            <ExportWorldMap />
          </div>
        </div>
      </Container>
    </section>
  )
}
