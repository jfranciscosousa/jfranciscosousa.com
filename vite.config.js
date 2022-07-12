import { sveltekit } from '@sveltejs/kit/vite';
import { Mode, plugin as MarkdownPlugin } from 'vite-plugin-markdown';
import { markdownItRenderer } from './src/markdown.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), MarkdownPlugin({ mode: Mode.HTML, markdownIt: markdownItRenderer })],
	optimizeDeps: {
		include: ['rel-to-abs']
	},
	server: {
		fs: {
			allow: ['..']
		}
	}
};

export default config;
