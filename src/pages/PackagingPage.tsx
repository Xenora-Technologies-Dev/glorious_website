import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { PageHero } from '@/components/ui/PageHero'
import { packagingSteps } from '@/content/company'
import { images } from '@/content/images'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import { prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { useRef, useState } from 'react'

const focus = [
  'Packaging',
  'Labeling',
  'Designing',
  'Packaging materials',
  'Product protection',
  'Documentation',
]

export function PackagingPage() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return
      gsap.from(ref.current.querySelectorAll('[data-focus]'), {
        y: 20,
        autoAlpha: 0,
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  const step = packagingSteps[active]

  return (
    <>
      <Seo
        title={pageMeta.packaging.title}
        description={pageMeta.packaging.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Packaging', path: '/packaging' },
        ])}
      />
      <PageHero
        tone="dark"
        eyebrow="Packaging"
        lines={['Packaging, labeling', 'and design.']}
        copy="An interactive journey through the five catalogue steps — from materials to documentation."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Packaging' },
        ]}
      />
      <section ref={ref} className="bg-ivory py-24 lg:py-32">
        <Container>
          <div className="flex flex-wrap gap-3">
            {focus.map((item) => (
              <span
                key={item}
                data-focus
                className="border border-line px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-navy"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ImageReveal
                src={images.packaging}
                alt="Packaged goods prepared for labeling"
                className="h-[420px] w-full"
              />
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                {packagingSteps.map((item, index) => (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActive(index)}
                    className={
                      active === index
                        ? 'h-11 px-4 bg-navy text-ivory text-[11px] font-semibold tracking-[0.16em] uppercase'
                        : 'h-11 px-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-navy hover:bg-ivory-deep'
                    }
                    aria-pressed={active === index}
                  >
                    {item.step}
                  </button>
                ))}
              </div>
              <h2 className="font-display mt-8 text-4xl text-navy">{step.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{step.copy}</p>
            </div>
          </div>
          <div className="mt-16">
            <Button href="/contact?intent=private-label" variant="navy" size="lg">
              Discuss Your Brand
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
