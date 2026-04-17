import { useEffect, useRef } from 'preact/hooks'
import { gsap, ScrollTrigger } from '../../lib/scroll'

type Props = { thickness?: number }

export function Rule({ thickness = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, { scaleX: 1, duration: 0.6, ease: 'power3.out' })
      },
    })
    return () => {
      st.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        width: '100%',
        height: thickness,
        background: 'var(--color-rule)',
      }}
    />
  )
}
