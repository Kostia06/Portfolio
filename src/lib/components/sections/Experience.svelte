<section
	id="experience"
	class="relative py-24 md:py-32 bg-[var(--color-bg-alt)]"
>
	<!-- Background decorative elements -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<!-- Gradient orbs -->
		<div class="absolute top-[10%] left-[5%] w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-[100px]"></div>
		<div class="absolute bottom-[10%] right-[10%] w-96 h-96 bg-[var(--color-accent)]/3 rounded-full blur-[120px]"></div>

		<!-- Grid pattern -->
		<div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px); background-size: 60px 60px;"></div>

		<!-- Diagonal lines -->
		<div class="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--color-accent)]/10 to-transparent"></div>
		<div class="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--color-border)]/20 to-transparent"></div>

		<!-- Corner accents -->
		<div class="hidden md:block absolute top-12 right-12 w-20 h-20 border-t border-r border-[var(--color-accent)]/20"></div>
		<div class="hidden md:block absolute bottom-12 left-12 w-20 h-20 border-b border-l border-[var(--color-accent)]/20"></div>

		<!-- Floating dots -->
		<div class="absolute top-[25%] right-[8%] w-2 h-2 rounded-full bg-[var(--color-accent)]/40"></div>
		<div class="absolute bottom-[30%] left-[12%] w-3 h-3 rounded-full bg-[var(--color-accent)]/20"></div>
		<div class="absolute top-[60%] right-[25%] w-1.5 h-1.5 rounded-full bg-[var(--color-text)]/10"></div>
	</div>

	<!-- Top & bottom border lines -->
	<div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>
	<div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>

	<div class="container relative z-10">
		<div class="max-w-2xl mx-auto text-center">
			<!-- Title -->
			<span class="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] font-mono">
				Experience
			</span>
			<h2 class="font-display text-3xl md:text-5xl font-bold text-[var(--color-text)] mt-2 mb-4">
				My Journey
			</h2>
			<p class="text-[var(--color-text-secondary)] text-lg mb-8">
				Explore my career path, skills, and the projects I've worked on.
			</p>

			<!-- CTA Button -->
			<a
				href="/about"
				class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/80 text-[var(--color-bg)] font-semibold rounded-full shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 hover:scale-105 transition-all duration-300 group"
				data-cursor="pointer"
			>
				<span>View Full Journey</span>
				<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>
			</a>
		</div>
	</div>
</section>
