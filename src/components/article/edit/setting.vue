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
				<v-flex
					v-if = "withPreview"
					xs12
				>
					<div class = "section-title" > Preview </div>
					<div
						v-line-clamp:20 = "2"
						v-if = "withRender"
						class = "mt-4"
					>
						{{ preview }}
					</div>
					<v-textarea
						v-else
						:value = "preview"
						auto-grow
						rows = "2"
						@input = "$emit( 'input-preview' , $event )"
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
		formTitle: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			default: '',
		},
		content: {
			type: String,
			required: true,
		},
		withPreview: {
			type: Boolean,
			default: false,
		},
		preview: {
			type: String,
			default: '',
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
	},

	data() {
		return {
			withRender: false,
			isLoading: false,
			isError: false,
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
</style>
