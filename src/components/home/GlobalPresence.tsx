import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WorldMap } from '@/components/ui/WorldMap'
import { sourcingOrigins } from '@/content/company'
import { prefersReducedMotion } from '@/lib/animations'
import { gsap, useGSAP } from '@/lib/gsap'
import { useRef } from 'react'

export function GlobalPresence() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const dots = root.querySelectorAll('[data-origin]')
      const lines = root.querySelectorAll('[data-route]')
      if (prefersReducedMotion()) return

      gsap.from(dots, {
        scale: 0.4,
        autoAlpha: 0,
        transformOrigin: 'center',
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      })
      gsap.fromTo(
        lines,
        { strokeDashoffset: 240 },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          stagger: 0.18,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: root, start: 'top 70%' },
        },
      )
    },
    { scope: ref },
  )

  const hub = sourcingOrigins.find((origin) => 'hub' in origin && origin.hub) ?? sourcingOrigins[3]
  const others = sourcingOrigins.filter((origin) => origin.id !== hub.id)

  return (
    <section ref={ref} className="bg-navy py-20 text-ivory sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              index="02"
              eyebrow="Where we source"
              tone="light"
              title={
                <>
                  Origins we
                  <br />
                  work from.
                </>
              }
              copy="The catalogue references sourcing and manufacturing in Italy, Spain, India and the UAE. These are not presented as the only markets Glorious Ascent can work with."
            />
            <ul className="mt-12 grid grid-cols-2 gap-6">
              {sourcingOrigins.map((origin) => (
                <li key={origin.id}>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
                    {'hub' in origin && origin.hub ? 'Hub' : 'Origin'}
                  </p>
                  <p className="mt-2 font-display text-3xl">{origin.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden border border-line-light bg-navy-deep">
              <WorldMap className="absolute inset-0 h-full w-full text-gold" />
              <svg viewBox="0 0 100 62" className="relative h-full w-full" aria-hidden="true">
                {others.map((origin) => (
                  <line
                    key={origin.id}
                    data-route
                    x1={hub.x}
                    y1={hub.y}
                    x2={origin.x}
                    y2={origin.y}
                    stroke="#c6a56a"
                    strokeWidth="0.35"
                    strokeDasharray="240"
                    strokeDashoffset="240"
                  />
                ))}
                {sourcingOrigins.map((origin) => (
                  <g key={origin.id} data-origin>
                    <circle
                      cx={origin.x}
                      cy={origin.y}
                      r={'hub' in origin && origin.hub ? 1.6 : 1.15}
                      fill="#c6a56a"
                    />
                    <text
                      x={origin.x}
                      y={origin.y - 2.4}
                      textAnchor="middle"
                      fill="#f4efe4"
                      fontSize="2.4"
                      fontFamily="Manrope, sans-serif"
                    >
                      {origin.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
