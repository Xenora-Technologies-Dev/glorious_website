import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { packagingSteps } from '@/content/company'
import { images } from '@/content/images'
import { fadeUp } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export function Packaging() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      fadeUp(ref.current.querySelectorAll('[data-step]'), {
        y: 24,
        stagger: 0.08,
        trigger: ref.current,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-ivory py-24 lg:py-32">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold-muted">
              06 · How we deliver
            </p>
            <h2 className="font-display text-4xl leading-[1.08] text-navy sm:text-5xl">
              Finished, labelled, and ready for market.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Packaging, labeling and design as a five-step path from materials to documentation.
            </p>
            <div className="mt-10 hidden lg:block">
              <ImageReveal
                src={images.warehouse}
                alt="Warehouse distribution for packaged FMCG products"
                className="h-[360px] w-full"
              />
            </div>
          </div>
          <ol className="lg:col-span-7">
            {packagingSteps.map((item) => (
              <li
                key={item.step}
                data-step
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-line py-6 first:border-t"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gold-muted">
                  {item.step}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12">
          <Button href="/packaging" variant="navy">
            See the packaging journey
          </Button>
        </div>
      </Container>
    </section>
  )
}
