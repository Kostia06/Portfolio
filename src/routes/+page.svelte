<script lang="ts">
	import Hero from '$sections/Hero.svelte';
	import About from '$sections/About.svelte';
	import Projects from '$sections/Projects.svelte';
	import Experience from '$sections/Experience.svelte';
	import Contact from '$sections/Contact.svelte';
	import { isMobile, prefersReducedMotion } from '$stores/app';
</script>

<main>
	<!-- Sections with content-visibility optimization -->
	<Hero />
	<div class="section-lazy">
		<About />
	</div>
	<div class="section-lazy">
		<Projects />
	</div>
	<div class="section-lazy">
		<Experience />
	</div>
	<div class="section-lazy">
		<Contact />
	</div>

	<!-- Footer -->
	<footer
		class="relative py-12 px-4 text-center border-t border-[var(--border)] overflow-hidden"
		style="background: var(--background);"
	>
		<!-- Subtle gradient glow -->
		<div class="absolute inset-0 pointer-events-none">
			<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[var(--accent)] opacity-[0.03] blur-[100px] rounded-full"></div>
		</div>

		<div class="relative z-10">
			<p class="text-sm text-[var(--muted-foreground)] mb-4">
				&copy; {new Date().getFullYear()} Kostiantyn Ilnytskyi
			</p>
			<p class="text-xs text-[var(--muted-foreground)]">
				Built with
				<a
					href="https://kit.svelte.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors fancy-link"
				>
					SvelteKit
				</a>
				<span class="mx-2 opacity-50">•</span>
				Deployed on
				<a
					href="https://pages.cloudflare.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-[var(--accent)] hover:text-[var(--accent-secondary)] transition-colors fancy-link"
				>
					Cloudflare
				</a>
			</p>

			<!-- Back to top button -->
			<button
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class="mt-6 mx-auto flex items-center gap-2 text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors group"
				aria-label="Back to top"
			>
				<svg class="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
				</svg>
				Back to top
			</button>
		</div>
	</footer>
</main>
