<template>
	<div v-html = "renderContent"/>
</template>

<script>

import { StrictMarkdownParser, DangerousMarkdownParser } from '@/plugins/external/markdown-it-katex';

export default {
	props: {
		content: {
			type: String,
			default: '',
		},
		danger: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		renderContent() {
			return this.danger
				? DangerousMarkdownParser.render(this.content) : StrictMarkdownParser.render(this.content);
		},
	},
};
</script>
