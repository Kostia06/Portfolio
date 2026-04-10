<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';

	let sectionEl: HTMLElement;
	let titleEl: HTMLElement;
	let emailEl: HTMLElement;

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

		if (titleEl && !$isMobile) {
			gsap.from(titleEl, {
				y: 60,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: titleEl,
					start: 'top 85%',
					toggleActions: 'play none none none'
				}
			});
		}

		if (emailEl && !$isMobile) {
			gsap.from(emailEl, {
				y: 40,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: emailEl,
					start: 'top 85%',
					toggleActions: 'play none none none'
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
	id="contact"
	class="py-24 md:py-40 relative overflow-hidden"
	style="background: var(--color-bg);"
>

	<div class="container relative z-10">
		<div class="max-w-3xl">
			<!-- Header -->
			<div bind:this={titleEl} class="mb-12 md:mb-16">
				<p class="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">Get in Touch</p>
				<h2 class="font-display text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tighter">
					Let's create<br />
					<span class="italic text-[var(--color-accent)]">something</span> together.
				</h2>
			</div>

			<!-- Separator -->
			<div class="w-16 h-[1px] bg-[var(--color-accent)] mb-10"></div>

			<!-- Email -->
			<div bind:this={emailEl} class="mb-16">
				<a
					href="mailto:{email}"
					class="group inline-flex items-center gap-3 text-lg md:text-2xl font-display font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
					data-cursor="pointer"
				>
					<span>{email}</span>
					<svg
						class="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
					</svg>
				</a>

				<button
					onclick={copyEmail}
					class="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
					data-cursor="pointer"
				>
					{#if copiedEmail}
						<span class="text-green-500">Copied</span>
					{:else}
						<span>Copy email</span>
					{/if}
				</button>
			</div>

			<!-- Links -->
			<div class="flex flex-wrap gap-3 md:gap-4">
				<a
					href="/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="contact-pill"
					data-cursor="pointer"
					aria-label="Download résumé (PDF)"
				>
					<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
					</svg>
					<span>Résumé</span>
				</a>

				<a
					href="https://github.com/Kostia06"
					target="_blank"
					rel="noopener noreferrer"
					class="contact-pill"
					data-cursor="pointer"
					aria-label="GitHub profile"
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.01-.4s2.05.13 3.01.4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58C20.57 22.29 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z"/>
					</svg>
					<span>GitHub</span>
				</a>

				<a
					href="https://www.linkedin.com/in/kostia-ilnytskyi"
					target="_blank"
					rel="noopener noreferrer"
					class="contact-pill"
					data-cursor="pointer"
					aria-label="LinkedIn profile"
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 11.01-4.14 2.07 2.07 0 01-.01 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
					</svg>
					<span>LinkedIn</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.75rem 1.25rem;
		border-radius: 9999px;
		border: 1px solid var(--color-border);
		color: var(--color-text);
		font-size: 0.8125rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.contact-pill:hover {
		border-color: var(--color-text);
		background: var(--color-text);
		color: var(--color-bg);
		transform: translateY(-1px);
	}
</style>
