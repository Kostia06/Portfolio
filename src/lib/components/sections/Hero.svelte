<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { animationComplete } from '$stores/app';

	let nameLineEls: HTMLElement[] = $state([]);
	let infoRowEl: HTMLElement | undefined = $state(undefined);
	let ctaEl: HTMLElement | undefined = $state(undefined);
	let scrollIndicatorEl: HTMLElement | undefined = $state(undefined);
	let separatorEl: HTMLElement | undefined = $state(undefined);

	const nameLines = ['Kostia', 'Ilnytskyi'];
	const infoItems = ['Full Stack Developer', 'Calgary, AB', '3+ Years Experience'];

	function splitChars(text: string): string[] {
		return text.split('').map((char) => (char === ' ' ? '\u00A0' : char));
	}

	function scrollToSection(id: string) {
		document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	onMount(() => {
		if (!browser) return;
		requestAnimationFrame(() => animateEntrance());
	});

	function animateEntrance() {
		if (!browser) {
			animationComplete.set(true);
			return;
		}

		const tl = gsap.timeline({
			onComplete: () => animationComplete.set(true)
		});

		nameLineEls.forEach((lineEl) => {
			const chars = lineEl.querySelectorAll('.hero-char');
			tl.fromTo(
				chars,
				{ y: '110%', opacity: 0 },
				{
					y: '0%',
					opacity: 1,
					duration: 0.8,
					stagger: 0.03,
					ease: 'power3.out'
				},
				tl.duration() > 0 ? '-=0.5' : 0
			);
		});

		if (separatorEl) {
			tl.fromTo(
				separatorEl,
				{ scaleX: 0 },
				{ scaleX: 1, duration: 0.6, ease: 'power2.out' },
				'-=0.3'
			);
		}

		if (infoRowEl) {
			tl.fromTo(
				infoRowEl,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
				'-=0.2'
			);
		}

		if (ctaEl) {
			tl.fromTo(
				ctaEl,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
				'-=0.3'
			);
		}

		if (scrollIndicatorEl) {
			tl.fromTo(
				scrollIndicatorEl,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
				'-=0.2'
			);
		}
	}
</script>

<section
	id="hero"
	class="hero"
>
	<div class="accent-line"></div>

	<div class="hero-content">
		<h1 class="hero-name">
			{#each nameLines as line, lineIndex (line)}
				<div class="hero-name-line" bind:this={nameLineEls[lineIndex]}>
					{#each splitChars(line) as char, i (`${lineIndex}-${i}`)}
						<span class="hero-char">{char}</span>
					{/each}
				</div>
			{/each}
		</h1>

		<div class="hero-separator" bind:this={separatorEl}></div>

		<div class="hero-info" bind:this={infoRowEl}>
			{#each infoItems as item, i (item)}
				{#if i > 0}
					<span class="hero-info-divider"></span>
				{/if}
				<span class="hero-info-item">{item}</span>
			{/each}
		</div>

		<div class="hero-cta" bind:this={ctaEl}>
			<a
				href="#work"
				class="btn-primary"
				data-cursor="pointer"
				data-cursor-text="View"
				onclick={(e: MouseEvent) => { e.preventDefault(); scrollToSection('#work'); }}
			>
				<span>View Work</span>
				<svg class="cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
			<a
				href="#contact"
				class="btn-outline"
				data-cursor="pointer"
				data-cursor-text="Contact"
				onclick={(e: MouseEvent) => { e.preventDefault(); scrollToSection('#contact'); }}
			>
				Get in Touch
			</a>
		</div>
	</div>

	<div class="scroll-indicator" bind:this={scrollIndicatorEl}>
		<span class="scroll-label">Scroll</span>
		<div class="scroll-track">
			<div class="scroll-line"></div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
		min-height: 100dvh;
		background: var(--color-bg);
		overflow: hidden;
		padding: 0 1.5rem;
	}

	.accent-line {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 80%;
		width: 1px;
		background: var(--color-text);
		opacity: 0.06;
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 72rem;
		width: 100%;
		margin: 0 auto;
	}

	.hero-name {
		margin-bottom: 2rem;
	}

	.hero-name-line {
		overflow: hidden;
		font-family: var(--font-serif);
		font-size: clamp(3.5rem, 12vw, 10rem);
		line-height: 0.95;
		color: var(--color-text);
		font-weight: 400;
	}

	.hero-char {
		display: inline-block;
		will-change: transform, opacity;
	}

	.hero-separator {
		width: 100%;
		height: 1px;
		background: var(--color-border);
		margin-bottom: 1.5rem;
		transform-origin: left;
	}

	.hero-info {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
		opacity: 0;
	}

	.hero-info-item {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		color: var(--color-muted);
		text-transform: uppercase;
		letter-spacing: 0.15em;
	}

	.hero-info-divider {
		display: none;
	}

	@media (min-width: 768px) {
		.hero {
			padding: 0;
		}

		.hero-info {
			flex-direction: row;
			align-items: center;
			gap: 0;
		}

		.hero-info-divider {
			display: block;
			width: 1px;
			height: 12px;
			background: var(--color-border);
			margin: 0 1.5rem;
		}
	}

	.hero-cta {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		opacity: 0;
	}

	@media (min-width: 640px) {
		.hero-cta {
			flex-direction: row;
		}
	}

	.cta-arrow {
		width: 1rem;
		height: 1rem;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		opacity: 0;
	}

	@media (min-width: 768px) {
		.scroll-indicator {
			bottom: 3rem;
		}
	}

	.scroll-label {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-muted);
	}

	@media (min-width: 768px) {
		.scroll-label {
			font-size: var(--text-xs);
		}
	}

	.scroll-track {
		width: 1px;
		height: 2.5rem;
		background: var(--color-border);
		position: relative;
		overflow: hidden;
	}

	@media (min-width: 768px) {
		.scroll-track {
			height: 3rem;
		}
	}

	.scroll-line {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--color-accent);
		transform-origin: top;
		animation: scroll-line 2s ease-in-out infinite;
	}

	@keyframes scroll-line {
		0% {
			transform: scaleY(0);
			transform-origin: top;
		}
		50% {
			transform: scaleY(1);
			transform-origin: top;
		}
		50.1% {
			transform: scaleY(1);
			transform-origin: bottom;
		}
		100% {
			transform: scaleY(0);
			transform-origin: bottom;
		}
	}
</style>
