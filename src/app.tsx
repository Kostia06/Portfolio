import { useEffect } from 'preact/hooks'
import { initScroll } from './lib/scroll'
import { Cursor } from './components/primitives/Cursor'
import { ScrollCounter } from './components/primitives/ScrollCounter'
import { SectionLabel } from './components/primitives/SectionLabel'
import { Rule } from './components/primitives/Rule'

export function App() {
  useEffect(() => {
    initScroll()
  }, [])

  return (
    <>
      <Cursor />
      <ScrollCounter />
      <SectionLabel />
      <main>
        <section
          data-section="01"
          data-section-name="MASTHEAD"
          class="container min-h-screen grid place-items-center"
        >
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
        <Rule />
        <section
          data-section="02"
          data-section-name="SCROLL TEST"
          class="container min-h-screen grid place-items-center"
        >
          <p>section two — hover me <a href="#">link</a></p>
        </section>
      </main>
    </>
  )
}
