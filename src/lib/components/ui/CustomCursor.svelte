<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { isTouchDevice } from '$stores/app';

	let isHovering = $state(false);
	let isClicking = $state(false);
	let cursorText = $state('');
	let mounted = $state(false);

	// Spring-based cursor position
	const cursorX = spring(-100, { stiffness: 0.2, damping: 0.8 });
	const cursorY = spring(-100, { stiffness: 0.2, damping: 0.8 });

	// Raw position for trail dot
	let rawX = $state(-100);
	let rawY = $state(-100);

	onMount(() => {
		mounted = true;

		if ($isTouchDevice) return;

		const moveCursor = (e: MouseEvent) => {
			rawX = e.clientX;
			rawY = e.clientY;
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		const handleMouseDown = () => (isClicking = true);
		const handleMouseUp = () => (isClicking = false);

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (
				target.tagName === 'A' ||
				target.tagName === 'BUTTON' ||
				target.closest('a') ||
				target.closest('button') ||
				target.dataset.cursor === 'pointer'
			) {
				isHovering = true;
				cursorText = target.dataset.cursorText || '';
			}
		};

		const handleMouseOut = () => {
			isHovering = false;
			cursorText = '';
		};

		window.addEventListener('mousemove', moveCursor);
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseout', handleMouseOut);

		return () => {
			window.removeEventListener('mousemove', moveCursor);
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseout', handleMouseOut);
		};
	});

	// Computed sizes
	let size = $derived(isHovering ? 80 : isClicking ? 8 : 16);
	let borderRadius = $derived(isClicking ? '2px' : '50%');
</script>

{#if mounted && !$isTouchDevice}
	<!-- Main cursor -->
	<div
		class="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
		style="transform: translate({$cursorX}px, {$cursorY}px) translate(-50%, -50%);"
	>
		<div
			class="relative flex items-center justify-center transition-all duration-150 ease-out"
			style="width: {size}px; height: {size}px; border-radius: {borderRadius};"
		>
			<div
				class="absolute inset-0 bg-white transition-all duration-150 ease-out"
				style="border-radius: {borderRadius}; transform: scale({isClicking ? 0.5 : 1});"
			></div>
			{#if cursorText && isHovering}
				<span class="text-black text-xs font-medium z-10 whitespace-nowrap">
					{cursorText}
				</span>
			{/if}
		</div>
	</div>

	<!-- Cursor trail dot -->
	<div
		class="fixed top-0 left-0 w-1 h-1 rounded-full bg-[var(--accent)] pointer-events-none z-[9998]"
		style="transform: translate({rawX}px, {rawY}px) translate(-50%, -50%);"
	></div>
{/if}
