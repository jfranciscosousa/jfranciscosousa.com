import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { Mode, plugin as MarkdownPlugin } from 'vite-plugin-markdown';
import { markdownItRenderer } from './src/markdown.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		inlineStyleThreshold: Infinity,
		adapter: adapter(),
		prerender: { default: true },
		vite: {
			plugins: [MarkdownPlugin({ mode: Mode.HTML, markdownIt: markdownItRenderer })],
			optimizeDeps: {
				include: ['rel-to-abs']
			},
			server: {
				fs: {
					allow: ['..']
				}
			}
		}
	}
};

export default config;
