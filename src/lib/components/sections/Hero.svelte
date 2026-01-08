<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { signaturePath } from '$data/signature';
	import { isMobile, animationComplete } from '$stores/app';

	let sectionEl: HTMLElement;
	let heroContentEl: HTMLElement;

	let scrollProgress = $state(0);
	let showScrollIndicator = $state(false);
	let contentVisible = $state(true);

	// Computed scroll-based values
	let logoScale = $derived(1 + scrollProgress * ($isMobile ? 2 : 3));
	let logoBlur = $derived(scrollProgress * 20);
	let logoOpacity = $derived(scrollProgress < 0.3 ? 1 : scrollProgress < 0.5 ? 0.5 : 0);
	let contentOpacity = $derived(1 - scrollProgress * 4);

	onMount(() => {
		const mobile = $isMobile;

		// Disable scrolling on mount
		document.body.style.overflow = 'hidden';

		// Re-enable scrolling after page loader finishes (2.4s + fade)
		const timer = setTimeout(() => {
			document.body.style.overflow = '';
			animationComplete.set(true);
			showScrollIndicator = true;
		}, 3100);

		// Scroll handler for parallax
		const handleScroll = () => {
			if (!sectionEl) return;
			const rect = sectionEl.getBoundingClientRect();
			const progress = Math.max(0, Math.min(1, -rect.top / (sectionEl.offsetHeight - window.innerHeight)));
			scrollProgress = progress;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			clearTimeout(timer);
			document.body.style.overflow = '';
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="hero"
	class="relative h-[150vh] overflow-hidden"
	style="background: var(--section-hero);"
>
	<!-- 3D Canvas Background - loaded on all devices -->
	{#await import('./HeroCanvas.svelte') then { default: HeroCanvas }}
		<div class="absolute inset-0 z-0">
			<HeroCanvas />
		</div>
	{/await}

	<!-- Gradient Overlays -->
	<div
		class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)] z-10 pointer-events-none"
	></div>

	<!-- Sticky Content Container -->
	<div class="sticky top-0 h-screen overflow-visible">
		<!-- Logo - centered in the middle of the screen -->
		<div
			class="absolute inset-0 flex items-center justify-center pointer-events-none"
		>
			<div
				style="transform: scale({logoScale}); filter: blur({$isMobile ? logoBlur * 0.5 : logoBlur}px); opacity: {logoOpacity};"
				class="flex items-center justify-center overflow-visible transition-opacity duration-100"
			>
				<!-- Signature SVG Container -->
				<div
					class="relative"
					style="width: {$isMobile ? 'min(280px, 70vw)' : 'min(500px, 65vw)'}; height: {$isMobile
						? 'min(210px, 52vw)'
						: 'min(375px, 50vw)'};"
				>
					<!-- Static Logo (always visible, acts as background) -->
					<svg
						viewBox="-20 -20 200 160"
						class="w-full h-full absolute inset-0 static-logo"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style="overflow: visible;"
					>
						<!-- Outer glow layer -->
						<path
							d={signaturePath}
							stroke="url(#staticSignatureGradient)"
							stroke-linecap="round"
							stroke-linejoin="round"
							fill="none"
							class="static-glow-outer"
						/>

						<!-- Inner glow effect -->
						<path
							d={signaturePath}
							stroke="url(#staticSignatureGradient)"
							stroke-linecap="round"
							stroke-linejoin="round"
							fill="none"
							class="static-glow-inner"
						/>

						<!-- Main signature stroke -->
						<path
							d={signaturePath}
							stroke="url(#staticSignatureGradient)"
							stroke-linecap="round"
							stroke-linejoin="round"
							fill="none"
							class="static-main-stroke"
						/>

						<defs>
							<linearGradient id="staticSignatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stop-color="#6366f1" />
								<stop offset="50%" stop-color="#818cf8" />
								<stop offset="100%" stop-color="#c084fc" />
							</linearGradient>
						</defs>
					</svg>

					</div>
			</div>
		</div>

		<!-- Content below logo -->
		<div
			bind:this={heroContentEl}
			class="hero-content absolute inset-0 flex flex-col items-center justify-end z-20 pb-[80px] md:pb-[140px] pointer-events-auto"
			style="opacity: {contentOpacity};"
		>
			<div class="text-xs md:text-base text-[var(--muted-foreground)] text-center px-4">
				<span class="inline-flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
					Calgary, AB
				</span>
				<span class="mx-2 opacity-50 hidden sm:inline">•</span>
				<br class="sm:hidden" />
				<span>University of Calgary</span>
				<span class="mx-2 opacity-50 hidden sm:inline">•</span>
				<br class="sm:hidden" />
				<span>Computer Science</span>
			</div>

			<div class="mt-6 md:mt-8 flex flex-row gap-2 md:gap-4 justify-center px-4">
				<a
					href="#projects"
					class="px-4 py-2.5 md:px-10 md:py-5 bg-[var(--accent)] hover:bg-[var(--accent-secondary)] text-white rounded-full font-medium text-sm md:text-lg transition-all duration-300 hover:scale-105 glow text-center"
					data-cursor="pointer"
					data-cursor-text="View"
				>
					View Work
				</a>
				<a
					href="#contact"
					class="px-4 py-2.5 md:px-10 md:py-5 border border-[var(--border)] hover:border-[var(--accent)] rounded-full font-medium text-sm md:text-lg transition-all duration-300 hover:scale-105 glass text-center"
					data-cursor="pointer"
					data-cursor-text="Contact"
				>
					Contact
				</a>
			</div>

			<!-- Social Links -->
			<div class="mt-8 md:mt-12 flex items-center justify-center gap-4 md:gap-6">
				<a
					href="https://github.com/Kostia06"
					target="_blank"
					rel="noopener noreferrer"
					class="p-2 md:p-3 rounded-full glass hover:bg-[var(--accent)]/20 transition-colors"
					data-cursor="pointer"
					aria-label="GitHub"
				>
					<svg class="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
				</a>
				<a
					href="https://linkedin.com/in/kostiantyn-ilnytskyi"
					target="_blank"
					rel="noopener noreferrer"
					class="p-2 md:p-3 rounded-full glass hover:bg-[var(--accent)]/20 transition-colors"
					data-cursor="pointer"
					aria-label="LinkedIn"
				>
					<svg class="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
				<a
					href="mailto:Ilnkostia@gmail.com"
					class="p-2 md:p-3 rounded-full glass hover:bg-[var(--accent)]/20 transition-colors"
					data-cursor="pointer"
					aria-label="Email"
				>
					<svg
						class="w-5 h-5 md:w-6 md:h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</a>
			</div>
		</div>

		<!-- Scroll Indicator -->
		{#if showScrollIndicator}
			<div
				class="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
				style="opacity: {contentOpacity};"
				in:fly={{ y: -10, duration: 500 }}
			>
				<span class="text-[10px] md:text-xs text-[var(--muted-foreground)] uppercase tracking-widest">
					Scroll
				</span>
				<div
					class="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-[var(--muted-foreground)] flex items-start justify-center p-1"
				>
					<div class="w-1 h-2 md:w-1.5 md:h-2.5 rounded-full bg-[var(--accent)] animate-bounce"></div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Background Particles (CSS fallback) -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
		{#each Array($isMobile ? 10 : 15) as _, i}
			<div
				class="absolute w-1 h-1 rounded-full bg-[var(--accent)] opacity-20"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation: float {10 +
					Math.random() * 20}s linear infinite; animation-delay: {Math.random() * 10}s;"
			></div>
		{/each}
	</div>
</section>

<style>
	/* Static logo - always visible, uses CSS for responsive sizing */
	.static-glow-outer {
		stroke-width: 24px;
		opacity: 0.15;
		filter: blur(20px);
	}

	.static-glow-inner {
		stroke-width: 14px;
		opacity: 0.4;
		filter: blur(10px);
	}

	.static-main-stroke {
		stroke-width: 4px;
	}

	/* Mobile styles for static logo */
	@media (max-width: 768px) {
		.static-glow-outer {
			stroke-width: 16px;
			opacity: 0.12;
			filter: blur(12px);
		}

		.static-glow-inner {
			stroke-width: 10px;
			opacity: 0.3;
			filter: blur(6px);
		}

		.static-main-stroke {
			stroke-width: 3px;
		}
	}

	/* Floating particle animation */
	@keyframes float {
		0%, 100% {
			transform: translateY(0) translateX(0);
		}
		25% {
			transform: translateY(-20px) translateX(10px);
		}
		50% {
			transform: translateY(-10px) translateX(-10px);
		}
		75% {
			transform: translateY(-30px) translateX(5px);
		}
	}
</style>
