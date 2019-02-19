<template>
	<v-card>
		<v-card-title primary-title>
			<div
				:class = " result.textColor + '--text' "
				class = "headline mb-0"
			>
				<strong>
					{{ result.full }}
				</strong>
			</div>
		</v-card-title>
		<v-progress-linear
			:indeterminate = "isIndeterminate"
			:value = "progress"
			:color = "result.textColor"
			height = "5"
			class = "ma-0"/>
		<v-card-text>
			<table class = "submission-table output-code mt-2">
				<tr>
					<td>
						<div>
							Problem:
						</div>
					</td>
					<td class = "pl-1">
						<router-link
							:to = "{
								name: 'ProblemDetail',
								params: {
									slug: problemSlug
								}
							}"
							tag = "a"
						>
							{{ problemTitle }}
						</router-link>
					</td>
				</tr>
				<tr>
					<td>
						<div>
							User:
						</div>
					</td>
					<td class = "pl-1">
						<router-link
							:to = "{
								name: 'UserDetail',
								params: {
									username
								}
							}"
						>
							{{ username }}
						</router-link>
					</td>
				</tr>
				<tr>
					<td>
						<div>
							Time:
						</div>
					</td>
					<td class = "pl-1">
						<div>
							{{ submitTime }}
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div>
							Lang:
						</div>
					</td>
					<td
						class = "pl-1" >
						<span>
							{{ language.full }}
						</span>
					</td>
				</tr>
				<tr>
					<td>
						<div>
							Case:
						</div>
					</td>
					<td
						class = "pl-1" >
						<span :class = "result.textColor + '--text'">
							{{ caseList.length }} / {{ caseNumber }}
						</span>
					</td>
				</tr>
			</table>
		</v-card-text>
	</v-card>
</template>


<script>
export default {
	props: {
		result: {
			type: Object,
			required: true,
		},
		problemTitle: {
			type: String,
			required: true,
		},
		problemSlug: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		submitTime: {
			type: String,
			required: true,
		},
		language: {
			type: Object,
			required: true,
		},
		isIndeterminate: {
			type: Boolean,
			required: true,
		},
		caseNumber: {
			type: Number,
			required: true,
		},
		caseList: {
			type: Array,
			required: true,
		},
	},

	computed: {
		progress() {
			return (this.caseList.length / this.caseNumber) * 100;
		},
	},
};
</script>
