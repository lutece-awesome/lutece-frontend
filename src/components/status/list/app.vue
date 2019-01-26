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
				<div class = "mt-2">
					<ApolloQuery
						:query = "require('@/graphql/submission/list.gql')"
						:variables = "queryVariables"
						:debounce = "128"
						fetch-policy = "no-cache"
						@result = "onResult" >
						<template
							slot-scope = "{ result: { error , data } }">
							<error-spinner v-if = "error" />
							<div v-else>
								<div
									class = "elevation-2">
									<status-list
										:status-item = "data ? data.submissionList.submissionList : []"
										:is-loading = "isLoading || !data"
										@input-pk = "isLoading = true, pk = $event"
										@input-user = "isLoading = true, user = $event"
										@input-problem = "isLoading = true, problem = $event"
										@input-verdict = "isLoading = true, verdict = $event"
										@input-language = "isLoading = true, language = $event"
									/>
								</div>
								<div
									:class = "{'mb-2': $vuetify.breakpoint.xsOnly}"
									class = "text-xs-center mt-3">
									<v-pagination
										ref = "pagination"
										v-model = "page"
										:length = "maxPage"/>
								</div>
							</div>
						</template>
					</ApolloQuery>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>

import StatusList from '@/components/status/list/list';

export default {
	name: 'Status',
	metaInfo() { return { title: 'Status' }; },

	components: {
		StatusList,
	},

	data() {
		return {
			isLoading: false,
			page: 1,
			maxPage: 0,
			pk: null,
			user: null,
			problem: null,
			verdict: null,
			language: null,
		};
	},

	computed: {
		queryVariables() {
			return {
				page: this.page,
				pk: this.pk,
				user: this.user,
				problem: this.problem,
				judgeStatus: this.verdict ? this.verdict.full : null,
				language: this.language ? this.language.full : null,
			};
		},
	},

	activated() {
		this.$refs.pagination.init();
	},

	methods: {
		onResult(result) {
			this.isLoading = false;
			this.maxPage = result.data.submissionList.maxpage;
		},
	},
};
</script>
