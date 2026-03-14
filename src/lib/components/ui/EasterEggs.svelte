<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let showConfetti = $state(false);
	let konamiBuffer: string[] = [];
	const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

	let particles: Array<{ id: number; x: number; y: number; color: string; rotation: number; scale: number }> = $state([]);

	function triggerConfetti() {
		showConfetti = true;
		const colors = ['#6366f1', '#818cf8', '#c084fc', '#f472b6', '#fbbf24', '#10b981'];

		// Create confetti particles
		const newParticles = Array.from({ length: 100 }, (_, i) => ({
			id: Date.now() + i,
			x: Math.random() * 100,
			y: Math.random() * -50,
			color: colors[Math.floor(Math.random() * colors.length)],
			rotation: Math.random() * 360,
			scale: 0.5 + Math.random() * 0.5
		}));

		particles = newParticles;

		// Hide after animation
		setTimeout(() => {
			showConfetti = false;
			particles = [];
		}, 4000);
	}

	function handleKeydown(e: KeyboardEvent) {
		konamiBuffer.push(e.key);

		// Keep only the last 10 keys
		if (konamiBuffer.length > 10) {
			konamiBuffer.shift();
		}

		// Check if konami code was entered
		if (konamiBuffer.length === 10 && konamiBuffer.every((key, i) => key === konamiCode[i])) {
			konamiBuffer = [];
			triggerConfetti();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<!-- Confetti container -->
{#if showConfetti}
	<div class="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" transition:fade>
		<!-- Success message -->
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl"
			transition:scale={{ duration: 300 }}
		>
			<p class="text-2xl font-bold text-center gradient-text">🎮 Konami Code Activated!</p>
			<p class="text-sm text-[var(--muted-foreground)] text-center mt-2">You found the secret!</p>
		</div>

		<!-- Confetti particles -->
		{#each particles as particle (particle.id)}
			<div
				class="absolute w-3 h-3 confetti-particle"
				style="
					left: {particle.x}%;
					top: {particle.y}%;
					background: {particle.color};
					transform: rotate({particle.rotation}deg) scale({particle.scale});
				"
			></div>
		{/each}
	</div>
{/if}

<style>
	.confetti-particle {
		animation: confetti-fall 3s ease-out forwards;
		border-radius: 2px;
	}

	@keyframes confetti-fall {
		0% {
			opacity: 1;
			transform: translateY(0) rotate(0deg);
		}
		100% {
			opacity: 0;
			transform: translateY(100vh) rotate(720deg);
		}
	}
</style>
