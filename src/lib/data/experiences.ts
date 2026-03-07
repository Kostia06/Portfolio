export interface Experience {
	year: string;
	title: string;
	company: string;
	period: string;
	type: 'work' | 'education' | 'achievement';
	details?: string;
}

export const experiences: Experience[] = [
	{
		year: '2026',
		title: 'Web Developer',
		company: 'United Ukrainians for Canadians Foundation',
		period: 'Feb 2026 – Present',
		type: 'work',
		details: 'Building responsive, mobile-first site for community organization supporting 1.2+ million Ukrainian-Canadians using React and Cloudflare.'
	},
	{
		year: '2026',
		title: 'Full Stack Developer',
		company: 'Mr Blu',
		period: 'Jan 2026 – Present',
		type: 'work',
		details: 'Voice-to-invoice SaaS using Gemini and Deepgram. Shipped mobile-first app with React Native (Expo), real-time transcription, and automated PDF delivery.'
	},
	{
		year: '2025',
		title: 'Full Stack Developer Intern',
		company: 'Respect The Technique',
		period: 'Jul 2025 – Jan 2026',
		type: 'work',
		details: 'Production e-commerce platform with employee management. Scaled to 1,200+ monthly users and 5,000+ page views. Reduced manual workload by 40%.'
	},
	{
		year: '2025',
		title: 'Full Stack Developer',
		company: 'Lemmer Ltd.',
		period: 'May – Jun 2025',
		type: 'work',
		details: 'Built full-stack e-commerce platform (Rustsol.com) with Next.js and Supabase. Delivered in 6 weeks, improving client efficiency by 30%.'
	},
	{
		year: '2025',
		title: '1st Place — Cultivator Hackathon',
		company: 'ShopLocal MVP',
		period: 'Jan 2025',
		type: 'achievement',
		details: 'Led team of 6 to build multi-vendor marketplace MVP in 24 hours using PHP, MySQL, and responsive front-end design.'
	},
	{
		year: '2024',
		title: 'CS Tutor',
		company: 'University of Calgary',
		period: 'Sep 2024 – Present',
		type: 'work',
		details: 'Mentoring 10+ students in Python and Java — data structures, algorithms, and object-oriented design principles.'
	},
	{
		year: '2024',
		title: '6th Place — RBC Fast Pitch (60 Teams)',
		company: 'Motion Capture System',
		period: 'Dec 2024',
		type: 'achievement',
		details: 'Real-time body tracking system using Python and OpenCV achieving sub-50ms latency for live streaming applications.'
	},
	{
		year: '2023',
		title: 'B.Sc. Computer Science, Software Engineering',
		company: 'University of Calgary — Expected Apr 2027',
		period: '2023 – 2027',
		type: 'education',
		details: 'Coursework: Data Structures, Database Systems, Computer Networks, OS, AI & Machine Learning, Security & Privacy.'
	},
	{
		year: '2022',
		title: 'Software Developer Intern',
		company: 'CommerceMate.co',
		period: 'Apr 2022 – Aug 2023',
		type: 'work',
		details: 'Optimized performance for 5,000+ users (40% faster loads). Integrated Stripe & PayPal, boosting transactions 25%. Team of 8 engineers.'
	}
];
