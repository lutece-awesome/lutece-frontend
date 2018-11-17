<template>
	<ApolloQuery
		:query = "require('@/graphql/user/search.gql')"
		:variables = "{ filter: value }"
		:debounce = "300"
	>
		<template
			slot-scope = "{ result: { loading, error }, isLoading }">
			<v-autocomplete
				:value = "value"
				:error = "error"
				:error-messages = "error ? errorMessage : ''"
				hide-no-data
				@input = "$emit( 'input' , $event )"
			/>
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
		errorMessage: {
			type: String,
			default: 'Unexcepted error occured during look up user.',
		},
	},
};
</script>
