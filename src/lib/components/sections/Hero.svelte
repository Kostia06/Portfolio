<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { animationComplete } from '$stores/app';

	let sectionEl: HTMLElement;

	onMount(() => {
		if (!browser) return;

		const tl = gsap.timeline({
			defaults: { ease: 'power4.out' },
			onComplete: () => animationComplete.set(true)
		});

		// "Kostia" characters fly in with stagger and slight rotation
		const chars = sectionEl.querySelectorAll('.name-char');
		tl.fromTo(chars,
			{ y: 120, opacity: 0, rotateX: 40 },
			{ y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.06, ease: 'power4.out' },
			1.0
		);

		// 4. Subtitle words fade up
		const words = sectionEl.querySelectorAll('.sub-word');
		tl.fromTo(words,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
			1.8
		);

		// 5. Bottom text and CTA fade in
		tl.fromTo('.hero-bottom',
			{ y: 25, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
			2.2
		);

		// 8. Label slides in from left
		tl.fromTo('.hero-label',
			{ x: -40, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
			2.0
		);
	});
</script>

<section
	bind:this={sectionEl}
	id="hero"
	class="relative min-h-screen flex flex-col justify-center overflow-hidden"
	style="background: var(--color-bg); perspective: 800px;"
>
	<div class="container relative z-10 px-4 md:px-0">
		<!-- Label + availability -->
		<div class="hero-label mb-10 md:mb-14 flex flex-wrap items-center gap-4 md:gap-5">
			<p class="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] flex items-center gap-4">
				<span class="inline-block w-8 h-[1px] bg-[var(--color-muted)]"></span>
				Full Stack Developer
			</p>
			<a
				href="/#contact"
				class="hero-availability"
				data-cursor="pointer"
				aria-label="Open to Summer 2026 internships — get in touch"
			>
				<span class="avail-dot" aria-hidden="true"></span>
				Open to Summer 2026 internships
			</a>
		</div>

		<!-- Name - each character individually animated -->
		<h1 class="mb-6 md:mb-10" style="font-size: clamp(4rem, 18vw, 14rem); line-height: 0.85; letter-spacing: -0.04em;">
			{#each 'Kostia'.split('') as char, i}
				<span
					class="name-char inline-block font-display font-black"
					style="transform-style: preserve-3d;"
				>{char}</span>
			{/each}
		</h1>

		<!-- Subtitle - word by word -->
		<p class="mb-10 md:mb-14" style="font-size: clamp(1.1rem, 2.5vw, 2rem); line-height: 1.3;">
			{#each ['Builds', 'Things', 'People', 'Actually', 'Use'] as word, i}
				<span
					class="sub-word inline-block mr-[0.35em] font-display"
					style="color: {word === 'Actually' ? 'var(--color-text)' : 'var(--color-text-secondary)'}; font-style: {word === 'Actually' ? 'italic' : 'normal'};"
				>{word}</span>
			{/each}
		</p>

		<!-- Bottom section -->
		<div class="hero-bottom">
			<div class="flex gap-4">
				<a
					href="#work"
					class="btn-primary"
					data-cursor="pointer"
					onclick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
				>
					<span>See Work</span>
					<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="#contact"
					class="btn-outline"
					data-cursor="pointer"
					onclick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
				>
					Get in Touch
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Prevent flash of content before GSAP initializes.
	   GSAP's fromTo runs in onMount, so without hiding upfront
	   the elements render fully visible for one frame, then
	   snap to opacity 0 and animate back in. */
	:global(#hero .name-char),
	:global(#hero .sub-word),
	:global(#hero .hero-bottom),
	:global(#hero .hero-label) {
		opacity: 0;
	}

	/* Availability pill */
	.hero-availability {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.85rem;
		border-radius: 9999px;
		border: 1px solid var(--color-border);
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-secondary);
		transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
	}
	.hero-availability:hover {
		border-color: var(--color-accent);
		color: var(--color-text);
	}
	.avail-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
		animation: avail-pulse 2s ease-in-out infinite;
	}
	@keyframes avail-pulse {
		0%, 100% { box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18); }
		50% { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.08); }
	}
</style>
