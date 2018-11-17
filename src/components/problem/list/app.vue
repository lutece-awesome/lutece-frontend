<template>
	<v-container>
		<v-layout
			row
			wrap
			justify-center>
			<v-flex
				xs12
				md10
				lg8>
				<ApolloQuery
					:query = "require('@/graphql/problem/list.gql')"
					:variables = "{ page , filter }"
					:debounce = "300"
					@result = "onResult" >
					<template
						slot-scope = "{ result: { loading, error , data } }">
						<search-bar
							v-model = "filter"
							class = "mb-4 fluid"
							label = ""
						/>
						<error-spinner v-if = "error" />
						<div v-else>
							<div class = "elevation-2">
								<problem-list
									:problem-item = "data ? data.problemList.problemList : []"
									:is-loading = "( loading || !data ) && !error"
								/>
							</div>
							<div class = "text-xs-center mt-3">
								<v-pagination
									ref = "pagination"
									v-model = "page"
									:length = "maxPage"
								/>
							</div>
						</div>
					</template>
				</ApolloQuery>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import ProblemList from '@/components/problem/list/list';
import SearchBar from '@/components/basic/searchbar';

export default {
	name: 'Problem',
	metaInfo() { return { title: 'Problem' }; },
	components: {
		ProblemList,
		SearchBar,
	},

	data() {
		return {
			page: 1,
			maxPage: 0,
			filter: '',
		};
	},

	activated() {
		if (this.$refs.pagination) {
			this.$refs.pagination.init();
		}
	},

	methods: {
		onResult(result) {
			this.maxpage = result.data.problemList.maxpage;
		},
	},
};
</script>
