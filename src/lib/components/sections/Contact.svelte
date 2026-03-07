<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';
	import MagneticButton from '$ui/MagneticButton.svelte';

	let titleEl: HTMLElement;
	let emailEl: HTMLElement;
	let orbitsEl: HTMLElement;

	const email = 'Ilnkostia@gmail.com';

	const socialLinks = [
		{ href: 'https://github.com/Kostia06', label: 'GitHub', icon: 'GH' },
		{ href: 'https://linkedin.com/in/kostiantyn-ilnytskyi-899a53247', label: 'LinkedIn', icon: 'LI' }
	];

	let copiedEmail = $state(false);
	let mousePos = $state({ x: 0, y: 0 });

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copiedEmail = true;
			setTimeout(() => (copiedEmail = false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	onMount(() => {
		if (!browser) return;

		gsap.registerPlugin(ScrollTrigger);

		// Title animation with character stagger
		if (titleEl && !$isMobile) {
			const lines = titleEl.querySelectorAll('.title-line');

			gsap.from(lines, {
				y: 100,
				opacity: 0,
				rotateX: -40,
				duration: 1,
				ease: 'power4.out',
				stagger: 0.15,
				scrollTrigger: {
					trigger: titleEl,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		}

		// Email reveal with scale
		if (emailEl && !$isMobile) {
			gsap.from(emailEl, {
				y: 80,
				opacity: 0,
				scale: 0.95,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: emailEl,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		}

		// Orbiting elements animation
		if (orbitsEl && !$isMobile) {
			const orbits = orbitsEl.querySelectorAll('.orbit');
			orbits.forEach((orbit, i) => {
				gsap.to(orbit, {
					rotation: 360,
					duration: 20 + i * 10,
					ease: 'none',
					repeat: -1,
					transformOrigin: 'center center'
				});
			});
		}

		// Parallax mouse movement for decorations
		const handleMouseMove = (e: MouseEvent) => {
			if ($isMobile) return;
			mousePos = {
				x: (e.clientX / window.innerWidth - 0.5) * 30,
				y: (e.clientY / window.innerHeight - 0.5) * 30
			};
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<section
	id="contact"
	class="section-lg relative overflow-hidden"
	style="background: var(--color-bg);"
>
	<!-- Animated background -->
	<div class="absolute inset-0 pointer-events-none">
		<!-- Large background text -->
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
			<span class="font-display text-[50vw] font-bold leading-none text-[var(--color-text)]">
				HI
			</span>
		</div>

		<!-- Orbiting rings -->
		<div bind:this={orbitsEl} class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<div class="orbit absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 border border-[var(--color-border)] rounded-full opacity-20">
				<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
			</div>
			<div class="orbit absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] -translate-x-1/2 -translate-y-1/2 border border-[var(--color-border)] rounded-full opacity-10">
				<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] opacity-50"></div>
			</div>
		</div>

		<!-- Floating shapes with parallax -->
		<div
			class="absolute top-[15%] left-[10%] w-24 h-24 border border-[var(--color-accent)] opacity-20 rotate-12 transition-transform duration-300"
			style="transform: translate({mousePos.x * 0.3}px, {mousePos.y * 0.3}px) rotate(12deg);"
		></div>
		<div
			class="absolute bottom-[20%] right-[15%] w-16 h-16 rounded-full border-2 border-[var(--color-border)] opacity-30 transition-transform duration-300"
			style="transform: translate({mousePos.x * -0.2}px, {mousePos.y * -0.2}px);"
		></div>
		<div
			class="absolute top-[40%] right-[8%] w-4 h-4 rounded-full bg-[var(--color-accent)] opacity-60 transition-transform duration-300"
			style="transform: translate({mousePos.x * 0.5}px, {mousePos.y * 0.5}px);"
		></div>
	</div>

	<div class="container relative z-10">
		<div class="max-w-4xl mx-auto">
			<!-- Section Header -->
			<div bind:this={titleEl} class="mb-12 md:mb-16 text-center perspective-1000">
				<div class="overflow-hidden">
					<span class="title-line block text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] mb-6">
						/ Get in Touch
					</span>
				</div>
				<div class="overflow-hidden">
					<h2 class="title-line font-display text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tighter">
						Let's Work
					</h2>
				</div>
				<div class="overflow-hidden">
					<h2 class="title-line font-display text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.9] tracking-tighter text-[var(--color-muted)]">
						Together
					</h2>
				</div>
			</div>

			<!-- Email Link -->
			<div bind:this={emailEl} class="mb-12 md:mb-16 text-center">
				<p class="text-[var(--color-muted)] mb-6 md:mb-8 text-base md:text-lg max-w-md mx-auto">
					Have a project in mind? Let's create something amazing together.
				</p>

				<MagneticButton strength={0.2}>
					<a
						href="mailto:{email}"
						class="group inline-flex items-center gap-3 md:gap-4 text-xl md:text-3xl lg:text-4xl font-display font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors relative"
						data-cursor="pointer"
						data-cursor-text="Email"
					>
						<span class="relative overflow-hidden">
							<span class="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								{email}
							</span>
							<span class="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full text-[var(--color-accent)]">
								{email}
							</span>
						</span>
						<svg
							class="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
						</svg>
					</a>
				</MagneticButton>

				<!-- Copy button -->
				<button
					onclick={copyEmail}
					class="mt-4 md:mt-6 inline-flex items-center gap-2 text-xs md:text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-all px-4 py-2 border border-[var(--color-border)] rounded-full hover:border-[var(--color-accent)] hover:scale-105"
					data-cursor="pointer"
				>
					{#if copiedEmail}
						<svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-green-500">Copied!</span>
					{:else}
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
						<span>Copy email</span>
					{/if}
				</button>
			</div>

			<!-- Social Links -->
			<div class="flex justify-center gap-4 md:gap-6 mb-12 md:mb-16">
				{#each socialLinks as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="social-link group relative flex items-center gap-3 px-6 py-4 border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)] transition-all overflow-hidden"
						data-cursor="pointer"
					>
						<!-- Hover background -->
						<div class="absolute inset-0 bg-[var(--color-accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>

						<span class="relative text-xs font-mono text-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-colors">{link.icon}</span>
						<span class="relative text-sm md:text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors">
							{link.label}
						</span>
						<svg
							class="relative w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-bg)] transition-all group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				{/each}
			</div>

			<!-- Availability Status -->
			<div class="text-center">
				<div class="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-bg-alt)] rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
					<span class="relative flex h-3 w-3">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
					</span>
					<span class="text-xs md:text-sm uppercase tracking-[0.15em] text-[var(--color-text)]">
						Available for freelance projects
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Grid lines decoration -->
	<div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>
	<div class="hidden md:block absolute bottom-0 left-1/4 w-px h-24 bg-gradient-to-t from-[var(--color-border)] to-transparent"></div>
	<div class="hidden md:block absolute bottom-0 left-1/2 w-px h-32 bg-gradient-to-t from-[var(--color-accent)] to-transparent opacity-50"></div>
	<div class="hidden md:block absolute bottom-0 left-3/4 w-px h-24 bg-gradient-to-t from-[var(--color-border)] to-transparent"></div>
</section>

<style>
	.perspective-1000 {
		perspective: 1000px;
	}

	.orbit {
		will-change: transform;
	}
</style>
