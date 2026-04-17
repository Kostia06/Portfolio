import { useEffect, useRef } from 'preact/hooks'
import { gsap, ScrollTrigger } from '../../lib/scroll'
import type { Project } from '../../data/projects'

type Props = { project: Project }

export function WorkCard({ project }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el, { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.001,
          ease: 'steps(1)',
        })
      },
    })
    return () => st.kill()
  }, [])

  const colSpan = project.gridSpan === 2 ? 'md:col-span-8' : 'md:col-span-4'

  return (
    <a
      ref={ref}
      href={project.link ?? '#'}
      target={project.link ? '_blank' : undefined}
      rel={project.link ? 'noreferrer' : undefined}
      class={`${colSpan} block group relative overflow-hidden transition-transform duration-200 hover:scale-[1.02]`}
      style={{ aspectRatio: project.gridSpan === 2 ? '16/9' : '4/5' }}
    >
      <picture>
        <source srcSet={project.screenshot} type="image/webp" />
        <img
          src={project.screenshot.replace('.webp', '.png')}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </picture>
      <div
        class="absolute inset-0 p-4 flex flex-col justify-between"
        style={{
          background:
            'linear-gradient(to top, rgba(11,11,11,0.85), rgba(11,11,11,0) 40%)',
          color: 'var(--color-paper)',
        }}
      >
        <div
          class="flex items-center justify-between"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-meta)',
            letterSpacing: '0.1em',
          }}
        >
          <span>{project.number}</span>
          <span>{project.year}</span>
        </div>
        <div>
          <h3
            class="font-black uppercase transition-colors duration-200 group-hover:[color:var(--color-red)]"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              letterSpacing: 'var(--tracking-display-mid)',
              lineHeight: 1,
            }}
          >
            {project.title}
          </h3>
          <p
            class="mt-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-meta)',
              letterSpacing: '0.1em',
              opacity: 0.8,
            }}
          >
            {project.role} · {project.stack.slice(0, 3).join(' · ')}
          </p>
        </div>
      </div>
    </a>
  )
}
