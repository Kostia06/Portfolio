<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { projects } from '$data/projects';
	import { isMobile } from '$stores/app';

	let sectionEl: HTMLElement;
	let titleEl: HTMLElement;
	let projectEls: HTMLElement[] = [];
	let activeIndex = $state(-1);
	let prevIndex = $state(-1);
	let isHovering = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let slideDirection = $state<'up' | 'down'>('up');

	const featuredProjects = projects.filter((p) => p.screenshot).slice(0, 6);

	onMount(() => {
		if (!browser) return;

		gsap.registerPlugin(ScrollTrigger);

		if (titleEl && !$isMobile) {
			gsap.from(titleEl.querySelectorAll('.title-line'), {
				y: 100,
				opacity: 0,
				duration: 1,
				ease: 'power4.out',
				stagger: 0.1,
				scrollTrigger: {
					trigger: titleEl,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		}

		projectEls.forEach((el) => {
			if (!el) return;

			gsap.from(el, {
				y: 80,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	function handleProjectEnter(index: number) {
		if ($isMobile) return;
		if (activeIndex !== index) {
			slideDirection = index > activeIndex ? 'up' : 'down';
			prevIndex = activeIndex;
			activeIndex = index;
		}
		isHovering = true;
	}

	function handleSectionLeave() {
		isHovering = false;
		prevIndex = activeIndex;
		activeIndex = -1;
	}
</script>

<section
	bind:this={sectionEl}
	id="work"
	class="section-lg relative overflow-hidden"
	style="background: var(--color-bg);"
	onmouseleave={handleSectionLeave}
>
	<!-- Floating preview image -->
	<div
		class="preview-container fixed pointer-events-none z-50 w-[350px] md:w-[400px] h-[220px] md:h-[250px] rounded-xl overflow-hidden"
		class:active={isHovering && activeIndex >= 0}
		style="
			left: {mouseX}px;
			top: {mouseY}px;
			transform: translate(-50%, -50%);
		"
	>
		{#each featuredProjects as project, i}
			{#if project.screenshot}
				<img
					src={project.screenshot}
					alt={project.title}
					class="preview-image absolute inset-0 w-full h-full object-cover"
					class:active={activeIndex === i}
					class:prev={prevIndex === i && activeIndex !== i}
					class:slide-up={slideDirection === 'up'}
					class:slide-down={slideDirection === 'down'}
				/>
			{/if}
		{/each}
		<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
		<div class="absolute inset-0 rounded-xl border border-white/10"></div>
	</div>

	<!-- Background decoration -->
	<div class="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.03]">
		<div class="absolute top-1/4 right-[10%] font-display text-[40vw] font-bold leading-none text-[var(--color-text)]">
			W
		</div>
	</div>

	<div class="container relative z-10">
		<!-- Section Header -->
		<div bind:this={titleEl} class="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
			<div>
				<div class="overflow-hidden">
					<span class="title-line block text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
						/ Selected Work
					</span>
				</div>
				<div class="overflow-hidden">
					<h2 class="title-line font-display text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tighter">
						Featured
					</h2>
				</div>
				<div class="overflow-hidden">
					<h2 class="title-line font-display text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tighter text-[var(--color-muted)]">
						Projects
					</h2>
				</div>
			</div>
			<p class="title-line text-sm md:text-base text-[var(--color-muted)] max-w-sm md:text-right">
				Hover to preview. A selection of projects I've worked on.
			</p>
		</div>

		<!-- Projects List -->
		<div class="space-y-0">
			{#each featuredProjects as project, index}
				<div
					bind:this={projectEls[index]}
					class="project-item group"
					onmouseenter={() => handleProjectEnter(index)}
				>
					{#if project.liveUrl}
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="block py-8 md:py-12 border-t border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg-alt)]"
							data-cursor="pointer"
							data-cursor-text="View"
						>
							<div class="flex items-center gap-4 md:gap-8">
								<span class="font-display text-4xl md:text-6xl font-bold text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors leading-none w-16 md:w-24">
									{(index + 1).toString().padStart(2, '0')}
								</span>

								<div class="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8">
									<div class="flex-1">
										<h3 class="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
											{project.title}
										</h3>
										<p class="mt-1 md:mt-2 text-sm md:text-base text-[var(--color-muted)] max-w-xl line-clamp-1">
											{project.subtitle}
										</p>
									</div>

									<div class="flex flex-wrap gap-2">
										{#each project.tags.slice(0, 2) as tag}
											<span class="px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-muted)] border border-[var(--color-border)] rounded-full group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-colors">
												{tag}
											</span>
										{/each}
									</div>
								</div>

								<div class="hidden md:flex w-12 h-12 rounded-full border border-[var(--color-border)] items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all">
									<svg
										class="w-5 h-5 text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors -rotate-45"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</div>
							</div>
						</a>
					{:else}
						<div class="py-8 md:py-12 border-t border-[var(--color-border)]">
							<div class="flex items-center gap-4 md:gap-8">
								<span class="font-display text-4xl md:text-6xl font-bold text-[var(--color-border)] leading-none w-16 md:w-24">
									{(index + 1).toString().padStart(2, '0')}
								</span>

								<div class="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-8">
									<div class="flex-1">
										<h3 class="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)]">
											{project.title}
										</h3>
										<p class="mt-1 md:mt-2 text-sm md:text-base text-[var(--color-muted)] max-w-xl line-clamp-1">
											{project.subtitle}
										</p>
									</div>

									<div class="flex flex-wrap gap-2">
										{#each project.tags.slice(0, 2) as tag}
											<span class="px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-muted)] border border-[var(--color-border)] rounded-full">
												{tag}
											</span>
										{/each}
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
			<div class="border-t border-[var(--color-border)]"></div>
		</div>

		<!-- View All Link -->
		<div class="mt-12 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<p class="text-[var(--color-muted)] text-sm">
				Want to see more? Check out my GitHub.
			</p>
			<a
				href="https://github.com/Kostia06"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-3 text-base md:text-lg font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors group"
				data-cursor="pointer"
			>
				<span class="fancy-link">View GitHub</span>
				<svg
					class="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
				</svg>
			</a>
		</div>
	</div>

	<div class="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
</section>

<style>
	.project-item {
		position: relative;
	}

	.preview-container {
		opacity: 0;
		transform: translate(-50%, -50%) scale(0.9);
		transition: opacity 0.4s ease, transform 0.4s ease;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
	}

	.preview-container.active {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}

	.preview-image {
		opacity: 0;
		transform: translateY(100%);
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Active image slides in */
	.preview-image.active.slide-up {
		opacity: 1;
		transform: translateY(0);
	}

	.preview-image.active.slide-down {
		opacity: 1;
		transform: translateY(0);
	}

	/* Previous image slides out */
	.preview-image.prev.slide-up {
		opacity: 0;
		transform: translateY(-100%);
	}

	.preview-image.prev.slide-down {
		opacity: 0;
		transform: translateY(100%);
	}

	/* Initial state for inactive images */
	.preview-image:not(.active):not(.prev).slide-up {
		transform: translateY(100%);
	}

	.preview-image:not(.active):not(.prev).slide-down {
		transform: translateY(-100%);
	}
</style>
