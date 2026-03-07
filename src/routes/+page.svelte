<script lang="ts">
	import Hero from '$sections/Hero.svelte';
	import Projects from '$sections/Projects.svelte';

	import Contact from '$sections/Contact.svelte';
</script>

<main>
	<!-- Hero Section -->
	<Hero />

	<!-- Projects Section -->
	<Projects />

	<!-- Contact Section -->
	<Contact />

	<!-- Footer -->
	<footer class="py-6 px-4 md:px-0" style="background: var(--color-bg-alt);">
		<div class="container flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-xs text-[var(--color-muted)] text-center md:text-left">
				&copy; {new Date().getFullYear()} Kostiantyn Ilnytskyi. All rights reserved.
			</p>
			<p class="text-xs text-[var(--color-muted)]">
				Built with <span class="text-[var(--color-accent)]">SvelteKit</span> + <span class="text-[var(--color-accent)]">GSAP</span>
			</p>
		</div>
	</footer>
</main>
