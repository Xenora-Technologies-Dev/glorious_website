import { gsap } from '@/lib/gsap'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type RevealVars = {
  y?: number
  duration?: number
  delay?: number
  stagger?: number
  immediate?: boolean
  trigger?: Element | string
}

export function fadeUp(targets: gsap.TweenTarget, vars: RevealVars = {}) {
  const reduced = prefersReducedMotion()
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: reduced ? 0 : (vars.y ?? 36) },
    {
      autoAlpha: 1,
      y: 0,
      duration: reduced ? 0 : (vars.duration ?? 1.05),
      delay: vars.delay ?? 0,
      stagger: vars.stagger,
      ease: 'power4.out',
      scrollTrigger: vars.immediate
        ? undefined
        : {
            trigger: vars.trigger,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
    },
  )
}

export function clipReveal(targets: gsap.TweenTarget, duration = 1.25) {
  const reduced = prefersReducedMotion()
  return gsap.fromTo(
    targets,
    { clipPath: reduced ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: reduced ? 0 : duration,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: targets as Element,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    },
  )
}

export function imageReveal(image: gsap.TweenTarget, wrapper: gsap.TweenTarget) {
  const reduced = prefersReducedMotion()
  const tl = gsap.timeline({
    scrollTrigger: reduced
      ? undefined
      : {
          trigger: wrapper as Element,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
  })

  if (reduced) {
    gsap.set([image, wrapper], { clearProps: 'all', autoAlpha: 1 })
    return tl
  }

  tl.fromTo(
    wrapper,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'power3.inOut' },
  ).fromTo(
    image,
    { scale: 1.12 },
    { scale: 1, duration: 1.6, ease: 'power2.out' },
    0,
  )

  return tl
}

export function splitLines(targets: gsap.TweenTarget) {
  const reduced = prefersReducedMotion()
  return gsap.fromTo(
    targets,
    { yPercent: reduced ? 0 : 110 },
    {
      yPercent: 0,
      duration: reduced ? 0 : 1.05,
      stagger: reduced ? 0 : 0.08,
      ease: 'power3.out',
    },
  )
}

export function parallax(target: gsap.TweenTarget, trigger: Element, amount = 80) {
  if (prefersReducedMotion()) return

  return gsap.to(target, {
    y: amount,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export function pinHorizontal(track: HTMLElement, trigger: HTMLElement) {
  if (prefersReducedMotion()) return

  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

  return gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })
}
