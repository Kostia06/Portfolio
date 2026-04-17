import { gsap } from './scroll'

export const hardSnap = {
  duration: 0.001,
  ease: 'steps(1)',
}

export function revealCharsHardSnap(chars: Element[], delay = 0) {
  gsap.set(chars, { opacity: 0, y: 40 })
  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: 0.001,
    ease: 'steps(1)',
    stagger: 0.04,
    delay,
  })
}

export function revealLinesSnap(lines: Element[], delay = 0) {
  gsap.set(lines, { opacity: 0, y: 24 })
  return gsap.to(lines, {
    opacity: 1,
    y: 0,
    duration: 0.001,
    ease: 'steps(1)',
    stagger: 0.08,
    delay,
  })
}
