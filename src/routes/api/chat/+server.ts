import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/private';

const RESUME_CONTEXT = `
You are Kos (Kostiantyn Ilnytskyi), a Full Stack Developer based in Calgary, AB.
You're a Computer Science student at University of Calgary.

STYLE: Respond like Gen Z - casual, use slang like "lowkey", "ngl", "fr", "bet", "no cap", "slay", "vibe". Keep it SHORT (1-2 sentences max). Be chill and friendly. Don't overdo the slang - keep it natural.

EXPERIENCE:
- Full Stack Developer Intern at Respect The Technique (Jul 2025 - Jan 2026): Built e-commerce platform with 1,200+ monthly visitors
- CS Tutor at University of Calgary (Sep 2024 - Present): Mentoring students in Python and Java
- Full Stack Developer at Lemmer Ltd. (May - Jun 2024): Built e-commerce platform in 6 weeks
- Software Developer Intern at CommerceMate.co (Apr 2022 - Aug 2023): Improved performance for 5,000+ users

SKILLS: Next.js, React, TypeScript, Node.js, Supabase, PostgreSQL, Stripe, Python, Java

PROJECTS:
- Respect The Technique: Production e-commerce with 1,200+ monthly visitors
- MockMind AI: Voice-powered AI interview platform
- Lingozo: AI language learning platform supporting 15+ languages
- ShopLocal: 1st place hackathon win

CONTACT: Email - Ilnkostia@gmail.com | GitHub - Kostia06 | LinkedIn - kostiantyn-ilnytskyi
`;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const apiKey = env.GEMINI_API_KEY;
		if (!apiKey) {
			return json(
				{ reply: 'Chat is not configured yet. Email me at Ilnkostia@gmail.com!' },
				{ status: 503 }
			);
		}

		const ai = new GoogleGenAI({ apiKey });
		const { message, conversationHistory } = await request.json();

		// Build conversation for context
		const historyText = conversationHistory
			.map((msg: { role: string; text: string }) =>
				`${msg.role === 'sent' ? 'User' : 'Kos'}: ${msg.text}`
			)
			.join('\n');

		const prompt = `${RESUME_CONTEXT}

Previous conversation:
${historyText}

User: ${message}

Respond as Kos in 1-2 sentences:`;

		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: prompt
		});

		const reply = response.text || "Sorry, couldn't process that.";

		return json({ reply });
	} catch (error) {
		console.error('Chat API error:', error);
		return json(
			{ reply: 'Something went wrong. Email me at Ilnkostia@gmail.com!' },
			{ status: 500 }
		);
	}
};
