<template>
	<v-card>
		<v-card-text>
			<v-data-table
				:items = "judge"
				:headers = "headers"
				dense
				hide-actions>
				<template
					slot = "items"
					slot-scope = "props">
					<tr>
						<td class = "text-xs-center">{{ props.item.case }}</td>
						<td
							:class = "getJudgeColor( props.item.result )"
							class = "text-xs-center" >
							{{ props.item.result }}
						</td>
						<td class = "text-xs-center">{{ props.item.time_cost }} ms</td>
						<td class = "text-xs-center">{{ props.item.memory_cost }} KiB</td>
					</tr>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>

import JudgeResult from '@/plugins/judge-result';

export default {
	props: {
		judge: {
			type: Array,
			default: () => ([]),
		},
		headers: {
			type: Array,
			default: null,
		},
	},

	methods: {
		getJudgeColor(result) {
			const isAC = this.isAccepted(result);
			return {
				'success--text': isAC,
				'error--text': !isAC,
			};
		},

		isAccepted(result) {
			return JudgeResult.valueOf[result] === JudgeResult.ac;
		},
	},
};
</script>
