import { useEffect, useRef, useState } from 'preact/hooks'
import { gsap, ScrollTrigger } from '../../lib/scroll'
import { capabilities } from '../../data/capabilities'
import { Marquee } from '../primitives/Marquee'

export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const allItems = capabilities.flatMap((g) => g.items).join(' · ')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll<HTMLElement>('.cap-word')
    gsap.set(words, { opacity: 0, y: 12 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.001,
          ease: 'steps(1)',
          stagger: 0.02,
        })
      },
    })
    return () => st.kill()
  }, [])

  const colorFor = (item: string) => {
    if (!hovered) return 'var(--color-ink)'
    if (hovered === item) return 'var(--color-red)'
    return 'var(--color-mute)'
  }

  return (
    <section
      data-section="05"
      data-section-name="CAPABILITIES"
      class="relative py-24 md:py-40 overflow-hidden"
    >
      <div
        class="absolute inset-0 pointer-events-none hidden md:block"
        style={{ opacity: 0.08 }}
      >
        <Marquee rotate={-12} speed={80}>
          <span
            class="font-black uppercase mr-16"
            style={{
              fontSize: 'clamp(120px, 18vw, 320px)',
              color: 'var(--color-red)',
              letterSpacing: 'var(--tracking-display-tight)',
            }}
          >
            {allItems}
          </span>
        </Marquee>
      </div>

      <div class="container relative" ref={ref}>
        <div
          class="mb-12"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-meta)',
            letterSpacing: '0.1em',
            color: 'var(--color-mute)',
          }}
        >
          CAPABILITIES / 05
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          {capabilities.map((group) => (
            <div>
              <h4
                class="uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-meta)',
                  letterSpacing: '0.1em',
                  color: 'var(--color-mute)',
                }}
              >
                {group.label}
              </h4>
              <ul>
                {group.items.map((item) => (
                  <li
                    class="cap-word py-1 transition-colors duration-150 cursor-pointer"
                    style={{
                      fontSize: 'var(--text-body-lg)',
                      fontWeight: 600,
                      color: colorFor(item),
                    }}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
