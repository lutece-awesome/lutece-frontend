<template>
	<v-card>
		<v-card-text>
			<v-data-table
				:items = "caseList"
				:headers = "headers"
				dense
				hide-actions
			>
				<template
					slot = "items"
					slot-scope = "props">
					<tr>
						<td class = "text-xs-center">{{ props.item.case }}</td>
						<td
							:class = "props.item.result.textColor + '--text'"
							class = "text-xs-center" >
							{{ props.item.result.full }}
						</td>
						<td class = "text-xs-center">{{ props.item.timeCost }} ms</td>
						<td class = "text-xs-center">{{ props.item.memoryCost }} KiB</td>
					</tr>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>

export default {
	props: {
		caseList: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			headers: [
				{
					text: 'Case',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Verdict',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Time',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Memory',
					align: 'center',
					sortable: false,
				},
			],
		};
	},
};
</script>
