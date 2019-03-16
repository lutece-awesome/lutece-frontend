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
							:indeterminate = " !isStarted && !isFinished"
							:value = "progress"
							color = "primary"
							height = "21"
						><div class="progress-text">{{ progressText }}</div></v-progress-linear>
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
								:to = "{name: 'ContestSubmissionSubmit'}"
							>
								Submit
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
import { setTimeout } from 'timers';

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
			startTime: null,
			endTime: null,
			currentTime: null,
			isFinished: null,
			isStarted: null,
		};
	},

	computed: {
		progress() {
			if (this.isStarted) {
				return ((this.currentTime - this.startTime) / (this.endTime - this.startTime)) * 100;
			}
			if (this.isFinished) {
				return 100;
			}
			return 0;
		},
		progressText() {
			if (this.isStarted) {
				return `Ends ${this.currentTime.to(this.endTime)}`;
			}
			if (this.isFinished) {
				return 'Finished';
			}
			return `Starts ${this.currentTime.to(this.startTime)}`;
		},
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
                        settings {
                            startTime
                            endTime
                        }
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
				.then((data) => { this.contest = data; this.initializeTime(); })
				.catch(() => { this.isError = true; })
				.finally(() => { this.isLoading = false; });
		},

		initializeTime() {
			this.startTime = this.$moment(this.contest.settings.startTime);
			this.endTime = this.$moment(this.contest.settings.endTime);
			this.currentTime = this.$moment();
			if (this.currentTime >= this.startTime && this.currentTime < this.endTime) {
				this.isStarted = true;
			} else if (this.currentTime >= this.endTime) {
				this.isFinished = true;
			}
			if (!this.isFinished) {
				this.updateTime();
			}
		},

		updateTime() {
			this.currentTime = this.$moment();
			if (this.currentTime >= this.endTime) {
				window.location.reload();
				this.isFinished = true;
			} else if (this.currentTime >= this.startTime && !this.isStarted) {
				window.location.reload();
			} else {
				setTimeout(() => { this.updateTime(); }, 1000);
			}
		},
	},
};
</script>
<style scoped>
.progress-text {
	text-align: center;
}
</style>
