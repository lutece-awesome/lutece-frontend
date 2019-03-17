<template>
	<v-container fiuld>
		<div v-if = "problemList.length > 0">
			<v-select
				v-model = "problem"
				:items = "problemList"
				class = "ml-2"
				item-text = "title"
				item-value = "slug"
				style = "max-width: 600px"
				persistent-hint
				return-object
				single-line
			/>
			<code-mirror
				:code = "code"
				:language = "language"
				:is-loading = "isUploading"
				:is-error = "isUploadingError"
				class = "mt-2"
				@input-code = "code = $event"
				@input-language = "language = $event"
				@input-submit = "submit"
			/>
		</div>
	</v-container>
</template>

<script>

import gql from 'graphql-tag';
import codeMirror from '@/components/async/code-mirror/app';
import Language from '@/modules/language/main';

export default {
	components: {
		codeMirror,
	},

	props: {
		contest: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			code: '',
			language: null,
			problemList: [],
			problem: null,
			isUploading: false,
			isUploadingError: false,
		};
	},

	created() {
		this.language = this.$store.getters['editor/currentLanguage'] || Language.first();
		for (let i = 0; i < this.contest.problems.length; i += 1) {
			const each = this.contest.problems[i];
			this.problemList.push({
				title: `${String.fromCharCode(65 + i)} - ${each.title}`,
				slug: each.slug,
			});
		}
		if (this.problemList.length > 0) {
			[this.problem] = this.problemList;
		}
	},

	methods: {
		submit() {
			this.isUploadingError = false;
			this.isUploading = true;
			const mutation = gql`
				mutation ContestSubmitSubmission($code: String!, $problemSlug: String! , $language: String!, $pk: ID!) {
					contestSubmitSubmission(code: $code, problemSlug: $problemSlug , language: $language, pk: $pk) {
						pk
					}
				}
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					problemSlug: this.problem.slug,
					language: this.language.full,
					code: this.code,
					pk: this.contest.pk,
				},
			})
				.then((response) => {
					this.$emit('submitSubmissionCallback', response.data.contestSubmitSubmission.pk);
				})
				.catch((_error) => {
					this.isUploadingError = true;
				})
				.finally(() => {
					this.isUploading = false;
				});
		},

		// Do nothing
		init() {

		},
	},
};
</script>
