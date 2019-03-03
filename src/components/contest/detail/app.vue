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
				<error-spinner v-else-if = "isError"/>
				<div v-else>
					<div class = "elevation-2">
						<div class = "headline pt-4 pl-4 primary--text">
							{{ contest.title }}
						</div>
						<v-progress-linear
							indeterminate
							height = "2"
						/>
					</div>
					<div
						class = "elevation-2 mt-4"
						style = "background: #fff"
					>
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
					</div>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import gql from 'graphql-tag';

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
			isLoading: true,
			isError: false,
			formTitle: '',
		};
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.isLoading = true;
			this.isError = false;
			const query = gql`
                query Contest($pk: ID!){
                    contest(pk: $pk){
                        title
                    }
                }
            `;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contest)
				.then((data) => { this.contest = data; })
				.catch(() => { this.isError = true; })
				.finally(() => { this.isLoading = false; });
		},
	},
};
</script>
