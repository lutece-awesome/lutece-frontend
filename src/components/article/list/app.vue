<template>
	<v-container
		fluid>
		<v-layout
			row
			justify-center>
			<v-flex
				xs10
				md8
				lg6>
				<ApolloQuery
					:query = "require('@/graphql/article/list.gql')"
					:variables = "{ page }"
					@result = "onResult" >
					<template
						slot-scope = "{ result: { loading , error , data } }">
						<loading-spinner v-if = "loading" />
						<error-spinner v-else-if = "error" />
						<article-list
							v-else-if = "data"
							:items = "data.blogList.blogList"
						/>
					</template>
				</ApolloQuery>
				<div
					:class="{'mb-2': $vuetify.breakpoint.xsOnly}"
					class="text-xs-center mt-2">
					<v-pagination
						ref = "pagination"
						v-model = "page"
						:length = "maxpage"/>
				</div>
				<v-btn
					v-if = "this.$store.getters['user/isAuthenticated']"
					:to="{name: 'ArticleCreate'}"
					color="accent"
					dark
					fab
					fixed
					bottom
					right>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import ArticleList from '@/components/article/list/list';

export default {
	name: 'Article',
	metaInfo() { return { title: 'Article' }; },

	components: {
		ArticleList,
	},

	data: () => ({
		page: 1,
		maxpage: 0,
	}),

	activated() {
		this.$refs.pagination.init();
	},

	methods: {
		onResult(result) {
			this.maxpage = result.data.blogList.maxpage;
		},
	},
};
</script>
