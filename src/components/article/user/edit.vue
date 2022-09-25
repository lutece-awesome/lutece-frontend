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
							:content = "content"
							:submit = "submit"
							:pk = 'pk'
							:dele = "dele"
							form-title = "Edit Blog"
							@input-title = "title = $event"
							@input-content = "content = $event"
						/>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</div>
</template>

<script>

import gql from '@/plugins/essential/graphql-tag';
import ArticleSetting from '../edit/user_article_setting';
import { clearApolloCache } from '@/utils';

export default {

	components: {
		ArticleSetting,
	},

	props: {
		pk: {
			type: Number,
			required: true,
		},
	},

	data() {
		return {
			title: '',
			content: '',
			disable: false,
			isLoading: false,
			isError: false,
			errorMsg: 'Network Error',
		};
	},

	mounted() {
		this.isLoading = true;
		const query = gql`
			query queryUserArticle($pk: ID!){
				userArticle(pk: $pk){
					pk
                    title
                    content
				}
			}
		`;
		this.$apollo.query({
			query,
			variables: {
				pk: this.pk,
			},
		})
			.then(response => response.data.userArticle)
			.then((data) => {
				if (!data) {
					this.isError = true;
					this.errorMsg = 'No such user article, please check the Blog list.';
				}
				Object.assign(this, data);
			})
			.catch(() => { this.isError = true; })
			.finally(() => { this.isLoading = false; });
	},

	methods: {
		dele(data) {
			const mutation = gql`
			mutation DeleUserArticle($pk: ID!, $title: String!, $content: String!){
				deleUserArticle( pk: $pk, title: $title, content: $content){
					pk
				}
			}`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					pk: data.pk,
					title: data.title,
					content: data.content,
				},
			}).then((response) => {
				clearApolloCache().finally(
					() => {
						this.$router.push({
							name: 'Blog',
						});
					},
				);
			});
		},

		submit(data) {
			const mutation = gql`
                mutation UpdateUserArticle( $pk: ID!, $title: String!, $content: String!){
                    updateUserArticle( pk: $pk, title: $title, content: $content){
						pk
                    }
                } 
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.pk,
					title: data.title,
					content: data.content,
				},
			}).then((response) => {
				clearApolloCache().finally(
					() => {
						this.$router.push({
							name: 'BlogDetail',
							params: {
								pk: this.pk,
							},
						});
					},
				);
			});
		},
	},
};
</script>
