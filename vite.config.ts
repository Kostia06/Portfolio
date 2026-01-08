import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'favicon.svg', 'favicon-192x192.png', 'favicon-512x512.png'],
			manifest: {
				name: 'Kos | Full Stack Developer',
				short_name: 'Kos',
				description: 'Full Stack Developer based in Calgary, AB',
				theme_color: '#0a0a0a',
				background_color: '#0a0a0a',
				display: 'standalone',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: '/favicon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/favicon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,webmanifest}'],
				navigateFallback: null,
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365
							}
						}
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30
							}
						}
					}
				]
			},
			devOptions: {
				enabled: false
			}
		})
	]
});
