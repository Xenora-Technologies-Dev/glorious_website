import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found | Glorious Ascent"
        description="This page is not on the Glorious Ascent website."
      />
      <section className="flex min-h-[80svh] items-center bg-navy-deep text-ivory">
        <Container>
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
            404
          </p>
          <h1 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.05]">
            This page is not on the map.
          </h1>
          <p className="mt-6 max-w-md text-ivory/70">
            The route you requested does not exist. Return home or start a commercial conversation.
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col flex-wrap gap-3 sm:max-w-none sm:flex-row [&>a]:w-full sm:[&>a]:w-auto">
            <Button href="/" variant="gold">
              Back home
            </Button>
            <Button href="/contact" variant="outline">
              Contact
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
