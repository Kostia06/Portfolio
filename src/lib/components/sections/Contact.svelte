<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { isMobile } from '$stores/app';

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
					toggleActions: 'play none none reverse'
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
					toggleActions: 'play none none reverse'
				}
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<section
	id="contact"
	class="py-24 md:py-40 relative"
	style="background: var(--color-bg);"
>
	<div class="container">
		<div class="max-w-3xl">
			<!-- Header -->
			<div bind:this={titleEl} class="mb-12 md:mb-16">
				<p class="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">Contact</p>
				<h2 class="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
					Say<br />
					<span class="text-[var(--color-muted)]">hello.</span>
				</h2>
			</div>

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
					class="mt-3 inline-flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
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
			<div class="flex gap-6">
				{#each socialLinks as link (link.label)}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
						data-cursor="pointer"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
