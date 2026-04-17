import { useEffect } from 'preact/hooks'
import { initScroll } from './lib/scroll'

export function App() {
  useEffect(() => {
    initScroll()
  }, [])

  return (
    <main>
      <section class="container min-h-screen grid place-items-center">
        <h1
          class="font-black uppercase"
          style={{
            fontSize: 'var(--text-display-1)',
            letterSpacing: 'var(--tracking-display-tight)',
            lineHeight: 'var(--leading-display)',
          }}
        >
          KOSTIA
        </h1>
      </section>
      <section class="container min-h-screen grid place-items-center">
        <p style={{ fontSize: 'var(--text-body-lg)' }}>SCROLL CHECK — sections coming.</p>
      </section>
    </main>
  )
}
