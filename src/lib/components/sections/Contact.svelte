<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let sectionEl: HTMLElement;

	const email = 'Ilnkostia@gmail.com';

	const socialLinks = [
		{ href: 'https://github.com/Kostia06', label: 'GitHub' },
		{ href: 'https://www.linkedin.com/in/kostia-ilnytskyi', label: 'LinkedIn' }
	];

	let copiedEmail = $state(false);

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

		const elements = sectionEl.querySelectorAll('.contact-reveal');
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
					start: 'top 80%'
				}
			}
		);
	});
</script>

<section id="contact" class="section-lg" style="background: var(--color-bg);" bind:this={sectionEl}>
	<div class="container">
		<div class="mb-6 contact-reveal">
			<span class="section-number">06 / Contact</span>
		</div>
		<h2 class="section-heading mb-4 contact-reveal">Get in Touch</h2>
		<div class="divider mb-12 md:mb-16"></div>

		<div class="max-w-3xl">
			<p class="text-lg md:text-xl leading-relaxed mb-10 contact-reveal" style="color: var(--color-text-secondary);">
				Have a project in mind or just want to say hello? I'm always open to discussing new opportunities and ideas.
			</p>

			<!-- Email -->
			<div class="mb-12 contact-reveal">
				<a
					href="mailto:{email}"
					class="group inline-flex items-center gap-3 hover:text-[var(--color-accent)] transition-colors"
					style="font-family: var(--font-serif); font-size: var(--text-3xl); color: var(--color-text);"
					data-cursor="pointer"
				>
					<span>{email}</span>
					<svg
						class="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
						fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
					</svg>
				</a>

				<button
					onclick={copyEmail}
					class="mt-3 block text-xs uppercase tracking-widest hover:text-[var(--color-text)] transition-colors"
					style="color: var(--color-muted);"
					data-cursor="pointer"
				>
					{#if copiedEmail}
						<span style="color: #22c55e;">Copied</span>
					{:else}
						<span>Copy email</span>
					{/if}
				</button>
			</div>

			<!-- Social links -->
			<div class="flex gap-8 contact-reveal">
				{#each socialLinks as link (link.label)}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="link-underline text-sm uppercase tracking-widest hover:text-[var(--color-text)] transition-colors"
						style="color: var(--color-muted);"
						data-cursor="pointer"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Available marquee -->
	<div class="mt-20 md:mt-28 border-t border-b border-[var(--color-border)] py-4 overflow-hidden">
		<div class="marquee">
			<div class="marquee-content gap-12">
				{#each Array(8) as _}
					<span class="text-sm uppercase tracking-[0.3em] whitespace-nowrap" style="color: var(--color-muted);">
						Available for Work
					</span>
					<span style="color: var(--color-accent);">&#x2022;</span>
				{/each}
			</div>
			<div class="marquee-content gap-12" aria-hidden="true">
				{#each Array(8) as _}
					<span class="text-sm uppercase tracking-[0.3em] whitespace-nowrap" style="color: var(--color-muted);">
						Available for Work
					</span>
					<span style="color: var(--color-accent);">&#x2022;</span>
				{/each}
			</div>
		</div>
	</div>
</section>
