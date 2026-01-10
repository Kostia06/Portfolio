<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';
	import { experiences } from '$data/experiences';

	let sectionEl: HTMLElement;
	let trackEl: HTMLElement;
	let activeIndex = $state(0);

	// Role icons based on title keywords
	function getRoleIcon(title: string): string {
		if (title.toLowerCase().includes('lead') || title.toLowerCase().includes('senior')) return 'star';
		if (title.toLowerCase().includes('developer') || title.toLowerCase().includes('engineer')) return 'code';
		if (title.toLowerCase().includes('mentor') || title.toLowerCase().includes('tutor')) return 'academic';
		return 'briefcase';
	}

	onMount(() => {
		if (!browser) return;
		gsap.registerPlugin(ScrollTrigger);

		let scrollTriggerInstance: ScrollTrigger | null = null;

		if (trackEl && !$isMobile) {
			const track = trackEl;
			const totalItems = 5;
			const totalWidth = track.scrollWidth - window.innerWidth;

			const tween = gsap.to(track, {
				x: () => -totalWidth,
				ease: 'none',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top top',
					end: () => `+=${totalWidth}`,
					scrub: 1,
					pin: true,
					anticipatePin: 1,
					onUpdate: (self) => {
						const progress = self.progress;
						const newIndex = Math.min(
							Math.floor(progress * totalItems),
							totalItems - 1
						);
						if (newIndex !== activeIndex) {
							activeIndex = newIndex;
						}
					}
				}
			});

			scrollTriggerInstance = tween.scrollTrigger as ScrollTrigger;

			// Check if coming from about page (hash is #experience)
			// Scroll to end of carousel
			if (window.location.hash === '#experience') {
				// Small delay to let ScrollTrigger initialize
				setTimeout(() => {
					if (scrollTriggerInstance) {
						const scrollEnd = scrollTriggerInstance.end;
						window.scrollTo({
							top: scrollEnd - 100,
							behavior: 'instant'
						});
						// Clear hash to prevent re-triggering
						history.replaceState(null, '', window.location.pathname);
					}
				}, 100);
			}
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section
	bind:this={sectionEl}
	class="relative bg-[var(--color-bg)] overflow-hidden"
	class:min-h-screen={!$isMobile}
	class:py-16={$isMobile}
>
	<!-- Background decorative elements -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<div class="absolute top-20 left-10 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl"></div>
		<div class="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent)]/3 rounded-full blur-3xl"></div>
	</div>

	<!-- Header -->
	<div class="absolute top-0 left-0 right-0 z-20 p-6 md:p-10 pointer-events-none">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<div class="relative">
					<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/60 flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/20">
						<svg class="w-6 h-6 text-[var(--color-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
						</svg>
					</div>
					<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--color-bg)]"></div>
				</div>
				<div>
					<span class="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] font-mono">
						Experience
					</span>
					<h2 class="font-display text-2xl md:text-3xl font-bold text-[var(--color-text)]">
						Career Journey
					</h2>
				</div>
			</div>

			<!-- Progress indicator -->
			<div class="hidden md:flex items-center gap-3 bg-[var(--color-bg-alt)]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--color-border)]">
				<span class="text-xs font-mono text-[var(--color-muted)]">{String(activeIndex + 1).padStart(2, '0')}</span>
				<div class="flex items-center gap-1.5">
					{#each Array(5) as _, i}
						<div
							class="h-1.5 rounded-full transition-all duration-500"
							class:bg-[var(--color-accent)]={i === activeIndex}
							class:w-6={i === activeIndex}
							class:w-1.5={i !== activeIndex}
							class:bg-[var(--color-border)]={i !== activeIndex}
						></div>
					{/each}
				</div>
				<span class="text-xs font-mono text-[var(--color-muted)]">05</span>
			</div>
		</div>
	</div>

	<!-- Horizontal scroll track -->
	<div
		bind:this={trackEl}
		class="flex items-center gap-6 px-6 pt-28 pb-8 md:gap-0 md:px-0 md:pt-0 md:pb-0 md:h-screen"
		class:flex-col={$isMobile}
	>
		<!-- Initial spacer -->
		<div class="hidden md:block w-[34vw] flex-shrink-0"></div>

		{#each experiences.slice(0, 4) as exp, i}
			{@const isActive = i === activeIndex || $isMobile}
			{@const iconType = getRoleIcon(exp.title)}
			<div
				class="exp-item flex-shrink-0 w-full md:px-6"
				class:is-active={i === activeIndex}
				style="width: {$isMobile ? '100%' : (i === activeIndex ? '32vw' : '24vw')};"
			>
				<div class="relative h-full group">
					<!-- Decorative corner elements -->
					<div class="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div class="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

					<!-- Year floating badge -->
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
						<div class="relative">
							<div class="px-4 py-1.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 text-[var(--color-bg)] font-mono text-sm font-bold rounded-full shadow-lg shadow-[var(--color-accent)]/30 flex items-center gap-2">
								<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
								</svg>
								{exp.year}
							</div>
							<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--color-accent)] rotate-45"></div>
						</div>
					</div>

					<!-- Main Card -->
					<div
						class="relative bg-gradient-to-br from-[var(--color-bg-alt)] to-[var(--color-bg)] border-2 transition-all duration-500 ease-out overflow-hidden h-full flex flex-col rounded-2xl {isActive ? 'border-[var(--color-accent)]/50 shadow-xl shadow-[var(--color-accent)]/10' : 'border-[var(--color-border)]'}"
						style="padding: {isActive ? '2rem 1.5rem' : '1.5rem 1.25rem'}; padding-top: {isActive ? '3rem' : '2.5rem'}; min-height: {isActive ? '420px' : '320px'};"
					>
						<!-- Background pattern -->
						<div class="absolute top-0 right-0 w-32 h-32 opacity-5">
							<svg viewBox="0 0 100 100" fill="currentColor">
								<circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="1" fill="none" />
								<circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="1" fill="none" />
								<circle cx="50" cy="50" r="20" stroke="currentColor" stroke-width="1" fill="none" />
							</svg>
						</div>

						<!-- Role icon badge -->
						<div class="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
							{#if iconType === 'star'}
								<svg class="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
								</svg>
							{:else if iconType === 'code'}
								<svg class="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
								</svg>
							{:else if iconType === 'academic'}
								<svg class="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
								</svg>
							{:else}
								<svg class="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
								</svg>
							{/if}
						</div>

						<!-- Company with building icon -->
						<div class="flex items-center gap-2.5 mb-1">
							<div class="w-8 h-8 rounded-lg bg-[var(--color-border)]/30 flex items-center justify-center">
								<svg class="w-4 h-4 text-[var(--color-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
								</svg>
							</div>
							<span class="text-sm font-semibold text-[var(--color-text)]">
								{exp.company}
							</span>
						</div>

						<!-- Period -->
						<div class="flex items-center gap-2 mb-5 ml-10 text-xs text-[var(--color-muted)]">
							<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="font-mono">{exp.period}</span>
						</div>

						<!-- Title -->
						<h3
							class="font-display font-bold text-[var(--color-text)] leading-tight transition-all duration-500 mb-4"
							style="font-size: {isActive ? '1.5rem' : '1rem'};"
						>
							{exp.title}
						</h3>

						<!-- Description -->
						<div
							class="space-y-3 overflow-hidden transition-all duration-500 flex-grow"
							style="max-height: {isActive ? '200px' : '50px'}; opacity: {isActive ? '1' : '0.6'};"
						>
							{#each exp.description.slice(0, isActive ? 3 : 1) as desc}
								<p class="text-sm text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-2">
									<span class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0 mt-2"></span>
									<span>{desc}</span>
								</p>
							{/each}
						</div>

						<!-- Divider with icon -->
						<div class="flex items-center gap-3 my-4">
							<div class="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>
							<svg class="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
							</svg>
							<div class="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>
						</div>

						<!-- Tech stack -->
						<div>
							<div class="flex items-center gap-2 mb-3">
								<span class="text-[10px] uppercase tracking-wider font-mono text-[var(--color-muted)]">Tech Stack</span>
								<div class="flex-1 h-px bg-[var(--color-border)]/50"></div>
							</div>
							<div
								class="flex flex-wrap gap-2 overflow-hidden transition-all duration-500"
								style="max-height: {isActive ? '80px' : '32px'};"
							>
								{#each exp.technologies.slice(0, isActive ? 8 : 3) as tech}
									<span class="px-2.5 py-1 text-[10px] font-mono bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] rounded-md whitespace-nowrap hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-colors">
										{tech}
									</span>
								{/each}
								{#if !isActive && exp.technologies.length > 3}
									<span class="px-2.5 py-1 text-[10px] font-mono text-[var(--color-accent)] bg-[var(--color-accent)]/10 rounded-md">
										+{exp.technologies.length - 3}
									</span>
								{/if}
							</div>
						</div>
					</div>

					<!-- Card number with glow -->
					<div
						class="absolute -bottom-3 -right-3 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/70 flex items-center justify-center rounded-xl shadow-lg shadow-[var(--color-accent)]/30 transition-all duration-500"
						style="width: {isActive ? '3rem' : '2.5rem'}; height: {isActive ? '3rem' : '2.5rem'};"
					>
						<span class="font-mono font-bold text-[var(--color-bg)] transition-all duration-500" style="font-size: {isActive ? '1rem' : '0.875rem'};">
							{String(i + 1).padStart(2, '0')}
						</span>
					</div>

					<!-- Decorative bottom corners -->
					<div class="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div class="absolute -bottom-2 -right-8 w-6 h-6 border-r-2 border-b-2 border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</div>
			</div>
		{/each}

		<!-- View all link -->
		<div
			id="experience"
			class="exp-item flex-shrink-0 w-full md:px-6 md:flex md:items-center"
			class:is-active={activeIndex === 4}
			style="width: {$isMobile ? '100%' : '28vw'};"
		>
			<a
				href="/about"
				class="block w-full group"
				data-cursor="pointer"
			>
				<div class="relative bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent)]/90 to-[var(--color-accent)]/70 p-8 md:p-10 text-center rounded-2xl overflow-hidden transition-all duration-500 shadow-xl shadow-[var(--color-accent)]/20 group-hover:shadow-2xl group-hover:shadow-[var(--color-accent)]/30" style="min-height: {(activeIndex === 4 || $isMobile) ? '380px' : '300px'}; display: flex; flex-direction: column; justify-content: center;">
					<!-- Decorative circles -->
					<div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
					<div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

					<!-- Icon -->
					<div class="relative w-16 h-16 rounded-2xl bg-[var(--color-bg)]/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
						<svg class="w-8 h-8 text-[var(--color-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
						</svg>
					</div>

					<span class="relative text-[10px] font-mono text-[var(--color-bg)] uppercase tracking-[0.2em] opacity-70">
						Full Journey
					</span>
					<h3 class="relative font-display text-2xl md:text-3xl font-bold text-[var(--color-bg)] mt-3">
						View All
					</h3>

					<div class="relative mt-5 flex items-center justify-center gap-3 text-[var(--color-bg)]">
						<div class="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg)]/10 rounded-full">
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
							</svg>
							<span class="text-xs font-mono">Resume & Details</span>
						</div>
					</div>
				</div>
			</a>
		</div>

		<!-- End spacer -->
		<div class="hidden md:block h-full flex-shrink-0 md:px-6" style="width: {$isMobile ? '100%' : '28vw'};"></div>
	</div>

	<!-- Scroll indicator -->
	<div class="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-3 bg-[var(--color-bg-alt)]/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[var(--color-border)]">
		<div class="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
			<svg class="w-3 h-3 text-[var(--color-accent)] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</div>
		<span class="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)]">Scroll to explore</span>
		<div class="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
			<svg class="w-3 h-3 text-[var(--color-accent)] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</div>
	</div>
</section>

<style>
	.exp-item {
		transition: width 0.5s ease-out, opacity 0.4s ease;
	}

	.exp-item:not(.is-active) {
		opacity: 0.5;
	}

	@media (max-width: 768px) {
		.exp-item {
			width: 100% !important;
			opacity: 1 !important;
		}
	}
</style>
