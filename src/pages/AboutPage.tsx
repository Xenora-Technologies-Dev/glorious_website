import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { PageHero } from '@/components/ui/PageHero'
import { Seo } from '@/components/seo/Seo'
import { company, whyStatements } from '@/content/company'
import { images } from '@/content/images'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import { prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { useRef } from 'react'

const pinPanels = [
  { title: 'Mission', copy: company.mission },
  { title: 'Vision', copy: company.vision },
  { title: 'Quality', copy: company.quality },
  { title: 'Customer focus', copy: company.service },
]

export function AboutPage() {
  const pinRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = pinRef.current
      if (!root) return
      const track = root.querySelector('[data-track]')
      if (!(track instanceof HTMLElement)) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion()) return
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            end: () => `+=${Math.max(0, track.scrollWidth - window.innerWidth)}`,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: pinRef },
  )

  return (
    <>
      <Seo
        title={pageMeta.about.title}
        description={pageMeta.about.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHero
        tone="dark"
        eyebrow="About"
        lines={['An international', 'FMCG trading house.']}
        copy={company.positioning}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <section className="bg-ivory py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-gold-muted lg:col-span-3">
              Our story
            </p>
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl text-navy sm:text-5xl">From source to shelf.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{company.story}</p>
              <p className="mt-6 text-lg leading-relaxed text-muted">{company.partnerships}</p>
            </div>
          </div>
          <div className="mt-16">
            <ImageReveal
              src={images.factory}
              alt="FMCG manufacturing atmosphere"
              className="h-[min(52vw,560px)] min-h-[220px] w-full"
            />
          </div>
        </Container>
      </section>

      <section ref={pinRef} className="bg-navy-deep text-ivory lg:overflow-hidden">
        <div data-track className="lg:flex lg:w-max">
          {pinPanels.map((panel) => (
            <article
              key={panel.title}
              data-panel
              className="flex min-h-[70svh] w-full shrink-0 flex-col justify-end px-4 py-16 sm:px-12 lg:h-svh lg:w-screen lg:px-16 lg:py-24"
            >
              <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
                {panel.title}
              </p>
              <p className="font-display max-w-4xl text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.08]">
                {panel.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <h2 className="font-display text-4xl text-navy sm:text-5xl">Why choose us</h2>
          <div className="mt-12">
            {whyStatements.map((item) => (
              <article key={item.index} className="grid gap-3 border-t border-line py-8 lg:grid-cols-12">
                <p className="text-gold-muted lg:col-span-2">{item.index}</p>
                <h3 className="font-display text-[clamp(1.5rem,3vw,1.875rem)] text-navy lg:col-span-3">{item.title}</h3>
                <p className="text-muted lg:col-span-7">{item.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="font-display text-4xl text-navy">Global approach</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Import, export and cross-trade, with offices in Dubai and London. Sourcing and
                manufacturing origins include Italy, Spain, India and the UAE.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <h2 className="font-display text-4xl text-navy">Quality</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{company.quality}</p>
            </div>
          </div>
          <div className="mt-16">
            <Button href="/contact" variant="navy" size="lg">
              Start a Conversation
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
