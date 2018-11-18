<template>
	<ApolloQuery
		:query = "require('@/graphql/user/search.gql')"
		:variables = "{ filter: filter }"
		:skip = "skip"
		:debounce = "300"
	>
		<template
			slot-scope = "{ result: { data, error }, isLoading }">
			<v-autocomplete
				:search-input.sync = "filter"
				:append-icon = "appendIcon"
				:error = "error"
				:loading = "( !skip && ( !data || isLoading ) ) ? true : false"
				:items = "data ? data.userSearch.userList : []"
				:label = "label"
				:item-text = "each => each.username"
				:item-value = "each => each.username"
				single-line
				dense
				hide-no-data
				hide-selected
				clearable
				@input = "$emit( 'input' , $event )"
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
		</template>
	</ApolloQuery>
</template>

<script>

export default {
	props: {
		value: {
			type: Object,
			default: null,
		},
		label: {
			type: String,
			default: '',
		},
		appendIcon: {
			type: String,
			default: '',
		},
	},

	data: () => ({
		filter: '',
		skip: true,
	}),

	watch: {
		filter(current) {
			this.skip = !current;
		},
	},
};
</script>
