import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export function useSmoothScroll() {
  const location = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return

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
    lenis?.scrollTo(0, { immediate: true })
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname])
}
