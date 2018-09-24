<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 4 : 1}`"
		>
			<v-data-table
				:items = "userItem"
				:headers = "headers"
				:loading = "isLoading"
				hide-actions
			>
				<template
					slot="items"
					slot-scope="props">
					<router-link
						:to = "{ name: 'UserDetail' , params: {username: props.item.username } }"
						tile
						tag ="tr"
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
								<span class = "ml-2 font-weight-medium"> {{ props.item.displayName }} </span>
							</div>
						</td>
						<td class = "text-xs-center">
							<span class = "success--text" > {{ props.item.solved }} </span>
							<span> / </span>
							<span class = "error--text" > {{ props.item.tried }} </span>
						</td>
						<td class = "text-xs-center">
							{{ ( props.item.submissionStatistics.Ratio * 100 ).toFixed( 2 ) }} %
						</td>
					</router-link>

				</template>
			</v-data-table>
		</v-card>
	</v-hover>
</template>


<script>

const { formatRank } = require('@/utils');

export default {
	props: {
		userItem: {
			type: Array,
			default: () => [],
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		Ratio: {
			type: Number,
			default: 0,
		},
	},
	data: () => ({
		hidden: false,
		headers: [
			{
				text: 'Rank',
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
			{
				text: 'Ratio',
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
