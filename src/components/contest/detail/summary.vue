<template>
	<v-container fiuld>
		<div>
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

			<div
				class = "mt-2"
				style = "margin-left: -10px;"
			>
				<v-btn
					:to = "{ name : 'ContestReview' , params: { pk: contest.pk } }"
					color = "primary"
					medium
				> {{ hasPermission('contest.view_contest') ? 'Review' : 'TEAM' }} </v-btn>
			</div>
			<async-mixrend-component
				v-if = "contest.settings.note"
				:content = "contest.settings.note"
				class = "mt-4"/>
			<div
				v-if = "contest.problems"
				class = "mt-4" >
				<v-data-table
					:items = "contest.problems"
					:headers-length = "3"
					hide-actions
				>
					<template slot = "headers">
						<tr
							justify-center
							align-center
						>
							<th
								role = "columnheader"
								scope = "col"
								class = "column text-xs-center"
								style = "width: 50%"
							>
								Problem
							</th>
							<th
								role = "columnheader"
								scope = "col"
								class = "column text-xs-center"
								style = "width: 25%"
							>
								Summary
							</th>
							<th
								role = "columnheader"
								scope = "col"
								class = "column text-xs-center"
								style = "width: 25%"
							>
								Status
							</th>
						</tr>
					</template>
					<template
						slot = "items"
						slot-scope = "{ item , index }"
					>
						<router-link
							:to = "{
								name: 'ContestSpecifyProblem',
								params: { id: String.fromCharCode( 65 + index ) }
							}"
							tag = "tr"
							style = "cursor: pointer;"
							tile
						>
							<td class = "text-xs-center nowrap">
								{{ String.fromCharCode(65 + index) }} - {{ item.title }}
							</td>
							<td class = "text-xs-center">
								{{ item.accept }} / {{ item.submit }}
							</td>
							<td class = "text-xs-center" >
								<v-icon
									v-if = "item.solved"
									color = "success"
								>
									mdi-check
								</v-icon>
								<v-icon
									v-else-if = "item.tried"
									color = "error"
								>
									mdi-close
								</v-icon>
							</td>
						</router-link>
					</template>
				</v-data-table>
			</div>
		</div>
		<v-btn
			v-if = "hasPermission('contest.change_contest')"
			:to = "{
				name: 'ContestUpdate',
				params: { pk: contest.pk }
			}"
			color = "accent"
			dark
			fab
			fixed
			bottom
			right
		>
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
	</v-container>
</template>

<script>

import { mapGetters } from 'vuex';
import { getRunningStatus } from '../utils';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';

export default {
	components: {
		AsyncMixrendComponent,
	},

	props: {
		contest: {
			type: Object,
			required: true,
		},
	},

	computed: {
		runningStatus() {
			return getRunningStatus(this.contest.settings.startTime, this.contest.settings.endTime);
		},
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},

	methods: {
		init() {
			this.$emit('updateStatus');
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

	table.df-table
		border-spacing 0px
		color rgba(0,0,0,0.6)
		td
			@extend .py-1, .subheading
			border-width 0 0 thin 0
			border-style solid
			border-color rgba(0,0,0,0.12)
		tr > td:first-child
			@extend .font-weight-bold
			text-align: center
		tr > td:nth-child(2)
			@extend .pl-4
		tr > td:nth-child(3)
			@extend .pl-4
</style>
