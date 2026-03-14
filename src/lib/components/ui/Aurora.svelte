<script lang="ts">
	import { prefersReducedMotion } from '$stores/app';
</script>

{#if !$prefersReducedMotion}
	<div class="aurora-container">
		<div class="aurora aurora-1"></div>
		<div class="aurora aurora-2"></div>
		<div class="aurora aurora-3"></div>
		<div class="aurora aurora-4"></div>
	</div>
{/if}

<style>
	.aurora-container {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
		opacity: 0.4;
	}

	.aurora {
		position: absolute;
		width: 150%;
		height: 150%;
		border-radius: 50%;
		filter: blur(120px);
		mix-blend-mode: screen;
		will-change: transform;
	}

	.aurora-1 {
		top: -50%;
		left: -25%;
		background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
		animation: aurora-drift-1 25s ease-in-out infinite;
	}

	.aurora-2 {
		top: 20%;
		right: -25%;
		background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.25) 0%, transparent 70%);
		animation: aurora-drift-2 30s ease-in-out infinite;
	}

	.aurora-3 {
		bottom: -30%;
		left: 20%;
		background: radial-gradient(ellipse at center, rgba(192, 132, 252, 0.2) 0%, transparent 70%);
		animation: aurora-drift-3 20s ease-in-out infinite;
	}

	.aurora-4 {
		top: 40%;
		left: 30%;
		width: 80%;
		height: 80%;
		background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
		animation: aurora-drift-4 35s ease-in-out infinite;
	}

	@keyframes aurora-drift-1 {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg) scale(1);
		}
		25% {
			transform: translate(10%, 5%) rotate(5deg) scale(1.1);
		}
		50% {
			transform: translate(5%, 10%) rotate(-3deg) scale(0.95);
		}
		75% {
			transform: translate(-5%, 5%) rotate(2deg) scale(1.05);
		}
	}

	@keyframes aurora-drift-2 {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg) scale(1);
		}
		33% {
			transform: translate(-15%, 10%) rotate(-5deg) scale(1.15);
		}
		66% {
			transform: translate(-5%, -10%) rotate(3deg) scale(0.9);
		}
	}

	@keyframes aurora-drift-3 {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(20%, -15%) scale(1.2);
		}
	}

	@keyframes aurora-drift-4 {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg);
			opacity: 0.5;
		}
		50% {
			transform: translate(-10%, 10%) rotate(180deg);
			opacity: 0.8;
		}
	}

	@media (max-width: 768px) {
		.aurora-container {
			opacity: 0.25;
		}

		.aurora {
			filter: blur(80px);
		}
	}
</style>
