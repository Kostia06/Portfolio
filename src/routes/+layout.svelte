<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Lenis from 'lenis';
	import '../app.css';
	import PageLoader from '$ui/PageLoader.svelte';
	import CustomCursor from '$ui/CustomCursor.svelte';
	import EasterEggs from '$ui/EasterEggs.svelte';
	import { isMobile, isLoading } from '$stores/app';

	let { children } = $props();
	let lenis: Lenis | null = null;

	onMount(() => {
		if (browser && !$isMobile) {
			lenis = new Lenis({
				duration: 1.2,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: 'vertical',
				gestureOrientation: 'vertical',
				smoothWheel: true
			});

			lenis.scrollTo(0, { immediate: true });

			function raf(time: number) {
				lenis?.raf(time);
				requestAnimationFrame(raf);
			}

			requestAnimationFrame(raf);
			document.documentElement.classList.add('lenis', 'lenis-smooth');
		}
	});

	onDestroy(() => {
		lenis?.destroy();
	});
</script>

<svelte:head>
	<title>Kos | Full Stack Developer</title>
	<meta name="description" content="Kostiantyn Ilnytskyi - Full Stack Developer based in Calgary, AB. Building performant web applications with React, Next.js, SvelteKit, and modern technologies." />

	<!-- Viewport with proper mobile settings -->
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" />

	<!-- Theme and appearance -->
	<meta name="theme-color" content="#0a0a0a" />
	<meta name="color-scheme" content="dark" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

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

	<!-- Font preloading for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

	<!-- Preload critical resources -->
	<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
</svelte:head>

<!-- Page Loader -->
<PageLoader />

<!-- Custom Cursor (desktop only) -->
<CustomCursor />

<!-- Easter Eggs -->
<EasterEggs />

<!-- Main Content -->
{@render children()}
