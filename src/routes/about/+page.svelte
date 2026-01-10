<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';
	import { experiences } from '$data/experiences';

	let pageEl: HTMLElement;
	let heroEl: HTMLElement;
	let titleChars: HTMLElement;
	let bioEl: HTMLElement;
	let statsEl: HTMLElement;
	let skillsEl: HTMLElement;
	let timelineEl: HTMLElement;
	let imageEl: HTMLElement;
	let backBtnEl: HTMLElement;

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

		// Initial page entrance animation
		const tl = gsap.timeline();

		// Back button slides in
		if (backBtnEl) {
			gsap.set(backBtnEl, { x: -50, opacity: 0 });
			tl.to(backBtnEl, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.2);
		}

		// Hero title animation - character by character
		if (titleChars && !$isMobile) {
			const chars = titleChars.querySelectorAll('.char');
			gsap.set(chars, { y: 100, opacity: 0, rotateX: -90 });
			tl.to(chars, {
				y: 0,
				opacity: 1,
				rotateX: 0,
				duration: 1,
				ease: 'power4.out',
				stagger: 0.03
			}, 0.3);
		} else if (titleChars) {
			// Simpler animation for mobile
			gsap.set(titleChars, { y: 40, opacity: 0 });
			tl.to(titleChars, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.3);
		}

		// Image reveal with mask
		if (imageEl && !$isMobile) {
			gsap.set(imageEl, { clipPath: 'inset(100% 0 0 0)' });
			tl.to(imageEl, {
				clipPath: 'inset(0% 0 0 0)',
				duration: 1.2,
				ease: 'power4.inOut'
			}, 0.5);
		} else if (imageEl) {
			gsap.set(imageEl, { opacity: 0, y: 30 });
			tl.to(imageEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5);
		}

		// Bio paragraphs with stagger
		if (bioEl) {
			const paragraphs = bioEl.querySelectorAll('p');
			gsap.set(paragraphs, { y: 50, opacity: 0 });
			tl.to(paragraphs, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.15
			}, 0.8);
		}

		// Stats with counter animation on scroll
		if (statsEl) {
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
		if (skillsEl) {
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

				if (bar) {
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
				}
			});
		}

		// Timeline with connected animation
		if (timelineEl) {
			const items = timelineEl.querySelectorAll('.timeline-item');
			const line = timelineEl.querySelector('.timeline-line');

			// Animate the connecting line
			if (line && !$isMobile) {
				gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
				gsap.to(line, {
					scaleY: 1,
					duration: 1.5,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: timelineEl,
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					}
				});
			}

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
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});

	function splitText(text: string) {
		return text.split('').map((char) => (char === ' ' ? '\u00A0' : char));
	}
</script>

<svelte:head>
	<title>About | Kos - Full Stack Developer</title>
	<meta name="description" content="Learn more about Kostiantyn Ilnytskyi - Full Stack Developer based in Calgary, AB." />
</svelte:head>

<main bind:this={pageEl} class="min-h-screen" style="background: var(--color-bg);">
	<!-- Back Button -->
	<a
		bind:this={backBtnEl}
		href="/#experience"
		class="fixed top-6 left-6 md:top-8 md:left-8 z-50 group flex items-center gap-3 text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
		data-cursor="pointer"
	>
		<div class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all">
			<svg
				class="w-4 h-4 md:w-5 md:h-5 text-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors rotate-180"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</div>
		<span class="hidden md:inline uppercase tracking-[0.15em] text-xs">Back</span>
	</a>

	<!-- Hero Section -->
	<section bind:this={heroEl} class="relative min-h-[60vh] md:min-h-[80vh] flex items-end pb-12 md:pb-20 overflow-hidden px-4 md:px-0">
		<!-- Background elements -->
		<div class="absolute inset-0 pointer-events-none">
			<div class="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02]">
				<span class="font-display text-[40vw] font-bold leading-none text-[var(--color-text)] whitespace-nowrap">
					ABOUT
				</span>
			</div>
		</div>

		<div class="container relative z-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
				<!-- Title -->
				<div>
					<span class="block text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 md:mb-6">
						/ About Me
					</span>
					<h1 bind:this={titleChars} class="font-display text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tighter">
						{#each splitText('Building') as char}
							<span class="char inline-block">{char}</span>
						{/each}
						<br />
						{#each splitText('Digital') as char, i}
							<span class="char inline-block" class:text-accent={i === 0} style={i === 0 ? 'color: var(--color-accent);' : ''}>{char}</span>
						{/each}
						<br />
						{#each splitText('Dreams') as char}
							<span class="char inline-block">{char}</span>
						{/each}
					</h1>
				</div>

				<!-- Image with reveal -->
				<div bind:this={imageEl} class="relative aspect-square max-w-xs md:max-w-sm lg:max-w-md mx-auto lg:mx-0">
					<div class="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent rounded-2xl"></div>
					<div class="absolute inset-4 border-2 border-[var(--color-accent)]/30 rounded-xl"></div>
					<img
						src="/profile.jpg"
						alt="Kostiantyn Ilnytskyi"
						class="absolute inset-0 w-full h-full object-cover rounded-2xl"
					/>
					<!-- Floating elements -->
					<div class="absolute -top-4 -right-4 w-8 h-8 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
					<div class="absolute -bottom-2 -left-2 w-12 h-12 border-2 border-[var(--color-border)] rounded-lg rotate-12"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Bio Section -->
	<section class="py-16 md:py-24 px-4 md:px-0" style="background: var(--color-bg-alt);">
		<div class="container">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
				<!-- Bio Text -->
				<div class="lg:col-span-6">
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
							href="/#contact"
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

				<!-- Stats Grid -->
				<div class="lg:col-span-6">
					<div bind:this={statsEl} class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
						{#each stats as stat, i}
							<div class="stat-item relative p-6 md:p-8 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] group hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/10">
								<span class="absolute top-3 right-3 text-xs text-[var(--color-muted)] font-mono">
									{stat.icon}
								</span>
								<div class="font-display text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors tabular-nums">
									{animatedStats[i]}{stat.suffix}
								</div>
								<div class="text-xs md:text-sm text-[var(--color-muted)] uppercase tracking-wider">
									{stat.label}
								</div>
								<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section class="py-16 md:py-24 px-4 md:px-0">
		<div class="container">
			<h2 class="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] mb-8 md:mb-12">
				/ Technologies & Skills
			</h2>
			<div bind:this={skillsEl} class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				{#each skills as skill}
					<div class="skill-item group p-4 rounded-lg hover:bg-[var(--color-bg-alt)] transition-colors">
						<div class="flex justify-between items-center mb-3">
							<span class="text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">{skill.name}</span>
							<span class="text-sm text-[var(--color-muted)] font-mono">{skill.level}%</span>
						</div>
						<div class="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
							<div
								class="skill-bar h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light,var(--color-accent))] rounded-full origin-left"
								style="width: {skill.level}%;"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Experience Timeline -->
	<section class="py-16 md:py-24 px-4 md:px-0" style="background: var(--color-bg-alt);">
		<div class="container">
			<h2 class="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] mb-8 md:mb-12">
				/ Experience & Journey
			</h2>
			<div bind:this={timelineEl} class="relative">
				<!-- Animated line -->
				<div class="timeline-line absolute left-[7px] md:left-[9px] top-0 bottom-0 w-[2px] bg-[var(--color-accent)]"></div>

				<div class="space-y-0">
					{#each experiences as exp, i}
						<div class="timeline-item group relative pl-10 md:pl-14 pb-10 md:pb-14 last:pb-0">
							<!-- Timeline dot -->
							<div class="absolute left-0 top-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[var(--color-bg-alt)] border-2 border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all group-hover:scale-125 z-10"></div>

							<div class="bg-[var(--color-bg)] p-6 rounded-xl border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/50 transition-all">
								<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
									<div class="flex-1">
										<h3 class="font-display text-xl md:text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
											{exp.title}
										</h3>
										<p class="text-base text-[var(--color-muted)] mt-1">
											{exp.company}
										</p>
										{#if exp.description}
											<p class="text-sm text-[var(--color-text-secondary)] mt-4 leading-relaxed">
												{exp.description}
											</p>
										{/if}
									</div>
									<span class="text-sm text-[var(--color-accent)] font-mono whitespace-nowrap px-4 py-2 border border-[var(--color-accent)]/30 rounded-full bg-[var(--color-accent)]/5">
										{exp.year}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 md:py-32 px-4 md:px-0 text-center">
		<div class="container max-w-3xl">
			<h2 class="font-display text-4xl md:text-6xl font-bold mb-6">
				Let's Create Something
				<span class="text-[var(--color-accent)]">Amazing</span>
			</h2>
			<p class="text-lg text-[var(--color-muted)] mb-10">
				Ready to bring your ideas to life? I'd love to hear about your project.
			</p>
			<a
				href="/#contact"
				class="btn-primary inline-flex"
				data-cursor="pointer"
			>
				<span>Get in Touch</span>
				<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</section>
</main>

<style>
	.char {
		will-change: transform, opacity;
		display: inline-block;
	}

	.skill-bar {
		will-change: transform;
	}

	.timeline-line {
		will-change: transform;
	}
</style>
