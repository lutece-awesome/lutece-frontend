/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';

const mdPromise = new Promise((resolve, _reject) => {
	Promise.all([
		/* webpackChunkName: "markdown-it-katex" */ import('markdown-it'),
		/* webpackChunkName: "markdown-it-katex" */ import('@neilsustc/markdown-it-katex'),
		/* webpackChunkName: "markdown-it-katex" */ import('markdown-it-imsize'),
		/* webpackChunkName: "markdown-it-katex" */ import('katex/dist/katex.css'),
	]).then(([{ default: MD }, { default: mk }, { default: mdimsize }, _]) => {
		const md = MD({
			typographer: true,
		}).use(mdimsize);
		md.use(mk);
		resolve(md);
	});
});

Vue.directive('mixrend', (el, binding) => {
	if (binding.value.expression) {
		el.innerHTML = binding.value.expression;
	} else {
		el.innerHTML = binding.value;
	}
	mdPromise.then((md) => {
		el.innerHTML = md.render(el.innerHTML);
	});
});
