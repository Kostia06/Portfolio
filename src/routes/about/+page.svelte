<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';
	import { experiences } from '$data/experiences';

	let bioEl: HTMLElement;
	let timelineEl: HTMLElement;
	let backBtnEl: HTMLElement;
	let timelineSectionEl: HTMLElement;

	onMount(() => {
		if (!browser) return;

		window.scrollTo(0, 0);
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline();

		if (backBtnEl) {
			gsap.set(backBtnEl, { x: -50, opacity: 0 });
			tl.to(backBtnEl, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.2);

			ScrollTrigger.create({
				trigger: 'main',
				start: 'top top',
				end: '+=200',
				onLeave: () => { gsap.to(backBtnEl, { opacity: 0, x: -30, duration: 0.3 }); backBtnEl.style.pointerEvents = 'none'; },
				onEnterBack: () => { gsap.to(backBtnEl, { opacity: 1, x: 0, duration: 0.3 }); backBtnEl.style.pointerEvents = 'auto'; }
			});
		}

		if (bioEl) {
			gsap.set(bioEl, { y: 40, opacity: 0 });
			tl.to(bioEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.5);
		}

		if (timelineEl) {
			const items = timelineEl.querySelectorAll('.timeline-item');
			const line = timelineEl.querySelector('.timeline-line') as HTMLElement;
			const dots = timelineEl.querySelectorAll('.timeline-dot');

			if (line) {
				ScrollTrigger.create({
					trigger: timelineEl,
					start: 'top 80%',
					end: 'bottom 65%',
					scrub: 0.3,
					onUpdate: (self) => {
						const progress = self.progress;
						line.style.height = `${progress * 100}%`;

						const lineBottom = timelineEl.getBoundingClientRect().top + timelineEl.offsetHeight * progress;

						dots.forEach((dot) => {
							const dotCenter = dot.getBoundingClientRect().top + dot.clientHeight / 2;
							if (dotCenter <= lineBottom) {
								dot.classList.add('active');
							} else {
								dot.classList.remove('active');
							}
						});
					}
				});
			}

			/* Use fromTo with explicit final state and toggleActions 'play none none none'
			   so items stay visible after the first entry. The previous 'play none none reverse'
			   left them at opacity 0 if the trigger never evaluated (e.g. during programmatic
			   scrolls or certain browser automation contexts). */
			gsap.fromTo(
				items,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: timelineEl,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
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
			<div class="max-w-2xl">
				<div bind:this={bioEl}>
					<span class="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 block">/ About</span>
					<h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight mb-8">
						Kostia<br />
						<span class="text-[var(--color-muted)]">Ilnytskyi</span>
					</h1>

					<div class="bio-prose max-w-xl space-y-5 mb-10 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
						<p>
							I'm a Computer Science student at the <strong class="text-[var(--color-text)] font-medium">University of Calgary</strong> (BSc Software Engineering, expected 2027) who gets bored writing code that nobody uses. So I don't.
						</p>
						<p>
							Over the last two years I've shipped real products to real people: a voice-to-invoice SaaS for contractors (<strong class="text-[var(--color-text)] font-medium">Mr Blu</strong>), a production e-commerce platform doing <strong class="text-[var(--color-text)] font-medium">1,200+ monthly visitors</strong> (Respect The Technique), a privacy-first site for a foundation supporting <strong class="text-[var(--color-text)] font-medium">1.2M Ukrainian-Canadians</strong>, and a handful of hackathon wins along the way.
						</p>
						<p>
							My sweet spot is the full stack — React / Next.js / SvelteKit on the front, Node / Python / Supabase / Postgres on the back, deployed on Cloudflare's edge. I care about performance budgets, small JS payloads, and interfaces that feel <em>physical</em>. GSAP, Lenis, and 60&nbsp;fps are love languages.
						</p>
						<p>
							I was born in Ukraine, started coding in 4th grade in New York, and moved to Calgary in 2023 to start at the University of Calgary. My first real build was a working LEGO car programmed in Java — and that was the moment. I realized I could tell the computer something and it would go make a real thing in the real world do it. I spent the next few years riding that feeling into mods for games I loved (Minecraft especially), and I've been chasing the same hit ever since — just with harder problems and fewer LEGO bricks.
						</p>
						<p>
							I'm most alive when the problem is real, the deadline is close, and the users are actual people I end up talking to. My favourite moments so far have been watching a contractor speak into <strong class="text-[var(--color-text)] font-medium">Mr Blu</strong> and walk away with a finished invoice a minute later, and helping the <strong class="text-[var(--color-text)] font-medium">United Ukrainians of Canada Foundation</strong> ship a PR-pathway advocacy tool in weeks instead of months. Next, I want to work on problems where shipping quality matters more than shipping volume — ideally on a small, opinionated team that cares about craft and doesn't confuse motion for progress.
						</p>
						<p>
							Currently open to <strong class="text-[var(--color-text)] font-medium">Summer 2026 internships</strong>. I also tutor CS students at UofC on the side — mostly Python, Java, data structures.
						</p>
					</div>

					<div class="flex flex-wrap gap-3">
						<a href="/#contact" class="btn-primary" data-cursor="pointer">
							<span>Get in Touch</span>
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
							</svg>
						</a>
						<a
							href="/resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="btn-outline"
							data-cursor="pointer"
						>
							<span>Download Résumé</span>
							<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Experience Timeline -->
	<section bind:this={timelineSectionEl} class="py-16 md:py-24 px-4 md:px-0" style="background: var(--color-bg);">
		<div class="container max-w-3xl">
			<h2 class="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-10 md:mb-14">/ Experience</h2>

			<div bind:this={timelineEl} class="relative">
				<!-- Background line (gray) -->
				<div class="timeline-bg-line absolute top-0 bottom-0"></div>
				<!-- Progress line (orange, fills on scroll) -->
				<div class="timeline-line timeline-progress-line absolute top-0" style="height: 0%;"></div>

				{#each experiences as exp}
					<div class="timeline-item group relative pl-10 md:pl-12 pb-10 md:pb-14 last:pb-0">
						<div class="timeline-dot absolute top-[18px] z-10"></div>

						<div class="timeline-card rounded-xl border border-transparent p-4 -ml-4 group-hover:border-[var(--glass-border)] group-hover:bg-[var(--glass-bg)] group-hover:backdrop-blur-md transition-all duration-300">
							<div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
								<div>
									<div class="flex items-center gap-2 mb-1">
										<span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border {exp.type === 'work' ? 'text-[var(--color-accent)] border-[var(--color-accent)]/30' : exp.type === 'education' ? 'text-[var(--color-text-secondary)] border-[var(--color-border-dark)]' : 'text-[var(--color-accent)] border-[var(--color-accent)]/30'}">
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

	<!-- Back to Home -->
	<section class="py-20 md:py-28 px-4 md:px-0" style="background: var(--color-bg);">
		<div class="container max-w-3xl flex flex-col items-center text-center">
			<p class="text-sm text-[var(--color-muted)] mb-6">That's the journey so far.</p>
			<a href="/" class="btn-outline" data-cursor="pointer">
				<span>Back to Home</span>
			</a>
		</div>
	</section>
</main>

<style>
	.timeline-line {
		will-change: height;
	}

	/* Shared center point for line and dots */
	.timeline-bg-line,
	.timeline-progress-line {
		left: 5px;
		width: 1px;
	}

	.timeline-bg-line {
		background: var(--color-border);
	}

	.timeline-progress-line {
		width: 2px;
		left: 4.5px;
		background: var(--color-accent);
	}

	/* Dots: small by default, centered on the line */
	.timeline-dot {
		width: 10px;
		height: 10px;
		left: 0px;
		border-radius: 50%;
		background-color: var(--color-bg);
		border: 2px solid var(--color-border);
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 0 0 4px var(--color-bg);
	}

	/* Active dots: grow and turn orange */
	:global(.timeline-dot.active) {
		width: 14px;
		height: 14px;
		left: -2px;
		border-color: var(--color-accent);
		background-color: var(--color-accent);
		box-shadow: 0 0 0 4px var(--color-bg);
	}

	@media (min-width: 768px) {
		.timeline-bg-line {
			left: 7px;
		}

		.timeline-progress-line {
			left: 6.5px;
		}

		.timeline-dot {
			width: 12px;
			height: 12px;
			left: 1px;
			box-shadow: 0 0 0 5px var(--color-bg);
		}

		:global(.timeline-dot.active) {
			width: 16px;
			height: 16px;
			left: -1px;
			box-shadow: 0 0 0 5px var(--color-bg);
		}
	}
</style>
