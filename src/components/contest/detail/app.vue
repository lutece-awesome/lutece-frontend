<template>
	<v-container
		:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
		class = "mt-4"
		fluid
	>
		<v-layout
			row
			wrap
			justify-center
		>
			<v-flex
				xs12
				md10
				xl8
			>
				<loading-spinner
					v-if = "isLoading"
					text = "Loading ..."
					style = "height: 600px"
				/>
				<error-spinner
					v-else-if = "isError"
					style = "height: 600px"
				/>
				<div v-else>
					<v-card>
						<v-tabs
							v-model = "tabs"
							fixed-tabs
							fluid
						>
							<v-tab
								:ripple = "false"
								:to = "{name: 'ContestSummary'}"
							>
								Summary
							</v-tab>
							<v-tab
								:ripple = "false"
								:to = "{name: 'ContestClarification'}"
							>
								Clarification
							</v-tab>
							<v-tab
								:ripple = "false"
								:to = "{name: 'ContestProblem'}"
							>
								Problem
							</v-tab>
							<v-tab
								:ripple = "false"
								:to = "{name: 'ContestSubmission'}"
							>
								Submission
							</v-tab>
							<v-tab
								:ripple = "false"
								:to = "{name: 'ContestRank'}"
							>
								Rank
							</v-tab>
						</v-tabs>
						<keep-alive>
							<router-view/>
						</keep-alive>
					</v-card>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	props: {
		pk: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			tabs: null,
			contest: null,
			isLoading: false,
			isError: false,
			formTitle: 'UESTC吃鸡',
		};
	},
};
</script>

<style scoped lang = "stylus">
	.title
		font-size : 20px
		color: grey
		font-weight: 500
		margin-bottom: 20px
</style>
