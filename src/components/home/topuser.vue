<template>
	<ApolloQuery
		:query = "require('@/graphql/home/topuser.gql')"
		:variables = "{ number }"
	>
		<template
			slot-scope = "{ result: { loading , error , data } }">
			<LoadingSpinner v-if = "loading" />
			<ErrorSpinner v-else-if = "error" />
			<div v-else-if = "data">
				<v-hover>
					<v-card
						slot-scope = "{ hover }"
						:class = "`elevation-${hover ? 4 : 1}`"
					>
						<v-data-table
							:items = "data.topUser"
							:headers = "headers"
							hide-actions
						>
							<template
								slot = "items"
								slot-scope="props"
							>
								<router-link
									:to = "{ name: 'UserDetail' , params: {username: props.item.username } }"
									tile
									tag = "tr"
									style = "cursor: pointer"
								>
									<td class = "text-xs-center">{{ formatRank( props.item.rank ) }}</td>
									<td class = "text-xs-center" >
										<div style = "white-space: nowrap;">
											<v-avatar
												size = "32"
												color="grey lighten-4"
											>
												<img :src = "props.item.gravataremail" >
											</v-avatar>
											<span class = "font-weight-medium ml-2"> {{ props.item.displayName }} </span>
										</div>
									</td>
									<td class="text-xs-center">
										<span class = "success--text" > {{ props.item.solved }} </span>
										<span> / </span>
										<span class = "error--text" > {{ props.item.tried }} </span>
									</td>
								</router-link>
							</template>
						</v-data-table>
					</v-card>
				</v-hover>
			</div>
		</template>
	</ApolloQuery>
</template>


<script>

const { formatRank } = require('@/utils');

export default {
	props: {
		number: {
			type: Number,
			default: 10,
		},
	},
	data: () => ({
		headers: [
			{
				text: '#',
				align: 'center',
				sortable: false,
			},
			{
				text: 'User',
				align: 'center',
				sortable: false,
			},
			{
				text: 'Solved',
				align: 'center',
				sortable: false,
			},
		],
	}),
	methods: {
		formatRank,
	},
};
</script>
