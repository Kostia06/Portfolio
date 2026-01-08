<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, gridLayout, directions } from '$data/projects';
	import { isMobile } from '$stores/app';
	import ProjectCard from './ProjectCard.svelte';
	import { animate, scroll } from 'motion';

	let sectionEl: HTMLElement;
	let titleEl: HTMLDivElement;
	let projectsContainerEl: HTMLDivElement;
	let cardEls: HTMLDivElement[] = [];
	let animatedIn = false;

	onMount(() => {
		if (!sectionEl || !titleEl || !projectsContainerEl) return;

		const mobile = $isMobile;

		// Mobile - staggered scroll-triggered animation with spring
		if (mobile) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !animatedIn) {
							animatedIn = true;
							cardEls.forEach((card, index) => {
								if (!card) return;
								// Set will-change before animation
								card.style.willChange = 'transform, opacity';

								// Staggered entrance from bottom with spring bounce
								animate(
									card,
									{
										opacity: [0, 1],
										y: [60, 0],
										scale: [0.9, 1]
									},
									{
										duration: 0.7,
										delay: index * 0.08,
										easing: [0.34, 1.56, 0.64, 1] // Spring-like bounce
									}
								).finished.then(() => {
									// Remove will-change after animation completes
									card.style.willChange = 'auto';
								});
							});
						}
					});
				},
				{ threshold: 0.1 }
			);
			observer.observe(sectionEl);
			return () => observer.disconnect();
		}

		// Desktop - scroll-linked animations
		// Title fade out on scroll with blur
		scroll(
			animate(titleEl, {
				opacity: [1, 0],
				scale: [1, 0.85],
				y: [0, -80],
				filter: ['blur(0px)', 'blur(10px)']
			}),
			{ target: sectionEl, offset: ['start start', '25% start'] }
		);

		// Projects container fade in with scale
		scroll(
			animate(projectsContainerEl, {
				opacity: [0, 1],
				scale: [0.95, 1]
			}),
			{ target: sectionEl, offset: ['15% start', '35% start'] }
		);

		// Cards entrance based on scroll position
		const cardsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.28) {
						if (!animatedIn) {
							animatedIn = true;
							cardEls.forEach((card, index) => {
								if (!card) return;
								const dir = directions[index % directions.length];
								const rotation = index % 2 === 0 ? -8 : 8;

								// Set will-change before animation
								card.style.willChange = 'transform, opacity';

								// Dramatic entrance with spring bounce
								animate(
									card,
									{
										opacity: [0, 1],
										x: [dir.x * 1.5, 0],
										y: [dir.y * 1.5, 0],
										scale: [0.7, 1],
										rotate: [rotation, 0]
									},
									{
										duration: 0.8,
										delay: index * 0.07,
										easing: [0.34, 1.56, 0.64, 1] // Spring bounce
									}
								).finished.then(() => {
									// Remove will-change after animation
									card.style.willChange = 'auto';
								});
							});
						}
					} else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
						// Scrolling back up - cards fly out
						if (animatedIn) {
							animatedIn = false;
							cardEls.forEach((card, index) => {
								if (!card) return;
								const dir = directions[index % directions.length];
								const rotation = index % 2 === 0 ? -8 : 8;
								const reverseIndex = projects.length - 1 - index;

								// Set will-change before animation
								card.style.willChange = 'transform, opacity';

								animate(
									card,
									{
										opacity: [1, 0],
										x: [0, dir.x * 1.5],
										y: [0, dir.y * 1.5],
										scale: [1, 0.7],
										rotate: [0, rotation]
									},
									{ duration: 0.5, delay: reverseIndex * 0.04, easing: [0.4, 0, 0.6, 1] }
								).finished.then(() => {
									card.style.willChange = 'auto';
								});
							});
						}
					}
				});
			},
			{ threshold: [0, 0.28, 0.29, 1] }
		);
		cardsObserver.observe(sectionEl);

		// Add hover animations to cards (desktop only)
		cardEls.forEach((card) => {
			if (!card) return;

			card.addEventListener('mouseenter', () => {
				card.style.willChange = 'transform';
				animate(card, { scale: 1.03, y: -5 }, { duration: 0.2, easing: 'ease-out' });
			});

			card.addEventListener('mouseleave', () => {
				animate(card, { scale: 1, y: 0 }, { duration: 0.3, easing: 'ease-out' }).finished.then(() => {
					card.style.willChange = 'auto';
				});
			});
		});

		return () => {
			cardsObserver.disconnect();
		};
	});
</script>

{#if $isMobile}
	<!-- Mobile layout - title and projects together, scrollable -->
	<section
		bind:this={sectionEl}
		id="projects"
		class="relative py-16 px-4"
		style="background: var(--section-projects);"
	>
		<!-- Title -->
		<div bind:this={titleEl} class="text-center mb-8">
			<span class="text-[var(--accent)] font-mono text-sm mb-3 block"> Featured Work </span>
			<h2 class="text-3xl font-bold">
				Projects & <span class="gradient-text-animated">Achievements</span>
			</h2>
		</div>

		<!-- Projects grid -->
		<div bind:this={projectsContainerEl} class="grid grid-cols-1 gap-4">
			{#each projects as project, index}
				<div bind:this={cardEls[index]} class="h-[140px] relative" style="opacity: 0;">
					<ProjectCard {project} isMobile={true} />
				</div>
			{/each}
		</div>
	</section>
{:else}
	<!-- Desktop layout - sticky with scroll animations -->
	<section
		bind:this={sectionEl}
		id="projects"
		class="relative"
		style="background: var(--section-projects); min-height: 200vh;"
	>
		<!-- Sticky container -->
		<div class="sticky top-0 h-screen overflow-hidden">
			<!-- Title - centered, fades out on scroll -->
			<div
				bind:this={titleEl}
				class="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
			>
				<div class="text-center px-4">
					<span class="text-[var(--accent)] font-mono text-sm mb-4 block animate-pulse"> Featured Work </span>
					<h2 class="text-5xl md:text-7xl lg:text-8xl font-bold">Projects &</h2>
					<h2 class="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text-animated">Achievements</h2>
				</div>
			</div>

			<!-- Projects grid - bento layout -->
			<div
				bind:this={projectsContainerEl}
				class="absolute inset-0 flex items-center justify-center opacity-0"
			>
				<div class="w-full h-full px-8 py-16 lg:px-12 overflow-y-auto overflow-x-hidden">
					<div class="grid grid-cols-4 grid-rows-4 gap-3 lg:gap-4 h-full">
						{#each projects as project, index}
							{@const layout = gridLayout[project.id] || [1, 1, 1, 1]}
							<div
								bind:this={cardEls[index]}
								class="relative"
								style="grid-column: {layout[0]} / span {layout[2]}; grid-row: {layout[1]} / span {layout[3]}; opacity: 0;"
							>
								<ProjectCard {project} isMobile={false} />
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}
