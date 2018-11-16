<template>
	<v-container
		:class="{'pa-0': $vuetify.breakpoint.xsOnly }"
	>
		<v-layout
			row
			justify-center>
			<v-flex
				xs12
				xl10>
				<ApolloQuery
					:query = "require('@/graphql/submission/list.gql')"
					:variables = "{ page , pk , user, problem, judgeStatus, language }"
					:debounce = "300"
					fetch-policy = "no-cache"
					@result = "onRequestResult" >
					<template
						slot-scope = "{ result: { loading, error , data } }">
						<div>
							<div class = "elevation-2">
								<StatusList
									:status-item = "data ? data.submissionList.submissionList : []"
									:pk = "parseInt(pk,10)"
									:user = "user"
									:problem = "problem"
									:judge-status = "judgeStatus"
									:language = "language"
									:is-loading = "loading || !data"
									@input-pk = "pk = $event"
									@input-user = "user = $event"
								/>
							</div>
							<div
								:class = "{'mb-2': $vuetify.breakpoint.xsOnly}"
								class = "text-xs-center mt-3">
								<v-pagination
									ref = "pagination"
									v-model = "page"
									:length = "maxpage"/>
							</div>
						</div>
					</template>
				</ApolloQuery>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>

import StatusList from '@/components/status/list/list';
// import UserSearchGQL from '@/graphql/user/search.gql';
// import ProblemSearchGQL from '@/graphql/problem/search.gql';
import { mapGetters } from 'vuex';


export default {
	name: 'Status',
	metaInfo() { return { title: 'Status' }; },

	components: {
		StatusList,
	},

	data() {
		return {
			test: null,
			isLoading: false,
			page: 1,
			maxpage: 0,
			filters: {},
			pk: null,
			user: null,
			problem: null,
			judgeStatus: null,
			language: null,
			userSearch: {
				items: [],
				isLoading: false,
				filter: '',
			},
			problemSearch: {
				items: [],
				isLoading: false,
				filter: '',
			},
		};
	},

	computed: {
		queryFilters() {
			return { ...this.filters };
		},
		userSearchFilter() {
			return this.userSearch.filter;
		},
		problemSearchFilter() {
			return this.problemSearch.filter;
		},
		...mapGetters({
			profile: 'user/profile',
			isAuthenticated: 'user/isAuthenticated',
		}),
	},

	watch: {
		userSearchFilter() {
			this.updateUserSearch();
		},
		problemSearchFilter() {
			this.updateProblemSearch();
		},
	},

	activated() {
		this.$refs.pagination.init();
	},

	methods: {
		onRequestResult(result) {
			this.maxpage = result.data.submissionList.maxpage;
		},
		// updateUserSearch() {
		// 	if (!this.userSearchFilter) {
		// 		if (this.isAuthenticated) {
		// 			this.userSearch.items = [this.profile.username];
		// 		} else {
		// 			this.userSearch.items = [];
		// 		}
		// 		return;
		// 	}
		// 	const variables = {
		// 		filter: this.userSearchFilter,
		// 	};
		// 	this.userSearch.isLoading = true;
		// 	this.$apollo.query({
		// 		query: UserSearchGQL,
		// 		variables,
		// 	})
		// 		.then(response => response.data.userSearch)
		// 		.then((data) => {
		// 			this.userSearch.items = data.userList.map(val => val.username);
		// 		})
		// 		.then(() => { this.userSearch.isLoading = false; });
		// },
		// updateProblemSearch() {
		// 	if (!this.problemSearchFilter) {
		// 		this.problemSearch.items = [];
		// 		return;
		// 	}
		// 	const variables = {
		// 		filter: this.problemSearchFilter,
		// 	};
		// 	this.problemSearch.isLoading = true;
		// 	this.$apollo.query({
		// 		query: ProblemSearchGQL,
		// 		variables,
		// 	})
		// 		.then(response => response.data.problemSearch)
		// 		.then((data) => {
		// 			this.problemSearch.items = data.problemList.map(val => val.title);
		// 		})
		// 		.then(() => { this.problemSearch.isLoading = false; });
		// },
	},
};
</script>
