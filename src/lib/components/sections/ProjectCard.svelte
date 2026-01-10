<script lang="ts">
	import gsap from 'gsap';
	import type { Project } from '$data/projects';
	import { isMobile } from '$stores/app';

	interface Props {
		project: Project;
		large?: boolean;
	}

	let { project, large = false }: Props = $props();

	let cardEl: HTMLElement;
	let imageEl: HTMLElement;
	let isHovered = $state(false);

	function handleMouseEnter() {
		if ($isMobile) return;
		isHovered = true;
		if (imageEl) {
			gsap.to(imageEl, {
				scale: 1.05,
				duration: 0.6,
				ease: 'power2.out'
			});
		}
	}

	function handleMouseLeave() {
		if ($isMobile) return;
		isHovered = false;
		if (imageEl) {
			gsap.to(imageEl, {
				scale: 1,
				duration: 0.6,
				ease: 'power2.out'
			});
		}
	}
</script>

<article
	bind:this={cardEl}
	class="project-card group"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{#if project.liveUrl}
		<a
			href={project.liveUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="block"
			data-cursor="pointer"
			data-cursor-text="View"
		>
			<!-- Image -->
			{#if project.screenshot}
				<div class="project-image-wrapper {large ? 'aspect-[16/9]' : 'aspect-[4/3]'} mb-6 bg-[var(--color-bg-alt)] rounded-lg overflow-hidden">
					<img
						bind:this={imageEl}
						src={project.screenshot}
						alt={project.title}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
			{/if}

			<!-- Info -->
			<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
				<div>
					<h3 class="font-display text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
						{project.title}
					</h3>
					<p class="text-sm text-[var(--color-muted)] line-clamp-2 max-w-lg">
						{project.subtitle}
					</p>
				</div>

				<div class="flex items-center gap-4 flex-shrink-0">
					<!-- Tags -->
					<div class="hidden md:flex gap-2">
						{#each project.tags.slice(0, 2) as tag}
							<span class="px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-muted)] border border-[var(--color-border)] rounded-full">
								{tag}
							</span>
						{/each}
					</div>

					<!-- Arrow -->
					<div class="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-text)] group-hover:border-[var(--color-text)] transition-all duration-300">
						<svg
							class="w-4 h-4 text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors -rotate-45"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</div>
				</div>
			</div>
		</a>
	{:else}
		<!-- Non-linked project -->
		<div>
			{#if project.screenshot}
				<div class="project-image-wrapper {large ? 'aspect-[16/9]' : 'aspect-[4/3]'} mb-6 bg-[var(--color-bg-alt)] rounded-lg overflow-hidden">
					<img
						bind:this={imageEl}
						src={project.screenshot}
						alt={project.title}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
			{/if}

			<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
				<div>
					<h3 class="font-display text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
						{project.title}
					</h3>
					<p class="text-sm text-[var(--color-muted)] line-clamp-2 max-w-lg">
						{project.subtitle}
					</p>
				</div>

				<div class="flex gap-2">
					{#each project.tags.slice(0, 3) as tag}
						<span class="px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-muted)] border border-[var(--color-border)] rounded-full">
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</article>

<style>
	.project-card {
		position: relative;
	}

	.project-image-wrapper {
		position: relative;
		overflow: hidden;
	}

	.project-image-wrapper img {
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
