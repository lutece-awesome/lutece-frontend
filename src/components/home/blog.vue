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
			>
				<v-flex
					xs12
					md10
					lg9
					text-xs-center
				>
					<ApolloQuery
						:query = "require('@/graphql/home/user-article-list.gql')"
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
								<v-flex>
									<user-article-tile
										v-for = " ( each , index ) in data.userArticleList.userArticleList "
										:key = "index"
										:pk = "each.pk"
										:title = "each.title"
										:username = "each.author.username"
										:gravatar = "each.author.attachInfo.gravatar"
										:last-update-time = "each.lastUpdateTime"
										:count = "each.record.count"
										:vote = 'each.vote'
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
			:to = "{
				name: 'UserArticleCreate',
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
import UserArticleTile from '@/components/article/user/tile';
import { getThoundNumberic } from '@/utils';

export default {

	name: 'Blog',

	components: {
		SearchBar,
		UserArticleTile,
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
			this.maxPage = result.data.userArticleList.maxPage;
		},
		getThoundNumberic(number) {
			return getThoundNumberic(number);
		},
	},
};
</script>
