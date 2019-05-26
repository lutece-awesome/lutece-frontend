<template>
	<v-container
		:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid
	>
		<v-layout
			row
			wrap
			justify-center
		>
			<v-flex
				xs12
				md10
				lg9>
				<search-bar
					v-model = "filter"
					class = "mb-4 fluid"
					label = ""
				/>
				<div class = "elevation-2">
					<contest-list
						:is-loading = "isLoading"
						:contest-list = "contestList"
					/>
				</div>
				<div class = "text-xs-center mt-3">
					<v-pagination
						ref = "pagination"
						v-model = "page"
						:length = "maxPage"
					/>
				</div>
			</v-flex>
		</v-layout>
		<v-btn
			v-if = "hasPermission('contest.add_contest')"
			:to = "{
				name: 'ContestCreate',
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
	</v-container>
</template>


<script>

import SearchBar from '@/components/utils/search-bar';
import ContestList from './list';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import { mapGetters } from 'vuex';

export default {

	name: 'Contest',

	components: {
		ContestList,
		SearchBar,
	},

	data() {
		return {
			isLoading: false,
			contestList: [],
			filter: '',
			page: 1,
			maxPage: 0,
			debounce: 250,
		};
	},

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},

	watch: {
		page() {
			this.debounceFetchData();
		},
		filter() {
			this.debounceFetchData();
		},
	},

	mounted() {
		this.fetchData();
		this.debounceFetchData = debounce(this.fetchData, this.debounce);
	},

	methods: {
		fetchData() {
			this.isLoading = true;
			const query = gql`
				query ContestList($page: Int!, $filter: String) {
					contestList(page: $page, filter: $filter) {
						maxPage
						contestList {
							pk
							title
							settings {
								startTime
								endTime
							}
						}
					}
				}`;
			this.$apollo.query({
				query,
				variables: {
					page: this.page,
					filter: this.filter,
				},
			})
				.then(response => response.data.contestList)
				.then((data) => {
					this.maxPage = data.maxPage;
					this.contestList = data.contestList;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},


};
</script>
