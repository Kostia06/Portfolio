import { useEffect, useRef } from 'preact/hooks'
import type { ComponentChildren } from 'preact'
import { gsap } from '../../lib/scroll'

type Props = { children: ComponentChildren; rotate?: number; speed?: number }

export function Marquee({ children, rotate = 0, speed = 30 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const tween = gsap.to(el, {
      x: '-50%',
      duration: speed,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [speed])

  return (
    <div
      aria-hidden
      style={{
        width: '100%',
        overflow: 'hidden',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </div>
    </div>
  )
}
