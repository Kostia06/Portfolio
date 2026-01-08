<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$stores/app';

	interface Props {
		text: string;
		delay?: number;
		staggerDelay?: number;
		class?: string;
		scramble?: boolean;
	}

	let { text, delay = 0, staggerDelay = 30, class: className = '', scramble = false }: Props = $props();

	let displayText = $state('');
	let isRevealed = $state(false);
	let containerEl: HTMLSpanElement;

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

	onMount(() => {
		if ($prefersReducedMotion) {
			displayText = text;
			isRevealed = true;
			return;
		}

		const timer = setTimeout(() => {
			if (scramble) {
				scrambleReveal();
			} else {
				characterReveal();
			}
		}, delay);

		return () => clearTimeout(timer);
	});

	function scrambleReveal() {
		let iteration = 0;
		const interval = setInterval(() => {
			displayText = text
				.split('')
				.map((char, i) => {
					if (i < iteration) return text[i];
					if (char === ' ') return ' ';
					return chars[Math.floor(Math.random() * chars.length)];
				})
				.join('');

			if (iteration >= text.length) {
				clearInterval(interval);
				isRevealed = true;
			}
			iteration += 1 / 3;
		}, 30);
	}

	function characterReveal() {
		let i = 0;
		const interval = setInterval(() => {
			if (i <= text.length) {
				displayText = text.slice(0, i);
				i++;
			} else {
				clearInterval(interval);
				isRevealed = true;
			}
		}, staggerDelay);
	}
</script>

<span
	bind:this={containerEl}
	class="text-reveal {className}"
	class:revealed={isRevealed}
>
	{displayText}<span class="cursor" class:hidden={isRevealed}>|</span>
</span>

<style>
	.text-reveal {
		display: inline-block;
	}

	.cursor {
		animation: blink 0.8s infinite;
		color: var(--accent);
		font-weight: 300;
	}

	.cursor.hidden {
		display: none;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
</style>
