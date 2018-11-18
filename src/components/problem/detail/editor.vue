<template>
	<code-editor
		:slug = "slug"
		:gql = "require( '@/graphql/submission/submit.gql' )"
	/>
</template>

<script>

import CodeEditor from '@/components/editor/app';

export default {
	components: {
		CodeEditor,
	},

	props: {
		slug: {
			type: String,
			required: true,
		},
	},
};
</script>
