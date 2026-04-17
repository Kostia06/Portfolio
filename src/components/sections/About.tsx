import { useEffect, useRef } from 'preact/hooks'
import { gsap, ScrollTrigger } from '../../lib/scroll'
import { splitLines } from '../../lib/split'
import { bio } from '../../data/bio'

export function About() {
  const paraRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!paraRef.current || !quoteRef.current) return

    const paragraphs = paraRef.current.querySelectorAll<HTMLElement>('p')
    const splits = Array.from(paragraphs).map((p) => splitLines(p))
    const allLines = splits.flatMap((s) => s.lines ?? [])

    gsap.set(allLines, { opacity: 0, y: 12 })
    const st1 = ScrollTrigger.create({
      trigger: paraRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(allLines, {
          opacity: 1,
          y: 0,
          duration: 0.001,
          ease: 'steps(1)',
          stagger: 0.06,
        })
      },
    })

    const quoteEl = quoteRef.current
    const st2 = ScrollTrigger.create({
      trigger: quoteEl,
      start: 'top bottom',
      end: 'center center',
      scrub: 0.3,
      onUpdate: (self) => {
        const s = 0.6 + self.progress * 0.4
        gsap.set(quoteEl, { scale: s })
      },
    })

    return () => {
      st1.kill()
      st2.kill()
      splits.forEach((s) => s.revert())
    }
  }, [])

  return (
    <section
      data-section="03"
      data-section-name="ABOUT"
      class="container py-24 md:py-40"
    >
      <h2 class="sr-only">About</h2>
      <div
        class="mb-12"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
          color: 'var(--color-mute)',
        }}
      >
        ABOUT / 03
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div
          ref={paraRef}
          class="md:col-span-7 space-y-6"
          style={{ fontSize: 'var(--text-body-lg)', lineHeight: 1.4 }}
        >
          {bio.paragraphs.map((p) => (
            <p>{p}</p>
          ))}
        </div>
        <div class="md:col-span-5 flex items-center">
          <p
            ref={quoteRef}
            class="font-black uppercase"
            style={{
              fontSize: 'var(--text-display-2)',
              letterSpacing: 'var(--tracking-display-tight)',
              lineHeight: 'var(--leading-display)',
              color: 'var(--color-red)',
              transformOrigin: 'left center',
            }}
          >
            {bio.pullQuote}
          </p>
        </div>
      </div>

      <div
        class="mt-16 flex flex-wrap gap-6"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
          color: 'var(--color-mute)',
        }}
      >
        {bio.credits.map((c, i) => (
          <>
            <span>{c}</span>
            {i < bio.credits.length - 1 && <span>/</span>}
          </>
        ))}
      </div>
    </section>
  )
}
