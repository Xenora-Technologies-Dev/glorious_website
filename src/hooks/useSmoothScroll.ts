import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'
import { getNavOffset } from '@/lib/nav'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

function hashTarget(hash: string) {
  let id = hash.replace(/^#/, '')
  try {
    id = decodeURIComponent(id)
  } catch {
    // keep the raw id when the hash is not valid URI encoding
  }
  return id ? document.getElementById(id) : null
}

/**
 * Absolute document Y for an anchor, so it lands just below the fixed header.
 * Offset = the element's own CSS scroll-margin-top (scrollMtClass / scrollMtFlushClass),
 * floored at the measured header height. Always resolved to a NUMBER before handing it to
 * Lenis: Lenis 1.3 subtracts scroll-margin-top itself when given an element, which stacked
 * with our offset and left anchors ~108px short on desktop.
 */
function anchorTop(el: HTMLElement) {
  const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const offset = Math.max(getNavOffset(0), margin)
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  return Math.round(Math.min(Math.max(top, 0), max))
}

/**
 * Scroll to an anchor, then re-measure once the scroll settles and correct for any layout shift
 * (lazy images, ScrollTrigger pin spacing, fonts) that happened on the way. Stops correcting as
 * soon as the user scrolls themselves. Returns a cancel function.
 */
function scrollToAnchor(el: HTMLElement, immediate: boolean) {
  let cancelled = false
  let corrections = 0
  let timer: ReturnType<typeof window.setTimeout> | undefined

  const stopOnUserInput = () => {
    cancelled = true
  }
  const userEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
  userEvents.forEach((type) =>
    window.addEventListener(type, stopOnUserInput, { passive: true, once: true }),
  )
  const cleanup = () => {
    window.clearTimeout(timer)
    userEvents.forEach((type) => window.removeEventListener(type, stopOnUserInput))
  }

  const go = (instant: boolean) => {
    if (cancelled) return cleanup()
    const top = anchorTop(el)
    const settled = () => {
      if (cancelled) return cleanup()
      // Give lazy content a beat to lay out, then verify the landing spot
      timer = window.setTimeout(() => {
        if (cancelled) return cleanup()
        const drift = Math.abs(anchorTop(el) - window.scrollY)
        if (drift > 2 && corrections < 4) {
          corrections += 1
          go(true)
        } else {
          cleanup()
        }
      }, 140)
    }

    if (lenis) {
      lenis.resize() // route changes alter page height before Lenis' observer catches up
      lenis.scrollTo(top, {
        immediate: instant,
        duration: 1.05,
        force: true,
        onComplete: settled, // also fires for immediate jumps
      })
    } else {
      window.scrollTo({ top, left: 0, behavior: instant ? 'auto' : 'smooth' })
      if (instant) {
        settled()
      } else {
        let done = false
        const finish = () => {
          if (done) return
          done = true
          window.removeEventListener('scrollend', finish)
          settled()
        }
        window.addEventListener('scrollend', finish, { once: true })
        timer = window.setTimeout(finish, 1100) // browsers without scrollend
      }
    }
  }

  go(immediate)
  return () => {
    cancelled = true
    cleanup()
  }
}

function scrollToTop(immediate = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}

export function useSmoothScroll() {
  const location = useLocation()
  // Re-run for a repeat click on the same hash link (new history entry, same hash)
  const hashKey = location.hash ? location.key : ''

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      autoRaf: false,
    })

    lenis = instance

    const onTicker = (time: number) => {
      instance.raf(time * 1000)
    }

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTicker)
    gsap.ticker.lagSmoothing(0)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      instance.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(onTicker)
      instance.destroy()
      lenis = null
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [])

  // Keep ScrollTrigger in sync across the 1024 pin breakpoint and orientation changes
  useEffect(() => {
    let timer: ReturnType<typeof window.setTimeout> | undefined
    let lastWide = window.matchMedia('(min-width: 1024px)').matches

    const refresh = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    }

    const onResize = () => {
      const wide = window.matchMedia('(min-width: 1024px)').matches
      if (wide !== lastWide) {
        lastWide = wide
        refresh()
      } else {
        refresh()
      }
    }

    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('orientationchange', refresh)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', refresh)
    }
  }, [])

  useEffect(() => {
    const hash = location.hash
    let cancelled = false
    let attempts = 0
    let cancelScroll: (() => void) | undefined
    let retry: ReturnType<typeof window.setTimeout> | undefined

    const run = () => {
      if (cancelled) return
      if (hash) {
        const el = hashTarget(hash)
        if (!el) {
          // Lazy route chunks (e.g. the homepage on a cold load) may not be mounted yet
          if (attempts < 60) {
            attempts += 1
            retry = window.setTimeout(run, 50)
          }
          return
        }
        // Settle pin spacers before measuring so the target position is final
        ScrollTrigger.refresh()
        cancelScroll = scrollToAnchor(el, false)
        return
      }
      scrollToTop(true)
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    // Wait a frame so lazy routes mount (#distribution, #distribution-partner)
    const frame = requestAnimationFrame(run)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.clearTimeout(retry)
      cancelScroll?.()
    }
  }, [location.pathname, location.hash, hashKey])
}
