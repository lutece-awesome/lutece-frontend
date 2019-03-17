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
							:value = "tabs"
							fixed-tabs
							fluid
							@change = "updateTab"
						>
							<v-tab
								:ripple = "false"
							>
								Summary
							</v-tab>
							<v-tab
								:ripple = "false"
							>
								Clarification
							</v-tab>
							<v-tab
								:ripple = "false"
							>
								Problem
							</v-tab>
							<v-tab
								:ripple = "false"
							>
								Submit
							</v-tab>
							<v-tab
								:ripple = "false"
							>
								Submission
							</v-tab>
							<v-tab
								:ripple = "false"
							>
								Rank
							</v-tab>
						</v-tabs>
						<v-tabs-items
							:value = "currentDisplayTab"
						>
							<v-tab-item
								:reverse-transition = "false"
								:transition = "false"
								value = "ContestSummary"
								lazy
							>
								<summary-tab
									ref = "summary"
									:contest = "contest"
									@updateStatus = "updateProblemSummary"
								/>
							</v-tab-item>
							<v-tab-item
								:reverse-transition = "false"
								:transition = "false"
								value = "ContestClarification"
								lazy
							>
								<clarification-tab
									ref = "clarification"
									:pk = "pk"
								/>
							</v-tab-item>
							<v-tab-item
								:reverse-transition = "false"
								:transition = "false"
								value = "ContestProblem"
								lazy
							>
								<problem-tab
									ref = "problem"
									:contest = "contest"
									@updateStatus = "updateTeamProblemStatus"
								/>
							</v-tab-item>
							<v-tab-item
								:reverse-transition = "false"
								:transition = "false"
								value = "ContestSubmissionSubmit"
								lazy
							>
								<submit-tab
									ref = "submit"
									:contest = "contest"
									@submitSubmissionCallback = "submitSubmissionCallback"
								/>
							</v-tab-item>
							<v-tab-item
								:reverse-transition = "false"
								:transition = "false"
								value = "ContestSubmission"
								lazy
							>
								<submission-tab
									ref = "submission"
									:contest = "contest"
								/>
							</v-tab-item>
							<v-tab-item
								:reverse-transition = "false"
								:transition = "false"
								value = "ContestRank"
								lazy
							>
								<rank-tab
									ref = "rank"
									:contest = "contest"
								/>
							</v-tab-item>
						</v-tabs-items>
					</div>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import gql from 'graphql-tag';
import { setTimeout } from 'timers';
import SummaryTab from './summary';
import ClarificationTab from './clarification';
import ProblemTab from './problem';
import SubmitTab from './submit';
import SubmissionTab from './submission';
import RankTab from './rank';

export default {
	components: {
		SummaryTab,
		ClarificationTab,
		ProblemTab,
		SubmitTab,
		SubmissionTab,
		RankTab,
	},

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			tabs: null,
			currentDisplayTab: null,
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

	watch: {
		$route() {
			this.routeUpdate(true);
			this.updateDisplayTab();
		},
	},

	mounted() {
		this.fetchData();
	},

	created() {
		this.routeUpdate(true);
		this.updateDisplayTab();
	},

	methods: {
		routeUpdate(isRouteChanged = false) {
			const { name } = this.$route;
			let value = 0;
			switch (name) {
			case 'ContestSummary':
				value = 0;
				break;
			case 'ContestClarification':
				value = 1;
				break;
			case 'ContestProblem':
				value = 2;
				break;
			case 'ContestSpecifyProblem':
				value = 2;
				break;
			case 'ContestSubmissionSubmit':
				value = 3;
				break;
			case 'ContestSubmission':
				value = 4;
				break;
			case 'ContestRank':
				value = 5;
				break;
			default:
				value = 0;
				break;
			}
			this.updateTab(value, isRouteChanged);
		},

		updateTab(currentValue, isRouteChanged = false) {
			this.tabs = currentValue;
			if (isRouteChanged) {
				return;
			}
			let tabRef = null;
			let trviRoute = {};
			switch (this.tabs) {
			case 0:
				tabRef = this.$refs.summary;
				trviRoute = {
					name: 'ContestSummary',
				};
				break;
			case 1:
				tabRef = this.$refs.clarification;
				trviRoute = {
					name: 'ContestClarification',
				};
				break;
			case 2:
				tabRef = this.$refs.problem;
				trviRoute = {
					name: 'ContestProblem',
				};
				break;
			case 3:
				tabRef = this.$refs.submit;
				trviRoute = {
					name: 'ContestSubmissionSubmit',
				};
				break;
			case 4:
				tabRef = this.$refs.submission;
				trviRoute = {
					name: 'ContestSubmission',
				};
				break;
			case 5:
				tabRef = this.$refs.rank;
				trviRoute = {
					name: 'ContestRank',
				};
				break;
			default:
				tabRef = this.$refs.summary;
				trviRoute = {
					name: 'ContestSummary',
				};
				break;
			}
			this.$router.push(trviRoute);
			// Avoid the first initialized
			if (tabRef) {
				tabRef.init();
			}
		},

		updateDisplayTab() {
			let { name } = this.$route;
			if (name === 'ContestSpecifyProblem') {
				name = 'ContestProblem';
			}
			this.currentDisplayTab = name;
		},

		fetchData() {
			this.isLoading = true;
			this.isError = false;
			const query = gql`
                query Contest($pk: ID!){
                    contest(pk: $pk){
						pk
                        title
                        settings {
                            note
                            startTime
                            endTime
                            maxTeamMemberNumber
                        }
                        registered
                        registerMemberNumber
						isPublic
						problems {
							pk
							slug
							tried
							solved
							submit
							accept
							title
							content
							standardInput
							standardOutput
							constraints
							resources
							note
							limitation{
								timeLimit
								memoryLimit
								outputLimit
								cpuLimit
							}
							samples {
								sampleList{
									inputContent
									outputContent
								}
							}
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

		updateTeamProblemStatus() {
			const query = gql`
                query Contest($pk: ID!){
                    contest(pk: $pk){
						problems {
							tried
							solved
						}
                    }
                }
            `;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
				fetchPolicy: 'no-cache',
			})
				.then(response => response.data.contest)
				.then((data) => {
					if (!data) {
						return;
					}
					const { problems } = data;
					for (let i = 0; i < problems.length; i += 1) {
						Object.assign(this.contest.problems[i], problems[i]);
					}
				});
		},


		updateProblemSummary() {
			const query = gql`
                query Contest($pk: ID!){
                    contest(pk: $pk){
						problems {
							submit
							accept
							tried
							solved
						}
                    }
                }
            `;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
				fetchPolicy: 'no-cache',
			})
				.then(response => response.data.contest)
				.then((data) => {
					if (!data) {
						return;
					}
					const { problems } = data;
					for (let i = 0; i < problems.length; i += 1) {
						Object.assign(this.contest.problems[i], problems[i]);
					}
				});
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

		submitSubmissionCallback(pk) {
			this.$router.push({
				name: 'ContestSubmission',
			}, () => {
				this.$refs.submission.getSubmitSubmission(pk);
			});
		},

	},
};
</script>

<style scoped>
.progress-text {
	text-align: center;
	color: white;
}
</style>
