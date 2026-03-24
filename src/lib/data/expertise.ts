export interface ExpertiseItem {
	number: string;
	title: string;
	description: string;
	technologies: string[];
}

export const expertise: ExpertiseItem[] = [
	{
		number: '01',
		title: 'Full Stack Development',
		description:
			'Building performant, production-ready web applications from frontend to backend. Architecting scalable systems with modern frameworks, real-time capabilities, and clean deployment pipelines.',
		technologies: ['React', 'Next.js', 'SvelteKit', 'Node.js', 'TypeScript', 'PostgreSQL']
	},
	{
		number: '02',
		title: 'AI & Machine Learning',
		description:
			'Integrating multi-LLM pipelines, voice transcription, and intelligent automation into real products. From prompt engineering to building full AI-powered SaaS platforms.',
		technologies: ['OpenAI', 'Gemini', 'Anthropic', 'Deepgram', 'Python', 'LangChain']
	},
	{
		number: '03',
		title: 'Mobile Development',
		description:
			'Shipping cross-platform mobile apps with native performance. Voice-first interfaces, real-time sync, and offline-capable architectures built for real users.',
		technologies: ['React Native', 'Expo', 'Mobile-First CSS', 'PWA', 'Responsive Design']
	},
	{
		number: '04',
		title: 'Cloud & Infrastructure',
		description:
			'Deploying and scaling applications with modern cloud platforms. Payment processing, database design, edge computing, and automated CI/CD pipelines.',
		technologies: ['Cloudflare', 'Supabase', 'Stripe', 'Vercel', 'PostgreSQL', 'REST APIs']
	}
];
