<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { signaturePath } from '$data/signature';
	import { isMobile, isLoading } from '$stores/app';

	let visible = $state(true);
	let isDrawing = $state(false);

	onMount(() => {
		// Start draw animation immediately
		requestAnimationFrame(() => {
			isDrawing = true;
		});

		// Hide loader after animation completes
		const timer = setTimeout(() => {
			visible = false;
			isLoading.set(false);
		}, 1000);

		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div
		class="fixed inset-0 z-[10000] bg-[var(--background)]"
		transition:fade={{ duration: 600, easing: (t) => t * (2 - t) }}
	>
		<!-- Perfectly centered container -->
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="flex items-center justify-center overflow-visible">
				<!-- Signature SVG Container -->
				<div
					class="relative"
					style="width: {$isMobile ? 'min(280px, 70vw)' : 'min(500px, 65vw)'}; height: {$isMobile
						? 'min(210px, 52vw)'
						: 'min(375px, 50vw)'};"
				>
					<!-- Animated Logo (draws the signature) -->
					<svg
						viewBox="-20 -20 200 160"
						class="w-full h-full absolute inset-0 signature-svg"
						class:is-drawing={isDrawing}
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style="overflow: visible;"
					>
						<path
							class="signature-path glow-outer"
							d={signaturePath}
							stroke="url(#loaderAnimatedGradient)"
							stroke-width={$isMobile ? '16' : '24'}
							stroke-linecap="round"
							stroke-linejoin="round"
							fill="none"
							opacity={$isMobile ? 0.12 : 0.15}
							style="filter: blur({$isMobile ? '12px' : '20px'});"
						/>
						<path
							class="signature-path glow-inner"
							d={signaturePath}
							stroke="url(#loaderAnimatedGradient)"
							stroke-width={$isMobile ? '10' : '14'}
							stroke-linecap="round"
							stroke-linejoin="round"
							fill="none"
							opacity={$isMobile ? 0.3 : 0.4}
							style="filter: blur({$isMobile ? '6px' : '10px'});"
						/>
						<path
							class="signature-path main-stroke"
							d={signaturePath}
							stroke="url(#loaderAnimatedGradient)"
							stroke-width={$isMobile ? '3' : '4'}
							stroke-linecap="round"
							stroke-linejoin="round"
							fill="none"
						/>
						<defs>
							<linearGradient id="loaderAnimatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stop-color="#6366f1" />
								<stop offset="50%" stop-color="#818cf8" />
								<stop offset="100%" stop-color="#c084fc" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>
		</div>

		<!-- Background ambient glow -->
		<div class="absolute inset-0 pointer-events-none">
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--accent)] opacity-5 blur-[100px]"
			></div>
		</div>
	</div>
{/if}

<style>
	/* Animated signature - hidden by default, draws when is-drawing is added */
	.signature-svg .signature-path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
	}

	/* Draw animation: animate from hidden to visible */
	.signature-svg.is-drawing .signature-path {
		animation: draw-signature 3s ease-out forwards;
	}

	/* Stagger the glow layers slightly */
	.signature-svg.is-drawing .glow-outer {
		animation-delay: 0.1s;
	}

	.signature-svg.is-drawing .glow-inner {
		animation-delay: 0.05s;
	}

	.signature-svg.is-drawing .main-stroke {
		animation-delay: 0s;
	}

	@keyframes draw-signature {
		from {
			stroke-dashoffset: 1000;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
