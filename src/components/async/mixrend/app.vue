<template>
	<div v-html = "renderContent"/>
</template>

<script>

import StrictMarkdownParser from '@/plugins/external/markdown-it-katex';

export default {
	props: {
		content: {
			type: String,
			default: '',
		},
	},

	computed: {
		renderContent() {
			return StrictMarkdownParser.render(this.content);
		},
	},
};
</script>
