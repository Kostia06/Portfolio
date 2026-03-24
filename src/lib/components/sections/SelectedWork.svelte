<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { projects } from '$data/projects';
	import type { Project } from '$data/projects';

	type CategoryFilter = Project['category'] | 'all';

	const FILTERS: { label: string; value: CategoryFilter }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'SaaS', value: 'saas' },
		{ label: 'AI', value: 'ai' },
		{ label: 'E-Commerce', value: 'ecommerce' },
		{ label: 'Other', value: 'other' }
	];

	let activeFilter = $state<CategoryFilter>('all');
	let filteredProjects = $derived(
		activeFilter === 'all'
			? projects
			: projects.filter((p) => p.category === activeFilter)
	);

	let mouseX = $state(0);
	let mouseY = $state(0);
	let hoveredProject = $state<Project | null>(null);

	let sectionEl: HTMLElement;
	let rowEls: HTMLElement[] = [];

	function handleMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

	function handleRowEnter(project: Project) {
		hoveredProject = project;
	}

	function handleRowLeave() {
		hoveredProject = null;
	}

	function setFilter(filter: CategoryFilter) {
		activeFilter = filter;
	}

	function formatIndex(index: number): string {
		return (index + 1).toString().padStart(2, '0');
	}

	onMount(() => {
		if (!browser) return;

		gsap.registerPlugin(ScrollTrigger);

		rowEls.forEach((el) => {
			if (!el) return;

			gsap.from(el, {
				y: 40,
				opacity: 0,
				duration: 0.7,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			});
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="work"
	class="section-lg"
	style="background: var(--color-bg);"
	onmousemove={handleMouseMove}
	role="region"
	aria-label="Selected Work"
>
	<div class="container">
		<!-- Section Header -->
		<div class="section-header">
			<span class="section-number">02</span>
			<h2 class="section-heading">Selected Work</h2>
			<div class="section-divider"></div>
		</div>

		<!-- Filter Bar -->
		<div class="filter-bar">
			{#each FILTERS as filter (filter.value)}
				<button
					class="tag-filter"
					class:active={activeFilter === filter.value}
					onclick={() => setFilter(filter.value)}
				>
					{filter.label}
				</button>
			{/each}
		</div>

		<!-- Project List -->
		<div class="project-list">
			{#each filteredProjects as project, index (project.id)}
				<div
					bind:this={rowEls[index]}
					class="project-row"
					onmouseenter={() => handleRowEnter(project)}
					onmouseleave={handleRowLeave}
					data-cursor="pointer"
					role="listitem"
				>
					{#if project.liveUrl}
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="project-row-inner"
						>
							<span class="project-index">{formatIndex(index)}</span>

							<div class="project-info">
								<h3 class="project-title">{project.title}</h3>
								<p class="project-subtitle">{project.subtitle}</p>
							</div>

							<div class="project-end">
								<span class="project-achievement">{project.achievement}</span>
								<svg
									class="project-arrow"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M7 17L17 7M17 7H7M17 7v10"
									/>
								</svg>
							</div>
						</a>
					{:else}
						<div class="project-row-inner">
							<span class="project-index">{formatIndex(index)}</span>

							<div class="project-info">
								<h3 class="project-title">{project.title}</h3>
								<p class="project-subtitle">{project.subtitle}</p>
							</div>

							<div class="project-end">
								<span class="project-achievement">{project.achievement}</span>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- Floating Preview Image -->
	{#if hoveredProject?.screenshot}
		<div
			class="preview-float"
			style="left: {mouseX}px; top: {mouseY}px;"
		>
			<img
				src={hoveredProject.screenshot}
				alt="{hoveredProject.title} preview"
				width="400"
				height="225"
				loading="lazy"
				decoding="async"
			/>
		</div>
	{/if}
</section>

<style>
	.section-header {
		margin-bottom: var(--space-lg);
	}

	.section-divider {
		height: 1px;
		background: var(--color-border);
		margin-top: var(--space-md);
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: var(--space-lg);
	}

	.project-list {
		border-top: 1px solid var(--color-border);
	}

	.project-row {
		border-bottom: 1px solid var(--color-border);
	}

	.project-row-inner {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		min-height: 80px;
		padding: 1.25rem 0;
		text-decoration: none;
		color: inherit;
		transition: opacity 0.2s ease;
	}

	a.project-row-inner:hover {
		opacity: 0.75;
	}

	.project-index {
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		color: var(--color-muted);
		min-width: 2rem;
		font-variant-numeric: tabular-nums;
	}

	.project-info {
		flex: 1;
		min-width: 0;
	}

	.project-title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 400;
		line-height: 1.2;
		color: var(--color-text);
	}

	.project-subtitle {
		font-size: var(--text-sm);
		color: var(--color-muted);
		margin-top: 0.25rem;
	}

	.project-end {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
	}

	.project-achievement {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-accent);
		padding: 0.25rem 0.75rem;
		border: 1px solid var(--color-accent);
		border-radius: 9999px;
		white-space: nowrap;
	}

	.project-arrow {
		color: var(--color-muted);
		transition: color 0.2s ease, transform 0.2s ease;
	}

	.project-row:hover .project-arrow {
		color: var(--color-accent);
		transform: translate(2px, -2px);
	}

	.preview-float {
		position: fixed;
		pointer-events: none;
		z-index: 50;
		width: 400px;
		aspect-ratio: 16 / 9;
		border-radius: 8px;
		overflow: hidden;
		transform: translate(-50%, -110%);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
		opacity: 1;
		transition: opacity 0.15s ease;
	}

	.preview-float img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 640px) {
		.project-row-inner {
			gap: 1rem;
		}

		.project-title {
			font-size: var(--text-lg);
		}

		.project-achievement {
			display: none;
		}

		.preview-float {
			display: none;
		}
	}
</style>
