<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { isMobile } from '$stores/app';

	interface Props {
		items?: string[];
		speed?: number;
		direction?: 'left' | 'right';
		separator?: string;
		class?: string;
	}

	let {
		items = ['Available for Freelance', 'Full Stack Development', 'UI/UX Design', 'React', 'Next.js', 'SvelteKit'],
		speed = 50,
		direction = 'left',
		separator = ' / ',
		class: className = ''
	}: Props = $props();

	let marqueeEl: HTMLElement;
	let contentEl: HTMLElement;
	let trackEl: HTMLElement;
	let isHovered = $state(false);

	onMount(() => {
		if (!contentEl || $isMobile) return;

		const contentWidth = contentEl.offsetWidth;

		const animation = gsap.to(trackEl, {
			x: direction === 'left' ? -contentWidth / 2 : contentWidth / 2,
			duration: contentWidth / speed,
			ease: 'none',
			repeat: -1
		});

		return () => {
			animation.kill();
		};
	});

	function handleMouseEnter() {
		isHovered = true;
		if (trackEl) {
			gsap.to(trackEl, { timeScale: 0.3, duration: 0.5, overwrite: true });
		}
	}

	function handleMouseLeave() {
		isHovered = false;
		if (trackEl) {
			gsap.to(trackEl, { timeScale: 1, duration: 0.5, overwrite: true });
		}
	}

	let repeatedItems = $derived([...items, ...items, ...items, ...items]);
</script>

<div
	bind:this={marqueeEl}
	class="marquee-container overflow-hidden py-5 md:py-8 border-y border-[var(--color-border)] {className}"
	class:hovered={isHovered}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="marquee"
	aria-label="Scrolling text"
>
	<div
		bind:this={trackEl}
		class="marquee-track flex whitespace-nowrap"
	>
		<div bind:this={contentEl} class="marquee-content flex items-center">
			{#each repeatedItems as item, i}
				<span class="marquee-item font-display text-xl md:text-3xl lg:text-4xl font-bold text-[var(--color-text)] uppercase tracking-tight">
					{item}
				</span>
				<span class="marquee-separator mx-4 md:mx-8 text-[var(--color-accent)] text-lg md:text-2xl font-bold">
					{separator}
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.marquee-container {
		background: var(--color-bg-alt);
	}

	.marquee-track {
		will-change: transform;
	}

	.marquee-item {
		transition: color 0.3s ease;
	}

	.marquee-separator {
		transition: transform 0.3s ease;
	}

	.marquee-container.hovered .marquee-item {
		color: var(--color-accent);
	}

	.marquee-container.hovered .marquee-separator {
		transform: rotate(90deg) scale(1.2);
	}

	/* Fallback CSS animation for mobile */
	@media (max-width: 768px) {
		.marquee-track {
			animation: marquee-scroll 20s linear infinite;
		}

		@keyframes marquee-scroll {
			0% {
				transform: translateX(0);
			}
			100% {
				transform: translateX(-50%);
			}
		}
	}
</style>
