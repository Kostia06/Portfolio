<script lang="ts">
	import Hero from '$sections/Hero.svelte';
	import About from '$sections/About.svelte';
	import Projects from '$sections/Projects.svelte';
	import Experience from '$sections/Experience.svelte';
	import Contact from '$sections/Contact.svelte';
	import { isMobile, prefersReducedMotion } from '$stores/app';
</script>

<main>
	<!-- Parallax Background Layers - Optimized for mobile -->
	{#if !$prefersReducedMotion}
		<div class="fixed inset-0 pointer-events-none z-0 bg-glow-container">
			<!-- Reduced blur and size on mobile for better performance -->
			<div
				class="absolute top-[20%] left-[10%] w-[150px] h-[150px] md:w-[600px] md:h-[600px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[50px] md:blur-[100px] will-change-transform"
			></div>
			<div
				class="absolute top-[60%] right-[5%] w-[120px] h-[120px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500 opacity-[0.03] blur-[60px] md:blur-[120px] will-change-transform"
			></div>
			<div
				class="absolute top-[40%] left-[50%] w-[100px] h-[100px] md:w-[400px] md:h-[400px] rounded-full bg-[var(--accent-secondary)] opacity-[0.02] blur-[40px] md:blur-[80px] will-change-transform"
			></div>
		</div>
	{/if}

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
		class="relative py-8 px-4 text-center border-t border-[var(--border)]"
		style="background: var(--background);"
	>
		<p class="text-sm text-[var(--muted-foreground)]">
			&copy; {new Date().getFullYear()} Kostiantyn Ilnytskyi. Built with
			<a
				href="https://kit.svelte.dev"
				target="_blank"
				rel="noopener noreferrer"
				class="text-[var(--accent)] hover:underline"
			>
				SvelteKit
			</a>
		</p>
	</footer>
</main>
