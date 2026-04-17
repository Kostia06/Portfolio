import { useEffect, useRef } from 'preact/hooks'
import { gsap, ScrollTrigger } from '../../lib/scroll'

const rows = [
  { num: '01', label: 'MASTHEAD', page: '001' },
  { num: '02', label: 'INDEX', page: '012' },
  { num: '03', label: 'ABOUT', page: '024' },
  { num: '04', label: 'SELECTED WORK', page: '048' },
  { num: '05', label: 'CAPABILITIES', page: '112' },
  { num: '06', label: 'COLOPHON', page: '128' },
]

export function IndexSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rowEls = el.querySelectorAll<HTMLElement>('.index-row')
    const ruleEls = el.querySelectorAll<HTMLElement>('.index-rule')

    gsap.set(rowEls, { opacity: 0, x: -20 })
    gsap.set(ruleEls, { scaleX: 0, transformOrigin: 'left center' })

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(ruleEls, {
          scaleX: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
        })
        gsap.to(rowEls, {
          opacity: 1,
          x: 0,
          duration: 0.001,
          ease: 'steps(1)',
          stagger: 0.08,
          delay: 0.1,
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section
      data-section="02"
      data-section-name="INDEX"
      class="container py-24 md:py-40"
    >
      <h2 class="sr-only">Index</h2>
      <div
        class="mb-12"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
          color: 'var(--color-mute)',
        }}
      >
        INDEX / 02
      </div>
      <div ref={ref}>
        {rows.map((row) => (
          <a
            href={`#section-${row.num}`}
            class="index-row-link block group"
          >
            <div
              class="index-rule"
              style={{ width: '100%', height: 1, background: 'var(--color-ink)' }}
            />
            <div
              class="index-row flex items-baseline justify-between py-4 transition-transform duration-200 group-hover:translate-x-4 group-hover:[color:var(--color-red)]"
              style={{
                fontSize: 'clamp(24px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-display-mid)',
                lineHeight: 1,
              }}
            >
              <span class="flex items-baseline gap-6">
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5em',
                    color: 'var(--color-mute)',
                  }}
                >
                  {row.num}
                </span>
                <span>{row.label}</span>
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.4em',
                  color: 'var(--color-mute)',
                }}
              >
                p. {row.page}
              </span>
            </div>
          </a>
        ))}
        <div
          class="index-rule"
          style={{ width: '100%', height: 1, background: 'var(--color-ink)' }}
        />
      </div>
    </section>
  )
}
