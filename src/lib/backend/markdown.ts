import { markdownItRenderer } from '../../markdown';

export default function markdownToHtml(markdown: string): string {
	return markdownItRenderer.render(markdown);
}
