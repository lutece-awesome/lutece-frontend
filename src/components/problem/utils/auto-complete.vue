<template>
	<ApolloQuery
		:query = "require('@/graphql/problem/search.gql')"
		:variables = "{ filter: filter }"
		:skip = "skip"
		:debounce = "300"
	>
		<template
			slot-scope = "{ result: { data, error }, isLoading }">
			<v-autocomplete
				:value = "value"
				:search-input.sync = "filter"
				:append-icon = "appendIcon"
				:error = "error"
				:loading = "( !skip && ( !data || isLoading ) ) ? true : false"
				:items = "data ? data.problemSearch.problemList : []"
				:label = "label"
				:item-text = "each => each.title"
				:item-value = "each => each.slug"
				:filter = "() => true"
				single-line
				hide-no-data
				dense
				hide-selected
				clearable
				@input = "$emit( 'input' , $event )"
			>
				<template
					slot = "item"
					slot-scope = "{ item }"
				>
					{{ item.pk + ' - ' + item.title }}
				</template>
			</v-autocomplete>
		</template>
	</ApolloQuery>
</template>

<script>

export default {
	props: {
		value: {
			type: String,
			default: '',
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
