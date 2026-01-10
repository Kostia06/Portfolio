<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { isMobile, animationComplete, isLoading } from '$stores/app';

	let sectionEl: HTMLElement;
	let headingLines: HTMLElement[] = [];
	let subtitleEl: HTMLElement;
	let scrollIndicatorEl: HTMLElement;
	let floatingShapesEl: HTMLElement;
	let contentEl: HTMLElement;
	let hasAnimated = false;

	const headingText = ['Creative', 'Developer'];
	const subtitle = 'Based in Calgary, AB';

	onMount(() => {
		if (!browser) return;

		// Hide content initially
		if (contentEl) {
			gsap.set(contentEl, { opacity: 0 });
		}
		if (scrollIndicatorEl) {
			gsap.set(scrollIndicatorEl, { opacity: 0, y: 20 });
		}
		if (floatingShapesEl) {
			gsap.set(floatingShapesEl, { opacity: 0 });
		}

		const unsubscribe = isLoading.subscribe((loading) => {
			if (!loading && !hasAnimated) {
				hasAnimated = true;
				// Small delay to ensure loader is fully gone
				setTimeout(animateEntrance, 100);
			}
		});

		return () => {
			unsubscribe();
		};
	});

	function animateEntrance() {
		if (!browser || $isMobile) {
			if (contentEl) gsap.set(contentEl, { opacity: 1 });
			if (scrollIndicatorEl) gsap.set(scrollIndicatorEl, { opacity: 1, y: 0 });
			if (floatingShapesEl) gsap.set(floatingShapesEl, { opacity: 1 });
			animationComplete.set(true);
			return;
		}

		const tl = gsap.timeline({
			onComplete: () => {
				animationComplete.set(true);
			}
		});

		// Fade in content container first
		tl.to(contentEl, {
			opacity: 1,
			duration: 0.3,
			ease: 'power2.out'
		});

		// Animate each heading line
		headingLines.forEach((line, i) => {
			if (!line) return;
			const chars = line.querySelectorAll('.char');
			tl.from(
				chars,
				{
					y: 120,
					opacity: 0,
					duration: 1,
					ease: 'power4.out',
					stagger: 0.03
				},
				i * 0.2 + 0.2
			);
		});

		// Animate subtitle
		if (subtitleEl) {
			tl.from(
				subtitleEl,
				{
					y: 30,
					opacity: 0,
					duration: 0.8,
					ease: 'power3.out'
				},
				'-=0.6'
			);
		}

		// Animate floating shapes
		if (floatingShapesEl) {
			// First fade in the container
			tl.to(floatingShapesEl, {
				opacity: 1,
				duration: 0.5,
				ease: 'power2.out'
			}, '-=0.6');

			// Then animate individual shapes
			const shapes = floatingShapesEl.querySelectorAll('.floating-shape');
			tl.from(
				shapes,
				{
					scale: 0,
					duration: 1,
					stagger: 0.1,
					ease: 'elastic.out(1, 0.5)'
				},
				'-=0.3'
			);
		}

		// Animate scroll indicator
		if (scrollIndicatorEl) {
			tl.to(
				scrollIndicatorEl,
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					ease: 'power2.out'
				},
				'-=0.3'
			);
		}
	}

	function splitChars(text: string) {
		return text.split('').map((char) => (char === ' ' ? '\u00A0' : char));
	}
</script>

<section
	bind:this={sectionEl}
	id="hero"
	class="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 md:px-0"
	style="background: var(--color-bg);"
>
	<!-- Floating Shapes -->
	<div bind:this={floatingShapesEl} class="absolute inset-0 pointer-events-none overflow-hidden">
		<!-- Large accent circle -->
		<div class="floating-shape absolute top-[10%] right-[5%] md:right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-[var(--color-accent)] opacity-60"></div>

		<!-- Filled circle -->
		<div class="floating-shape absolute bottom-[20%] left-[5%] md:left-[8%] w-4 h-4 md:w-6 md:h-6 rounded-full bg-[var(--color-accent)]"></div>

		<!-- Grid pattern -->
		<div class="floating-shape absolute top-[30%] left-[10%] md:left-[15%] grid grid-cols-3 gap-2 opacity-30">
			{#each Array(9) as _}
				<div class="w-2 h-2 rounded-full bg-[var(--color-text)]"></div>
			{/each}
		</div>

		<!-- Cross shape -->
		<div class="floating-shape absolute bottom-[35%] right-[8%] md:right-[20%] opacity-40">
			<div class="relative w-8 h-8 md:w-12 md:h-12">
				<div class="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--color-text)] -translate-y-1/2"></div>
				<div class="absolute left-1/2 top-0 w-[2px] h-full bg-[var(--color-text)] -translate-x-1/2"></div>
			</div>
		</div>

		<!-- Rotating square -->
		<div class="floating-shape absolute top-[60%] right-[15%] w-16 h-16 md:w-24 md:h-24 border border-[var(--color-border)] rotate-45 opacity-40"></div>

		<!-- Arc -->
		<div class="floating-shape absolute top-[15%] left-[30%] w-32 h-32 md:w-48 md:h-48 border-t-2 border-r-2 border-[var(--color-border)] rounded-tr-full opacity-30"></div>
	</div>

	<!-- Main Content -->
	<div bind:this={contentEl} class="container relative z-10">
		<div class="max-w-6xl">
			<!-- Small intro -->
			<div class="mb-6 md:mb-8 flex items-center gap-3">
				<span class="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
				<span class="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
					Available for work
				</span>
			</div>

			<!-- Heading with staggered character animation -->
			<h1 class="mb-6 md:mb-8">
				{#each headingText as line, lineIndex}
					<div
						bind:this={headingLines[lineIndex]}
						class="overflow-hidden"
					>
						<span class="inline-block font-display text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.9] tracking-tighter">
							{#each splitChars(line) as char, i}
								<span
									class="char inline-block hover:text-[var(--color-accent)] transition-colors duration-200"
									style={lineIndex === 1 && i === 0 ? 'color: var(--color-accent);' : ''}
								>{char}</span>
							{/each}
						</span>
					</div>
				{/each}
			</h1>

			<!-- Subtitle with line -->
			<div
				bind:this={subtitleEl}
				class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
			>
				<div class="flex items-center gap-4">
					<span class="w-8 md:w-16 h-[1px] bg-[var(--color-accent)]"></span>
					<p class="text-sm md:text-base uppercase tracking-[0.15em] text-[var(--color-text)]">
						{subtitle}
					</p>
				</div>
				<p class="text-sm md:text-base text-[var(--color-muted)] max-w-md">
					I craft performant web experiences with modern technologies. Let's build something great together.
				</p>
			</div>

			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 mt-10 md:mt-14">
				<a
					href="#work"
					class="btn-primary"
					data-cursor="pointer"
					data-cursor-text="View"
				>
					<span>View Work</span>
					<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="#contact"
					class="btn-outline"
					data-cursor="pointer"
					data-cursor-text="Contact"
				>
					Get in Touch
				</a>
			</div>

			<!-- Quick stats -->
			<div class="flex flex-wrap gap-8 md:gap-12 mt-14 md:mt-20 pt-8 border-t border-[var(--color-border)]">
				<div>
					<span class="block font-display text-3xl md:text-4xl font-bold text-[var(--color-text)]">5+</span>
					<span class="text-xs uppercase tracking-wider text-[var(--color-muted)]">Projects</span>
				</div>
				<div>
					<span class="block font-display text-3xl md:text-4xl font-bold text-[var(--color-text)]">35+</span>
					<span class="text-xs uppercase tracking-wider text-[var(--color-muted)]">Students Mentored</span>
				</div>
				<div>
					<span class="block font-display text-3xl md:text-4xl font-bold text-[var(--color-accent)]">1st</span>
					<span class="text-xs uppercase tracking-wider text-[var(--color-muted)]">Hackathon Wins</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div
		bind:this={scrollIndicatorEl}
		class="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
	>
		<span class="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
			Scroll
		</span>
		<div class="w-[1px] h-10 md:h-12 bg-[var(--color-border)] relative overflow-hidden">
			<div class="absolute top-0 left-0 w-full h-full bg-[var(--color-accent)] scroll-indicator origin-top"></div>
		</div>
	</div>

	<!-- Corner frame -->
	<div class="hidden md:block absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-[var(--color-border)] opacity-50"></div>
	<div class="hidden md:block absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-[var(--color-border)] opacity-50"></div>

	<!-- Bottom line -->
	<div class="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]"></div>
</section>

<style>
	@keyframes scroll-line {
		0% {
			transform: scaleY(0);
			transform-origin: top;
		}
		50% {
			transform: scaleY(1);
			transform-origin: top;
		}
		50.1% {
			transform: scaleY(1);
			transform-origin: bottom;
		}
		100% {
			transform: scaleY(0);
			transform-origin: bottom;
		}
	}

	.scroll-indicator {
		animation: scroll-line 2s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.floating-shape {
		animation: float 6s ease-in-out infinite;
	}

	.floating-shape:nth-child(2) {
		animation-delay: -1s;
	}

	.floating-shape:nth-child(3) {
		animation-delay: -2s;
	}

	.floating-shape:nth-child(4) {
		animation-delay: -3s;
	}

	.floating-shape:nth-child(5) {
		animation-delay: -4s;
	}

	.floating-shape:nth-child(6) {
		animation-delay: -5s;
	}
</style>
