import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initScroll(): Lenis | null {
  if (lenis) return lenis
  if (prefersReducedMotion) {
    // Native scroll, no smoothing. ScrollTrigger still works against window.
    return null
  }

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis!.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export { ScrollTrigger, gsap }
