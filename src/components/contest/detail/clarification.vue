<template>
	<v-container fiuld>
		<error-spinner
			v-if = "error"
		/>
		<comments
			v-else
			ref = "comments"
			:fetch-comments = "fetchClarifications"
			:submit = "submitClarification"
			:display-title = "false"
			:actived-update = "true"
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

	data() {
		return {
			error: null,
		};
	},

	methods: {
		submitClarification(data) {
			const mutation = gql`
				mutation CreateContestClarification( $pk: ID!, $content: String!, $reply: ID ){
					createContestClarification(pk: $pk, content: $content, reply: $reply){
						pk
					}
				}
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.pk,
					content: data.content,
					reply: data.reply,
				},
			})
				.then(response => response.data.createContestClarification);
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
							vote
							selfAttitude
							totalReplyNumber
							reply {
								pk
								content
								createTime
								lastUpdateTime
								author {
									username
									attachInfo {
										gravatar
									}
								}
								vote
								selfAttitude
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
			})
				.then(response => response.data.contestClarificationList)
				.then(data => ({
					maxPage: data.maxPage,
					list: data.contestClarificationList,
				}))
				.catch((error) => { this.error = error; });
		},

		init() {
			this.$refs.comments.update();
		},
	},

};
</script>
