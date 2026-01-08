<script lang="ts">
	import { isMobile } from '$stores/app';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		class?: string;
		children: Snippet;
		strength?: number;
	}

	let { href, class: className = '', children, strength = 0.3 }: Props = $props();

	let buttonEl: HTMLElement;
	let x = $state(0);
	let y = $state(0);
	let isHovered = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if ($isMobile || !buttonEl) return;

		const rect = buttonEl.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const distanceX = e.clientX - centerX;
		const distanceY = e.clientY - centerY;

		x = distanceX * strength;
		y = distanceY * strength;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
		x = 0;
		y = 0;
	}
</script>

<svelte:window onmousemove={isHovered ? handleMouseMove : undefined} />

{#if href}
	<a
		bind:this={buttonEl}
		{href}
		class="magnetic-button {className}"
		style="transform: translate({x}px, {y}px)"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		<span class="magnetic-content" style="transform: translate({x * 0.2}px, {y * 0.2}px)">
			{@render children()}
		</span>
	</a>
{:else}
	<button
		bind:this={buttonEl}
		class="magnetic-button {className}"
		style="transform: translate({x}px, {y}px)"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		<span class="magnetic-content" style="transform: translate({x * 0.2}px, {y * 0.2}px)">
			{@render children()}
		</span>
	</button>
{/if}

<style>
	.magnetic-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		will-change: transform;
	}

	.magnetic-content {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
	}
</style>
