import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

const NAV_OFFSET = 112

function scrollToHash(hash: string, immediate = false) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false

  if (lenis) {
    lenis.scrollTo(el, { offset: -NAV_OFFSET, immediate, duration: 1.05 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top, left: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
  return true
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

  useEffect(() => {
    const hash = location.hash
    let cancelled = false
    let attempts = 0

    const run = () => {
      if (cancelled) return
      if (hash) {
        const ok = scrollToHash(hash, attempts === 0 && !lenis)
        if (!ok && attempts < 20) {
          attempts += 1
          window.setTimeout(run, 50)
          return
        }
      } else {
        scrollToTop(true)
      }
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    // Wait a frame so lazy routes mount (#distribution)
    requestAnimationFrame(run)

    return () => {
      cancelled = true
    }
  }, [location.pathname, location.hash])
}
