import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { insightCategories, insights } from '@/content/insights'
import { pageMeta } from '@/content/seo'
import { cn } from '@/lib/cn'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export function InsightsPage() {
  const [active, setActive] = useState('All')
  const filtered = useMemo(
    () => (active === 'All' ? insights : insights.filter((item) => item.category === active)),
    [active],
  )

  return (
    <>
      <Seo
        title={pageMeta.insights.title}
        description={pageMeta.insights.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
        ])}
      />
      <PageHero
        eyebrow="Insights"
        lines={['Notes from', 'the food trade.']}
        copy="Sample editorial pieces until Glorious Ascent publishes live articles. Every card is marked as a sample. Nothing here is presented as company news."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insights' },
        ]}
      />
      <section className="bg-cream pb-24 lg:pb-32">
        <Container>
          <div className="flex flex-wrap gap-2">
            {['All', ...insightCategories].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActive(item)}
                className={cn(
                  'h-10 px-4 text-[11px] font-semibold tracking-[0.16em] uppercase',
                  active === item ? 'bg-navy text-ivory' : 'text-navy hover:bg-ivory-deep',
                )}
                aria-pressed={active === item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                to={`/insights/${item.slug}`}
                className="group border-t border-line pt-6"
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-muted">
                  Sample · {item.category}
                </p>
                <h2 className="mt-4 font-display text-3xl text-navy group-hover:text-gold">
                  {item.title}
                </h2>
                <p className="mt-3 text-muted">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
