import { Button } from '@/components/ui/Button'
import { Marquee } from '@/components/ui/Marquee'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { WorldMap } from '@/components/ui/WorldMap'
import { allProductNames } from '@/content/products'
import { images } from '@/content/images'
import { fadeUp, prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { useRef } from 'react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const reduced = prefersReducedMotion()

      fadeUp(root.querySelectorAll('[data-hero-copy]'), {
        delay: 0.35,
        stagger: 0.08,
        y: 20,
        immediate: true,
        duration: 1.1,
      })

      const image = root.querySelector('[data-hero-image]')
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.08, clipPath: reduced ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: reduced ? 0 : 1.8,
            ease: 'power4.out',
          },
        )
        if (!reduced) {
          gsap.to(image, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      }

      const map = root.querySelector('[data-hero-map]')
      if (map && !reduced) {
        gsap.fromTo(
          map,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.6, delay: 0.4, ease: 'power3.out' },
        )
      }
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      className="grain relative min-h-svh overflow-hidden bg-navy-deep text-ivory"
    >
      <div className="absolute inset-0">
        <img
          data-hero-image
          src={images.hero}
          alt="Pasta prepared for international food trade"
          fetchPriority="high"
          className="h-full w-full object-cover will-transform"
        />
        <div className="absolute inset-0 bg-navy-deep/80" />
      </div>

      <div
        data-hero-map
        className="pointer-events-none absolute inset-0 text-gold opacity-[0.16]"
      >
        <WorldMap className="h-full w-full" />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col justify-end pt-[calc(5.5rem+env(safe-area-inset-top))] pb-0 lg:justify-center">
        <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 pt-6 pb-10 sm:px-8 sm:pb-12 lg:px-12 xl:px-16">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <p
                data-hero-copy
                className="mb-6 text-[10px] font-semibold tracking-[0.28em] uppercase text-gold sm:text-[11px]"
              >
                Global Food · Sourcing · Distribution
              </p>
              <SplitHeading
                lines={['Connecting', 'Global Food', 'Markets.']}
                className="font-display text-[clamp(2.35rem,7.2vw,7.2rem)] leading-[0.92] tracking-[-0.03em]"
              />
            </div>
            <div className="min-w-0 lg:col-span-4 lg:pb-2">
              <p data-hero-copy className="max-w-sm text-[15px] leading-relaxed text-ivory/78 sm:text-base">
                From sourcing and manufacturing to distribution, Glorious Ascent connects quality
                food products with markets around the world.
              </p>
              <div data-hero-copy className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap [&>a]:w-full sm:[&>a]:w-auto">
                <Button href="/contact" variant="gold" size="lg">
                  Start a Conversation
                </Button>
                <Button href="/contact?intent=quote" variant="outline" size="lg">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-ivory/12">
          <div className="flex items-center gap-4 px-4 py-3 sm:gap-6 sm:px-8 lg:px-12 xl:px-16">
            <Marquee items={allProductNames} className="min-w-0 flex-1 text-ivory/70" />
            <a
              href="#who-we-are"
              className="hidden shrink-0 items-center gap-3 text-[10px] font-semibold tracking-[0.22em] uppercase text-gold md:inline-flex"
            >
              Scroll
              <span className="block h-8 w-px bg-gold/50" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
