import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { company } from '@/content/company'
import { images } from '@/content/images'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { fadeUp, prefersReducedMotion } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const journey = [
  {
    title: 'Manufacturing',
    copy: 'Private-label manufacturing for partners who need a finished food product under their own brand.',
    image: images.factory,
  },
  {
    title: 'Customization',
    copy: 'Customized shapes, formats and grammage, with value-added products as described in the catalogue.',
    image: images.manufacturing,
  },
  {
    title: 'Packaging',
    copy: 'Packaging materials and product protection planned for international supply.',
    image: images.packaging,
  },
  {
    title: 'Labeling',
    copy: 'Labeling, date coding and ink jetting in any language, together with export documentation.',
    image: images.shelf,
  },
  {
    title: 'Distribution',
    copy: 'Import, export and international supply from origin through to market.',
    image: images.warehouse,
  },
]

export function PrivateLabelPage() {
  const journeyRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!journeyRef.current || prefersReducedMotion()) return
      fadeUp(journeyRef.current.querySelectorAll('[data-journey]'), {
        y: 28,
        stagger: 0.08,
        trigger: journeyRef.current,
      })
    },
    { scope: journeyRef },
  )

  return (
    <>
      <Seo
        title={pageMeta.privateLabel.title}
        description={pageMeta.privateLabel.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Private Label', path: '/private-label' },
        ])}
      />
      <section className="bg-navy-deep pt-32 pb-20 text-ivory lg:pt-40 lg:pb-28">
        <Container>
          <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
            Private label
          </p>
          <SplitHeading
            lines={['Your Brand.', 'Our Supply Chain.']}
            className="font-display max-w-5xl text-[2.5rem] leading-[0.95] sm:text-7xl lg:text-8xl"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/72">
            Manufacture, customize, pack, label and supply — under your brand.
          </p>
          <div className="mt-10">
            <Button href="/contact?intent=private-label" variant="gold" size="lg">
              Discuss Your Brand
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <ImageReveal
                src={images.packaging}
                alt="Packaging prepared for private-label programmes"
                className="h-[420px] w-full min-h-[280px]"
              />
            </div>
            <div className="lg:col-span-6">
              <h2 className="font-display text-4xl text-navy">The proposition</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Glorious Ascent undertakes private-label manufacturing for partners who want a
                finished food product under their own brand — including customized shapes, grammage
                and value-added products.
              </p>
              <ul className="mt-10 space-y-4">
                {company.privateLabel.map((item) => (
                  <li key={item} className="border-b border-line pb-3 text-navy">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section ref={journeyRef} className="bg-cream py-20 sm:py-24 lg:py-32">
        <Container>
          <h2 className="font-display text-4xl text-navy sm:text-5xl">The journey</h2>
          <ol className="mt-12">
            {journey.map((item, index) => (
              <li
                key={item.title}
                data-journey
                className="grid items-center gap-6 border-t border-line py-10 lg:grid-cols-12"
              >
                <span className="font-display text-5xl text-gold/70 lg:col-span-2">
                  0{index + 1}
                </span>
                <div className="lg:col-span-5">
                  <h3 className="font-display text-3xl text-navy">{item.title}</h3>
                  <p className="mt-3 text-muted">{item.copy}</p>
                </div>
                <div className="overflow-hidden lg:col-span-5">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="sticky bottom-0 z-40 border-t border-gold/25 bg-navy-deep/95 text-ivory backdrop-blur-md">
        <Container className="flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
          <p className="font-display text-xl sm:text-2xl">Your Brand. Our Supply Chain.</p>
          <Button href="/contact?intent=private-label" variant="gold">
            Discuss Your Brand
          </Button>
        </Container>
      </div>
    </>
  )
}
