# Portfolio Redo — Brutalist NYC Editorial

**Author:** Kostia Ilnytskyi
**Date:** 2026-04-16
**Status:** Design — awaiting approval before implementation plan

---

## 1. Intent

Rebuild the portfolio from scratch in a **Swiss-classic editorial brutalist** style — tight Helvetica, warm off-white paper, single red accent, oversized type, and a single long-scroll page. Motion is varied per section (restrained, kinetic-type, disruptive, scroll-scrubbed) so the whole feels intentional rather than uniformly loud.

Previous version is archived at `origin/archive/v1`. Content (bio + 8 projects) is pulled from there; the design, markup, and motion are new.

## 2. Stack

Scaffolded on `main`:

- **Vite 8** + **Preact 10** + **TypeScript 6**
- **Tailwind 4** via `@tailwindcss/vite`
- **GSAP 3** + **ScrollTrigger** (scroll-scrubbed sequences, pinned timelines)
- **motion 12** (ex-Framer Motion — declarative component entrances, hover)
- **Lenis 1.3** (smooth scroll baseline)
- **split-type** (free SplitText alternative for char/word splits)

No webfonts. System Helvetica stack: `"Helvetica Neue", Helvetica, Arial, sans-serif`. Renders real Helvetica Neue on macOS/iOS; Arial fallback on Windows.

## 3. Design tokens

Declared in `src/lib/tokens.css` via Tailwind 4 `@theme`:

```css
@theme {
  --color-paper: #f4f1ea;
  --color-ink: #0b0b0b;
  --color-red: #e3342f;
  --color-rule: #0b0b0b;
  --color-mute: #8a867c;

  --font-sans: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;

  --text-display-1: clamp(96px, 14vw, 240px);
  --text-display-2: clamp(56px, 8vw, 120px);
  --text-body-lg: 24px;
  --text-body: 18px;
  --text-meta: 12px;

  --tracking-display-tight: -0.04em;
  --tracking-display-mid: -0.02em;
  --leading-display: 0.9;

  --content-max: 1440px;
  --edge-pad-desktop: 32px;
  --edge-pad-mobile: 16px;
  --grid-gutter: 24px;
}
```

- Paper `#f4f1ea` background, ink `#0b0b0b` primary, red `#e3342f` single accent.
- Hairlines (1px ink) between sections, redrawn left-to-right on scroll enter.
- No dark mode in v1 (brutalist editorial is light-first; inversion can come later).

## 4. Layout

- Single page, single long scroll.
- Max content width **1440px**, centered, 32px edge padding desktop / 16px mobile.
- **12-column grid**, 24px gutter. Asymmetric use is deliberate — not every section uses all 12.
- Fixed meta overlay across entire page:
  - Top-left: `01 / 06` current section / total.
  - Top-right: live scroll counter `0000 / 7200`.
  - Bottom-left: `↓ SCROLL` label + a vertical rule that grows proportional to scroll progress.
  - Section label (e.g. `04 / SELECTED WORK`) fades in when that section is active.
- Hairline section dividers drawn on scroll enter.

## 5. Sections (in scroll order)

Each has a section number `01`–`06` and its own motion treatment.

### 01 — Masthead

**Content**
- Name `KOSTIA ILNYTSKYI` set in Display-1, may span two lines.
- Role lockup (vertically stacked):
  - `SOFTWARE ENGINEER`
  - `PRODUCT BUILDER`
  - `DESIGN EYE`
- Meta ribbon: `ISSUE 01 — 2026 / CALGARY / OPEN TO SUMMER 2026 INTERNSHIPS`.
- Scroll hint: `↓ SCROLL` at bottom edge.

**Motion mode:** kinetic type + restraint
- On load, name splits char-by-char; each char **hard-snaps** into place (instant, no easing) with 40ms stagger. Swiss aesthetic = no bouncing.
- Role lockup slides in word-by-word; red slash `/` drawn between them.
- Meta ribbon slides in from the right; scroll counter starts ticking from `0000`.

### 02 — Index

**Content:** table of contents, numbered, linking to sections below.

```
01 → MASTHEAD         p. 001
02 → INDEX            p. 012
03 → ABOUT            p. 024
04 → SELECTED WORK    p. 048
05 → CAPABILITIES     p. 112
06 → COLOPHON         p. 128
```

**Motion mode:** restraint + kinetic numbers
- Horizontal rule draws left-to-right per row, staggered 80ms apart.
- Page numbers count up on reveal.
- Hover: row shifts 16px right, rule extends, label flips to red.

### 03 — About

**Content**
- Editorial bio paragraph derived from archive:
  - CS at University of Calgary, graduating 2027.
  - Born Ukraine → coding began 4th grade in New York (LEGO car in Java) → Minecraft mods → moved Calgary 2023 → university.
  - Build things people use: Mr Blu, RTT, PR-pathway tool for Ukrainian-Canadian foundation.
  - Stack: React, SvelteKit, Python, Supabase, Cloudflare.
  - Open to Summer 2026 internships. Tutors CS students.
- One pull quote rendered huge in red (extracted from bio — candidate: "I build things people use.").
- Tight credits block: `CALGARY / OPEN TO SUMMER 2026 / TUTOR @ UOFC`.

**Motion mode:** restrained + one big moment
- Paragraphs reveal line-by-line (SplitText lines, 200ms stagger, instant reveal not fade).
- Pull quote scale-scrubs 0.6x → 1x as it passes through viewport.
- Red underline draws under one chosen keyword as it crosses viewport center.

### 04 — Selected Work

**Content:** 8 projects, numbered 01–08, from `src/data/projects.ts`.

Project shape:
```ts
type Project = {
  id: string             // 'rye', 'gitfight', 'lingozo', ...
  number: string         // '01'..'08'
  title: string
  role: 'LEAD ENGINEER' | 'SOLO' | 'CO-FOUNDER' | 'CONTRIBUTOR'
  year: string
  tagline: string        // one line
  description: string    // 2–3 sentences
  stack: string[]
  link?: string
  repo?: string
  screenshot: string     // /screenshots/xyz.webp
  featured?: boolean     // true for project 01
  gridSpan: 1 | 2
}
```

The 8 projects: `mrblu`, `rtt`, `helpukraine`, `rye`, `gitfight`, `lingozo`, `mockmind`, `aighost`. Final order + which is `featured: true` confirmed during implementation. Default featured: `mrblu` (voice-first invoicing — most distinctive).

**Layout:** asymmetric magazine grid, not a neat 2×4. Some cards span 2 cols, some 1. Each card shows screenshot, number, title, role, year, stack.

**Motion mode:** disruptive + kinetic + one scroll-scrub
- Cards enter with **hard-snap** scroll reveal: translate + instant clip-path from 0→100%, no fade.
- Hover: card scales 1.06x, neighbors displace; title flips to red.
- **Featured project** (marked `featured: true`) gets a dedicated pinned scroll-scrub spread: pin for ~1 viewport of scroll, horizontal-pan across up to 3 screenshots while title scales with progress.
- Featured spread collapses to a tall static card on mobile (no pin).
- Fixed section label `04 / SELECTED WORK` stays top-right during section.

### 05 — Capabilities

**Content:** grouped stack list from `src/data/capabilities.ts`:
```ts
type CapabilityGroup = { label: string; items: string[] }
```
Groups: `LANGUAGES`, `FRAMEWORKS`, `TOOLS`, `DESIGN`. Actual items to be pulled/adapted from archive's stack listings.

**Motion mode:** kinetic type
- Background: slowly drifting 45° marquee of all skill names, huge, muted red, very low opacity (desktop only — drops to horizontal on mobile).
- Foreground list reveals word-by-word (instant snap reveal).
- Hover a skill → that item flips red, rest dim to `--color-mute`.

### 06 — Colophon / Contact

**Content**
- Oversized email link: `ilnkostia@gmail.com` at Display-2.
- Socials as set-in-type list:
  - `GITHUB — github.com/Kostia06`
  - (LinkedIn, X — to be confirmed during implementation)
- Location + availability one-liner.
- Credits footer: `SET IN HELVETICA NEUE / BUILT WITH PREACT + GSAP + LENIS / © 2026`.

**Motion mode:** disruptive arrival
- Email scales from 0.3x to 1x in **3 hard snap frames** (no interpolation — feels like a press slamming down).
- Email hover: letters jitter 2–3px randomly.
- Footer reveals left-to-right like a typewriter (char-by-char, 30ms cadence).

## 6. Cross-cutting UI

- **Lenis** smooth scroll baseline; ScrollTrigger bound to Lenis via its standard bridge.
- **Custom cursor** (desktop only): red dot 8px, grows to a 2px-tall × 32px-wide bar when hovering interactive elements. One DOM node, transforms only.
- **Fixed meta overlay** (described in §4 Layout).
- **Section rules** drawn on enter.

## 7. File structure

```
src/
  main.tsx
  app.tsx                     # top-level composition, wires sections in order
  index.css                   # @import "tailwindcss" + global resets
  lib/
    tokens.css                # @theme block (tokens)
    scroll.ts                 # Lenis + ScrollTrigger bootstrap, Lenis↔ST bridge
    split.ts                  # split-type wrapper (lines/words/chars)
    motion.ts                 # shared motion presets (hard-snap reveal, scale-scrub)
  components/
    sections/
      Masthead.tsx
      Index.tsx
      About.tsx
      Work.tsx
      WorkCard.tsx
      WorkFeatured.tsx        # pinned spread for featured project
      Capabilities.tsx
      Colophon.tsx
    primitives/
      Rule.tsx                # animated hairline
      SectionLabel.tsx        # fixed corner label, fades per active section
      ScrollCounter.tsx       # live counter overlay
      Marquee.tsx             # horizontal + 45° variants
      Counter.tsx             # numeric count-up
      SplitLines.tsx          # wrapper that splits and reveals
      Cursor.tsx              # custom cursor
  data/
    projects.ts               # typed project list
    capabilities.ts           # typed group list
    colophon.ts               # contact + credits
    bio.ts                    # about copy + pull quote
  assets/
    (empty — reused screenshots live under public/)
public/
  screenshots/*.webp          # copied from archive/v1/static/screenshots
  favicon.svg                 # carried from archive
  apple-touch-icon.png
```

## 8. Responsive strategy

- Breakpoints: mobile `≤ 640px`, desktop `≥ 641px`. Use `clamp()` between.
- Per-section mobile adaptations documented inline in §5.
- Motion on mobile: Lenis stays, scroll-scrub stays, custom cursor off, 45° marquees → horizontal, no rotation-heavy motion.
- `prefers-reduced-motion`: all motion replaced with instant snaps (fits brutalist aesthetic — not faded).

## 9. Performance budget

- First-load JS target ≤ 80KB gzipped. Budget breakdown: Preact ~5KB, motion ~20KB, Lenis ~5KB, GSAP core ~15KB, ScrollTrigger ~15KB, app code ~15KB.
- No webfont download (system Helvetica stack).
- Screenshots `.webp` with `.png` fallback via `<picture>`, `loading="lazy"` + `decoding="async"` below fold.
- Lazy-init ScrollTrigger only on sections that use it; Lenis up-front.
- Build splits: keep GSAP/ScrollTrigger in a secondary chunk loaded after first paint.

## 10. Accessibility

- Semantic HTML: `<main>`, `<section>`, `<h1>`–`<h3>`, `<nav>` for Index, `<a>` for all links.
- Every link has meaningful text (no "click here", no icon-only links without aria-label).
- Focus states visible: 2px red underline on focus-visible.
- Reduced-motion fallback per animated component.
- Color contrast: ink on paper 18:1, red on paper 5.2:1 — both pass WCAG AA for text.

## 11. Out of scope (v1)

- No dark mode.
- No blog / writing section.
- No CMS — content in typed TS files.
- No analytics / tracking.
- No multi-page routes.
- No real Helvetica Now / Neue Haas Grotesk web fonts (system stack for now; can upgrade later).

## 12. Open questions

- **Featured project choice:** default `mrblu`. Confirm or swap during implementation.
- **Final project ordering 01–08:** confirm during implementation.
- **Pull quote text:** need one sentence extracted from bio. Candidate: *"I build things people use."*
- **Socials list completeness:** need LinkedIn + X handles (or confirm GitHub-only).

## 13. Build order (for implementation plan)

Proposed build-one-by-one order matching user preference:

1. Foundation: tokens, global CSS, scroll/Lenis bootstrap, app shell.
2. `Cursor` + fixed meta overlay (ScrollCounter, SectionLabel).
3. Section 01 — Masthead.
4. Section 02 — Index.
5. Section 03 — About.
6. Section 04 — Selected Work (grid cards first, then featured spread).
7. Section 05 — Capabilities.
8. Section 06 — Colophon.
9. Responsive polish pass.
10. Perf + a11y pass.

Each step ships a visible, testable increment in the browser.
