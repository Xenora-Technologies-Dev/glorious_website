import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { getInsight } from '@/content/insights'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useParams } from 'react-router-dom'

export function InsightDetailPage() {
  const { slug } = useParams()
  const item = slug ? getInsight(slug) : undefined
  if (!item) return <NotFoundPage />

  return (
    <>
      <Seo
        title={`${item.title} | Glorious Ascent Insights`}
        description={item.excerpt}
        type="article"
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: item.title, path: `/insights/${item.slug}` },
        ])}
      />
      <PageHero
        eyebrow={`Sample · ${item.category}`}
        lines={[item.title]}
        copy={item.excerpt}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/insights' },
          { label: item.title },
        ]}
      />
      <section className="bg-ivory pb-24 lg:pb-32">
        <Container>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            This is a clearly marked sample article. It is not a Glorious Ascent company
            announcement. When official insights are published, they will replace this placeholder
            copy.
          </p>
          <div className="mt-10">
            <Button href="/insights" variant="navy">
              All insights
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
