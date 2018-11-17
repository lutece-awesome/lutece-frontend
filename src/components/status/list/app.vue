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
					@result = "onResult" >
					<template
						slot-scope = "{ result: { loading, error , data } }, isLoading">
						<div class = "elevation-2">
							<div>
								{{ loading }}
							</div>
							<status-list
								:status-item = "data ? data.submissionList.submissionList : []"
								:is-loading = "isLoading || !data || loading"
								@input-pk = "pk = $event"
								@input-user = "user = $event"
								@input-problem = "problem = $event"
								@input-verdict = "judgeStatus = $event"
								@input-language = "language = $event"
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
					</template>
				</ApolloQuery>
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
			judgeStatus: null,
			language: null,
		};
	},

	activated() {
		this.$refs.pagination.init();
	},

	methods: {
		onResult(result) {
			this.maxpage = result.data.submissionList.maxpage;
		},
	},
};
</script>
