<template>
	<v-container
		:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid
	>
		<v-layout
			row
			wrap
			justify-center>
			<v-flex
				xs12
				md10
				lg9
			>
				<ApolloQuery
					:query = "require('@/graphql/user/list.gql')"
					:debounce = "300"
					:variables = "{ page , filter }"
					@result = "onResult">
					<template
						slot-scope = "{ result: { loading, error , data } , isLoading }">
						<search-bar
							v-model = "filter"
							class = "mb-4 fluid"
							label = ""
						/>
						<error-spinner v-if = "error" />
						<div v-else >
							<UserList
								:user-item = "data ? data.userList.userList : []"
								:is-loading = "( !data || loading || isLoading ) ? true : false"
							/>
							<div
								class = "text-xs-center mt-3">
								<v-pagination
									ref = "pagination"
									v-model = "page"
									:length = "maxPage"/>
							</div>
						</div>
					</template>
				</ApolloQuery>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import UserList from '@/components/user/list/list';
import SearchBar from '@/components/utils/search-bar';

export default {

	name: 'User',

	metaInfo() {
		return {
			title: 'User',
		};
	},

	components: {
		UserList,
		SearchBar,
	},

	data() {
		return {
			page: 1,
			maxPage: 0,
			filter: '',
		};
	},

	methods: {
		onResult(result) {
			this.maxPage = result.data.userList.maxPage;
		},
	},

};
</script>
