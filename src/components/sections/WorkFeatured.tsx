import { useEffect, useRef } from 'preact/hooks'
import { gsap, ScrollTrigger } from '../../lib/scroll'
import type { Project } from '../../data/projects'

type Props = { project: Project }

export function WorkFeatured({ project }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches
    if (isMobile) return
    const section = sectionRef.current
    const track = trackRef.current
    const title = titleRef.current
    if (!section || !track || !title) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(track, { x: `-${self.progress * 66}%` })
        const s = 0.8 + self.progress * 0.4
        gsap.set(title, { scale: s })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      class="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div
        class="container h-full flex flex-col justify-between py-8"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div
          class="flex items-baseline justify-between"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-meta)',
            letterSpacing: '0.1em',
            color: 'var(--color-mute)',
          }}
        >
          <span>FEATURED — {project.number}</span>
          <span>
            {project.year} · {project.role}
          </span>
        </div>
        <h2
          ref={titleRef}
          class="font-black uppercase"
          style={{
            fontSize: 'var(--text-display-1)',
            letterSpacing: 'var(--tracking-display-tight)',
            lineHeight: 'var(--leading-display)',
            color: 'var(--color-red)',
            transformOrigin: 'left center',
            mixBlendMode: 'multiply',
          }}
        >
          {project.title}
        </h2>
        <p style={{ maxWidth: 640, fontSize: 'var(--text-body-lg)' }}>
          {project.description}
        </p>
      </div>

      <div
        ref={trackRef}
        class="absolute top-0 left-0 h-full flex"
        style={{ width: '300%', willChange: 'transform', zIndex: 1 }}
      >
        {[project.screenshot, project.screenshot, project.screenshot].map((src) => (
          <div
            style={{
              width: '33.333%',
              height: '100%',
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(0.2)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
