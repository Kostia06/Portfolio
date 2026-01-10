<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import '../app.css';
	import PageLoader from '$ui/PageLoader.svelte';
	import CustomCursor from '$ui/CustomCursor.svelte';
	import { isMobile, isLoading } from '$stores/app';

	let { children } = $props();
	let lenis: Lenis | null = null;

	onMount(() => {
		if (browser && !$isMobile) {
			lenis = new Lenis({
				duration: 1.0,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: 'vertical',
				gestureOrientation: 'vertical',
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 2,
				infinite: false
			});

			lenis.scrollTo(0, { immediate: true });

			// Use GSAP ticker for smoother animation
			gsap.ticker.add((time) => {
				lenis?.raf(time * 1000);
			});

			gsap.ticker.lagSmoothing(0);

			document.documentElement.classList.add('lenis', 'lenis-smooth');
		}
	});

	onDestroy(() => {
		if (lenis) {
			gsap.ticker.remove(lenis.raf);
			lenis.destroy();
		}
	});
</script>

<svelte:head>
	<title>Kos | Full Stack Developer</title>
	<meta name="description" content="Kostiantyn Ilnytskyi - Full Stack Developer based in Calgary, AB. Building performant web applications with React, Next.js, SvelteKit, and modern technologies." />

	<!-- Viewport with proper mobile settings -->
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" />

	<!-- Theme and appearance -->
	<meta name="theme-color" content="#000000" />
	<meta name="color-scheme" content="dark" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />

	<!-- SEO -->
	<meta name="author" content="Kostiantyn Ilnytskyi" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://kos.dev" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Kos | Full Stack Developer" />
	<meta property="og:description" content="Full Stack Developer based in Calgary, AB. Building performant web applications." />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Kos | Full Stack Developer" />
	<meta name="twitter:description" content="Full Stack Developer based in Calgary, AB." />
</svelte:head>

<!-- Page Loader -->
<PageLoader />

<!-- Custom Cursor (desktop only) -->
<CustomCursor />

<!-- Noise overlay for texture -->
<div class="noise-overlay"></div>

<!-- Main Content -->
{@render children()}
