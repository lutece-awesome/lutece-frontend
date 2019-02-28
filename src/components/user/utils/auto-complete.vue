<template>
	<div>
		<v-autocomplete
			v-model = "userData"
			:append-icon = "appendIcon"
			:loading = "isLoading"
			:error = "isError"
			:items = "userResultList"
			:label = "label"
			:search-input.sync = "searchInput"
			:item-text = "getItemText"
			:item-value = "getItemValue"
			hide-selected
			single-line
			dense
			hide-no-data
			clearable
		>
			<template
				slot = "item"
				slot-scope = "{ item }"
			>
				<v-list-tile-avatar>
					<v-img
						:src = "item.attachInfo.gravatar"
						height = "32"
						contain/>
				</v-list-tile-avatar>
				<v-list-tile-content v-text = "item.username" />
			</template>
		</v-autocomplete>
	</div>
</template>

<script>

import gql from 'graphql-tag';
import debounce from 'lodash/debounce';

export default {
	props: {
		label: {
			type: String,
			default: '',
		},
		appendIcon: {
			type: String,
			default: '',
		},
		debounce: {
			type: Number,
			default: 200,
		},
		inputValue: {
			type: Function,
			default: each => each.username,
		},
	},

	data: () => ({
		userData: null,
		filter: '',
		searchInput: null,
		userResultList: [],
		isLoading: false,
		isError: false,
	}),

	watch: {
		searchInput(val) {
			this.debounceFetchData(val);
		},
		userData(val) {
			this.$emit('input', val ? this.inputValue(val) : null);
		},
	},

	mounted() {
		this.debounceFetchData = debounce(this.fetchData, this.debounce);
	},

	methods: {
		getItemText(item) {
			return item.username;
		},
		getItemValue(item) {
			return item;
		},
		fetchData(val) {
			if (!val) {
				this.userData = null;
				this.userResultList = [];
				return;
			}
			const query = gql`
				query UserSearchGQL($filter: String) {
					userSearch(filter: $filter) {
						userList {
							username
							attachInfo{
								gravatar
							}
						}
					}
				}`;
			this.isLoading = true;
			this.isError = false;
			this.$apollo.query({
				query,
				variables: {
					filter: val,
				},
			})
				.then((response) => { this.userResultList = response.data.userSearch.userList; })
				.catch(() => { this.isError = true; })
				.finally(() => { this.isLoading = false; });
		},
	},
};
</script>
