import { useEffect } from 'preact/hooks'
import { initScroll } from './lib/scroll'
import { Cursor } from './components/primitives/Cursor'
import { ScrollCounter } from './components/primitives/ScrollCounter'
import { SectionLabel } from './components/primitives/SectionLabel'
import { Rule } from './components/primitives/Rule'
import { Masthead } from './components/sections/Masthead'
import { IndexSection } from './components/sections/Index'
import { About } from './components/sections/About'

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
        <IndexSection />
        <Rule />
        <About />
        <Rule />
      </main>
    </>
  )
}
