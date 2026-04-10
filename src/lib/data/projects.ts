export interface Project {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	color: string;
	tags: string[];
	liveUrl?: string;
	screenshot?: string;
	previewVideo?: string;
	size: 'large' | 'medium' | 'small';
	achievement: string;
}

export const projects: Project[] = [
	{
		id: 1,
		title: 'mrblu',
		subtitle: 'Voice-to-Document SaaS',
		description:
			'Voice-to-invoice SaaS converting contractor voice memos into professional invoices using Gemini and Deepgram. Engineered Gemini-powered parser to extract clients, line items, and scheduling data. Shipped mobile-first app with React Native (Expo), real-time transcription, automated PDF generation and email delivery.',
		color: '#3b82f6',
		tags: ['React Native', 'Gemini AI', 'Expo'],
		liveUrl: 'https://mrblu.com',
		screenshot: '/screenshots/mrblu.webp',
		size: 'large',
		achievement: '100% Cost Reduction'
	},
	{
		id: 2,
		title: 'AI Ghost Hunter',
		subtitle: 'AI Reliability Testing',
		description:
			'Exposed "ghost organizations" — Canadian companies and services that AI chatbots invent with fabricated phone numbers, addresses, and staff. Built for the AiEO Visibility Challenge by TECHNATION Canada. Queried ChatGPT, Gemini, Claude, and Perplexity across hundreds of real-world questions, extracted the claimed org data via LLM, and auto-verified each against Google. Result: 49% of AI answers about Canadian orgs were unreliable.',
		color: '#ef4444',
		tags: ['Python', 'Multi-LLM', 'Anthropic'],
		liveUrl: 'https://ghost-hunter.dev',
		screenshot: '/screenshots/aighost.webp',
		size: 'medium',
		achievement: '49% AI Unreliable'
	},
	{
		id: 3,
		title: 'Respect The Technique',
		subtitle: 'Hakata Ramen E-Commerce',
		description:
			'Production e-commerce for an authentic Hakata-style ramen brand — shop ramen kits, book classes, and learn the craft of 18-hour broth. Built the full storefront, checkout with Stripe, order processing, inventory management, and an internal staff operations dashboard. Architected a scalable Cloudflare Workers backend serving 1,200+ monthly visitors and 5,000+ page views, with real-time order notifications.',
		color: '#ef4444',
		tags: ['Next.js', 'Supabase', 'Stripe'],
		liveUrl: 'https://respect-the-technique.ilnkostia-dev.workers.dev/',
		screenshot: '/screenshots/rtt.webp',
		size: 'large',
		achievement: '1,200+ Visitors/mo'
	},
	{
		id: 4,
		title: 'PR Pathway for Ukrainians',
		subtitle: 'Civic Advocacy Platform',
		description:
			'Official campaign site for the United Ukrainians of Canada Foundation helping 300,000 Ukrainian CUAET arrivals get a Permanent Residence pathway. Built a tool that lets any Canadian contact their Member of Parliament in seconds — riding lookup, pre-filled letters, multi-language support (EN/UK). Collaborated directly with foundation leadership. Privacy-first architecture with zero tracking, mobile-first, deployed on Cloudflare edge.',
		color: '#fbbf24',
		tags: ['React', 'Cloudflare', 'TypeScript'],
		liveUrl: 'https://help-ukraine-forms.com/en',
		screenshot: '/screenshots/helpukraine.webp',
		size: 'small',
		achievement: '300K Ukrainians'
	},
	{
		id: 13,
		title: 'Hive Roomies',
		subtitle: 'Roommate Coordination Platform',
		description:
			'Cross-platform app for everything that breaks a household: chores rotations, shared shopping lists, split expenses, group calendar, in-app chat, and subletter handoffs with auto-generated PDF agreements. Built on Next.js 16 + React 19, Supabase auth/SSR, Gemini AI for smart suggestions, Resend for transactional email, and Capacitor 8 to ship native iOS + Android alongside the web PWA. Shadcn/Radix UI, Tailwind v4, jsPDF for agreements, Recharts for expense analytics.',
		color: '#fbbf24',
		tags: ['Next.js', 'Supabase', 'Capacitor'],
		liveUrl: 'https://hive-roomies.com',
		screenshot: '/screenshots/hiveroomies.webp',
		size: 'medium',
		achievement: 'iOS + Android + Web'
	},
	// {
	// 	id: 5,
	// 	title: 'MockMind AI',
	// 	subtitle: 'Voice-Powered Interviews',
	// 	description:
	// 		'AI interview platform with real-time voice interaction using OpenAI Whisper for speech transcription. Features dynamic question generation, response analysis, and personalized feedback. Helps users practice technical and behavioral interviews with AI-powered coaching.',
	// 	color: '#6366f1',
	// 	tags: ['Next.js', 'OpenAI', 'Whisper'],
	// 	liveUrl: 'https://mock-mind.vercel.app/',
	// 	screenshot: '/screenshots/mockmind.webp',
	// 	size: 'medium',
	// 	achievement: 'AI-Powered'
	// },
	// {
	// 	id: 6,
	// 	title: 'Lingozo',
	// 	subtitle: 'AI Language Learning',
	// 	description:
	// 		'Language learning platform powered by Gemini 2.0 for AI conversations. Supports 15+ languages with vocabulary management, spaced repetition, and personalized learning paths. Real-time conversation practice with grammar correction and pronunciation tips.',
	// 	color: '#10b981',
	// 	tags: ['React', 'Gemini 2.0', 'PostgreSQL'],
	// 	liveUrl: 'https://lingozo.vercel.app/',
	// 	screenshot: '/screenshots/lingozo.webp',
	// 	size: 'medium',
	// 	achievement: '15+ Languages'
	// },
	{
		id: 7,
		title: 'Git Fight',
		subtitle: '80s Retro Battle Game',
		description:
			'Compare GitHub developers in retro-styled battles. Built with 1,700+ lines of vanilla JavaScript - zero frameworks. Features global PostgreSQL leaderboard, achievement system, and authentic 80s arcade aesthetics. Demonstrates deep JavaScript fundamentals and CSS mastery.',
		color: '#a855f7',
		tags: ['Vanilla JS', 'PostgreSQL', 'CSS'],
		liveUrl: 'https://www.git-fight.app/',
		screenshot: '/screenshots/gitfight.webp',
		size: 'small',
		achievement: 'Zero Frameworks'
	},
	{
		id: 8,
		title: 'Rustsol E-Commerce',
		subtitle: 'Lemmer Ltd.',
		description:
			'Complete e-commerce platform delivered for Lemmer Ltd. in just 6 weeks. Built product catalog, shopping cart, checkout flow, and admin dashboard. Achieved 30% efficiency boost in order processing through automated inventory management and streamlined fulfillment workflows.',
		color: '#06b6d4',
		tags: ['Next.js', 'Supabase', 'Stripe'],
		size: 'small',
		achievement: '+30% Efficiency'
	},
	{
		id: 9,
		title: "Rye's Collection",
		subtitle: 'Animated Showcase',
		description:
			'Beautifully animated collection showcase with admin management system. Features real-time Supabase database sync, drag-and-drop image uploads, and smooth Framer Motion animations. Single admin authentication with public viewing access for displaying collectibles.',
		color: '#f472b6',
		tags: ['Next.js', 'Supabase', 'Framer'],
		liveUrl: 'https://rye-boxes.com/',
		screenshot: '/screenshots/rye.webp',
		size: 'small',
		achievement: 'Full CRUD'
	},
	{
		id: 10,
		title: 'ShopLocal',
		subtitle: '1st Place Hackathon',
		description:
			'Led team of 6 developers to 1st place victory at Cultivator Hackathon. Built a local business discovery MVP connecting communities with nearby shops. Implemented geolocation-based search, business profiles, and customer reviews. Demonstrated strong leadership coordinating frontend, backend, and design teams under 48-hour deadline.',
		color: '#f59e0b',
		tags: ['PHP', 'MySQL', 'Leadership'],
		size: 'small',
		achievement: '1st Place'
	},
	{
		id: 11,
		title: 'Motion Capture',
		subtitle: '6th Place RBC Pitch',
		description:
			'Real-time body tracking system achieving sub-50ms response time. Built computer vision pipeline using OpenCV and MediaPipe for pose estimation. Placed 6th at RBC Innovation Pitch Competition. Applications include fitness tracking, physical therapy, and interactive gaming.',
		color: '#ec4899',
		tags: ['Python', 'OpenCV', 'MediaPipe'],
		size: 'small',
		achievement: '<50ms'
	},
	{
		id: 12,
		title: 'OMG Platform',
		subtitle: 'Multiplayer Gaming',
		description:
			'Served as UI Lead for multiplayer online board game developed by 30-person team. Designed and implemented responsive game interface, player dashboards, and real-time game state visualization. Coordinated with backend team for WebSocket integration and managed UI/UX decisions across multiple sprints.',
		color: '#8b5cf6',
		tags: ['Java', 'JavaFX', 'Team Lead'],
		size: 'small',
		achievement: 'UI Lead'
	}
];
