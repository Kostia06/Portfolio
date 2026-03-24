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
	<footer class="py-8 px-4 md:px-0 border-t border-[var(--color-border)]" style="background: var(--color-bg);">
		<div class="container">
			<p class="text-xs text-[var(--color-muted)]">
				&copy; {new Date().getFullYear()} Kostia Ilnytskyi
			</p>
		</div>
	</footer>
</main>
