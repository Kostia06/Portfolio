import { projects } from '../../data/projects'
import { WorkCard } from './WorkCard'

export function Work() {
  return (
    <section
      data-section="04"
      data-section-name="SELECTED WORK"
      class="container py-24 md:py-40"
    >
      <div
        class="mb-12 flex items-baseline justify-between"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.1em',
          color: 'var(--color-mute)',
        }}
      >
        <span>SELECTED WORK / 04</span>
        <span>{projects.length} PROJECTS</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        {projects.map((p) => (
          <WorkCard project={p} />
        ))}
      </div>
    </section>
  )
}
