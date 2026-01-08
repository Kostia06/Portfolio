export interface Experience {
	year: string;
	title: string;
	company: string;
	location: string;
	period: string;
	description: string[];
	technologies: string[];
	icon: string;
	color: string;
}

export const experiences: Experience[] = [
	{
		year: '2025',
		title: 'Full Stack Developer Intern',
		company: 'Respect The Technique',
		location: 'Calgary, AB',
		period: 'Jul 2025 – Jan 2026',
		description: [
			'Architected production e-commerce platform with employee operations system',
			'Drove platform to 1,200+ monthly visitors, 5,000+ page views',
			'Slashed manual workload by ~40% through automation'
		],
		technologies: ['Next.js', 'TypeScript', 'Supabase', 'Stripe'],
		icon: '🚀',
		color: '#ef4444'
	},
	{
		year: '2024',
		title: 'CS Tutor',
		company: 'University of Calgary',
		location: 'Calgary, AB',
		period: 'Sep 2024 – Present',
		description: [
			'Mentored 10+ students in Python and Java',
			'Taught data structures, algorithms, and core principles'
		],
		technologies: ['Python', 'Java', 'DSA'],
		icon: '🎓',
		color: '#6366f1'
	},
	{
		year: '2024',
		title: 'Full Stack Developer',
		company: 'Lemmer Ltd.',
		location: 'Calgary, AB',
		period: 'May – Jun 2024',
		description: [
			'Built complete e-commerce platform from ground up',
			'Delivered in 6 weeks, boosted efficiency by 30%'
		],
		technologies: ['Next.js', 'Express.js', 'Supabase'],
		icon: '💼',
		color: '#10b981'
	},
	{
		year: '2022',
		title: 'Software Developer Intern',
		company: 'CommerceMate.co',
		location: 'Remote (LA, USA)',
		period: 'Apr 2022 – Aug 2023',
		description: [
			'Accelerated performance for 5,000+ users, 40% faster loads',
			'Integrated Stripe & PayPal, boosted transactions 25%'
		],
		technologies: ['React', 'Node.js', 'Stripe'],
		icon: '⚡',
		color: '#f59e0b'
	},
	{
		year: '2021',
		title: 'Programming Instructor',
		company: 'Ukrainian Educational Center',
		location: 'Kyiv, Ukraine',
		period: 'Jan – Mar 2021',
		description: [
			'Taught 25+ students Python fundamentals',
			'90% continued pursuing CS education'
		],
		technologies: ['Python', 'Education'],
		icon: '👨‍🏫',
		color: '#8b5cf6'
	}
];
