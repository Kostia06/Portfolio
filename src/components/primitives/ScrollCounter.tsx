import { useEffect, useState } from 'preact/hooks'

export function ScrollCounter() {
  const [y, setY] = useState(0)
  const [max, setMax] = useState(0)

  useEffect(() => {
    const update = () => {
      setY(Math.round(window.scrollY))
      setMax(Math.round(document.documentElement.scrollHeight - window.innerHeight))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const pad = (n: number) => String(Math.max(0, n)).padStart(4, '0')
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        top: 16,
        right: 'var(--edge-pad-desktop)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-meta)',
        letterSpacing: '0.1em',
        zIndex: 50,
        mixBlendMode: 'difference',
        color: 'var(--color-paper)',
      }}
    >
      {pad(y)} / {pad(max)}
    </div>
  )
}
