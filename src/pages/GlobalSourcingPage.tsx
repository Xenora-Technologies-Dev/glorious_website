import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { company, sourcingOrigins } from '@/content/company'
import { images } from '@/content/images'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'

const sections = [
  {
    title: 'Global sourcing',
    copy: 'Glorious Ascent sits between suppliers, manufacturers and international markets — sourcing FMCG products for trade, private label and distribution.',
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
        copy="Glorious Ascent sources and moves FMCG products internationally — from origin through packaging and into market."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Global Sourcing' },
        ]}
        cta={{ label: 'Become a Partner', href: '/contact?intent=partner' }}
      />
      <section className="bg-navy py-20 text-ivory sm:py-24 lg:py-32">
        <Container>
          <div className="overflow-hidden border border-line-light bg-navy-deep">
            <div className="relative aspect-[5/4] sm:aspect-[2/1] lg:aspect-[2/1]">
              <img
                src={images.globalSourcingHub}
                alt="Global sourcing network from UAE hub linking UK, India, Ethiopia and partner markets"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
            <div className="border-t border-line-light px-5 py-4 md:hidden sm:px-8">
              <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/80">
                Sourcing origins
              </p>
              <ul className="flex flex-wrap gap-2">
                {sourcingOrigins.map((origin) => (
                  <li
                    key={origin.id}
                    className="inline-flex items-center gap-1.5 border border-line-light px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-ivory/85"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {origin.name}
                  </li>
                ))}
              </ul>
            </div>
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
