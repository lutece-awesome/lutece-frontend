<template>
	<v-container>
		<v-layout
			row
			wrap
			justify-center
		>
			<v-flex
				xs12
				md8>
				<div class = "display-2 text-xs-center mt-2">
					{{ blog.title }}
				</div>
				<div
					class = "text-xs-center mt-2"
					style = "color:#999;"
				>
					<div> Created by
						<router-link :to = "{name: 'UserDetail', params: {username: blog.user.username}}" >
							{{ blog.user.displayName }}
						</router-link>
					</div>
					<span> {{ blog.createTime | moment("MMMM Do, YYYY") }} </span>
					<span class = "ml-1 mr-1" > | </span>
					<span> {{ blog.view }} views </span>
					<span class = "ml-1 mr-1" > | </span>
					<span>
						{{ blog.vote }} stars
						<v-icon class = "ml-1" >mdi-thumb-up-outline </v-icon>
					</span>
				</div>

				<v-divider class="my-3"/>
				<async-mixrend-component
					:content = "blog.content"
					class = "subheading"
				/>

				<v-divider class="my-3"/>

				<Commtents
					:slug = "slug"
					class = "mt-4"
				/>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import ArticleGQL from '@/graphql/article/detail.gql';
import Commtents from '@/components/comments/app';
import { AsyncMixrendComponent } from '@/components/async/index';


export default {
	metaInfo() { return { title: this.article.title ? this.article.title : 'Loading...' }; },

	components: {
		Commtents,
		AsyncMixrendComponent,
	},

	data: () => ({
		slug: '',
		article: {
			title: '',
			content: '',
			view: 0,
			vote: 0,
			createTime: '',
			user: {
				username: '',
				displayName: '',
			},
		},
	}),

	created() {
		this.slug = this.$route.params.slug;
	},

	mounted() {
		this.request();
	},

	methods: {
		request() {
			this.$apollo.query({
				query: ArticleGQL,
				variables: {
					slug: this.slug,
				},
			})
				.then(response => response.data.blog)
				.then((data) => { this.article = data; });
		},
	},
};
</script>
