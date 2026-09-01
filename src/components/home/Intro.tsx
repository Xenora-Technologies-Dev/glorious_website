import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { company } from '@/content/company'
import { images } from '@/content/images'

export function Intro() {
  return (
    <section id="who-we-are" className="bg-ivory py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              index="01"
              eyebrow="Who we are"
              title={
                <>
                  From source
                  <br />
                  to shelf.
                </>
              }
              copy={company.story}
            />
          </div>
          <div className="lg:col-span-5">
            <p className="font-display text-3xl leading-snug text-navy italic sm:text-4xl">
              “{company.motto}”
            </p>
            <p className="mt-6 text-sm tracking-[0.18em] uppercase text-muted">
              Business philosophy
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ImageReveal
              src={images.oliveGrove}
              alt="Olive grove used as atmospheric imagery for global food sourcing"
              className="h-[58vw] max-h-[680px] min-h-[280px] w-full"
            />
          </div>
          <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:pl-4">
            <ul className="space-y-3">
              {company.capabilities.slice(0, 6).map((item) => (
                <li
                  key={item}
                  className="border-b border-line pb-3 text-[13px] tracking-[0.14em] uppercase text-navy"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div>
              <p className="max-w-sm text-base leading-relaxed text-muted">{company.quality}</p>
              <div className="mt-8">
                <Button href="/contact" variant="navy">
                  Start a Conversation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
