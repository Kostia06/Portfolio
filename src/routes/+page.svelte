<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import Hero from '$sections/Hero.svelte';
	import Projects from '$sections/Projects.svelte';
	import Contact from '$sections/Contact.svelte';
	import Marquee from '$ui/Marquee.svelte';

	let aboutLinkEl: HTMLElement;
	let aboutIconEl: HTMLElement;

	onMount(() => {
		if (!browser) return;

		// Floating animation for the about icon
		if (aboutIconEl) {
			gsap.to(aboutIconEl, {
				y: -10,
				duration: 2,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});
		}

		// Magnetic effect on hover
		if (aboutLinkEl) {
			const handleMouseMove = (e: MouseEvent) => {
				const rect = aboutLinkEl.getBoundingClientRect();
				const x = e.clientX - rect.left - rect.width / 2;
				const y = e.clientY - rect.top - rect.height / 2;

				gsap.to(aboutLinkEl, {
					x: x * 0.3,
					y: y * 0.3,
					duration: 0.3,
					ease: 'power2.out'
				});
			};

			const handleMouseLeave = () => {
				gsap.to(aboutLinkEl, {
					x: 0,
					y: 0,
					duration: 0.5,
					ease: 'elastic.out(1, 0.3)'
				});
			};

			aboutLinkEl.addEventListener('mousemove', handleMouseMove);
			aboutLinkEl.addEventListener('mouseleave', handleMouseLeave);

			return () => {
				aboutLinkEl.removeEventListener('mousemove', handleMouseMove);
				aboutLinkEl.removeEventListener('mouseleave', handleMouseLeave);
			};
		}
	});
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

	<!-- About Me Link Section -->
	<section class="py-20 md:py-32 relative overflow-hidden" style="background: var(--color-bg-alt);">
		<!-- Background decoration -->
		<div class="absolute inset-0 pointer-events-none">
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--color-border)] opacity-20"></div>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--color-border)] opacity-30"></div>
		</div>

		<div class="container text-center relative z-10">
			<span class="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6 block">
				Want to know more?
			</span>

			<a
				bind:this={aboutLinkEl}
				href="/about"
				class="about-link group inline-flex flex-col items-center gap-6"
				data-cursor="pointer"
				data-cursor-text="View"
			>
				<!-- Animated Icon -->
				<div
					bind:this={aboutIconEl}
					class="relative w-28 h-28 md:w-36 md:h-36"
				>
					<!-- Outer rotating ring -->
					<div class="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-accent)]/50 animate-spin-slow"></div>

					<!-- Middle ring -->
					<div class="absolute inset-3 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors duration-500"></div>

					<!-- Inner circle with icon -->
					<div class="absolute inset-6 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)] flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-all duration-500">
						<svg
							class="w-8 h-8 md:w-10 md:h-10 text-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-colors duration-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
						</svg>
					</div>

					<!-- Floating dots -->
					<div class="absolute -top-2 right-4 w-3 h-3 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
					<div class="absolute -bottom-1 left-6 w-2 h-2 bg-[var(--color-accent)]/60 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
				</div>

				<!-- Text -->
				<div class="space-y-2">
					<h3 class="font-display text-3xl md:text-5xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
						About Me
					</h3>
					<div class="flex items-center justify-center gap-2 text-sm text-[var(--color-muted)]">
						<span>Discover my journey</span>
						<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</div>
				</div>
			</a>
		</div>
	</section>

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
							<a href="/about" class="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
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
