<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';
	import { experiences } from '$data/experiences';

	let sectionEl: HTMLElement;
	let titleEl: HTMLElement;
	let timelineEl: HTMLElement;
	let aboutCircleEl: HTMLElement;

	onMount(() => {
		if (!browser) return;

		gsap.registerPlugin(ScrollTrigger);

		// Title animation
		if (titleEl && !$isMobile) {
			gsap.from(titleEl.querySelectorAll('.title-line'), {
				y: 80,
				opacity: 0,
				duration: 1,
				ease: 'power4.out',
				stagger: 0.1,
				scrollTrigger: {
					trigger: titleEl,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			});
		}

		// Timeline items animation
		if (timelineEl && !$isMobile) {
			const items = timelineEl.querySelectorAll('.exp-card');

			items.forEach((item, i) => {
				gsap.from(item, {
					y: 60,
					opacity: 0,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: item,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// About circle animation
		if (aboutCircleEl) {
			// Floating animation
			gsap.to(aboutCircleEl, {
				y: -15,
				duration: 2.5,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});

			// Rotate on scroll
			gsap.to(aboutCircleEl.querySelector('.circle-ring'), {
				rotation: 360,
				duration: 20,
				repeat: -1,
				ease: 'none'
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="experience"
	class="py-20 md:py-32 relative overflow-hidden"
	style="background: var(--color-bg);"
>
	<!-- Background decoration -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02]">
			<span class="font-display text-[25vw] font-bold leading-none text-[var(--color-text)] whitespace-nowrap">
				EXP
			</span>
		</div>
	</div>

	<div class="container relative z-10">
		<!-- Section Header with floating About circle -->
		<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-20">
			<div bind:this={titleEl}>
				<div class="overflow-hidden">
					<span class="title-line block text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
						/ Experience
					</span>
				</div>
				<div class="overflow-hidden">
					<h2 class="title-line font-display text-[10vw] md:text-[6vw] lg:text-[4vw] font-bold leading-[0.9] tracking-tighter">
						Where I've
					</h2>
				</div>
				<div class="overflow-hidden">
					<h2 class="title-line font-display text-[10vw] md:text-[6vw] lg:text-[4vw] font-bold leading-[0.9] tracking-tighter">
						<span class="text-[var(--color-accent)]">Made Impact</span>
					</h2>
				</div>
			</div>

			<!-- Floating About Circle -->
			<a
				bind:this={aboutCircleEl}
				href="/about"
				class="about-circle group relative w-32 h-32 md:w-40 md:h-40 self-center lg:self-auto"
				data-cursor="pointer"
				data-cursor-text="More"
			>
				<!-- Outer rotating ring with dashed border -->
				<div class="circle-ring absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-accent)]/60"></div>

				<!-- Middle pulsing ring -->
				<div class="absolute inset-2 rounded-full border border-[var(--color-accent)]/30 group-hover:border-[var(--color-accent)] transition-colors duration-500"></div>

				<!-- Inner solid circle -->
				<div class="absolute inset-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[var(--color-accent)]/30">
					<div class="text-center">
						<span class="block text-[var(--color-bg)] font-display text-sm md:text-base font-bold uppercase tracking-wider">Learn</span>
						<span class="block text-[var(--color-bg)] font-display text-sm md:text-base font-bold uppercase tracking-wider">More</span>
					</div>
				</div>

				<!-- Orbiting dot -->
				<div class="absolute inset-0 animate-orbit">
					<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)]"></div>
				</div>
			</a>
		</div>

		<!-- Experience Cards -->
		<div bind:this={timelineEl} class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
			{#each experiences.slice(0, 4) as exp, i}
				<div
					class="exp-card group relative p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] hover:border-[var(--color-accent)]/50 transition-all duration-500"
				>
					<!-- Year badge -->
					<div class="absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-mono bg-[var(--color-accent)] text-[var(--color-bg)]">
						{exp.year}
					</div>

					<!-- Icon -->
					<div class="w-12 h-12 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-2xl mb-4 group-hover:border-[var(--color-accent)] transition-colors">
						{exp.icon}
					</div>

					<!-- Content -->
					<h3 class="font-display text-xl md:text-2xl font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
						{exp.title}
					</h3>
					<p class="text-sm text-[var(--color-muted)] mb-4">
						{exp.company} <span class="text-[var(--color-border)]">|</span> {exp.period}
					</p>

					<!-- Description -->
					<ul class="space-y-2 mb-6">
						{#each exp.description.slice(0, 2) as desc}
							<li class="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
								<span class="text-[var(--color-accent)] mt-1">+</span>
								<span>{desc}</span>
							</li>
						{/each}
					</ul>

					<!-- Technologies -->
					<div class="flex flex-wrap gap-2">
						{#each exp.technologies as tech}
							<span class="px-3 py-1 text-xs rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-[var(--color-accent)]/30 group-hover:text-[var(--color-accent)] transition-all">
								{tech}
							</span>
						{/each}
					</div>

					<!-- Hover glow -->
					<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
				</div>
			{/each}
		</div>

		<!-- View All Link -->
		<div class="mt-12 text-center">
			<a
				href="/about"
				class="inline-flex items-center gap-3 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors group"
				data-cursor="pointer"
			>
				<span class="uppercase tracking-[0.15em]">View Full Experience</span>
				<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	@keyframes orbit {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-orbit {
		animation: orbit 8s linear infinite;
	}

	.exp-card {
		will-change: transform;
	}
</style>
