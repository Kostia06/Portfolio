import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Mobile detection store
function createIsMobileStore() {
	const { subscribe, set } = writable(false);

	if (browser) {
		const check = () => set(window.innerWidth < 768);
		check();
		window.addEventListener('resize', check);
	}

	return { subscribe };
}

// Prefers reduced motion store
function createPrefersReducedMotionStore() {
	const { subscribe, set } = writable(false);

	if (browser) {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		set(mediaQuery.matches);
		mediaQuery.addEventListener('change', (e) => set(e.matches));
	}

	return { subscribe };
}

// Touch device detection
function createIsTouchDeviceStore() {
	const { subscribe, set } = writable(true);

	if (browser) {
		const check = () => {
			const isMobile = window.matchMedia('(max-width: 767px)').matches;
			const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
			set(isMobile || hasCoarsePointer);
		};
		check();
		window.addEventListener('resize', check);
	}

	return { subscribe };
}

export const isMobile = createIsMobileStore();
export const prefersReducedMotion = createPrefersReducedMotionStore();
export const isTouchDevice = createIsTouchDeviceStore();

// Page loading state
export const isLoading = writable(true);

// Animation complete state (for hero entrance)
export const animationComplete = writable(false);
