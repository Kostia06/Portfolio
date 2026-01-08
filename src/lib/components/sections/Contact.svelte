<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';

	interface Message {
		id: number;
		type: 'received' | 'sent';
		text: string;
		time: string;
	}

	const MAX_MESSAGES = 8;

	const initialMessages: Message[] = [
		{
			id: 1,
			type: 'received',
			text: "Hey! What's your name?",
			time: 'Now'
		}
	];

	let sectionEl: HTMLElement | undefined = $state();
	let messagesEndEl: HTMLDivElement | undefined = $state();
	let messages = $state<Message[]>(initialMessages);
	let inputValue = $state('');
	let isSending = $state(false);
	let userName = $state('');
	let step = $state<'name' | 'chat' | 'done'>('name');
	let messageCount = $state(0);
	let isInView = $state(false);

	let copiedIndex = $state<number | null>(null);

	const contacts = [
		{ href: 'mailto:Ilnkostia@gmail.com', icon: '✉️', label: 'Email', value: 'Ilnkostia@gmail.com', copyable: true },
		{ href: 'tel:+13683990601', icon: '📱', label: 'Phone', value: '+1 (368) 399-0601', copyable: true },
		{
			href: 'https://github.com/Kostia06',
			icon: '🐙',
			label: 'GitHub',
			value: '@Kostia06',
			external: true
		},
		{
			href: 'https://linkedin.com/in/kostiantyn-ilnytskyi',
			icon: '💼',
			label: 'LinkedIn',
			value: 'Kostiantyn Ilnytskyi',
			external: true
		}
	];

	async function handleCopy(text: string, index: number) {
		try {
			await navigator.clipboard.writeText(text);
			copiedIndex = index;
			setTimeout(() => {
				copiedIndex = null;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isInView = entry.isIntersecting;
				});
			},
			{ rootMargin: '-20%' }
		);

		if (sectionEl) observer.observe(sectionEl);

		return () => observer.disconnect();
	});

	function scrollToBottom() {
		messagesEndEl?.scrollIntoView({ behavior: 'smooth' });
	}

	$effect(() => {
		if (messages.length) scrollToBottom();
	});

	function getCurrentTime() {
		return new Date().toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	function addMessage(text: string, type: 'sent' | 'received') {
		const newMessage: Message = {
			id: Date.now(),
			type,
			text,
			time: getCurrentTime()
		};
		messages = [...messages, newMessage];
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!inputValue.trim() || step === 'done' || isSending) return;

		const userInput = inputValue.trim();
		inputValue = '';
		addMessage(userInput, 'sent');
		isSending = true;

		const newCount = messageCount + 1;
		messageCount = newCount;

		try {
			const conversationHistory = messages
				.filter((m) => m.id !== 1)
				.map((m) => ({ role: m.type, text: m.text }));

			// For first message, tell AI this is their name
			const messageToSend = step === 'name' ? `My name is ${userInput}` : userInput;

			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: messageToSend, conversationHistory })
			});

			const data = await response.json();
			addMessage(data.reply, 'received');

			if (step === 'name') {
				userName = userInput;
				step = 'chat';
			}

			// Check if limit reached
			if (newCount >= MAX_MESSAGES) {
				await new Promise((resolve) => setTimeout(resolve, 800));
				addMessage("That's all for now! For longer chats, email me:", 'received');
				step = 'done';
			}
		} catch {
			addMessage('Oops! Email me instead: Ilnkostia@gmail.com', 'received');
		}

		isSending = false;
	}

	function getPlaceholder() {
		if (step === 'name') return 'Enter your name...';
		if (step === 'done') return 'Chat limit reached';
		return `Message (${MAX_MESSAGES - messageCount} left)...`;
	}
</script>

<section
	bind:this={sectionEl}
	id="contact"
	class="relative min-h-screen py-24 md:py-32 px-4 md:px-6 overflow-hidden"
	style="background: var(--section-contact);"
>
	<div class="max-w-5xl mx-auto">
		<!-- Section Header -->
		{#if isInView}
			<div
				class="text-center mb-12 md:mb-16"
				in:fly={{ y: 30, duration: 600, easing: (t) => t * (2 - t) }}
			>
				<span class="text-[var(--accent)] font-mono text-sm mb-4 block"> Get In Touch </span>
				<h2 class="text-4xl md:text-6xl lg:text-7xl font-bold">
					Let's <span class="gradient-text">Connect</span>
				</h2>
				<p class="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
					Chat with me or reach out directly.
				</p>
			</div>
		{/if}

		<!-- iMessage Container -->
		{#if isInView}
			<div
				class="glass rounded-3xl overflow-hidden max-w-3xl mx-auto"
				in:fly={{ y: 50, duration: 600, delay: 150, easing: (t) => t * (2 - t) }}
			>
				<!-- iMessage Header -->
				<div
					class="bg-[var(--muted)] px-6 py-4 flex items-center gap-4 border-b border-[var(--border)]"
				>
					<div
						class="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-xl font-bold"
					>
						K
					</div>
					<div class="flex-1">
						<h3 class="font-semibold text-lg">Kos</h3>
						<p class="text-xs text-[var(--muted-foreground)]">
							{step === 'chat' ? 'AI-powered replies' : step === 'done' ? 'Chat ended' : 'Available'}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
						<span class="text-xs text-green-500">Online</span>
					</div>
				</div>

				<!-- Messages Container -->
				<div class="h-[320px] overflow-y-auto p-6 space-y-4">
					{#each messages as message (message.id)}
						<div
							class="flex {message.type === 'sent' ? 'justify-end' : 'justify-start'}"
							in:fly={{ y: 20, duration: 300 }}
						>
							<div
								class="max-w-[85%] {message.type === 'sent'
									? 'bg-[var(--accent)] rounded-2xl rounded-br-md'
									: 'bg-[var(--muted)] rounded-2xl rounded-bl-md'} px-5 py-3"
							>
								<p class="text-sm md:text-base leading-relaxed">{message.text}</p>
								<p
									class="text-[10px] mt-1.5 {message.type === 'sent'
										? 'text-white/60'
										: 'text-[var(--muted-foreground)]'}"
								>
									{message.time}
								</p>
							</div>
						</div>
					{/each}

					<!-- Email link button -->
					{#if step === 'done'}
						<div class="flex justify-start" in:fly={{ y: 10, duration: 300 }}>
							<a
								href="mailto:Ilnkostia@gmail.com"
								class="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-secondary)] text-white rounded-full px-5 py-3 text-sm font-medium transition-all"
							>
								<svg
									class="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								Ilnkostia@gmail.com
							</a>
						</div>
					{/if}

					<!-- Typing indicator -->
					{#if isSending}
						<div class="flex justify-start" in:fly={{ y: 10, duration: 200 }}>
							<div class="bg-[var(--muted)] rounded-2xl rounded-bl-md px-5 py-3">
								<div class="flex gap-1.5">
									<div class="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"></div>
									<div
										class="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"
										style="animation-delay: 0.2s;"
									></div>
									<div
										class="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"
										style="animation-delay: 0.4s;"
									></div>
								</div>
							</div>
						</div>
					{/if}
					<div bind:this={messagesEndEl}></div>
				</div>

				<!-- Input Area -->
				<form
					onsubmit={handleSubmit}
					class="p-4 md:p-5 border-t border-[var(--border)] flex gap-3 items-center"
				>
					<input
						type="text"
						bind:value={inputValue}
						placeholder={getPlaceholder()}
						disabled={step === 'done'}
						class="flex-1 bg-[var(--muted)] rounded-full px-6 py-3.5 text-base outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						data-cursor="pointer"
					/>
					<button
						type="submit"
						disabled={step === 'done' || !inputValue.trim() || isSending}
						class="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-[var(--accent-secondary)] active:scale-95"
						data-cursor="pointer"
						aria-label="Send message"
					>
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					</button>
				</form>
			</div>
		{/if}

		<!-- Direct Contact Options -->
		{#if isInView}
			<div
				class="mt-10 md:mt-16 text-center px-4"
				in:fly={{ y: 30, duration: 600, delay: 300, easing: (t) => t * (2 - t) }}
			>
				<p class="text-[var(--muted-foreground)] mb-6 md:mb-8 text-base md:text-lg">
					Or reach out directly:
				</p>
				<div class="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6">
					{#each contacts as contact, i}
						<div
							class="relative flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 glass rounded-xl md:rounded-2xl hover:border-[var(--accent)] transition-all duration-300 group"
							in:fly={{ y: 20, duration: 500, delay: 400 + i * 80 }}
						>
							<a
								href={contact.href}
								target={contact.external ? '_blank' : undefined}
								rel={contact.external ? 'noopener noreferrer' : undefined}
								class="flex items-center gap-3"
								data-cursor="pointer"
							>
								<span class="text-xl md:text-2xl">{contact.icon}</span>
								<div class="text-left">
									<div class="text-[10px] md:text-xs text-[var(--muted-foreground)]">
										{contact.label}
									</div>
									<div
										class="text-sm md:text-base font-medium group-hover:text-[var(--accent)] transition-colors"
									>
										{contact.value}
									</div>
								</div>
							</a>
							{#if contact.copyable}
								<button
									onclick={(e) => { e.stopPropagation(); handleCopy(contact.value, i); }}
									class="ml-2 p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
									aria-label="Copy {contact.label}"
									data-cursor="pointer"
								>
									{#if copiedIndex === i}
										<svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
										</svg>
									{:else}
										<svg class="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
									{/if}
								</button>
							{/if}
							<!-- Copied tooltip -->
							{#if copiedIndex === i}
								<div
									class="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs rounded-full"
									in:fly={{ y: 5, duration: 200 }}
									out:fade={{ duration: 150 }}
								>
									Copied!
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Background decoration -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<div
			class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-5 rounded-full blur-[200px]"
		></div>
	</div>
</section>
