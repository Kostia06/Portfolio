<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';
	import { experiences } from '$data/experiences';

	let imageEl: HTMLElement;
	let bioEl: HTMLElement;
	let timelineEl: HTMLElement;
	let backBtnEl: HTMLElement;

	const skills = [
		'JavaScript', 'TypeScript', 'Python', 'React', 'React Native',
		'Next.js', 'SvelteKit', 'Node.js', 'PostgreSQL', 'Supabase',
		'Firebase', 'Docker', 'GraphQL', 'Stripe'
	];

	onMount(() => {
		if (!browser) return;

		window.scrollTo(0, 0);
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline();

		if (backBtnEl) {
			gsap.set(backBtnEl, { x: -50, opacity: 0 });
			tl.to(backBtnEl, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.2);
		}

		if (imageEl && !$isMobile) {
			gsap.set(imageEl, { clipPath: 'inset(100% 0 0 0)' });
			tl.to(imageEl, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut' }, 0.3);
		} else if (imageEl) {
			gsap.set(imageEl, { opacity: 0, y: 30 });
			tl.to(imageEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
		}

		if (bioEl) {
			gsap.set(bioEl, { y: 40, opacity: 0 });
			tl.to(bioEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.5);
		}

		if (timelineEl) {
			const items = timelineEl.querySelectorAll('.timeline-item');
			const line = timelineEl.querySelector('.timeline-line');

			if (line && !$isMobile) {
				gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
				gsap.to(line, {
					scaleY: 1, duration: 1.5, ease: 'power3.out',
					scrollTrigger: { trigger: timelineEl, start: 'top 80%', toggleActions: 'play none none reverse' }
				});
			}

			gsap.from(items, {
				x: -50, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.2,
				scrollTrigger: { trigger: timelineEl, start: 'top 80%', toggleActions: 'play none none reverse' }
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<svelte:head>
	<title>About | Kos</title>
	<meta name="description" content="About Kostiantyn Ilnytskyi - Full Stack Developer based in Calgary, AB." />
</svelte:head>

<main class="min-h-screen" style="background: var(--color-bg);">
	<!-- Back Button -->
	<a
		bind:this={backBtnEl}
		href="/"
		class="fixed top-6 left-6 md:top-8 md:left-8 z-50 group flex items-center gap-3"
		data-cursor="pointer"
	>
		<div class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all">
			<svg class="w-4 h-4 md:w-5 md:h-5 text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</div>
		<span class="hidden md:inline uppercase tracking-[0.15em] text-xs text-[var(--color-muted)] group-hover:text-[var(--color-text)] transition-colors">Back</span>
	</a>

	<!-- Hero -->
	<section class="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-0">
		<div class="container">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
				<!-- Image -->
				<div bind:this={imageEl} class="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden">
					<img
						src="/profile.webp"
						alt="Kostiantyn Ilnytskyi"
						width="400"
						height="500"
						loading="eager"
						decoding="async"
						fetchpriority="high"
						class="w-full h-full object-cover"
					/>
				</div>

				<!-- Bio -->
				<div bind:this={bioEl}>
					<span class="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 block">/ About</span>
					<h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight mb-6">
						Kostiantyn<br />
						<span class="text-[var(--color-muted)]">Ilnytskyi</span>
					</h1>
					<p class="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md mb-8">
						CS student at the University of Calgary. I build performant web apps — from hackathon MVPs to production platforms serving thousands of users.
					</p>

					<!-- Skills as tags -->
					<div class="flex flex-wrap gap-2 mb-8">
						{#each skills as skill}
							<span class="px-3 py-1.5 text-xs uppercase tracking-wider text-[var(--color-muted)] border border-[var(--color-border)] rounded-full hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
								{skill}
							</span>
						{/each}
					</div>

					<a href="/#contact" class="btn-primary" data-cursor="pointer">
						<span>Get in Touch</span>
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Experience Timeline -->
	<section class="py-16 md:py-24 px-4 md:px-0" style="background: var(--color-bg-alt);">
		<div class="container max-w-3xl">
			<h2 class="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-10 md:mb-14">/ Experience</h2>

			<div bind:this={timelineEl} class="relative">
				<div class="timeline-line absolute left-[7px] md:left-[9px] top-0 bottom-0 w-[2px] bg-[var(--color-accent)]"></div>

				{#each experiences as exp}
					<div class="timeline-item group relative pl-10 md:pl-14 pb-10 md:pb-14 last:pb-0">
						<div class="absolute left-0 top-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[var(--color-bg-alt)] border-2 border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all z-10"></div>

						<div class="timeline-card rounded-xl border border-transparent p-4 -ml-4 group-hover:border-[var(--color-border)] group-hover:bg-[var(--color-bg)] transition-all duration-300">
							<div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
								<div>
									<div class="flex items-center gap-2 mb-1">
										<span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border {exp.type === 'work' ? 'text-[var(--color-accent)] border-[var(--color-accent)]/30' : exp.type === 'education' ? 'text-blue-400 border-blue-400/30' : 'text-yellow-400 border-yellow-400/30'}">
											{exp.type === 'work' ? 'Work' : exp.type === 'education' ? 'Education' : 'Award'}
										</span>
									</div>
									<h3 class="font-display text-lg md:text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
										{exp.title}
									</h3>
									<p class="text-sm text-[var(--color-muted)]">{exp.company}</p>
								</div>
								<span class="text-xs text-[var(--color-accent)] font-mono whitespace-nowrap">{exp.period}</span>
							</div>

							{#if exp.details}
								<div class="details-expand grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
									<div class="overflow-hidden">
										<p class="text-sm text-[var(--color-text-secondary)] leading-relaxed pt-3 mt-3 border-t border-[var(--color-border)]">
											{exp.details}
										</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<style>
	.timeline-line {
		will-change: transform;
	}
</style>
