<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { expertise } from '$data/expertise';

	let expandedIndex = $state<number | null>(null);
	let sectionEl: HTMLElement;

	function toggleExpand(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}

	onMount(() => {
		if (!browser) return;
		gsap.registerPlugin(ScrollTrigger);

		const cards = sectionEl.querySelectorAll('.expertise-card');
		gsap.fromTo(
			cards,
			{ opacity: 0, y: 60 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 75%'
				}
			}
		);
	});
</script>

<section id="expertise" class="section-lg" style="background: var(--color-bg);" bind:this={sectionEl}>
	<div class="container">
		<div class="mb-6">
			<span class="section-number">03 / Expertise</span>
		</div>
		<h2 class="section-heading mb-4">My Expertise</h2>
		<div class="divider mb-12 md:mb-16"></div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
			{#each expertise as item, index (item.number)}
				<button
					class="expertise-card text-left border border-[var(--color-border)] p-6 md:p-8 transition-colors duration-300 hover:border-[var(--color-border-dark)]"
					data-cursor="pointer"
					onclick={() => toggleExpand(index)}
				>
					<span class="block text-5xl md:text-6xl font-light mb-4" style="font-family: var(--font-serif); color: var(--color-border-dark);">
						{item.number}
					</span>
					<h3 class="text-xl md:text-2xl mb-3" style="font-family: var(--font-serif); color: var(--color-text);">
						{item.title}
					</h3>

					<div
						class="grid transition-all duration-500 ease-out"
						style="grid-template-rows: {expandedIndex === index ? '1fr' : '0fr'};"
					>
						<div class="overflow-hidden">
							<p class="text-sm leading-relaxed mb-4" style="color: var(--color-text-secondary);">
								{item.description}
							</p>
							<div class="flex flex-wrap gap-2">
								{#each item.technologies as tech (tech)}
									<span class="text-xs px-3 py-1 border border-[var(--color-border)] text-[var(--color-muted)] uppercase tracking-wider">
										{tech}
									</span>
								{/each}
							</div>
						</div>
					</div>

					<div class="flex items-center gap-2 mt-4">
						<span class="text-xs uppercase tracking-widest" style="color: var(--color-muted);">
							{expandedIndex === index ? 'Close' : 'Learn more'}
						</span>
						<svg
							class="w-3 h-3 transition-transform duration-300"
							style="color: var(--color-muted); transform: rotate({expandedIndex === index ? '180deg' : '0deg'});"
							fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>
