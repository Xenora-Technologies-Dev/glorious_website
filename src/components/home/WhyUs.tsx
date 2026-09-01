import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { whyStatements } from '@/content/company'
import { fadeUp } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export function WhyUs() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      fadeUp(ref.current.querySelectorAll('[data-why]'), {
        y: 24,
        stagger: 0.08,
        trigger: ref.current,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-cream py-24 lg:py-32">
      <Container>
        <SectionHeader
          index="07"
          eyebrow="Why Glorious Ascent"
          title="Built around the customer’s success."
        />
        <div className="mt-16">
          {whyStatements.map((item) => (
            <article
              key={item.index}
              data-why
              className="grid gap-4 border-t border-line py-10 lg:grid-cols-12"
            >
              <p className="font-display text-3xl text-gold-muted lg:col-span-2">{item.index}</p>
              <h3 className="font-display text-3xl text-navy lg:col-span-3">{item.title}</h3>
              <p className="max-w-xl text-base leading-relaxed text-muted lg:col-span-7">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
