<script lang="ts">
	import { browser } from '$app/environment';
	import { activeSection } from '$lib/stores/app';
	import gsap from 'gsap';

	const NAV_LINKS = [
		{ href: '#work', id: 'work', label: 'Work' },
		{ href: '#expertise', id: 'expertise', label: 'Expertise' },
		{ href: '#experience', id: 'experience', label: 'Experience' },
		{ href: '#about', id: 'about', label: 'About' },
		{ href: '#contact', id: 'contact', label: 'Contact' }
	] as const;

	const OBSERVED_SECTIONS = ['hero', 'work', 'expertise', 'experience', 'about', 'contact'];
	const SCROLL_THRESHOLD = 100;

	let isScrolled = $state(false);
	let isMenuOpen = $state(false);
	let mobileOverlay: HTMLElement | undefined = $state();
	let mobileNavLinks: HTMLElement[] = $state([]);

	let headerClasses = $derived(
		isScrolled ? 'header header--scrolled' : 'header'
	);

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (!element) return;
		element.scrollIntoView({ behavior: 'smooth' });
	}

	function handleDesktopLinkClick(event: MouseEvent, sectionId: string) {
		event.preventDefault();
		scrollToSection(sectionId);
	}

	function handleMobileLinkClick(event: MouseEvent, sectionId: string) {
		event.preventDefault();
		isMenuOpen = false;
		document.body.style.overflow = '';
		scrollToSection(sectionId);
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		document.body.style.overflow = isMenuOpen ? 'hidden' : '';
	}

	$effect(() => {
		if (!browser) return;

		function handleScroll() {
			isScrolled = window.scrollY > SCROLL_THRESHOLD;
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	$effect(() => {
		if (!browser) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection.set(entry.target.id);
					}
				}
			},
			{ rootMargin: '-40% 0px -40% 0px', threshold: 0 }
		);

		for (const id of OBSERVED_SECTIONS) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			observer.disconnect();
		};
	});

	$effect(() => {
		if (!browser) return;
		if (!isMenuOpen) return;
		if (!mobileOverlay) return;

		const links = mobileOverlay.querySelectorAll('.mobile-nav__link');

		gsap.fromTo(
			links,
			{ y: 60, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.08,
				ease: 'power3.out',
				delay: 0.1
			}
		);
	});
</script>

<header class={headerClasses}>
	<div class="header__inner">
		<a
			href="/"
			class="header__logo"
			data-cursor="pointer"
		>
			Kostia Ilnytskyi
		</a>

		<nav class="desktop-nav">
			{#each NAV_LINKS as link (link.id)}
				<a
					href={link.href}
					class="desktop-nav__link"
					class:desktop-nav__link--active={$activeSection === link.id}
					data-cursor="pointer"
					onclick={(e) => handleDesktopLinkClick(e, link.id)}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<button
			class="hamburger"
			onclick={toggleMenu}
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			data-cursor="pointer"
		>
			<span
				class="hamburger__line"
				class:hamburger__line--top-open={isMenuOpen}
			></span>
			<span
				class="hamburger__line"
				class:hamburger__line--mid-open={isMenuOpen}
			></span>
			<span
				class="hamburger__line"
				class:hamburger__line--bot-open={isMenuOpen}
			></span>
		</button>
	</div>
</header>

{#if isMenuOpen}
	<div
		class="mobile-nav"
		bind:this={mobileOverlay}
		role="dialog"
		aria-modal="true"
	>
		<nav class="mobile-nav__list">
			{#each NAV_LINKS as link, i (link.id)}
				<a
					href={link.href}
					class="mobile-nav__link"
					class:mobile-nav__link--active={$activeSection === link.id}
					data-cursor="pointer"
					onclick={(e) => handleMobileLinkClick(e, link.id)}
					bind:this={mobileNavLinks[i]}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
{/if}

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition: background 0.3s ease, border-color 0.3s ease;
	}

	.header--scrolled {
		background: var(--color-bg);
		border-bottom-color: var(--color-border);
	}

	.header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 24px;
		height: 72px;
	}

	.header__logo {
		position: relative;
		z-index: 51;
		font-family: var(--font-serif);
		font-size: 18px;
		font-weight: 400;
		color: var(--color-text);
		text-decoration: none;
		letter-spacing: -0.01em;
	}

	/* Desktop nav */

	.desktop-nav {
		display: none;
		align-items: center;
		gap: 32px;
	}

	@media (min-width: 768px) {
		.desktop-nav {
			display: flex;
		}
	}

	.desktop-nav__link {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.desktop-nav__link:hover {
		color: var(--color-text);
	}

	.desktop-nav__link--active {
		color: var(--color-accent);
	}

	/* Hamburger */

	.hamburger {
		position: relative;
		z-index: 51;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		width: 44px;
		height: 44px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	@media (min-width: 768px) {
		.hamburger {
			display: none;
		}
	}

	.hamburger__line {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--color-text);
		transition: transform 0.3s ease, opacity 0.3s ease;
		transform-origin: center;
	}

	.hamburger__line--top-open {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger__line--mid-open {
		opacity: 0;
	}

	.hamburger__line--bot-open {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Mobile nav overlay */

	.mobile-nav {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg);
	}

	.mobile-nav__list {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
	}

	.mobile-nav__link {
		font-family: var(--font-serif);
		font-size: 36px;
		font-weight: 400;
		color: var(--color-muted);
		text-decoration: none;
		opacity: 0;
		transition: color 0.3s ease;
	}

	.mobile-nav__link:hover {
		color: var(--color-text);
	}

	.mobile-nav__link--active {
		color: var(--color-accent);
	}
</style>
