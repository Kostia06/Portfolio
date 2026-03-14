<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import gsap from 'gsap';

	let transitionEl: HTMLElement;
	let columnsEl: HTMLElement;
	let isAnimating = $state(false);

	onMount(() => {
		if (!browser) return;

		const unsubscribe = navigating.subscribe((nav) => {
			if (nav && !isAnimating) {
				animateOut();
			}
		});

		return () => {
			unsubscribe();
		};
	});

	function animateOut() {
		if (!transitionEl || !columnsEl) return;

		isAnimating = true;
		const columns = columnsEl.querySelectorAll('.transition-column');

		// Show transition
		gsap.set(transitionEl, { display: 'flex' });

		// Animate columns from bottom to top
		gsap.fromTo(columns,
			{ scaleY: 0, transformOrigin: 'bottom' },
			{
				scaleY: 1,
				duration: 0.5,
				stagger: 0.05,
				ease: 'power4.inOut',
				onComplete: () => {
					// Wait a moment then animate out
					setTimeout(animateIn, 200);
				}
			}
		);
	}

	function animateIn() {
		if (!columnsEl) return;

		const columns = columnsEl.querySelectorAll('.transition-column');

		// Animate columns from top to bottom (exit)
		gsap.to(columns, {
			scaleY: 0,
			transformOrigin: 'top',
			duration: 0.5,
			stagger: 0.05,
			ease: 'power4.inOut',
			onComplete: () => {
				gsap.set(transitionEl, { display: 'none' });
				isAnimating = false;
			}
		});
	}
</script>

<div
	bind:this={transitionEl}
	class="fixed inset-0 z-[9999] pointer-events-none hidden"
>
	<div bind:this={columnsEl} class="flex w-full h-full">
		{#each Array(5) as _, i}
			<div
				class="transition-column flex-1 h-full bg-[var(--color-accent)]"
				style="transform: scaleY(0);"
			></div>
		{/each}
	</div>
</div>

<style>
	.transition-column {
		will-change: transform;
	}
</style>
