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
				<preview
					:title = "title"
					:start-time = "startTime"
					:end-time = "endTime"
					:disable = "disable"
					:is-public = "isPublic"
					:problem-list = "problemList"
					:note = "note"
					:submit = "createContest"
					:max-team-member-number = "maxTeamMemberNumber"
					form-title = "Create Contest"
					@input-title = "title = $event"
					@input-disable = "disable = $event"
					@input-startTime = "startTime = $event"
					@input-endTime = "endTime = $event"
					@input-visibility = "isPublic = $event"
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

	data() {
		return {
			title: '',
			disable: false,
			startTime: new Date(),
			endTime: new Date(),
			maxTeamMemberNumber: 1,
			isPublic: true,
			problemList: [],
			note: '',
		};
	},

	methods: {
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
		createContest() {
			const mutation = gql`
				mutation CreateContest($title: String!, $note: String!, $disable: Boolean!, $startTime: DateTime!, $endTime: DateTime!, $maxTeamMemberNumber: Int!, $isPublic: Boolean!, $problems: String!) {
					createContest(
						title: $title,
						note: $note,
						disable: $disable,
						startTime: $startTime,
						endTime: $endTime,
						maxTeamMemberNumber: $maxTeamMemberNumber,
						isPublic: $isPublic,
						problems: $problems,
					) {
						pk
					}
				}
			`;

			return this.$apollo.mutate({
				mutation,
				variables: {
					title: this.title,
					note: this.note,
					disable: this.disable,
					startTime: this.startTime,
					endTime: this.endTime,
					maxTeamMemberNumber: this.maxTeamMemberNumber,
					isPublic: this.isPublic,
					problems: JSON.stringify(this.problemList.map(each => each.pk)),
				},
			})
				.then(response => response.data.createContest)
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
