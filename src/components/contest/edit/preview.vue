<template>
	<div>
		<v-container class = "elevation-2">
			<v-layout
				row
				wrap
				fill-height
				align-center
				justify-center
			>
				<v-flex
					v-if = "formTitle"
					xs12
				>
					<div class = "text-xs-center title">
						{{ formTitle }}
					</div>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Title </div>
					<v-text-field
						:value = "title"
						:disabled = "withRender"
						@input = "$emit( 'input-title' , $event )"/>
				</v-flex>
				<v-flex xs12>
					<v-checkbox
						:input-value = "disable"
						:disabled = "withRender"
						:label = "disable ? 'disable' : 'non-disable'"
						@change = "$emit( 'input-disable' , $event )"
					/>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Contest Visibility </div>
					<v-tooltip bottom>
						<v-checkbox
							slot = "activator"
							:input-value = "isPublic"
							:disabled = "withRender"
							:label = "isPublic ? 'Public' : 'Private'"
							class = "pt-4"
							@change = "$emit( 'input-visibility' , $event )"
						/>
						<span>
							The private contest would cause permission denied for unapproved team.
						</span>
					</v-tooltip>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Max Team Member Number </div>
					<v-slider
						:value = "maxTeamMemberNumber"
						:tick-labels = "[1, 2, 3, 4, 5]"
						:min = "1"
						:max = "5"
						:disabled = "withRender"
						class = "slider"
						step = "1"
						ticks = "always"
						tick-size = "2"
						@input = "$emit( 'input-maxTeamMemberNumber' , $event)"
					/>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Start Time </div>
					<v-datetime-picker
						slot = "activator"
						:label = "startTime | moment('Y-MM-DD HH:mm')"
						:value = "startTime"
						:disabled = "withRender"
						class = "picker"
						@input = "$emit( 'input-startTime' , $event )"
					/>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > End Time </div>
					<v-datetime-picker
						slot = "activator"
						:label = "endTime | moment('Y-MM-DD HH:mm')"
						:value = "endTime"
						:disabled = "withRender"
						class = "picker"
						@input = "$emit( 'input-endTime' , $event )"
					/>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Problem </div>
					<v-list
						class = "mt-4 problemList"
						light>
						<v-list-tile
							v-for = "( each , index ) in problemList"
							:key = "index"
						>
							<v-list-tile-content>
								<v-list-tile-title>
									<router-link :to = "{name: 'ProblemDetail', params: {slug: each.slug }}" >
										{{ each.pk }} - {{ each.title }}
									</router-link>
								</v-list-tile-title>
							</v-list-tile-content>
							<v-list-tile-action
								v-show = "!withRender"
								@click = "$emit( 'input-removeProblem' , index)"
							>
								<v-icon style = "cursor: pointer" > mdi-close-circle </v-icon>
							</v-list-tile-action>
						</v-list-tile>
					</v-list>
					<problem-select
						v-show = "!withRender"
						v-model = "queryProblem"
						class = "problemList"
						@input = "$emit( 'input-appendProblem' , $event )"
					/>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title mb-1" > Note </div>
					<async-mixrend-component
						v-if = "withRender"
						:content = "note"
						class = "pt-2"
					/>
					<v-textarea
						v-else
						:value = "note"
						auto-grow
						rows = "4"
						@input = "$emit( 'input-note' , $event )"
					/>
				</v-flex>

			</v-layout>
		</v-container>
		<v-toolbar
			dense
			height = "48"
		>
			<v-switch
				v-model = "withRender"
				:label = "withRender ? 'Preview' : 'Edit' "
				color = "red"
				style = "width: 20%"
				hide-details
			/>
			<v-btn
				:loading = "isLoading"
				:color = " isError ? 'error' : 'primary' "
				flat
				@click = "triggerSubmit"
			>
				Submit
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>

import { AsyncMixrendComponent } from '@/components/async/mixrend/index';
import ProblemSelect from '@/components/problem/utils/auto-complete';

export default {
	components: {
		AsyncMixrendComponent,
		ProblemSelect,
	},

	props: {
		formTitle: {
			type: String,
			default: '',
		},
		pk: {
			type: Number,
			default: 0,
		},
		title: {
			type: String,
			required: true,
		},
		disable: {
			type: Boolean,
			default: false,
		},
		startTime: {
			type: Date,
			default: Date.now(),
		},
		endTime: {
			type: Date,
			default: Date.now(),
		},
		maxTeamMemberNumber: {
			type: Number,
			default: 1,
		},
		isPublic: {
			type: Boolean,
			default: true,
		},
		problemList: {
			type: Array,
			default: () => ([]),
		},
		note: {
			type: String,
			default: '',
		},
		submit: {
			type: Function,
			default: null,
		},
	},

	data() {
		return {
			withRender: false,
			isLoading: false,
			isError: false,
			queryProblem: null,
		};
	},

	methods: {
		triggerSubmit() {
			this.isLoading = false;
			this.isError = false;
			const func = this.submit;
			if (!func) {
				return;
			}
			this.isLoading = true;
			const data = {
				slug: this.slug,
				title: this.title,
				content: this.content,
				preview: this.preview,
				disable: this.disable,
			};
			const submitPromise = func(data);
			submitPromise
				.catch(() => {
					this.isError = true;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>

<style scoped lang = "stylus">
	.title
		font-size: 20px
		color: grey
		font-weight: 500
		margin-top: 12px
		margin-bottom: -12px
	.section-title
		font-size: 16px
		color: grey
		font-weight: 500
		margin-top: 12px
		margin-bottom: -12px
	.slider
		max-width: 600px
		margin-top: 32px
	.picker
		max-width: 600px
	.problemList
		max-width: 600px
		background: #fafafa !important
</style>
