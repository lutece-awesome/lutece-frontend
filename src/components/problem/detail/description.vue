<template>
	<ApolloQuery
		:query = "require('@/graphql/problem/detail.gql')"
		:variables = "{ slug }"
	>
		<template
			slot-scope = "{ result: { loading , error , data } , isLoading }"
		>
			<loading-spinner
				v-if = "(loading || !data || isLoading ) && !error"
				style = "height: 300px"
			/>
			<error-spinner v-else-if = "error" />
			<v-container
				v-else
				fiuld
			>
				<preview :problem = "data.problem"/>
			</v-container>
		</template>
	</ApolloQuery>
</template>

<script>
import Preview from './preview';

export default {
	components: {
		Preview,
	},
	props: {
		slug: {
			type: String,
			required: true,
		},
	},
};
</script>
