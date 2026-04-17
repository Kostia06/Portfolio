export type Project = {
  id: string
  number: string
  title: string
  role: 'LEAD ENGINEER' | 'SOLO' | 'CO-FOUNDER' | 'CONTRIBUTOR'
  year: string
  tagline: string
  description: string
  stack: string[]
  link?: string
  repo?: string
  screenshot: string
  featured?: boolean
  gridSpan: 1 | 2
}

export const projects: Project[] = [
  {
    id: 'mrblu',
    number: '01',
    title: 'Mr Blu',
    role: 'CO-FOUNDER',
    year: '2025',
    tagline: 'Voice-first invoicing for contractors.',
    description:
      'iOS app that turns a 60-second voice note into a client-ready invoice. Speech → structured data → PDF, synced across devices.',
    stack: ['Swift', 'SwiftUI', 'Supabase', 'OpenAI Whisper'],
    link: 'https://mrblu.app',
    screenshot: '/screenshots/mrblu.webp',
    featured: true,
    gridSpan: 2,
  },
  {
    id: 'rtt',
    number: '02',
    title: 'Respect the Technique',
    role: 'LEAD ENGINEER',
    year: '2024',
    tagline: 'Ramen e-commerce, 1,200+ monthly visitors.',
    description:
      'Full-stack storefront for a specialty ramen brand. Shopify-free checkout, inventory, editorial CMS, and a custom order pipeline.',
    stack: ['SvelteKit', 'Supabase', 'Stripe', 'Cloudflare'],
    link: 'https://respectthetechnique.com',
    screenshot: '/screenshots/rtt.webp',
    gridSpan: 1,
  },
  {
    id: 'helpukraine',
    number: '03',
    title: 'PR Pathway',
    role: 'LEAD ENGINEER',
    year: '2023',
    tagline: 'Advocacy tool with United Ukrainians of Canada Foundation.',
    description:
      'Personal-residence pathway guidance and status tracker. Multilingual forms, document checklists, admin dashboard.',
    stack: ['SvelteKit', 'Supabase', 'Tailwind'],
    screenshot: '/screenshots/helpukraine.webp',
    gridSpan: 1,
  },
  {
    id: 'rye',
    number: '04',
    title: 'Rye',
    role: 'SOLO',
    year: '2024',
    tagline: 'Experimental interface.',
    description: 'Short description — replace during implementation.',
    stack: ['React', 'TypeScript'],
    screenshot: '/screenshots/rye.webp',
    gridSpan: 2,
  },
  {
    id: 'gitfight',
    number: '05',
    title: 'Git Fight',
    role: 'SOLO',
    year: '2024',
    tagline: 'GitHub profile smackdown.',
    description: 'Compare two GitHub profiles side-by-side with stats, streaks, and a winner call.',
    stack: ['React', 'GitHub API', 'Cloudflare Workers'],
    screenshot: '/screenshots/gitfight.webp',
    gridSpan: 1,
  },
  {
    id: 'lingozo',
    number: '06',
    title: 'Lingozo',
    role: 'SOLO',
    year: '2023',
    tagline: 'Language learning, distilled.',
    description: 'Short description — replace during implementation.',
    stack: ['Next.js', 'Postgres'],
    screenshot: '/screenshots/lingozo.webp',
    gridSpan: 1,
  },
  {
    id: 'mockmind',
    number: '07',
    title: 'Mockmind',
    role: 'SOLO',
    year: '2023',
    tagline: 'Interview prep with AI.',
    description: 'Short description — replace during implementation.',
    stack: ['React', 'OpenAI'],
    screenshot: '/screenshots/mockmind.webp',
    gridSpan: 1,
  },
  {
    id: 'aighost',
    number: '08',
    title: 'AI Ghost',
    role: 'SOLO',
    year: '2023',
    tagline: 'Ghostwriter in your editor.',
    description: 'Short description — replace during implementation.',
    stack: ['TypeScript', 'VS Code API'],
    screenshot: '/screenshots/aighost.webp',
    gridSpan: 2,
  },
]
