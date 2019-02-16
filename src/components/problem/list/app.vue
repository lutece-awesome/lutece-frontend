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
						slot-scope = "{ result: { loading, error , data } , isLoading }">
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
									:is-loading = "( !data || loading || isLoading ) ? true : false"
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
				<v-btn
					v-if = "hasPermission('problem.add_problem')"
					:to = "{
						name: 'ProblemCreate',
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
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import ProblemList from '@/components/problem/list/list';
import SearchBar from '@/components/utils/search-bar';
import { mapGetters } from 'vuex';

export default {

	name: 'Problem',

	metaInfo() {
		return {
			title: 'Problem',
		};
	},

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

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},

	activated() {
		if (this.$refs.pagination) {
			this.$refs.pagination.init();
		}
	},

	methods: {
		onResult(result) {
			this.maxPage = result.data.problemList.maxPage;
		},
	},
};
</script>
