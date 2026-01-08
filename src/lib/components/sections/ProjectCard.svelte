<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import type { Project } from '$data/projects';

	interface Props {
		project: Project;
		isMobile: boolean;
	}

	let { project, isMobile }: Props = $props();

	let isExpanded = $state(false);
	let modalEl: HTMLDivElement | undefined = $state();
	let contentEl: HTMLDivElement | undefined = $state();
	let cardEl: HTMLDivElement | undefined = $state();
	let isHovering = $state(false);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let glareX = $state(50);
	let glareY = $state(50);
	let videoEl: HTMLVideoElement | undefined = $state();
	let videoLoaded = $state(false);

	let hasLivePreview = $derived(!!project.liveUrl);
	let hasVideoPreview = $derived(!!project.previewVideo && !isMobile);

	// Handle video playback on hover
	$effect(() => {
		if (!videoEl || !hasVideoPreview) return;

		if (isHovering) {
			videoEl.play().catch(() => {});
		} else {
			videoEl.pause();
			videoEl.currentTime = 0;
		}
	});

	function handleMouseMove(e: MouseEvent) {
		if (isMobile || !cardEl) return;

		const rect = cardEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		// Calculate tilt (max 15 degrees)
		tiltX = ((y - centerY) / centerY) * -10;
		tiltY = ((x - centerX) / centerX) * 10;

		// Calculate glare position
		glareX = (x / rect.width) * 100;
		glareY = (y / rect.height) * 100;
	}

	function handleMouseEnter() {
		if (isMobile) return;
		isHovering = true;
	}

	function handleMouseLeave() {
		if (isMobile) return;
		isHovering = false;
		tiltX = 0;
		tiltY = 0;
		glareX = 50;
		glareY = 50;
	}

	function handleClose() {
		isExpanded = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') handleClose();
	}

	$effect(() => {
		if (isExpanded) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	bind:this={cardEl}
	onclick={() => (isExpanded = true)}
	onkeydown={(e) => e.key === 'Enter' && (isExpanded = true)}
	onmousemove={handleMouseMove}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="button"
	tabindex="0"
	class="relative h-full rounded-xl overflow-hidden glass cursor-pointer active:scale-[0.98] group card-3d"
	style="transform: perspective(1000px) rotateX({tiltX}deg) rotateY({tiltY}deg) scale({isHovering ? 1.02 : 1}); transition: transform 0.15s ease-out;"
>
	<!-- Glare effect -->
	{#if isHovering && !isMobile}
		<div
			class="absolute inset-0 z-30 pointer-events-none rounded-xl"
			style="background: radial-gradient(circle at {glareX}% {glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%); opacity: {isHovering ? 1 : 0}; transition: opacity 0.3s;"
		></div>
	{/if}

	{#if project.screenshot}
		<div class="absolute inset-0 z-0">
			<!-- Static screenshot -->
			<img
				src={project.screenshot}
				alt=""
				loading="lazy"
				class="w-full h-full object-cover object-top transition-opacity duration-300"
				style="opacity: {hasVideoPreview && isHovering && videoLoaded ? 0 : 1};"
			/>
			<!-- Video preview (desktop only) -->
			{#if hasVideoPreview}
				<video
					bind:this={videoEl}
					src={project.previewVideo}
					muted
					loop
					playsinline
					preload="metadata"
					onloadeddata={() => (videoLoaded = true)}
					class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
					style="opacity: {isHovering && videoLoaded ? 1 : 0};"
				></video>
			{/if}
			<div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
		</div>
	{:else}
		<div
			class="absolute inset-0"
			style="background: linear-gradient(135deg, {project.color}40 0%, {project.color}10 100%);"
		></div>
	{/if}

	<div class="absolute top-2 left-2 z-20">
		<span
			class="px-2 py-0.5 text-[9px] md:text-[10px] font-bold rounded-full"
			style="background: {project.color}; color: white;"
		>
			{project.achievement}
		</span>
	</div>

	<div class="absolute top-2 right-2 z-20 flex items-center gap-2">
		{#if hasVideoPreview && !isHovering}
			<div class="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
				<svg class="w-2 h-2 md:w-3 md:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8 5v14l11-7z"/>
				</svg>
				<span class="text-[8px] md:text-[10px] font-medium text-white/90">Hover</span>
			</div>
		{/if}
		{#if hasLivePreview}
			<div class="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/30">
				<span class="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-400 animate-pulse"></span>
				<span class="text-[8px] md:text-[10px] font-medium text-green-300">Live</span>
			</div>
		{/if}
	</div>

	<div class="absolute inset-0 p-2 md:p-3 flex flex-col justify-end z-10">
		<p class="text-[9px] md:text-[11px] font-medium" style="color: {project.color};">
			{project.subtitle}
		</p>
		<h3 class="text-sm md:text-lg font-bold leading-tight">
			{project.title}
		</h3>
	</div>

	<div
		class="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
		style="box-shadow: inset 0 0 0 2px {project.color};"
	></div>
</div>

{#if isExpanded}
	<div
		bind:this={modalEl}
		class="fixed inset-0 z-[100]"
		onclick={handleClose}
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
	>
		<div class="absolute inset-0 bg-black"></div>

		{#if hasLivePreview}
			<div
				bind:this={contentEl}
				class="relative w-full h-full bg-[var(--card)]"
				onclick={(e) => e.stopPropagation()}
				onkeydown={() => {}}
				role="presentation"
				transition:scale={{ duration: 300, start: 0.95 }}
			>
				<!-- Browser-style header -->
				<div
					class="absolute top-0 left-0 right-0 h-12 md:h-14 bg-[var(--card)] border-b border-[var(--border)] flex items-center px-4 md:px-6 z-10"
				>
					<div class="flex gap-2">
						<button
							onclick={handleClose}
							class="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
							aria-label="Close preview"
						></button>
						<div class="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-500"></div>
						<div class="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500"></div>
					</div>
					<div class="flex-1 flex justify-center mx-4">
						<div
							class="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[var(--muted)] text-sm max-w-md w-full justify-center"
						>
							<svg class="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-[var(--muted-foreground)] truncate">{project.liveUrl}</span>
						</div>
					</div>
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-secondary)] transition-colors"
						onclick={(e) => e.stopPropagation()}
					>
						<span>Open in New Tab</span>
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>

				<!-- Full screen iframe -->
				<iframe
					src={project.liveUrl}
					class="w-full h-full pt-12 md:pt-14 bg-white"
					title="{project.title} Preview"
				></iframe>

				<!-- Close hint -->
				<div
					class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 text-sm text-white/90 backdrop-blur-sm"
				>
					Press <kbd class="px-2 py-0.5 rounded bg-white/20 mx-1">ESC</kbd> or click outside to close
				</div>
			</div>
		{:else}
			<div
				bind:this={contentEl}
				class="relative w-full h-full flex flex-col bg-[var(--background)]"
				onclick={(e) => e.stopPropagation()}
				onkeydown={() => {}}
				role="presentation"
				transition:scale={{ duration: 300, start: 0.95 }}
			>
				<!-- Header -->
				<div
					class="relative px-6 md:px-12 py-8 md:py-12"
					style="background: linear-gradient(135deg, {project.color}30, {project.color}10);"
				>
					<button
						onclick={handleClose}
						class="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
						aria-label="Close modal"
					>
						<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					<div class="max-w-4xl mx-auto">
						<span
							class="inline-block px-3 py-1 text-sm font-bold rounded-full mb-4"
							style="background: {project.color}; color: white;"
						>
							{project.achievement}
						</span>
						<h2 class="text-4xl md:text-6xl font-bold mb-2">{project.title}</h2>
						<p class="text-xl md:text-2xl" style="color: {project.color};">{project.subtitle}</p>
					</div>
				</div>

				<!-- Content -->
				<div class="flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-12">
					<div class="max-w-4xl mx-auto">
						<p class="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed mb-8">
							{project.description}
						</p>

						<h3
							class="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-4"
						>
							Technologies
						</h3>
						<div class="flex flex-wrap gap-2 mb-8">
							{#each project.tags as tag, i}
								<span
									class="px-4 py-2 text-sm md:text-base rounded-full font-medium"
									style="background: {project.color}20; color: {project.color};"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- Close hint -->
				<div
					class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 text-sm text-white/90 backdrop-blur-sm"
				>
					Press <kbd class="px-2 py-0.5 rounded bg-white/20 mx-1">ESC</kbd> or click outside to close
				</div>
			</div>
		{/if}
	</div>
{/if}
