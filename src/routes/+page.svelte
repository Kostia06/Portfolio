<script lang="ts">
	import Hero from '$sections/Hero.svelte';
	import SelectedWork from '$sections/SelectedWork.svelte';
	import Expertise from '$sections/Expertise.svelte';
	import Experience from '$sections/Experience.svelte';
	import About from '$sections/About.svelte';
	import Contact from '$sections/Contact.svelte';
</script>

<main>
	<Hero />
	<SelectedWork />
	<Expertise />
	<Experience />
	<About />
	<Contact />

	<footer class="py-8 px-4 md:px-0 border-t border-[var(--color-border)]" style="background: var(--color-bg);">
		<div class="container flex items-center justify-between">
			<p class="text-xs" style="color: var(--color-muted);">
				&copy; {new Date().getFullYear()} Kostia Ilnytskyi
			</p>
			<button
				class="text-xs uppercase tracking-widest hover:text-[var(--color-text)] transition-colors"
				style="color: var(--color-muted);"
				data-cursor="pointer"
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			>
				Back to top
			</button>
		</div>
	</footer>
</main>
