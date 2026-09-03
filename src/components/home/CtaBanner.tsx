import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { conversionPaths } from '@/content/navigation'

export function CtaBanner() {
  return (
    <section className="bg-navy py-24 text-ivory lg:py-32">
      <Container>
        <p className="mb-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
          07 · Let’s work together
        </p>
        <h2 className="font-display max-w-5xl text-[clamp(2.1rem,5vw,4.5rem)] leading-[1.05]">
          Let’s Build Your Next Food Supply.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70">
          Product information, quotations, private-label programmes and distribution
          partnerships begin with a direct conversation.
        </p>
        <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row [&>a]:w-full sm:[&>a]:w-auto">
          <Button href="/contact" variant="gold" size="lg">
            Start a Conversation
          </Button>
          <Button href="/contact?intent=quote" variant="outline" size="lg">
            Request a Quote
          </Button>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-line-light pt-8 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
          {conversionPaths.map((path) => (
            <Button key={path.href} href={path.href} variant="ghost" magnetic={false}>
              {path.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  )
}
