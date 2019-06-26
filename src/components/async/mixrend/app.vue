<template>
	<div
		class="renderContent"
		v-html="renderContent"
	/>
</template>

<script>

import {
	StrictMarkdownParser,
	DangerousMarkdownParser,
} from '@/plugins/external/markdown-it-katex';

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
				? DangerousMarkdownParser.render(this.content)
				: StrictMarkdownParser.render(this.content);
		},
	},
};
</script>

<style scoped>
.renderContent {
  font-size: 14px;
  line-height: 22px;
  font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
</style>
