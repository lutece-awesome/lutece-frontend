<template>
	<v-container
		fluid
		grid-list-lg
	>
		<v-layout
			row
			wrap
			align-center
			justify-center
		>
			<v-flex
				xs12
				md10
				lg8
			>
				<loading-spinner
					v-if = "isLoading"
					style = "height: 600px"
				/>
				<error-spinner
					v-else-if = "isError"
					style = "height: 600px"
				/>
				<preview
					v-else
					:title = "title"
					:start-time = "startTime"
					:end-time = "endTime"
					:disable = "disable"
					:password = "password"
					:problem-list = "problemList"
					:note = "note"
					:submit = "updateContest"
					:max-team-member-number = "maxTeamMemberNumber"
					form-title = "Update Contest"
					@input-title = "title = $event"
					@input-disable = "disable = $event"
					@input-startTime = "startTime = $event"
					@input-endTime = "endTime = $event"
					@input-password = "password = $event"
					@input-maxTeamMemberNumber = "maxTeamMemberNumber = $event"
					@input-note = "note = $event"
					@input-appendProblem = "appendProblem"
					@input-removeProblem = "removeProblem"
				/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import gql from 'graphql-tag';
import Preview from './preview';
import { clearApolloCache } from '@/utils';

export default {
	components: {
		Preview,
	},

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			title: '',
			disable: false,
			startTime: new Date(),
			endTime: new Date(),
			maxTeamMemberNumber: 1,
			password: '',
			problemList: [],
			note: '',
			isLoading: false,
			isError: false,
		};
	},

	created() {
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
							note
							disable
							startTime
							endTime
							maxTeamMemberNumber
							password
						}
						problems {
							pk
							title
							slug
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
				.then((data) => {
					this.title = data.title;
					this.note = data.settings.note;
					this.disable = data.settings.disable;
					this.startTime = new Date(data.settings.startTime);
					this.endTime = new Date(data.settings.endTime);
					this.maxTeamMemberNumber = data.settings.maxTeamMemberNumber;
					this.password = data.settings.password;
					this.problemList = data.problems;
				})
				.catch(() => {
					this.isError = true;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		appendProblem(problem) {
			if (problem && !this.problemList.find(each => each.pk === problem.pk)) {
				this.problemList.push({
					pk: problem.pk,
					title: problem.title,
					slug: problem.slug,
				});
			}
		},
		removeProblem(index) {
			this.problemList.splice(index, 1);
		},
		updateContest() {
			const mutation = gql`
				mutation UpdateContest($pk: ID!, $title: String!, $note: String!, $disable: Boolean!, $startTime: DateTime!, $endTime: DateTime!, $maxTeamMemberNumber: Int!, $password: String!, $problems: String!) {
					updateContest(
						pk: $pk,
						title: $title,
						note: $note,
						disable: $disable,
						startTime: $startTime,
						endTime: $endTime,
						maxTeamMemberNumber: $maxTeamMemberNumber,
						password: $password,
						problems: $problems,
					) {
						pk
					}
				}
			`;

			return this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.pk,
					title: this.title,
					note: this.note,
					disable: this.disable,
					startTime: this.startTime,
					endTime: this.endTime,
					maxTeamMemberNumber: this.maxTeamMemberNumber,
					password: this.password,
					problems: JSON.stringify(this.problemList.map(each => each.pk)),
				},
			})
				.then(response => response.data.updateContest)
				.then((data) => {
					clearApolloCache().then(() => {
						this.$router.push({
							name: 'ContestDetail',
							params: {
								pk: data.pk,
							},
						});
					});
				});
		},
	},
};
</script>
