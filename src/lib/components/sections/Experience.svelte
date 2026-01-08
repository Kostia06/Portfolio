<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { experiences } from '$data/experiences';
	import { isMobile } from '$stores/app';

	let sectionEl: HTMLElement;
	let trackEl: HTMLDivElement;
	let activeIndex = $state(0);
	let isVisible = $state(false);
	let scrollProgress = $state(0);
	let translateX = $state(0);

	onMount(() => {
		const handleScroll = () => {
			if (!sectionEl) return;

			const rect = sectionEl.getBoundingClientRect();
			const sectionHeight = sectionEl.offsetHeight;
			const viewportHeight = window.innerHeight;

			// Calculate progress from 0 to 1 based on scroll position
			const scrollStart = rect.top;
			const totalScroll = sectionHeight - viewportHeight;

			if (totalScroll > 0) {
				scrollProgress = Math.max(0, Math.min(1, -scrollStart / totalScroll));
			}

			// Show content when scrolled into section
			isVisible = scrollProgress > 0.02 && scrollProgress < 0.98;

			// Calculate horizontal translation (only if trackEl exists)
			if (trackEl) {
				const trackWidth = trackEl.scrollWidth;
				const containerWidth = window.innerWidth;
				const maxTranslate = trackWidth - containerWidth + 100; // extra padding
				translateX = scrollProgress * maxTranslate;
			}

			// Calculate active card based on position
			if (scrollProgress > 0) {
				activeIndex = Math.min(
					Math.floor(scrollProgress * experiences.length),
					experiences.length - 1
				);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<section
	bind:this={sectionEl}
	id="experience"
	class="relative"
	style="background: var(--section-experience); height: {experiences.length * 100 + 100}vh;"
>
	<!-- Sticky container -->
	<div class="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
		<!-- Section Header -->
		{#if isVisible}
			<div
				class="text-center mb-8 md:mb-12 px-4"
				in:fly={{ y: $isMobile ? 20 : 30, duration: $isMobile ? 400 : 600 }}
			>
				<span class="text-[var(--accent)] font-mono text-sm mb-4 block"> Career Journey </span>
				<h2 class="text-4xl md:text-6xl lg:text-7xl font-bold">
					Professional <span class="gradient-text">Experience</span>
				</h2>
			</div>
		{/if}

		<!-- Progress bar -->
		{#if isVisible}
			<div class="w-full max-w-4xl mx-auto mb-8 px-4" in:fly={{ y: 10, duration: 400, delay: 100 }}>
				<div class="h-1 bg-[var(--muted)] rounded-full overflow-hidden">
					<div
						class="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] transition-all duration-200"
						style="width: {scrollProgress * 100}%"
					></div>
				</div>
				<div class="flex justify-between mt-2 text-xs text-[var(--muted-foreground)]">
					<span>{experiences[0]?.year}</span>
					<span>{experiences[experiences.length - 1]?.year}</span>
				</div>
			</div>
		{/if}

		<!-- Horizontal scroll track -->
		<div class="relative w-full overflow-hidden">
			{#if isVisible}
				<div
					bind:this={trackEl}
					class="flex gap-6 md:gap-8 px-6 md:px-12 transition-transform duration-100 ease-out"
					style="transform: translateX(-{translateX}px)"
					in:fly={{ x: 100, duration: 600, delay: 200 }}
				>
					{#each experiences as exp, index}
						{@const isActive = activeIndex === index}
						<div
							class="flex-shrink-0 w-[320px] sm:w-[400px] md:w-[500px] lg:w-[600px] transition-all duration-300"
							style="opacity: {isActive ? 1 : 0.5}; transform: scale({isActive ? 1 : 0.95});"
						>
							<div
								class="h-full glass rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 relative overflow-hidden transition-all duration-300"
								style="border: 2px solid {isActive ? exp.color + '50' : 'transparent'}; box-shadow: {isActive ? `0 0 40px ${exp.color}20` : 'none'};"
							>
								<!-- Background gradient -->
								<div
									class="absolute inset-0 opacity-10"
									style="background: radial-gradient(circle at top right, {exp.color}, transparent 70%);"
								></div>

								<div class="relative z-10">
									<!-- Header -->
									<div class="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
										<div
											class="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0"
											style="background: linear-gradient(135deg, {exp.color}40, {exp.color}20);"
										>
											{exp.icon}
										</div>
										<div class="min-w-0 flex-1">
											<div class="flex items-center gap-2 flex-wrap mb-1">
												<span
													class="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold"
													style="background: {exp.color}20; color: {exp.color};"
												>
													{exp.year}
												</span>
												<span class="text-[10px] md:text-xs text-[var(--muted-foreground)]"
													>{exp.period}</span
												>
											</div>
											<h3 class="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
												{exp.title}
											</h3>
											<p class="text-sm md:text-base" style="color: {exp.color};">
												{exp.company}
											</p>
											<p class="text-xs md:text-sm text-[var(--muted-foreground)]">
												{exp.location}
											</p>
										</div>
									</div>

									<!-- Achievements -->
									<div class="space-y-2 md:space-y-3 mb-4 md:mb-6">
										{#each exp.description as item, i}
											<div
												class="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl"
												style="background: {exp.color}08;"
											>
												<span
													class="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold shrink-0"
													style="background: {exp.color}20; color: {exp.color};"
												>
													{i + 1}
												</span>
												<span class="text-xs md:text-sm text-[var(--muted-foreground)]">{item}</span>
											</div>
										{/each}
									</div>

									<!-- Tech Stack -->
									<div class="flex flex-wrap gap-1.5 md:gap-2">
										{#each exp.technologies as tech}
											<span
												class="px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium"
												style="background: {exp.color}15; color: {exp.color}; border: 1px solid {exp.color}30;"
											>
												{tech}
											</span>
										{/each}
									</div>
								</div>

								<!-- Decorative element -->
								<div
									class="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl"
									style="background: {exp.color}; opacity: 0.1;"
								></div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Navigation dots -->
		{#if isVisible}
			<div class="flex justify-center gap-2 mt-8" in:fly={{ y: 10, duration: 400, delay: 300 }}>
				{#each experiences as exp, i}
					<button
						onclick={() => {
							// Scroll to position that corresponds to this card
							if (sectionEl) {
								const targetProgress = i / experiences.length;
								const sectionRect = sectionEl.getBoundingClientRect();
								const sectionTop = window.scrollY + sectionRect.top;
								const sectionHeight = sectionEl.offsetHeight;
								const viewportHeight = window.innerHeight;
								const targetScroll = sectionTop + targetProgress * (sectionHeight - viewportHeight);
								window.scrollTo({ top: targetScroll, behavior: 'smooth' });
							}
						}}
						class="group relative p-1"
						aria-label="Go to {exp.company}"
					>
						<div
							class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300"
							style="background: {activeIndex === i ? exp.color : 'var(--muted)'}; transform: scale({activeIndex === i ? 1.3 : 1}); box-shadow: {activeIndex === i ? `0 0 12px ${exp.color}` : 'none'};"
						></div>
						<!-- Tooltip -->
						<div
							class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--card)] border border-[var(--border)] rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
						>
							{exp.company}
						</div>
					</button>
				{/each}
			</div>
		{/if}

		<!-- Scroll hint -->
		{#if isVisible && scrollProgress < 0.1}
			<div
				class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-[var(--muted-foreground)] animate-pulse"
				in:fly={{ y: 10, duration: 400, delay: 400 }}
			>
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
				<span>Scroll to explore</span>
			</div>
		{/if}
	</div>

	<!-- Background elements -->
	<div class="fixed inset-0 pointer-events-none overflow-hidden" style="z-index: -1;">
		<div
			class="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent)] opacity-5 rounded-full blur-[150px]"
		></div>
		<div
			class="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500 opacity-5 rounded-full blur-[180px]"
		></div>
	</div>
</section>
