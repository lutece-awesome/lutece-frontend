<template>
	<v-container>
		<v-layout
			row
			wrap
			align-center
			justify-center
		>
			<v-flex
				xs12
				md12
				lg10
			>
				<loading-spinner v-if = "isLoading"/>
				<error-spinner v-else-if = "isError"/>
				<div v-else>
					<user-article-detail
						:pk = "parseInt(pk,10)"
						:title = "title"
						:content = "content"
						:author = "author"
						:record = "record"
						:create-time = "createTime"
						:last-update-time = "lastUpdateTime"
						:vote = "vote"
						:self-attitude = "selfAttitude"
					/>
					<v-divider class = "mt-3 mb-3" />
					<comments
						:fetch-comments = "fetchComments"
						:submit = "submitComment"
					/>
				</div>
				<v-btn
					v-if = "hasPermission('article.change_userarticle')"
					:to = "{name: 'UserArticleEdit', params: {pk}}"
					color = "accent"
					dark
					fab
					fixed
					bottom
					right
				>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import gql from '@/plugins/essential/graphql-tag';
import updateArticleRecord from '../basic/update-record';
import UserArticleDetail from '../detail/app';
import { mapGetters } from 'vuex';
import Comments from '@/components/comments/app';

export default {

	components: {
		UserArticleDetail,
		Comments,
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
			author: {
				username: '',
				attachInfo: {
					gravatar: '',
				},
			},
			record: {
				count: 0,
			},
			createTime: '',
			lastUpdateTime: '',
			vote: 0,
			selfAttitude: false,
			isLoading: true,
			isError: false,
		};
	},

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},

	mounted() {
		const query = gql`
			query queryUserArticle($pk: ID!){
				userArticle(pk: $pk){
					pk
					title
					content
					author {
						username
						attachInfo {
							gravatar
						}
					}
					record {
						count
					}
					createTime
					lastUpdateTime
					vote
					selfAttitude
				}
			}
		`;
		const fechData = this.$apollo.query({
			query,
			variables: {
				pk: this.pk,
			},
		})
			.then(response => response.data.userArticle)
			.then((data) => { Object.assign(this, data); });
		const mixrendComponent = import('@/components/async/mixrend/index');
		Promise.all([
			mixrendComponent,
			fechData,
		])
			.then(() => { this.isLoading = false; })
			.then(() => updateArticleRecord(this.pk))
			.catch(() => { this.isLoading = false; this.isError = true; });
	},

	methods: {
		submitComment(data) {
			const mutation = gql`
				mutation CreateArticleComment( $pk: ID!, $content: String!, $reply: ID ){
					createArticleComment(pk: $pk, content: $content, reply: $reply){
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
				.then(response => response.data.CreateArticleComment);
		},

		fetchComments(page) {
			const query = gql`
				query ArticleCommentList( $pk: ID!, $page: Int! ){
					articleCommentList(pk: $pk, page: $page){
						maxPage
						articleCommentList{
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
				.then(response => response.data.articleCommentList)
				.then(data => ({
					maxPage: data.maxPage,
					list: data.articleCommentList,
				}));
		},
	},
};
</script>
