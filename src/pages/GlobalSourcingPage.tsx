import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { WorldMap } from '@/components/ui/WorldMap'
import { company, sourcingOrigins } from '@/content/company'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import { prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { useRef } from 'react'

const sections = [
  {
    title: 'Global sourcing',
    copy: 'Glorious Ascent sits between suppliers, manufacturers and international markets — sourcing food products for trade, private label and distribution.',
  },
  {
    title: 'Supplier network',
    copy: 'Work is built with trusted manufacturing partners. Origins include Italy, Spain, India and the UAE, alongside other sources as each programme requires.',
  },
  {
    title: 'Quality focus',
    copy: company.quality,
  },
  {
    title: 'Product development',
    copy: 'Private-label programmes can include product development, customized formats, grammage and value-added products.',
  },
  {
    title: 'Import & export',
    copy: 'Import, export and cross-trade, with sea, air and land forwarding support including documentation, consolidations, inspection and labeling.',
  },
  {
    title: 'Distribution',
    copy: 'International supply for partners who need a finished product in market, not only a factory conversation.',
  },
]

export function GlobalSourcingPage() {
  const mapRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!mapRef.current || prefersReducedMotion()) return
      gsap.from(mapRef.current.querySelectorAll('[data-origin]'), {
        scale: 0.5,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: mapRef.current, start: 'top 75%' },
      })
    },
    { scope: mapRef },
  )

  return (
    <>
      <Seo
        title={pageMeta.sourcing.title}
        description={pageMeta.sourcing.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Global Sourcing', path: '/global-sourcing' },
        ])}
      />
      <PageHero
        tone="dark"
        eyebrow="Global sourcing"
        lines={['A bridge between', 'origin and market.']}
        copy="Glorious Ascent sources and moves FMCG food products internationally — from origin through packaging and into market."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Global Sourcing' },
        ]}
        cta={{ label: 'Become a Partner', href: '/contact?intent=partner' }}
      />
      <section className="bg-navy py-20 text-ivory sm:py-24 lg:py-32">
        <Container>
          <div ref={mapRef} className="relative aspect-[16/10] overflow-hidden border border-line-light bg-navy-deep sm:aspect-[16/9]">
            <WorldMap className="absolute inset-0 h-full w-full text-gold" />
            <svg viewBox="0 0 100 56" className="relative h-full w-full" aria-hidden="true">
              {sourcingOrigins.map((origin) => (
                <g key={origin.id} data-origin>
                  <circle cx={origin.x} cy={origin.y - 6} r={1.4} fill="#c6a56a" />
                  <text
                    x={origin.x}
                    y={origin.y - 8.5}
                    textAnchor="middle"
                    fill="#f4efe4"
                    fontSize="2.6"
                    fontFamily="Manrope, sans-serif"
                  >
                    {origin.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Container>
      </section>
      <section className="bg-ivory py-20 sm:py-24 lg:py-32">
        <Container>
          {sections.map((item) => (
            <article key={item.title} className="grid gap-4 border-t border-line py-10 lg:grid-cols-12">
              <h2 className="font-display text-3xl text-navy lg:col-span-4">{item.title}</h2>
              <p className="text-lg leading-relaxed text-muted lg:col-span-7">{item.copy}</p>
            </article>
          ))}
          <ul className="mt-8 max-w-xl space-y-4 text-muted">
            {company.forwarding.map((item) => (
              <li key={item} className="border-b border-line pb-4">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Button href="/contact?intent=partner" variant="navy" size="lg">
              Become a Partner
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
