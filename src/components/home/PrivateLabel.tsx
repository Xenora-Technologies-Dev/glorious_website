import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { images } from '@/content/images'

const journey = ['Manufacturing', 'Customization', 'Packaging', 'Labeling', 'Distribution']

export function PrivateLabel() {
  return (
    <section className="bg-navy-deep py-20 text-ivory sm:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
              05 · Private label
            </p>
            <h2 className="font-display text-[clamp(2.3rem,6vw,4.5rem)] leading-[1.02]">
              Your Brand.
              <br />
              Our Supply Chain.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/72">
              Private-label manufacturing, packing, labeling and international supply — finished
              under your brand.
            </p>
            <ol className="mt-10 space-y-0 border-t border-line-light">
              {journey.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline justify-between gap-4 border-b border-line-light py-4"
                >
                  <span className="text-[11px] tracking-[0.18em] uppercase text-gold/70">
                    0{index + 1}
                  </span>
                  <span className="flex-1 font-display text-2xl">{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Button href="/contact?intent=private-label" variant="gold" size="lg">
                Discuss Your Brand
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <ImageReveal
              src={images.privateLabel}
              alt="Be a Brand Owner Today — private-label packaging formats ready for your brand"
              className="aspect-[5/6] w-full max-h-[640px] bg-ivory"
              imgClassName="object-contain object-center"
              parallaxAmount={0}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
