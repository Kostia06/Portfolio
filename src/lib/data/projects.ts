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
		title: 'Respect The Technique',
		subtitle: 'Full Stack E-Commerce',
		description:
			'Production e-commerce platform with integrated employee operations system. Built complete inventory management, order processing, and staff scheduling. Architected scalable backend serving 1,200+ monthly visitors and 5,000+ page views. Implemented Stripe payments and real-time notifications.',
		color: '#ef4444',
		tags: ['Next.js', 'Supabase', 'Stripe'],
		liveUrl: 'https://rtt-lime.vercel.app/',
		screenshot: '/screenshots/rtt.png',
		size: 'large',
		achievement: '1,200+ Visitors/mo'
	},
	{
		id: 2,
		title: 'MockMind AI',
		subtitle: 'Voice-Powered Interviews',
		description:
			'AI interview platform with real-time voice interaction using OpenAI Whisper for speech transcription. Features dynamic question generation, response analysis, and personalized feedback. Helps users practice technical and behavioral interviews with AI-powered coaching.',
		color: '#6366f1',
		tags: ['Next.js', 'OpenAI', 'Whisper'],
		liveUrl: 'https://mock-mind.vercel.app/',
		screenshot: '/screenshots/mockmind.png',
		size: 'medium',
		achievement: 'AI-Powered'
	},
	{
		id: 3,
		title: 'Lingozo',
		subtitle: 'AI Language Learning',
		description:
			'Language learning platform powered by Gemini 2.0 for AI conversations. Supports 15+ languages with vocabulary management, spaced repetition, and personalized learning paths. Real-time conversation practice with grammar correction and pronunciation tips.',
		color: '#10b981',
		tags: ['React', 'Gemini 2.0', 'PostgreSQL'],
		liveUrl: 'https://lingozo.vercel.app/',
		screenshot: '/screenshots/lingozo.png',
		size: 'medium',
		achievement: '15+ Languages'
	},
	{
		id: 4,
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
		id: 5,
		title: 'OMG Platform',
		subtitle: 'Multiplayer Gaming',
		description:
			'Served as UI Lead for multiplayer online board game developed by 30-person team. Designed and implemented responsive game interface, player dashboards, and real-time game state visualization. Coordinated with backend team for WebSocket integration and managed UI/UX decisions across multiple sprints.',
		color: '#8b5cf6',
		tags: ['Java', 'JavaFX', 'Team Lead'],
		size: 'small',
		achievement: 'UI Lead'
	},
	{
		id: 6,
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
		id: 7,
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
		id: 8,
		title: "Rye's Collection",
		subtitle: 'Animated Showcase',
		description:
			'Beautifully animated collection showcase with admin management system. Features real-time Supabase database sync, drag-and-drop image uploads, and smooth Framer Motion animations. Single admin authentication with public viewing access for displaying collectibles.',
		color: '#f472b6',
		tags: ['Next.js', 'Supabase', 'Framer'],
		liveUrl: 'https://rye-boxes.com/',
		screenshot: '/screenshots/rye.png',
		size: 'small',
		achievement: 'Full CRUD'
	},
	{
		id: 9,
		title: 'Git Fight',
		subtitle: '80s Retro Battle Game',
		description:
			'Compare GitHub developers in retro-styled battles. Built with 1,700+ lines of vanilla JavaScript - zero frameworks. Features global PostgreSQL leaderboard, achievement system, and authentic 80s arcade aesthetics. Demonstrates deep JavaScript fundamentals and CSS mastery.',
		color: '#a855f7',
		tags: ['Vanilla JS', 'PostgreSQL', 'CSS'],
		liveUrl: 'https://www.git-fight.app/',
		screenshot: '/screenshots/gitfight.png',
		size: 'small',
		achievement: 'Zero Frameworks'
	},
	{
		id: 10,
		title: 'Help Ukraine Forms',
		subtitle: 'Advocacy Platform',
		description:
			'Platform enabling Canadians to contact Members of Parliament about permanent residence pathways for Ukrainian CUAET arrivals. Privacy-first architecture with zero tracking or database. Automated MP lookup by postal code with pre-filled letter templates. Supporting United Ukrainians of Canada Foundation.',
		color: '#fbbf24',
		tags: ['Next.js', 'TypeScript', 'Tailwind'],
		liveUrl: 'https://help-ukraine-forms.com/',
		screenshot: '/screenshots/helpukraine.png',
		size: 'small',
		achievement: 'Privacy-First'
	}
];

// Grid positions for bento layout - [col, row, colSpan, rowSpan]
export const gridLayout: Record<number, [number, number, number, number]> = {
	1: [1, 1, 2, 2], // RTT - large top left
	2: [3, 1, 1, 2], // MockMind - tall
	3: [4, 2, 1, 2], // Lingozo - tall (moved down 1 row)
	4: [1, 3, 1, 1], // ShopLocal
	5: [2, 3, 1, 1], // OMG
	6: [3, 3, 1, 1], // Motion
	7: [4, 1, 1, 1], // Rustsol - moved to top
	8: [1, 4, 1, 1], // Rye
	9: [2, 4, 2, 1], // Git Fight - wide
	10: [4, 4, 1, 1] // HelpUkraine
};

// Animation directions for each card
export const directions = [
	{ x: -100, y: -50 },
	{ x: 0, y: -80 },
	{ x: 100, y: -50 },
	{ x: -80, y: 0 },
	{ x: 80, y: 0 },
	{ x: -100, y: 50 },
	{ x: 0, y: 80 },
	{ x: 100, y: 50 },
	{ x: -60, y: -60 },
	{ x: 60, y: 60 }
];
