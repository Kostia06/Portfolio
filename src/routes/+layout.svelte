<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Lenis from 'lenis';
	import '../app.css';
	import CustomCursor from '$ui/CustomCursor.svelte';
	import { isMobile } from '$stores/app';

	let { children } = $props();
	let lenis: Lenis | null = null;

	onMount(() => {
		if (browser && !$isMobile) {
			lenis = new Lenis({
				lerp: 0.1,
				wheelMultiplier: 0.8,
				touchMultiplier: 1.5,
				infinite: false
			});

			// Respect hash navigation: if the URL has a hash (e.g. /#contact),
			// scroll to that element instead of snapping to the top. This lets
			// cross-page links like "Back to Home" land at a specific section.
			const hash = window.location.hash;
			if (hash) {
				const target = document.querySelector(hash);
				if (target) {
					// Wait a frame so the target is laid out, then jump immediately.
					requestAnimationFrame(() => {
						lenis?.scrollTo(target as HTMLElement, { immediate: true, offset: 0 });
					});
				} else {
					lenis.scrollTo(0, { immediate: true });
				}
			} else {
				lenis.scrollTo(0, { immediate: true });
			}

			// Use requestAnimationFrame for smooth scrolling
			function raf(time: number) {
				lenis?.raf(time);
				requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);

			document.documentElement.classList.add('lenis', 'lenis-smooth');
		}
	});

	onDestroy(() => {
		if (lenis) {
			lenis.destroy();
		}
	});
</script>

<svelte:head>
	<title>Kos</title>
	<meta name="description" content="Kostiantyn Ilnytskyi - Full Stack Developer based in Calgary, AB. Building performant web applications with React, Next.js, SvelteKit, and modern technologies." />

	<meta name="color-scheme" content="dark" />

	<!-- SEO -->
	<meta name="author" content="Kostiantyn Ilnytskyi" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://kos.dev" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Kos" />
	<meta property="og:description" content="Full Stack Developer based in Calgary, AB. Building performant web applications." />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Kos" />
	<meta name="twitter:description" content="Full Stack Developer based in Calgary, AB." />
</svelte:head>

<!-- Custom Cursor (desktop only) -->
<CustomCursor />

<!-- Main Content -->
{@render children()}
