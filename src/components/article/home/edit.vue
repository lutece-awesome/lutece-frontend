<template>
	<div class = "mt-2">
		<loading-spinner v-if = "isLoading" />
		<error-spinner
			v-else-if = "isError"
			:msg = "errorMsg"
		/>
		<div v-else>
			<v-container
				fluid
				grid-list-lg
			>
				<v-layout
					row
					wrap
					align-center
					justify-center
				>
					<v-flex
						xs12
						md10
						lg8
					>
						<article-setting
							:title = "title"
							:slug = "slug"
							:content = "content"
							:with-preview = "true"
							:preview = "preview"
							:with-disable = "true"
							:disable = "disable"
							:submit = "submit"
							form-title = "Edit Blog"
							@input-title = "title = $event"
							@input-content = "content = $event"
							@input-preview = "preview = $event"
							@input-disable = "disable = $event ? true : false"
						/>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</div>
</template>

<script>

import gql from '@/plugins/essential/graphql-tag';
import ArticleSetting from '../edit/setting';
import { clearApolloCache } from '@/utils';

export default {

	components: {
		ArticleSetting,
	},

	props: {
		slug: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			pk: '',
			title: '',
			content: '',
			preview: '',
			disable: false,
			isLoading: false,
			isError: false,
			errorMsg: 'Network Error',
		};
	},

	mounted() {
		this.isLoading = true;
		const query = gql`
			query queryHomeArticle($slug: ID!){
				homeArticle(slug: $slug){
					pk
                    title
                    content
                    preview
                    disable
				}
			}
		`;
		this.$apollo.query({
			query,
			variables: {
				slug: this.slug,
			},
		})
			.then(response => response.data.homeArticle)
			.then((data) => {
				if (!data) {
					this.isError = true;
					this.errorMsg = 'No such home article, please check the blog list.';
				}
				Object.assign(this, data);
			})
			.catch(() => { this.isError = true; })
			.finally(() => { this.isLoading = false; });
	},

	methods: {
		submit(data) {
			const mutation = gql`
                mutation UpdateHomeArticle( $slug: String!, $title: String!, $content: String!, $preview: String!, $disable: Boolean!){
                    updateHomeArticle( slug: $slug, title: $title, content: $content, preview: $preview, disable: $disable ){
                        slug
                    }
                } 
            `;
			return this.$apollo.mutate({
				mutation,
				variables: {
					slug: data.slug,
					title: data.title,
					content: data.content,
					preview: data.preview,
					disable: data.disable,
				},
			}).then((response) => {
				clearApolloCache().finally(
					() => {
						this.$router.push({
							name: 'BlogDetail',
							params: {
								slug: response.data.updateHomeArticle.slug,
							},
						});
					},
				);
			});
		},
	},
};
</script>
