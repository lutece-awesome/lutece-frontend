<template>
	<div>
		<v-container
			:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
			fluid
		>
			<v-layout
				row
				wrap
				fill-height
				align-center
				justify-center
				ma-0
			>
				<v-flex
					xs12
					md10
					lg8
					text-xs-center
				>
					<ApolloQuery
						:query = "require('@/graphql/home/home-article-list.gql')"
						:variables = "{ page , filter }"
						:debounce = "300"
						@result = "onResult" >
						<template
							slot-scope = "{ result: { loading, error , data } , isLoading }">
							<search-bar
								v-model = "filter"
								class = "mb-4 fluid"
								label = ""
							/>
							<loading-spinner
								v-if = "( ( !data || loading || isLoading ) && (!error) ) ? true : false"
							/>
							<error-spinner
								v-else-if = "error"
							/>
							<v-layout
								v-else
								justify-center
							>
								<v-flex
									xs12
									sm9
								>
									<home-artile-tile
										v-for = " ( each , index ) in data.homeArticleList.homeArticleList "
										:key = "index"
										:title = "each.title"
										:slug = "each.slug"
										:username = "each.author.username"
										:preview = "each.preview"
										:gravatar = "each.author.attachInfo.gravatar"
										:last-update-time = "each.lastUpdateTime"
										:count = "each.record.count"
									/>
								</v-flex>
							</v-layout>
							<div
								v-if = "!error"
								class = "text-xs-center mt-3"
							>
								<v-pagination
									ref = "pagination"
									v-model = "page"
									:length = "maxPage"
								/>
							</div>
						</template>
					</ApolloQuery>
				</v-flex>
			</v-layout>
		</v-container>
		<v-btn
			v-if = "hasPermission('article.add_homearticle')"
			:to = "{
				name: 'HomeArticleCreate',
			}"
			color = "accent"
			dark
			fab
			fixed
			bottom
			right
		>
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchBar from '@/components/utils/search-bar';
import HomeArtileTile from '@/components/article/home/tile';
import { getThoundNumberic } from '@/utils';

export default {

	name: 'Blog',

	components: {
		SearchBar,
		HomeArtileTile,
	},

	data() {
		return {
			page: 1,
			maxPage: 0,
			filter: '',
		};
	},

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},

	methods: {
		onResult(result) {
			this.maxPage = result.data.homeArticleList.maxPage;
		},
		getThoundNumberic(number) {
			return getThoundNumberic(number);
		},
	},
};
</script>
