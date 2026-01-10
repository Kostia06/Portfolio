<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoading } from '$stores/app';
	import gsap from 'gsap';

	let visible = $state(true);
	let containerEl: HTMLElement;
	let cornersEl: HTMLElement;
	let revealsEl: HTMLElement;
	let greetingEl: HTMLElement;
	let iconsEl: HTMLElement;

	const greetings = ['Hello', 'Привіт', 'Hola', 'Bonjour', 'Ciao'];

	onMount(() => {
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;

		// Animate greetings one by one
		if (greetingEl) {
			const greetingSpans = greetingEl.querySelectorAll('.greeting');
			const fadeIn = 0.18;
			const hold = 0.12;
			const fadeOut = 0.15;
			const totalPerGreeting = fadeIn + hold + fadeOut;

			greetingSpans.forEach((span, i) => {
				gsap.set(span, { opacity: 0, y: 20 });

				const startTime = i * totalPerGreeting;

				// Fade in
				gsap.to(span, {
					opacity: 1,
					y: 0,
					duration: fadeIn,
					ease: 'power2.out',
					delay: startTime
				});

				// Fade out
				gsap.to(span, {
					opacity: 0,
					y: -20,
					duration: fadeOut,
					ease: 'power2.in',
					delay: startTime + fadeIn + hold
				});
			});
		}

		// Animate floating icons
		if (iconsEl) {
			const icons = iconsEl.querySelectorAll('.loader-icon');
			icons.forEach((icon, i) => {
				gsap.set(icon, { opacity: 0, scale: 0, rotation: -180 });
				gsap.to(icon, {
					opacity: 0.6,
					scale: 1,
					rotation: 0,
					duration: 0.8,
					ease: 'back.out(1.7)',
					delay: 0.5 + i * 0.15
				});

				// Subtle floating animation
				gsap.to(icon, {
					y: '+=10',
					duration: 2 + i * 0.3,
					ease: 'sine.inOut',
					repeat: -1,
					yoyo: true,
					delay: 0.5 + i * 0.15
				});
			});
		}

		// Animate corners from center to their positions
		if (cornersEl) {
			const corners = cornersEl.querySelectorAll('.corner-bracket');
			// Use smaller offset for mobile (16px = top-4) vs desktop (32px = top-8)
			const offset = window.innerWidth < 768 ? 16 : 32;
			const cornerPositions = [
				{ x: offset, y: offset },
				{ x: window.innerWidth - offset, y: offset },
				{ x: offset, y: window.innerHeight - offset },
				{ x: window.innerWidth - offset, y: window.innerHeight - offset }
			];

			corners.forEach((corner, i) => {
				const targetX = cornerPositions[i].x;
				const targetY = cornerPositions[i].y;
				const offsetX = targetX - centerX;
				const offsetY = targetY - centerY;

				gsap.set(corner, {
					x: -offsetX,
					y: -offsetY,
					scale: 0.5,
					opacity: 0
				});

				gsap.to(corner, {
					x: 0,
					y: 0,
					scale: 1,
					opacity: 1,
					duration: 1.2,
					ease: 'power3.out',
					delay: 0.2 + i * 0.08
				});
			});
		}

		// Exit animation
		const exitTimer = setTimeout(() => {
			const exitTl = gsap.timeline({
				onComplete: () => {
					visible = false;
					isLoading.set(false);
				}
			});

			// Icons fade out
			if (iconsEl) {
				const icons = iconsEl.querySelectorAll('.loader-icon');
				icons.forEach((icon, i) => {
					exitTl.to(icon, {
						opacity: 0,
						scale: 0.5,
						duration: 0.3,
						ease: 'power2.in'
					}, 0.03 * i);
				});
			}

			// Corners move back toward center slightly and fade
			if (cornersEl) {
				const corners = cornersEl.querySelectorAll('.corner-bracket');
				corners.forEach((corner, i) => {
					const isLeft = i === 0 || i === 2;
					const isTop = i === 0 || i === 1;

					exitTl.to(corner, {
						x: isLeft ? 40 : -40,
						y: isTop ? 40 : -40,
						opacity: 0,
						duration: 0.5,
						ease: 'power2.in'
					}, 0.05 * i);
				});
			}

			// Split reveal panels
			if (revealsEl) {
				const topPanel = revealsEl.querySelector('.reveal-top');
				const bottomPanel = revealsEl.querySelector('.reveal-bottom');

				exitTl.to(topPanel, {
					yPercent: -100,
					duration: 0.8,
					ease: 'power4.inOut'
				}, 0.2);

				exitTl.to(bottomPanel, {
					yPercent: 100,
					duration: 0.8,
					ease: 'power4.inOut'
				}, 0.2);
			}

		}, 2800);

		return () => {
			clearTimeout(exitTimer);
		};
	});
</script>

{#if visible}
	<div
		bind:this={containerEl}
		class="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
	>
		<!-- Split reveal panels -->
		<div bind:this={revealsEl} class="absolute inset-0 pointer-events-none">
			<div class="reveal-top absolute top-0 left-0 right-0 h-1/2 bg-[var(--color-bg)]"></div>
			<div class="reveal-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--color-bg)]"></div>
		</div>

		<!-- Animated corner brackets -->
		<div bind:this={cornersEl} class="absolute inset-0 pointer-events-none">
			<div class="corner-bracket absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-16 md:h-16">
				<div class="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent)]"></div>
				<div class="absolute top-0 left-0 w-[2px] h-full bg-[var(--color-accent)]"></div>
			</div>
			<div class="corner-bracket absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-16 md:h-16">
				<div class="absolute top-0 right-0 w-full h-[2px] bg-[var(--color-accent)]"></div>
				<div class="absolute top-0 right-0 w-[2px] h-full bg-[var(--color-accent)]"></div>
			</div>
			<div class="corner-bracket absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-16 md:h-16">
				<div class="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)]"></div>
				<div class="absolute bottom-0 left-0 w-[2px] h-full bg-[var(--color-accent)]"></div>
			</div>
			<div class="corner-bracket absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 h-8 md:w-16 md:h-16">
				<div class="absolute bottom-0 right-0 w-full h-[2px] bg-[var(--color-accent)]"></div>
				<div class="absolute bottom-0 right-0 w-[2px] h-full bg-[var(--color-accent)]"></div>
			</div>
		</div>

		<!-- Floating Icons -->
		<div bind:this={iconsEl} class="absolute inset-0 pointer-events-none flex items-center justify-center">
			<!-- Code bracket left -->
			<div class="loader-icon icon-bracket-left absolute">
				<svg class="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2">
					<polyline points="8 6 2 12 8 18"></polyline>
				</svg>
			</div>
			<!-- Code bracket right -->
			<div class="loader-icon icon-bracket-right absolute">
				<svg class="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2">
					<polyline points="16 6 22 12 16 18"></polyline>
				</svg>
			</div>
			<!-- Terminal icon -->
			<div class="loader-icon icon-terminal absolute">
				<svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2">
					<polyline points="4 17 10 11 4 5"></polyline>
					<line x1="12" y1="19" x2="20" y2="19"></line>
				</svg>
			</div>
			<!-- Hash/code icon -->
			<div class="loader-icon icon-hash absolute">
				<svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2">
					<line x1="4" y1="9" x2="20" y2="9"></line>
					<line x1="4" y1="15" x2="20" y2="15"></line>
					<line x1="10" y1="3" x2="8" y2="21"></line>
					<line x1="16" y1="3" x2="14" y2="21"></line>
				</svg>
			</div>
			<!-- Diamond shape top -->
			<div class="loader-icon icon-diamond absolute">
				<svg class="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 16 16" fill="var(--color-accent)">
					<rect x="8" y="0" width="8" height="8" transform="rotate(45 8 8)"/>
				</svg>
			</div>
			<!-- Circle shape bottom -->
			<div class="loader-icon icon-circle absolute">
				<svg class="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 12 12" fill="none" stroke="var(--color-accent)" stroke-width="1.5">
					<circle cx="6" cy="6" r="5"/>
				</svg>
			</div>
		</div>

		<!-- Greetings -->
		<div bind:this={greetingEl} class="relative h-12 md:h-16 flex items-center justify-center z-10">
			{#each greetings as greeting}
				<span class="greeting absolute font-display text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--color-text)]">
					{greeting}
				</span>
			{/each}
		</div>
	</div>
{/if}

<style>
	.corner-bracket {
		will-change: transform, opacity;
	}

	.greeting {
		will-change: transform, opacity;
		opacity: 0;
	}

	.loader-icon {
		will-change: transform, opacity;
		opacity: 0;
	}

	.loader-icon svg {
		filter: drop-shadow(0 0 6px var(--color-accent));
	}

	/* Icon positioning - mobile first (329px+ screens) */
	.icon-bracket-left {
		left: calc(50% - 70px);
		top: calc(50% - 40px);
	}

	.icon-bracket-right {
		right: calc(50% - 70px);
		top: calc(50% - 40px);
	}

	.icon-terminal {
		left: calc(50% - 55px);
		bottom: calc(50% - 45px);
	}

	.icon-hash {
		right: calc(50% - 55px);
		bottom: calc(50% - 45px);
	}

	.icon-diamond {
		top: calc(50% - 55px);
		left: 50%;
		transform: translateX(-50%);
	}

	.icon-circle {
		bottom: calc(50% - 60px);
		left: 50%;
		transform: translateX(-50%);
	}

	/* Tablet and up */
	@media (min-width: 768px) {
		.loader-icon svg {
			filter: drop-shadow(0 0 8px var(--color-accent));
		}

		.icon-bracket-left {
			left: calc(50% - 140px);
			top: calc(50% - 60px);
		}

		.icon-bracket-right {
			right: calc(50% - 140px);
			top: calc(50% - 60px);
		}

		.icon-terminal {
			left: calc(50% - 100px);
			bottom: calc(50% - 70px);
		}

		.icon-hash {
			right: calc(50% - 100px);
			bottom: calc(50% - 70px);
		}

		.icon-diamond {
			top: calc(50% - 90px);
		}

		.icon-circle {
			bottom: calc(50% - 95px);
		}
	}
</style>
