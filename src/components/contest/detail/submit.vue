<template>
	<v-container fiuld>
		<loading-spinner
			v-if = "isLoading"
			text = "Loading ..."
			style = "height: 600px"
		/>
		<error-spinner
			v-else-if = "error"
			:msg = "error"
		/>
		<div v-else-if = "problemList.length > 0">
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
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			code: '',
			language: null,
			isLoading: false,
			error: null,
			problemList: [],
			problem: null,
			isUploading: false,
			isUploadingError: false,
		};
	},

	created() {
		this.language = this.$store.getters['editor/currentLanguage'] || Language.first();
	},

	mounted() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.isLoading = true;
			const query = gql`
				query ContestProblemList($pk: ID!){
					contestProblemList(pk: $pk){
						title
                        slug
					}
				}
            `;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contestProblemList)
				.then((data) => {
					let idx = 0;
					this.problemList = data.map((each) => {
						idx += 1;
						return {
							title: `${String.fromCharCode(64 + idx)} - ${each.title}`,
							slug: each.slug,
						};
					});
					if (this.problemList.length > 0) {
						[this.problem] = this.problemList;
					}
				})
				.catch((error) => { this.error = error; })
				.finally(() => { this.isLoading = false; });
		},
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
					pk: this.pk,
				},
			})
				.then((response) => {
					this.$router.push({
						name: 'StatusDetail',
						params: {
							pk: response.data.contestSubmitSubmission.pk,
						},
					});
				})
				.catch((_error) => {
					this.isUploadingError = true;
				})
				.finally(() => {
					this.isUploading = false;
				});
		},
	},
};
</script>
