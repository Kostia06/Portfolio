import { useEffect, useRef } from 'preact/hooks'
import { gsap, ScrollTrigger } from '../../lib/scroll'
import { colophon } from '../../data/colophon'

export function Colophon() {
  const emailRef = useRef<HTMLAnchorElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const email = emailRef.current
    const footer = footerRef.current
    if (!email || !footer) return

    gsap.set(email, { scale: 0.3, opacity: 0 })

    const st = ScrollTrigger.create({
      trigger: email,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline()
        tl.set(email, { opacity: 1, scale: 0.3 })
          .set(email, { scale: 0.7 }, 0.08)
          .set(email, { scale: 1 }, 0.16)
      },
    })

    const text = footer.textContent ?? ''
    footer.textContent = ''
    for (const c of text) {
      const s = document.createElement('span')
      s.textContent = c
      s.style.opacity = '0'
      footer.appendChild(s)
    }
    const charSpans = footer.querySelectorAll<HTMLElement>('span')
    const st2 = ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(charSpans, {
          opacity: 1,
          duration: 0.001,
          ease: 'steps(1)',
          stagger: 0.025,
        })
      },
    })

    return () => {
      st.kill()
      st2.kill()
    }
  }, [])

  return (
    <section
      data-section="06"
      data-section-name="COLOPHON"
      class="container py-24 md:py-40"
    >
      <div
        class="mb-12"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
          color: 'var(--color-mute)',
        }}
      >
        COLOPHON / 06
      </div>

      <a
        ref={emailRef}
        href={`mailto:${colophon.email}`}
        class="block font-black uppercase mb-16 transition-transform"
        style={{
          fontSize: 'var(--text-display-2)',
          letterSpacing: 'var(--tracking-display-tight)',
          lineHeight: 'var(--leading-display)',
          color: 'var(--color-red)',
          transformOrigin: 'left center',
          wordBreak: 'break-all',
        }}
      >
        {colophon.email}
      </a>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <ul class="space-y-2">
          {colophon.socials.map((s) => (
            <li>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                class="uppercase"
                style={{
                  fontSize: 'var(--text-body-lg)',
                  fontWeight: 700,
                  letterSpacing: 'var(--tracking-display-mid)',
                }}
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-meta)',
            letterSpacing: '0.1em',
            color: 'var(--color-mute)',
          }}
        >
          <div>{colophon.location}</div>
          <div>{colophon.available}</div>
        </div>
      </div>

      <div
        ref={footerRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
          color: 'var(--color-mute)',
        }}
      >
        {colophon.credits}
      </div>
    </section>
  )
}
