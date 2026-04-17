import { useEffect, useState } from 'preact/hooks'

export function SectionLabel() {
  const [label, setLabel] = useState('01 / MASTHEAD')

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top,
          )[0]
        if (visible) {
          const num = (visible.target as HTMLElement).dataset.section!
          const name = (visible.target as HTMLElement).dataset.sectionName ?? ''
          setLabel(`${num} / ${name}`)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 16,
        left: 'var(--edge-pad-desktop)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-meta)',
        letterSpacing: '0.1em',
        zIndex: 50,
        mixBlendMode: 'difference',
        color: 'var(--color-paper)',
      }}
    >
      {label}
    </div>
  )
}
