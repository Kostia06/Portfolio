import { useEffect, useRef } from 'preact/hooks'
import { gsap } from '../../lib/scroll'
import { splitChars } from '../../lib/split'
import { bio } from '../../data/bio'

export function Masthead() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!nameRef.current) return

    const split = splitChars(nameRef.current)
    const chars = split.chars ?? []
    const words = roleRef.current?.querySelectorAll<HTMLElement>('.role-word') ?? []

    const tl = gsap.timeline()

    gsap.set(chars, { opacity: 0, y: 40 })
    gsap.set(words, { opacity: 0, x: -20 })
    gsap.set(metaRef.current, { opacity: 0, x: 30 })

    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.001,
      ease: 'steps(1)',
      stagger: 0.04,
    })
      .to(
        words,
        {
          opacity: 1,
          x: 0,
          duration: 0.001,
          ease: 'steps(1)',
          stagger: 0.1,
        },
        '+=0.1',
      )
      .to(
        metaRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.001,
          ease: 'steps(1)',
        },
        '<',
      )

    return () => {
      split.revert()
    }
  }, [])

  const roles = ['SOFTWARE ENGINEER', 'PRODUCT BUILDER', 'DESIGN EYE']

  return (
    <section
      data-section="01"
      data-section-name="MASTHEAD"
      class="container relative min-h-screen flex flex-col justify-between pt-24 pb-16"
    >
      <div
        ref={metaRef}
        class="flex flex-wrap items-center gap-x-4 gap-y-2"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
        }}
      >
        <span>ISSUE 01 — 2026</span>
        <span style={{ width: 24, height: 1, background: 'var(--color-ink)' }} />
        <span>CALGARY, AB</span>
        <span style={{ width: 24, height: 1, background: 'var(--color-ink)' }} />
        <span style={{ color: 'var(--color-red)' }}>OPEN TO SUMMER 2026</span>
      </div>

      <div>
        <h1
          ref={nameRef}
          class="font-black uppercase block"
          style={{
            fontSize: 'var(--text-display-1)',
            letterSpacing: 'var(--tracking-display-tight)',
            lineHeight: 'var(--leading-display)',
          }}
        >
          KOSTIA ILNYTSKYI
        </h1>

        <div
          ref={roleRef}
          class="mt-8 flex flex-wrap gap-x-6 gap-y-2 uppercase"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-lg)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-display-mid)',
          }}
        >
          {roles.map((r, i) => (
            <>
              <span class="role-word">{r}</span>
              {i < roles.length - 1 && (
                <span class="role-word" style={{ color: 'var(--color-red)' }}>
                  /
                </span>
              )}
            </>
          ))}
        </div>

        <p
          class="mt-6 max-w-xl"
          style={{
            fontSize: 'var(--text-body-lg)',
            lineHeight: 1.35,
          }}
        >
          {bio.short}
        </p>
      </div>

      <div
        class="flex items-end justify-between"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
        }}
      >
        <span>↓ SCROLL</span>
        <span>KOSTIA-ILNYTSKYI.COM / 2026</span>
      </div>
    </section>
  )
}
