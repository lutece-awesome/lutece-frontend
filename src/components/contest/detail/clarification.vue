<template>
	<v-container fiuld>
		<comments
			:fetch-comments = "fetchClarifications"
			:submit = "submitClarification"
			:display-title = "false"
		/>
	</v-container>
</template>

<script>

import Comments from '@/components/comments/app';
import gql from 'graphql-tag';

export default {

	components: {
		Comments,
	},

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	methods: {
		submitClarification(_data) {
			return Promise.resolve();
			// const mutation = gql`
			// 	mutation CreateArticleComment( $pk: ID!, $content: String!, $reply: ID ){
			// 		createArticleComment(pk: $pk, content: $content, reply: $reply){
			// 			pk
			// 		}
			// 	}
			// `;
			// return this.$apollo.mutate({
			// 	mutation,
			// 	variables: {
			// 		pk: this.pk,
			// 		content: data.content,
			// 		reply: data.reply,
			// 	},
			// })
			// 	.then(response => response.data.CreateArticleComment);
		},

		fetchClarifications(page) {
			const query = gql`
				query ContestClarificationList( $pk: ID!, $page: Int! ){
					contestClarificationList(pk: $pk, page: $page){
						maxPage
						contestClarificationList{
							pk
							content
							createTime
							lastUpdateTime
							author{
								username
								attachInfo{
									gravatar
								}
							}
						}
					}
				}
			`;
			return this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
					page,
				},
				fetchPolicy: 'no-cache',
			}).then(response => response.data.contestClarificationList);
		},
	},

};
</script>
