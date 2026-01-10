<script lang="ts">
	import Hero from '$sections/Hero.svelte';
	import About from '$sections/About.svelte';
	import Projects from '$sections/Projects.svelte';
	import Contact from '$sections/Contact.svelte';
	import Marquee from '$ui/Marquee.svelte';
</script>

<main>
	<!-- Hero Section -->
	<Hero />

	<!-- Marquee Banner -->
	<Marquee
		items={['Full Stack', 'React', 'Next.js', 'SvelteKit', 'TypeScript', 'Node.js', 'UI/UX']}
		separator="+"
	/>

	<!-- Projects Section -->
	<Projects />

	<!-- About Section -->
	<About />

	<!-- Second Marquee -->
	<Marquee
		items={['Let\'s Collaborate', 'Available Now', 'Calgary, AB']}
		separator="*"
		direction="right"
	/>

	<!-- Contact Section -->
	<Contact />

	<!-- Footer -->
	<footer class="relative py-12 md:py-16 px-4 md:px-0" style="background: var(--color-bg-alt);">
		<div class="container">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
				<!-- Logo & Description -->
				<div class="md:col-span-4">
					<a href="/" class="inline-block font-display text-2xl md:text-3xl font-bold mb-4" data-cursor="pointer">
						Kos<span class="text-[var(--color-accent)]">.</span>
					</a>
					<p class="text-sm text-[var(--color-muted)] max-w-xs">
						Full Stack Developer crafting performant web experiences with modern technologies.
					</p>
				</div>

				<!-- Quick Links -->
				<div class="md:col-span-2 md:col-start-7">
					<h4 class="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">Navigation</h4>
					<ul class="space-y-2">
						<li>
							<a href="#work" class="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
								Work
							</a>
						</li>
						<li>
							<a href="#about" class="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
								About
							</a>
						</li>
						<li>
							<a href="#contact" class="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
								Contact
							</a>
						</li>
					</ul>
				</div>

				<!-- Social -->
				<div class="md:col-span-2">
					<h4 class="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">Social</h4>
					<ul class="space-y-2">
						<li>
							<a
								href="https://github.com/Kostia06"
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
								data-cursor="pointer"
							>
								GitHub
							</a>
						</li>
						<li>
							<a
								href="https://linkedin.com/in/kostiantyn-ilnytskyi"
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
								data-cursor="pointer"
							>
								LinkedIn
							</a>
						</li>
					</ul>
				</div>

				<!-- Back to top -->
				<div class="md:col-span-2 md:text-right">
					<button
						onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						class="group inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
						data-cursor="pointer"
					>
						<span>Back to top</span>
						<div class="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all">
							<svg
								class="w-4 h-4 text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
							</svg>
						</div>
					</button>
				</div>
			</div>

			<!-- Bottom Bar -->
			<div class="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-xs text-[var(--color-muted)] text-center md:text-left">
					&copy; {new Date().getFullYear()} Kostiantyn Ilnytskyi. All rights reserved.
				</p>
				<p class="text-xs text-[var(--color-muted)]">
					Built with <span class="text-[var(--color-accent)]">SvelteKit</span> + <span class="text-[var(--color-accent)]">GSAP</span>
				</p>
			</div>
		</div>

		<!-- Decorative corner -->
		<div class="hidden md:block absolute top-8 right-8 w-16 h-16 border-t border-r border-[var(--color-border)] opacity-30"></div>
	</footer>
</main>
