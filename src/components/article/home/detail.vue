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
				md10
				lg8
			>
				<loading-spinner v-if = "isLoading"/>
				<error-spinner v-else-if = "isError"/>
				<home-article-detail
					v-else
					:pk = "parseInt(pk,10)"
					:title = "title"
					:content = "content"
					:author = "author"
					:record = "record"
					:create-time = "createTime"
					:last-update-time = "lastUpdateTime"
				/>
				<v-btn
					v-if = "hasPermission('article.change_homearticle')"
					:to = "{name: 'HomeArticleEdit', params: {slug}}"
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
import HomeArticleDetail from '../detail/app';
import { mapGetters } from 'vuex';

export default {

	components: {
		HomeArticleDetail,
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
			query queryHomeArticle($slug: ID!){
				homeArticle(slug: $slug){
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
				}
			}
		`;
		const fechData = this.$apollo.query({
			query,
			variables: {
				slug: this.slug,
			},
		})
			.then(response => response.data.homeArticle)
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
};
</script>
