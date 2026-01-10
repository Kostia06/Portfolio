<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { isMobile } from '$stores/app';
	import MagneticButton from './MagneticButton.svelte';

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	let headerEl: HTMLElement;

	const navLinks = [
		{ href: '#work', label: 'Work' },
		{ href: '#about', label: 'About' },
		{ href: '#contact', label: 'Contact' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		document.body.style.overflow = '';
	}

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	bind:this={headerEl}
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
	class:scrolled={isScrolled}
>
	<div class="container">
		<nav class="flex items-center justify-between h-20 md:h-24">
			<!-- Logo -->
			<a
				href="/"
				class="relative z-50 font-display text-xl md:text-2xl font-bold tracking-tight"
				data-cursor="pointer"
				data-cursor-text="Home"
			>
				<span class="text-[var(--color-text)]">Kos</span>
				<span class="text-[var(--color-accent)]">.</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-12">
				{#each navLinks as link}
					<MagneticButton>
						<a
							href={link.href}
							class="nav-link relative text-sm font-medium uppercase tracking-widest text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300"
							data-cursor="pointer"
						>
							{link.label}
						</a>
					</MagneticButton>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMenu}
				class="relative z-50 md:hidden w-12 h-12 flex items-center justify-center"
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				data-cursor="pointer"
			>
				<div class="relative w-6 h-4">
					<span
						class="absolute left-0 w-full h-[2px] bg-[var(--color-text)] transition-all duration-300 origin-center"
						class:rotate-45={isMenuOpen}
						class:translate-y-[7px]={isMenuOpen}
						style="top: 0;"
					></span>
					<span
						class="absolute left-0 w-full h-[2px] bg-[var(--color-text)] transition-all duration-300"
						class:opacity-0={isMenuOpen}
						style="top: 50%; transform: translateY(-50%);"
					></span>
					<span
						class="absolute left-0 w-full h-[2px] bg-[var(--color-text)] transition-all duration-300 origin-center"
						class:-rotate-45={isMenuOpen}
						class:-translate-y-[7px]={isMenuOpen}
						style="bottom: 0;"
					></span>
				</div>
			</button>
		</nav>
	</div>

	<!-- Mobile Menu Overlay -->
	{#if isMenuOpen}
		<div
			class="fixed inset-0 bg-[var(--color-bg)] z-40 flex flex-col justify-center items-center"
			role="dialog"
			aria-modal="true"
		>
			<nav class="flex flex-col items-center gap-8">
				{#each navLinks as link, i}
					<a
						href={link.href}
						onclick={closeMenu}
						class="text-4xl md:text-5xl font-display font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300"
						style="animation: slideIn 0.5s ease-out {i * 0.1}s both;"
						data-cursor="pointer"
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<!-- Social Links in Mobile Menu -->
			<div class="absolute bottom-12 flex items-center gap-8">
				<a
					href="https://github.com/Kostia06"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
					data-cursor="pointer"
				>
					GitHub
				</a>
				<a
					href="https://linkedin.com/in/kostiantyn-ilnytskyi"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
					data-cursor="pointer"
				>
					LinkedIn
				</a>
			</div>
		</div>
	{/if}
</header>

<style>
	.scrolled {
		background: rgba(0, 0, 0, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--color-border);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-accent);
		transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
