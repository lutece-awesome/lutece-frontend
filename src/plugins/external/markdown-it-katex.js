import MarkdownIt from 'markdown-it';
import TexMathPlugin from 'markdown-it-texmath';
import Katex from 'katex';
import 'katex/dist/katex.css';

TexMathPlugin.use(Katex);

/**
 * For markdown it options, ref to https://github.com/markdown-it/markdown-it.
 * For security settings, ref to https://github.com/markdown-it/markdown-it/blob/master/docs/security.md.
 */
const StrictMarkdownParser = MarkdownIt({
	html: false, // Enable HTML tags in source
	xhtmlOut: false, // Use '/' to close single tags (<br />).
	// This is only for full CommonMark compatibility.
	breaks: false, // Convert '\n' in paragraphs into <br>
	// useful for external highlighters.
	linkify: false, // Autoconvert URL-like text to links
	typographer: true,
	quotes: '“”‘’',
})
	.use(TexMathPlugin);


export default StrictMarkdownParser;
