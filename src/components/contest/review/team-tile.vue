<template>
	<v-card
		hover
		style = "cursor: default"
	>
		<div>
			<h2
				class = "headline pt-3 pl-3 pb-2"
				style = "text-align: start"
			>
				{{ team.name }}
			</h2>
		</div>
		<v-card-text>
			<v-layout
				row
				warp
			>
				<div
					v-for = "(each , index) in team.memberList"
					:key = "index"
					:class = "{ 'ml-3' : index > 0 }"
				>
					<router-link
						:to = "{name: 'UserDetail', params: {username: each.user.username }}"
					>
						<v-avatar size = "32">
							<img
								:src = "each.user.attachInfo.gravatar"
							>
						</v-avatar>
						<span class = "ml-2">
							{{ each.user.username }}
						</span>
						<v-icon
							:color = "each.confirmed ? 'light-green' : 'grey'"
							small
						>
							{{ each.confirmed ? 'mdi-check' : 'mdi-help' }}
						</v-icon>
					</router-link>
				</div>
			</v-layout>
		</v-card-text>

		<v-divider/>

		<v-card-actions>
			<button-dialog
				v-if = "!canJoin"
				:text = "content"
				:title = "title"
				btn-color = "success"
				btn-text = "JOIN"
			/>
			<v-btn
				v-else
				:disabled = "disabled"
				:loading = "isLoading"
				color = "success"
				@click = "triggerClick"
			> Join </v-btn>
		</v-card-actions>
	</v-card>
</template>


<script>

import ButtonDialog from './dialog';

export default {

	components: {
		ButtonDialog,
	},

	props: {
		team: {
			type: Object,
			default: null,
		},
		canJoin: {
			type: Boolean,
			default: false,
		},
		submit: {
			type: Function,
			default: Promise.resolve(),
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			title: 'Join Team',
			content: 'To join others\' team, you must exit your current team.',
			isLoading: false,
		};
	},

	methods: {
		triggerClick() {
			this.isLoading = true;
			this.submit(this.team.pk)
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
