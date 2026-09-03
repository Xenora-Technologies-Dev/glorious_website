import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { fadeUp } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { useRef, type ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  lines: string[]
  copy?: string
  tone?: 'dark' | 'light'
  crumbs: { label: string; href?: string }[]
  cta?: { label: string; href: string }
  children?: ReactNode
}

export function PageHero({
  eyebrow,
  lines,
  copy,
  tone = 'light',
  crumbs,
  cta,
  children,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const dark = tone === 'dark'

  useGSAP(
    () => {
      if (!ref.current) return
      fadeUp(ref.current.querySelectorAll('[data-hero-copy]'), {
        y: 20,
        stagger: 0.08,
        immediate: true,
        delay: 0.2,
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      className={
        dark
          ? 'bg-navy-deep pt-[calc(7.5rem+env(safe-area-inset-top))] pb-16 text-ivory sm:pt-32 lg:pt-40 lg:pb-28'
          : 'bg-ivory pt-[calc(7.5rem+env(safe-area-inset-top))] pb-16 sm:pt-32 lg:pt-40 lg:pb-28'
      }
    >
      <Container>
        <div data-hero-copy>
          <Breadcrumbs items={crumbs} tone={dark ? 'dark' : 'light'} className="mb-10" />
        </div>
        <p
          data-hero-copy
          className={
            dark
              ? 'mb-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold'
              : 'mb-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold-muted'
          }
        >
          {eyebrow}
        </p>
        <SplitHeading
          lines={lines}
          className="font-display max-w-5xl text-[clamp(2.05rem,4.8vw+0.55rem,4.5rem)] leading-[0.95] tracking-[-0.03em]"
        />
        {copy ? (
          <p
            data-hero-copy
            className={
              dark
                ? 'mt-6 max-w-2xl text-lg leading-relaxed text-ivory/72'
                : 'mt-6 max-w-2xl text-lg leading-relaxed text-muted'
            }
          >
            {copy}
          </p>
        ) : null}
        {cta ? (
          <div data-hero-copy className="mt-8">
            <Button href={cta.href} variant={dark ? 'gold' : 'navy'}>
              {cta.label}
            </Button>
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  )
}
