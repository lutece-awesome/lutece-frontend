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
					<async-mixrend-component
						v-if = "withRender"
						:content = "title"
						class = "mt-4"
					/>
					<v-text-field
						v-else
						:value = "title"
						@input = "$emit( 'input-title' , $event )"/>
				</v-flex>
				<v-flex
					v-if = "withDisable"
					xs12
				>
					<v-checkbox
						:input-value = "disable"
						:disabled = "withRender"
						:label = "disable ? 'disable' : 'non-disable'"
						@change = "$emit( 'input-disable' , $event )"
					/>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Content </div>
					<async-mixrend-component
						v-if = "withRender"
						:content = "content"
						class = "mt-4"
					/>
					<v-textarea
						v-else
						:value = "content"
						auto-grow
						rows = "4"
						@input = "$emit( 'input-content' , $event )"
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
				:color = " isError ? 'error' : 'primary'"
				flat
				@click = "triggerDele"
			>
				Dele
			</v-btn>
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

export default {
	components: {
		AsyncMixrendComponent,
	},

	props: {
		pk: {
			type: Number,
			default: 0,
		},
		formTitle: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		withDisable: {
			type: Boolean,
			default: false,
		},
		disable: {
			type: Boolean,
			default: false,
		},
		submit: {
			type: Function,
			default: null,
		},
		dele: {
			type: Function,
			default: null,
		},
	},

	data() {
		return {
			withRender: false,
			isLoading: false,
			isError: false,
		};
	},

	methods: {
		triggerDele() {
			this.isLoading = false;
			this.isError = false;
			const func = this.dele;
			if (!func) {
				return;
			}
			this.isLoading = true;
			const data = {
				pk: this.pk,
				title: this.title,
				content: this.content,
			};
			const delePromise = func(data);
			delePromise
				.catch(() => {
					this.isError = true;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		triggerSubmit() {
			this.isLoading = false;
			this.isError = false;
			const func = this.submit;
			if (!func) {
				return;
			}
			this.isLoading = true;
			const data = {
				title: this.title,
				content: this.content,
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
</style>
