<template>
	<v-container fiuld>
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
			<div class = "mt-2">
				<table class = "dt-table" >
					<tr>
						<td>Start Time</td>
						<td>{{ contest.settings.startTime | moment('Y-MM-DD HH:mm') }}</td>
					</tr>
					<tr>
						<td>End Time</td>
						<td>{{ contest.settings.endTime | moment('Y-MM-DD HH:mm') }}</td>
					</tr>
					<tr>
						<td>Privacy</td>
						<td>
							{{ contest.isPublic ? 'Public' : 'Private' }}
						</td>
					</tr>
					<tr>
						<td>Status</td>
						<td>
							{{ runningStatus }}
						</td>
					</tr>
					<tr>
						<td>Registered</td>
						<td>
							x {{ contest.registerMemberNumber }}
							<v-icon small> mdi-account </v-icon>
						</td>
					</tr>
					<tr>
						<td>Team Size</td>
						<td> x {{ contest.settings.maxTeamMemberNumber }} </td>
					</tr>
				</table>
			</div>
			<async-mixrend-component
				v-if = "contest.settings.note"
				:content = "contest.settings.note"
				class = "mt-4"/>
		</div>
	</v-container>
</template>

<script>

import gql from 'graphql-tag';
import { getRunningStatus } from '../utils';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';

export default {
	components: {
		AsyncMixrendComponent,
	},

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isLoading: true,
			isError: false,
			contest: null,
		};
	},

	computed: {
		runningStatus() {
			return getRunningStatus(this.contest.settings.startTime, this.contest.settings.endTime);
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
                query ContestSummary($pk: ID!){
                    contest(pk: $pk){
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

<style scoped lang = "stylus">
	@import '~vuetify/src/stylus/app';

	.section-title
		font-size: 30px
		color: grey
		font-weight: 700

	.section
		padding-start: 20px

	table.dt-table
		border-spacing 0px
		color rgba(0,0,0,0.6)
		td
			@extend .py-1
			border-width 0 0
			border-style solid
			border-color rgba(0,0,0,0.12)
		tr > td:first-child
			@extend .body-2
			width 120px
</style>
