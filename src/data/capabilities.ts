export type CapabilityGroup = { label: string; items: string[] }

export const capabilities: CapabilityGroup[] = [
  { label: 'LANGUAGES', items: ['TypeScript', 'Python', 'Swift', 'Go', 'SQL', 'Java'] },
  { label: 'FRAMEWORKS', items: ['React', 'Preact', 'SvelteKit', 'Next.js', 'SwiftUI', 'Node.js'] },
  { label: 'TOOLS', items: ['Supabase', 'Postgres', 'Cloudflare', 'Vite', 'Docker', 'GSAP'] },
  { label: 'DESIGN', items: ['Figma', 'Motion', 'Typography', 'Grid systems'] },
]
