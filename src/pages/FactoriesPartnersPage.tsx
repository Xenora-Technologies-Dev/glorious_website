import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { breadcrumbJsonLd } from '@/content/jsonld'

const partners = [
  { name: 'Dachi', blurb: 'Manufacturing partner — product lines and certifications to be confirmed.' },
  { name: 'Dinesh Flavors', blurb: 'Manufacturing partner — product lines and certifications to be confirmed.' },
  { name: 'Aachi', blurb: 'Manufacturing partner — product lines and certifications to be confirmed.' },
  { name: 'Prime Fresh', blurb: 'Manufacturing partner — product lines and certifications to be confirmed.' },
  { name: 'Siam Food', blurb: 'Manufacturing partner — product lines and certifications to be confirmed.' },
]

export function FactoriesPartnersPage() {
  return (
    <>
      <Seo
        title="Factories & Partners | Glorious Ascent"
        description="Manufacturing and factory partners in the Glorious Ascent supply network."
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Factories & Partners', path: '/factories' },
        ])}
      />
      <PageHero
        eyebrow="Network"
        lines={['Factories &', 'Partners.']}
        copy="A growing manufacturing network supporting own brands, private label and distribution programmes. Partner profiles below are placeholders pending full details."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Factories & Partners' },
        ]}
        cta={{ label: 'Start a Conversation', href: '/contact?intent=partner' }}
      />
      <section className="bg-cream pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((item) => (
              <article
                key={item.name}
                className="border border-line bg-ivory px-6 py-8"
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-muted">
                  Partner
                </p>
                <h2 className="mt-3 font-display text-3xl text-navy">{item.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.blurb}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
