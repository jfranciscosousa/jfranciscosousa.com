import markdownIt from 'markdown-it';
import mdImplicitFigures from 'markdown-it-implicit-figures';
import markdownItAttrs from 'markdown-it-attrs';
import highlight from 'highlight.js';
import mdNamedCodeBlocks from 'markdown-it-named-code-blocks';

export const markdownItRenderer = new markdownIt({
	html: true,
	highlight: (code, language) => {
		if (language) {
			try {
				return (
					`<pre class="hljs-parent language-${language}"><code>` +
					highlight.highlight(code, { language }).value +
					'</code></pre>'
				);
			} catch (__) {
				// noop
			}
		}

		return code;
	}
})
	.use(markdownItAttrs)
	.use(mdImplicitFigures)
	.use(mdNamedCodeBlocks);