<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { isMobile } from '$stores/app';

	let sectionEl: HTMLElement;
	let isInView = $state(false);

	const highlights = [
		{ icon: '🎓', label: 'University of Calgary', value: 'B.Sc. Computer Science' },
		{ icon: '🏆', label: 'Hackathon Wins', value: '1st Place @ Cultivator' },
		{ icon: '👥', label: 'Students Mentored', value: '35+' },
		{ icon: '🚀', label: 'Production Apps', value: '5+' }
	];

	const strengths = [
		{ title: 'Leadership', desc: 'Cross-functional teams, mentoring, program design' },
		{ title: 'Technical', desc: 'Full-stack, APIs, system architecture' },
		{ title: 'Impact', desc: '40% workload reduction, 30% efficiency gains' }
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isInView = true;
					}
				});
			},
			{ rootMargin: '-100px' }
		);

		if (sectionEl) observer.observe(sectionEl);

		return () => observer.disconnect();
	});
</script>

<section
	bind:this={sectionEl}
	id="about"
	class="relative min-h-screen py-24 md:py-32 px-4 md:px-6 overflow-hidden"
	style="background: var(--section-about);"
>
	<div class="max-w-7xl mx-auto">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
			<!-- Left: Visual Element - hidden on mobile -->
			{#if !$isMobile && isInView}
				<div class="relative order-2 lg:order-1 hidden md:block">
					<div class="relative aspect-square max-w-lg mx-auto">
						<!-- Animated code blocks -->
						<div
							class="absolute top-0 left-0 w-3/4 glass rounded-2xl p-6 font-mono"
							in:fly={{ x: -50, duration: 800, delay: 200 }}
						>
							<div class="flex items-center gap-2 mb-4">
								<span class="w-3 h-3 rounded-full bg-red-500"></span>
								<span class="w-3 h-3 rounded-full bg-yellow-500"></span>
								<span class="w-3 h-3 rounded-full bg-green-500"></span>
							</div>
							<pre class="text-[var(--muted-foreground)] overflow-hidden text-sm"><code
									><span class="text-purple-400">const</span> <span class="text-blue-400"
										>developer</span
									> = {'{\n'}
{'  '}<span class="text-green-400">name</span>: <span class="text-amber-400">"Kostiantyn"</span
									>,{'\n'}
{'  '}<span class="text-green-400">role</span>: <span class="text-amber-400">"Full Stack"</span
									>,{'\n'}
{'  '}<span class="text-green-400">passion</span>: <span class="text-amber-400">"Building"</span
									>{'\n'}
{'}'};
                </code></pre>
						</div>

						<!-- Stats card -->
						<div
							class="absolute bottom-0 right-0 w-2/3 glass rounded-2xl p-6"
							in:fly={{ x: 50, duration: 800, delay: 400 }}
						>
							<div class="grid grid-cols-2 gap-4">
								{#each highlights as item, i}
									<div class="text-center" in:fade={{ delay: 500 + i * 100 }}>
										<span class="text-2xl mb-2 block">{item.icon}</span>
										<div class="text-lg font-bold gradient-text">{item.value}</div>
										<div class="text-xs text-[var(--muted-foreground)]">{item.label}</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Right: Bio Text -->
			<div class="order-1 lg:order-2">
				{#if isInView}
					<span
						class="text-[var(--accent)] font-mono text-sm mb-4 block"
						in:fly={{ y: 20, duration: 600 }}
					>
						About Me
					</span>

					<h2
						class="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
						in:fly={{ y: 30, duration: 800, delay: 100 }}
					>
						Turning Ideas Into
						<span class="gradient-text block">Reality</span>
					</h2>

					<div
						class="space-y-3 md:space-y-4 text-base md:text-xl text-[var(--muted-foreground)] mb-8 md:mb-10"
					>
						<p in:fly={{ y: 20, duration: 600, delay: 200 }}>
							I'm a <span class="text-white font-medium">Computer Science student</span> at the University
							of Calgary with a concentration in <span class="text-white font-medium"
								>Software Engineering</span
							>.
						</p>
						<p in:fly={{ y: 20, duration: 600, delay: 300 }}>
							My journey spans from winning <span class="text-[var(--accent)] font-medium"
								>hackathons</span
							>
							to building
							<span class="text-[var(--accent)] font-medium">production e-commerce platforms</span> that
							serve thousands of users monthly.
						</p>
						<p in:fly={{ y: 20, duration: 600, delay: 400 }}>
							I'm passionate about <span class="text-white font-medium">full-stack development</span
							>, creating performant applications, and mentoring the next generation of developers.
						</p>
					</div>

					<!-- Key strengths -->
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
						{#each strengths as item, i}
							<div class="glass rounded-xl p-4" in:fly={{ y: 20, duration: 500, delay: 400 + i * 100 }}>
								<h4 class="font-bold text-[var(--accent)] mb-1">{item.title}</h4>
								<p class="text-sm text-[var(--muted-foreground)]">{item.desc}</p>
							</div>
						{/each}
					</div>

					<!-- Education -->
					<div
						class="glass rounded-xl md:rounded-2xl p-4 md:p-6"
						in:fly={{ y: 30, duration: 600, delay: 700 }}
					>
						<div class="flex items-start gap-3 md:gap-4">
							<div
								class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--accent)]/20 flex items-center justify-center text-xl md:text-2xl shrink-0"
							>
								🎓
							</div>
							<div class="min-w-0">
								<h4 class="text-base md:text-xl font-bold">
									Bachelor of Science in Computer Science
								</h4>
								<p class="text-sm md:text-base text-[var(--accent)]">
									Concentration in Software Engineering
								</p>
								<p class="text-xs md:text-sm text-[var(--muted-foreground)] mt-1">
									University of Calgary • 2023 – 2027 (Expected)
								</p>
								<div class="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
									<span
										class="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
									>
										Science Internship Program
									</span>
									<span
										class="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
									>
										Microplacements Program
									</span>
									<span
										class="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
									>
										Competitive Programming Club
									</span>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Background decoration -->
	<div class="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-30">
		<div
			class="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[200px]"
		></div>
	</div>
</section>
