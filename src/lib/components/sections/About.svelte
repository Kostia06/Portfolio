<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let sectionEl: HTMLElement;
	let statsEl: HTMLElement;

	const stats = [
		{ value: 5, suffix: '+', label: 'Production Apps' },
		{ value: 35, suffix: '+', label: 'Students Mentored' },
		{ value: 1, suffix: 'st', label: 'Hackathon Win' }
	];

	let animatedStats = $state(stats.map(() => 0));

	onMount(() => {
		if (!browser) return;
		gsap.registerPlugin(ScrollTrigger);

		const elements = sectionEl.querySelectorAll('.about-reveal');
		gsap.fromTo(
			elements,
			{ opacity: 0, y: 40 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.12,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 75%'
				}
			}
		);

		if (statsEl) {
			ScrollTrigger.create({
				trigger: statsEl,
				start: 'top 80%',
				onEnter: () => {
					stats.forEach((stat, i) => {
						gsap.to({ val: 0 }, {
							val: stat.value,
							duration: 1.5,
							delay: i * 0.2,
							ease: 'power2.out',
							onUpdate: function () {
								animatedStats[i] = Math.floor(this.targets()[0].val);
							}
						});
					});
				}
			});
		}
	});
</script>

<section id="about" class="section-lg" style="background: var(--color-bg);" bind:this={sectionEl}>
	<div class="container">
		<div class="mb-6 about-reveal">
			<span class="section-number">05 / About</span>
		</div>
		<h2 class="section-heading mb-4 about-reveal">About Me</h2>
		<div class="divider mb-12 md:mb-16"></div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
			<!-- Bio -->
			<div>
				<div class="space-y-6 about-reveal">
					<p class="text-base md:text-lg leading-relaxed" style="color: var(--color-text-secondary);">
						I'm a <span style="color: var(--color-text); font-weight: 500;">Computer Science student</span> at the University of Calgary
						with a concentration in Software Engineering. My passion lies in creating elegant, performant web applications
						that solve real problems.
					</p>
					<p class="text-base md:text-lg leading-relaxed" style="color: var(--color-text-secondary);">
						From winning hackathons to building <span style="color: var(--color-accent);">production e-commerce platforms</span> serving
						thousands of users, I've developed a deep understanding of what it takes to deliver impactful digital solutions.
					</p>
					<p class="text-base md:text-lg leading-relaxed" style="color: var(--color-text-secondary);">
						When I'm not coding, I mentor aspiring developers and contribute to open-source projects,
						believing that knowledge grows when shared.
					</p>
				</div>

				<div class="mt-8 about-reveal">
					<a
						href="#contact"
						class="btn-primary"
						data-cursor="pointer"
						onclick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
					>
						<span>Let's Talk</span>
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
						</svg>
					</a>
				</div>
			</div>

			<!-- Stats -->
			<div bind:this={statsEl}>
				<div class="grid grid-cols-1 gap-6 about-reveal">
					{#each stats as stat, i (i)}
						<div class="flex items-baseline gap-4 py-6 border-b border-[var(--color-border)]">
							<span class="text-5xl md:text-7xl tabular-nums" style="font-family: var(--font-serif); color: var(--color-text);">
								{animatedStats[i]}{stat.suffix}
							</span>
							<span class="text-sm uppercase tracking-widest" style="color: var(--color-muted);">
								{stat.label}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
