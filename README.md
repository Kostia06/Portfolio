# Portfolio

> Personal portfolio site with animation-driven UI and an AI chat interface.

## What It Does

A full-stack developer portfolio featuring scroll-driven GSAP animations, Three.js 3D elements, and a conversational AI chat powered by Google Gemini. Built as a PWA with offline support, deployed on Cloudflare Pages.

## Tech Stack

- **SvelteKit 2** + **Svelte 5** -- framework
- **Tailwind CSS 4** -- styling
- **GSAP** + **Motion** + **Lenis** -- animations and smooth scrolling
- **Three.js** -- 3D graphics
- **Google GenAI** -- AI chat backend
- **Cloudflare Pages** -- deployment
- **Vite PWA** -- offline-first with Workbox caching

## Features

- **Scroll-driven animations** -- staggered text reveals, fade-ins, 3D rotation via GSAP timelines
- **AI chat** -- Gemini-powered conversational interface about my work and experience
- **PWA** -- installable, offline-capable with auto-updates
- **Project showcase** -- interactive cards for featured projects
- **Custom effects** -- magnetic buttons, grain overlay, custom cursor, text reveal animations
- **Performance-optimized** -- image caching, font preloading, Workbox strategies

## Getting Started

```bash
git clone https://github.com/Kostia06/Portfolio.git
cd Portfolio
pnpm install
pnpm dev        # localhost:5173
```

Deploy:

```bash
pnpm build
pnpm deploy     # Cloudflare Pages
```
