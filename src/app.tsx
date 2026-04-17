import { useEffect } from 'preact/hooks'
import { initScroll } from './lib/scroll'
import { Cursor } from './components/primitives/Cursor'
import { ScrollCounter } from './components/primitives/ScrollCounter'
import { SectionLabel } from './components/primitives/SectionLabel'
import { Rule } from './components/primitives/Rule'
import { Masthead } from './components/sections/Masthead'

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
        <Masthead />
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
