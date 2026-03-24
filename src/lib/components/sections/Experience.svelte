<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { experiences } from '$data/experiences';

	let expandedIndex = $state<number | null>(null);
	let sectionEl: HTMLElement;

	const typeBadgeColors: Record<string, string> = {
		work: 'var(--color-accent)',
		education: '#3b82f6',
		achievement: '#22c55e'
	};

	function toggleExpand(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}

	onMount(() => {
		if (!browser) return;
		gsap.registerPlugin(ScrollTrigger);

		const rows = sectionEl.querySelectorAll('.timeline-row');
		gsap.fromTo(
			rows,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 75%'
				}
			}
		);
	});
</script>

<section id="experience" class="section-lg" style="background: var(--color-bg);" bind:this={sectionEl}>
	<div class="container">
		<div class="mb-6">
			<span class="section-number">04 / Experience</span>
		</div>
		<h2 class="section-heading mb-4">My Journey</h2>
		<div class="divider mb-12 md:mb-16"></div>

		<div class="flex flex-col">
			{#each experiences as exp, index (index)}
				<button
					class="timeline-row group text-left w-full border-b border-[var(--color-border)] py-5 md:py-6 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.02)]"
					data-cursor="pointer"
					onclick={() => toggleExpand(index)}
				>
					<div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
						<div class="md:w-24 shrink-0">
							<span class="text-lg md:text-xl" style="font-family: var(--font-serif); color: var(--color-text-secondary);">
								{exp.year}
							</span>
						</div>

						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-3 flex-wrap">
								<h3 class="text-base md:text-lg font-medium" style="color: var(--color-text);">
									{exp.title}
								</h3>
								<span
									class="text-[10px] uppercase tracking-widest px-2 py-0.5 border"
									style="color: {typeBadgeColors[exp.type]}; border-color: {typeBadgeColors[exp.type]}; opacity: 0.7;"
								>
									{exp.type}
								</span>
							</div>
							<p class="text-sm mt-1" style="color: var(--color-muted);">
								{exp.company}
							</p>
						</div>

						<div class="md:w-48 shrink-0 md:text-right">
							<span class="text-xs tracking-wider" style="color: var(--color-muted); font-family: var(--font-sans);">
								{exp.period}
							</span>
						</div>
					</div>

					{#if exp.details}
						<div
							class="grid transition-all duration-500 ease-out"
							style="grid-template-rows: {expandedIndex === index ? '1fr' : '0fr'};"
						>
							<div class="overflow-hidden">
								<p class="text-sm leading-relaxed pt-4 md:pl-24" style="color: var(--color-text-secondary);">
									{exp.details}
								</p>
							</div>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>
