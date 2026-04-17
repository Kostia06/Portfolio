import { useEffect, useRef } from 'preact/hooks'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mql = window.matchMedia('(pointer: coarse)')
    if (mql.matches) return // skip on touch

    let x = 0, y = 0, tx = 0, ty = 0
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (t && t.closest('a, button, [data-cursor="bar"]')) {
        el.classList.add('is-bar')
      } else {
        el.classList.remove('is-bar')
      }
    }

    const tick = () => {
      x += (tx - x) * 0.25
      y += (ty - y) * 0.25
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      class="cursor-dot"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        background: 'var(--color-red)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 100,
        mixBlendMode: 'difference',
        transition: 'width 120ms ease, height 120ms ease, border-radius 120ms ease',
      }}
    />
  )
}
