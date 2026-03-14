<script lang="ts">
	import { onMount } from 'svelte';
	import { isMobile } from '$stores/app';

	const sections = [
		{ id: 'hero', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'contact', label: 'Contact' }
	];

	let activeSection = $state('hero');
	let isVisible = $state(false);
	let hoveredSection = $state<string | null>(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
						activeSection = entry.target.id;
					}
				});
			},
			{ threshold: [0.3, 0.5, 0.7] }
		);

		sections.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		// Show after initial load
		setTimeout(() => {
			isVisible = true;
		}, 3500);

		// Hide when at top
		const handleScroll = () => {
			isVisible = window.scrollY > 200;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

{#if !$isMobile && isVisible}
	<nav
		class="nav-dots"
		class:visible={isVisible}
		aria-label="Section navigation"
	>
		{#each sections as section}
			<button
				class="dot-container"
				class:active={activeSection === section.id}
				onclick={() => scrollTo(section.id)}
				onmouseenter={() => hoveredSection = section.id}
				onmouseleave={() => hoveredSection = null}
				aria-label="Go to {section.label}"
				aria-current={activeSection === section.id ? 'true' : undefined}
			>
				<span
					class="label"
					class:show={hoveredSection === section.id}
				>
					{section.label}
				</span>
				<span class="dot">
					<span class="dot-inner"></span>
				</span>
			</button>
		{/each}

		<!-- Progress line -->
		<div class="progress-track">
			<div
				class="progress-fill"
				style="height: {(sections.findIndex(s => s.id === activeSection) / (sections.length - 1)) * 100}%"
			></div>
		</div>
	</nav>
{/if}

<style>
	.nav-dots {
		position: fixed;
		right: 2rem;
		top: 50%;
		transform: translateY(-50%);
		z-index: 100;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.nav-dots.visible {
		opacity: 1;
	}

	.dot-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.label {
		position: absolute;
		right: 2rem;
		white-space: nowrap;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--muted-foreground);
		background: var(--card);
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		opacity: 0;
		transform: translateX(10px);
		transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		pointer-events: none;
		border: 1px solid var(--border);
	}

	.label.show {
		opacity: 1;
		transform: translateX(0);
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--muted);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		z-index: 2;
	}

	.dot-inner {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--muted-foreground);
		transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.dot-container:hover .dot {
		transform: scale(1.3);
		background: var(--accent);
	}

	.dot-container:hover .dot-inner {
		background: white;
	}

	.dot-container.active .dot {
		background: var(--accent);
		box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
	}

	.dot-container.active .dot-inner {
		background: white;
		width: 6px;
		height: 6px;
	}

	.progress-track {
		position: absolute;
		right: 5px;
		top: 6px;
		bottom: 6px;
		width: 2px;
		background: var(--border);
		border-radius: 1px;
		z-index: 1;
	}

	.progress-fill {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background: linear-gradient(to bottom, var(--accent), var(--accent-secondary));
		border-radius: 1px;
		transition: height 0.5s cubic-bezier(0.23, 1, 0.32, 1);
	}
</style>
