import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			'$components': 'src/lib/components',
			'$sections': 'src/lib/components/sections',
			'$ui': 'src/lib/components/ui',
			'$stores': 'src/lib/stores',
			'$utils': 'src/lib/utils',
			'$data': 'src/lib/data'
		}
	}
};

export default config;
