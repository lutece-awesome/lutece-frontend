<template>
	<div>
		<codemirror
			:value = "value"
			:options = "getOptions"
			:style = "{ 'min-height': minHeight + 'px' }"
			@input = "$emit( 'input' , $event )"
		/>
		<slot name = "extension" />
	</div>
</template>

<script>

export default {
	components: {
		// TODO: Split those promise to configuration files and
		// support async theme / language-mode / keymap download.
		codemirror: () => {
			const cm = import(/* webpackChunkName: "codemirror" */ 'vue-codemirror');
			const css = import(/* webpackChunkName: "codemirror" */ 'codemirror/lib/codemirror.css');
			const line = import(/* webpackChunkName: "codemirror" */ 'codemirror/addon/selection/active-line');
			const sublime = import(/* webpackChunkName: "codemirror" */ 'codemirror/keymap/sublime');
			const closeBrackets = import(/* webpackChunkName: "codemirror" */ 'codemirror/addon/edit/closebrackets');
			const clike = import(/* webpackChunkName: "codemirror" */ 'codemirror/mode/clike/clike');
			const go = import(/* webpackChunkName: "codemirror" */ 'codemirror/mode/go/go');
			const rust = import(/* webpackChunkName: "codemirror" */ 'codemirror/mode/rust/rust');
			const ruby = import(/* webpackChunkName: "codemirror" */ 'codemirror/mode/ruby/ruby');
			const py = import(/* webpackChunkName: "codemirror" */ 'codemirror/mode/python/python');
			const neo = import(/* webpackChunkName: "codemirror" */ 'codemirror/theme/neo.css');
			const scrollBars = import(/* webpackChunkName: "codemirror" */ 'codemirror/addon/scroll/simplescrollbars');
			const scrollBarsCss = import(/* webpackChunkName: "codemirror" */ 'codemirror/addon/scroll/simplescrollbars.css');
			const autoRefresh = import(/* webpackChunkName: "codemirror" */ 'codemirror/addon/display/autorefresh');
			return Promise.all(
				[cm, css, line, sublime, closeBrackets, clike, go, rust, ruby, py, neo,
					scrollBars, scrollBarsCss, autoRefresh],
			)
				.then(ret => ret[0].codemirror)
				.then((_) => {
					Object.assign(_, {
						beforeDestroy() {
							// TODO: garbage cleanup after transition
						},
					});
					return _;
				});
		},
	},

	props: {
		value: {
			type: String,
			default: '',
		},
		option: {
			type: Object,
			default: null,
		},
		minHeight: {
			type: Number,
			default: 500,
		},
	},

	data() {
		return {
			defaultOption: {
				indentUnit: 4,
				lineNumbers: true,
				keyMap: 'sublime',
				tabindex: '0',
				line: true,
				styleActiveLine: true,
				matchBrackets: true,
				scrollbarStyle: 'overlay',
				theme: 'neo',
				autoRefresh: true,
			},
		};
	},

	computed: {
		getOptions() {
			return {
				...this.defaultOption,
				...this.option,
			};
		},
	},
};
</script>
