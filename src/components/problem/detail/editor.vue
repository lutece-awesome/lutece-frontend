<template>
	<code-mirror
		:code = "code"
		:language = "language"
		:is-loading = "isLoading"
		:is-error = "isError"
		@input-code = "code = $event"
		@input-language = "language = $event"
		@input-submit = "submit"
	/>
</template>

<script>

import codeMirror from '@/components/async/code-mirror/app';
import Language from '@/modules/language/main';
import gql from 'graphql-tag';

export default {
	components: {
		codeMirror,
	},

	props: {
		slug: {
			type: String,
			required: true,
		},
	},

	data: () => ({
		code: '',
		language: null,
		isLoading: false,
		isError: false,
	}),

	created() {
		this.language = this.$store.getters['editor/currentLanguage'] || Language.first();
	},

	methods: {
		submit() {
			this.isError = false;
			this.isLoading = true;
			const mutation = gql`
				mutation SubmitSubmission($code: String!, $problemSlug: String! , $language: String!) {
					submitSubmission(code: $code, problemSlug: $problemSlug , language: $language) {
						pk
					}
				}
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					problemSlug: this.slug,
					language: this.language.full,
					code: this.code,
				},
			})
				.then((response) => {
					this.$router.push({
						name: 'StatusDetail',
						params: {
							pk: response.data.submitSubmission.pk,
						},
					});
				})
				.catch((_error) => {
					this.isError = true;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
