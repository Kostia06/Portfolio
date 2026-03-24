<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';
	import { experiences } from '$data/experiences';

	let sectionEl: HTMLElement;
	let titleEl: HTMLElement;
	let bioEl: HTMLElement;
	let statsEl: HTMLElement;
	let skillsEl: HTMLElement;
	let timelineEl: HTMLElement;
	let decorEl: HTMLElement;

	const stats = [
		{ value: 5, suffix: '+', label: 'Production Apps', icon: '01' },
		{ value: 35, suffix: '+', label: 'Students Mentored', icon: '02' },
		{ value: 1, suffix: 'st', label: 'Hackathon Wins', icon: '03' }
	];

	let animatedStats = $state(stats.map(() => 0));

	const skills = [
		{ name: 'JavaScript', level: 95 },
		{ name: 'TypeScript', level: 90 },
		{ name: 'React', level: 92 },
		{ name: 'Next.js', level: 88 },
		{ name: 'SvelteKit', level: 85 },
		{ name: 'Node.js', level: 88 },
		{ name: 'Python', level: 80 },
		{ name: 'PostgreSQL', level: 82 },
		{ name: 'Supabase', level: 85 },
		{ name: 'Tailwind CSS', level: 95 }
	];

	onMount(() => {
		if (!browser) return;

		gsap.registerPlugin(ScrollTrigger);

		// Title animation with split reveal
		if (titleEl && !$isMobile) {
			gsap.from(titleEl.querySelectorAll('.title-line'), {
				y: 100,
				opacity: 0,
				duration: 1,
				ease: 'power4.out',
				stagger: 0.1,
				scrollTrigger: {
					trigger: titleEl,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});
		}

		// Bio paragraphs with stagger
		if (bioEl && !$isMobile) {
			gsap.from(bioEl.querySelectorAll('p'), {
				y: 60,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.15,
				scrollTrigger: {
					trigger: bioEl,
					start: 'top 75%',
					toggleActions: 'play none none reverse'
				}
			});
		}

		// Stats with counter animation
		if (statsEl && !$isMobile) {
			const statItems = statsEl.querySelectorAll('.stat-item');

			gsap.from(statItems, {
				y: 60,
				opacity: 0,
				scale: 0.9,
				duration: 0.8,
				ease: 'back.out(1.7)',
				stagger: 0.15,
				scrollTrigger: {
					trigger: statsEl,
					start: 'top 80%',
					toggleActions: 'play none none reverse',
					onEnter: () => {
						// Animate counter values
						stats.forEach((stat, i) => {
							gsap.to({ val: 0 }, {
								val: stat.value,
								duration: 1.5,
								delay: i * 0.2,
								ease: 'power2.out',
								onUpdate: function() {
									animatedStats[i] = Math.floor(this.targets()[0].val);
								}
							});
						});
					}
				}
			});
		}

		// Skills with progressive reveal
		if (skillsEl && !$isMobile) {
			const skillItems = skillsEl.querySelectorAll('.skill-item');

			skillItems.forEach((item, i) => {
				const bar = item.querySelector('.skill-bar');

				gsap.from(item, {
					x: -30,
					opacity: 0,
					duration: 0.5,
					delay: i * 0.05,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: skillsEl,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});

				gsap.from(bar, {
					scaleX: 0,
					duration: 1,
					delay: 0.3 + i * 0.05,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: skillsEl,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// Timeline with connected animation
		if (timelineEl && !$isMobile) {
			const items = timelineEl.querySelectorAll('.timeline-item');
			const dots = timelineEl.querySelectorAll('.timeline-dot');

			gsap.from(items, {
				x: -50,
				opacity: 0,
				duration: 0.6,
				ease: 'power3.out',
				stagger: 0.2,
				scrollTrigger: {
					trigger: timelineEl,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			});

			// Pulse effect on dots
			dots.forEach((dot, i) => {
				gsap.to(dot, {
					scale: 1.3,
					duration: 0.3,
					delay: i * 0.2 + 0.5,
					yoyo: true,
					repeat: 1,
					ease: 'power2.inOut',
					scrollTrigger: {
						trigger: timelineEl,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});
			});
		}

		// Floating decoration parallax
		if (decorEl && !$isMobile) {
			gsap.to(decorEl, {
				y: -100,
				ease: 'none',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1
				}
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="about"
	class="section-lg relative overflow-hidden"
	style="background: var(--color-bg);"
>
	<!-- Animated background shapes -->
	<div bind:this={decorEl} class="absolute inset-0 pointer-events-none">
		<!-- Large background text -->
		<div class="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03]">
			<span class="font-display text-[30vw] font-bold leading-none text-[var(--color-text)] whitespace-nowrap">
				ABOUT
			</span>
		</div>

		<!-- Geometric shapes -->
		<div class="absolute top-[20%] right-[10%] w-32 h-32 border border-[var(--color-accent)] opacity-20 rotate-45 floating-shape"></div>
		<div class="absolute bottom-[30%] left-[5%] w-20 h-20 rounded-full border-2 border-[var(--color-border)] opacity-30 floating-shape-delayed"></div>
		<div class="absolute top-[60%] right-[20%] w-4 h-4 bg-[var(--color-accent)] opacity-40 floating-shape"></div>

		<!-- Grid pattern -->
		<div class="absolute top-[15%] left-[15%] grid grid-cols-4 gap-2 opacity-20">
			{#each Array(16) as _}
				<div class="w-1.5 h-1.5 rounded-full bg-[var(--color-text)]"></div>
			{/each}
		</div>
	</div>

	<div class="container relative z-10">
		<!-- Section Header -->
		<div bind:this={titleEl} class="mb-12 md:mb-20">
			<div class="overflow-hidden">
				<span class="title-line block text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
					/ About Me
				</span>
			</div>
			<div class="overflow-hidden">
				<h2 class="title-line font-display text-[10vw] md:text-[6vw] lg:text-[5vw] font-bold leading-[0.9] tracking-tighter">
					Building Digital
				</h2>
			</div>
			<div class="overflow-hidden">
				<h2 class="title-line font-display text-[10vw] md:text-[6vw] lg:text-[5vw] font-bold leading-[0.9] tracking-tighter">
					<span class="text-[var(--color-accent)]">Experiences</span> That Matter
				</h2>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
			<!-- Left Column - Bio -->
			<div class="lg:col-span-5">
				<div bind:this={bioEl} class="space-y-6 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
					<p>
						I'm a <span class="text-[var(--color-text)] font-medium">Computer Science student</span> at the University of Calgary
						with a concentration in Software Engineering. My passion lies in creating elegant, performant web applications
						that solve real problems.
					</p>
					<p>
						From winning hackathons to building <span class="text-[var(--color-accent)]">production e-commerce platforms</span> serving
						thousands of users, I've developed a deep understanding of what it takes to deliver impactful digital solutions.
					</p>
					<p>
						When I'm not coding, I mentor aspiring developers and contribute to open-source projects,
						believing that knowledge grows when shared.
					</p>
				</div>

				<!-- CTA -->
				<div class="mt-8 flex flex-wrap gap-4">
					<a
						href="#contact"
						class="btn-primary"
						data-cursor="pointer"
					>
						<span>Let's Talk</span>
						<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
						</svg>
					</a>
				</div>
			</div>

			<!-- Right Column - Stats & Skills -->
			<div class="lg:col-span-7">
				<!-- Stats Grid -->
				<div bind:this={statsEl} class="grid grid-cols-3 gap-4 md:gap-6 mb-12">
					{#each stats as stat, i}
						<div class="stat-item relative p-4 md:p-6 border border-[var(--color-border)] rounded-lg md:rounded-xl bg-[var(--color-bg)] group hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
							<span class="absolute top-2 right-2 md:top-3 md:right-3 text-[10px] md:text-xs text-[var(--color-muted)] font-mono">
								{stat.icon}
							</span>
							<div class="font-display text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-1 md:mb-2 group-hover:text-[var(--color-accent)] transition-colors tabular-nums">
								{animatedStats[i]}{stat.suffix}
							</div>
							<div class="text-xs md:text-sm text-[var(--color-muted)] uppercase tracking-wider">
								{stat.label}
							</div>
							<!-- Hover glow -->
							<div class="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
						</div>
					{/each}
				</div>

				<!-- Skills with progress bars -->
				<div>
					<h3 class="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6">
						/ Technologies
					</h3>
					<div bind:this={skillsEl} class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each skills as skill}
							<div class="skill-item group">
								<div class="flex justify-between items-center mb-2">
									<span class="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">{skill.name}</span>
									<span class="text-xs text-[var(--color-muted)] font-mono">{skill.level}%</span>
								</div>
								<div class="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
									<div
										class="skill-bar h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light,var(--color-accent))] rounded-full origin-left"
										style="width: {skill.level}%;"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Experience Timeline -->
		<div class="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-[var(--color-border)]">
			<h3 class="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] mb-8 md:mb-12">
				/ Experience
			</h3>
			<div bind:this={timelineEl} class="space-y-0">
				{#each experiences.slice(0, 3) as exp, i}
					<div class="timeline-item group relative pl-8 md:pl-12 pb-8 md:pb-12 border-l-2 border-[var(--color-border)] last:pb-0 hover:border-l-[var(--color-accent)] transition-colors">
						<!-- Timeline dot -->
						<div class="timeline-dot absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-border)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all group-hover:scale-125"></div>

						<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
							<div class="flex-1">
								<h4 class="font-display text-lg md:text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
									{exp.title}
								</h4>
								<p class="text-sm md:text-base text-[var(--color-muted)] mt-1">
									{exp.company}
								</p>
								{#if exp.description}
									<p class="text-sm text-[var(--color-text-secondary)] mt-3 max-w-xl">
										{exp.description}
									</p>
								{/if}
							</div>
							<span class="text-xs md:text-sm text-[var(--color-accent)] font-mono whitespace-nowrap px-3 py-1 border border-[var(--color-accent)]/30 rounded-full">
								{exp.year}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Decorative corners -->
	<div class="hidden md:block absolute top-12 left-12 w-24 h-24 border-t-2 border-l-2 border-[var(--color-border)] opacity-30"></div>
	<div class="hidden md:block absolute bottom-12 right-12 w-24 h-24 border-b-2 border-r-2 border-[var(--color-border)] opacity-30"></div>
</section>

<style>
	@keyframes float {
		0%, 100% {
			transform: translateY(0) rotate(45deg);
		}
		50% {
			transform: translateY(-20px) rotate(45deg);
		}
	}

	@keyframes float-delayed {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-15px);
		}
	}

	.floating-shape {
		animation: float 6s ease-in-out infinite;
	}

	.floating-shape-delayed {
		animation: float-delayed 8s ease-in-out infinite;
		animation-delay: -2s;
	}

	.skill-bar {
		will-change: transform;
	}
</style>
