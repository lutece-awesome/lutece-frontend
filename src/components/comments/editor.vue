<template>
	<div class = "elevation-2">
		<div class = "pl-3 pr-3 mt-3">
			<async-mixrend-component-with-loading-spinner
				v-if = "withRender"
				:content = "content"
				class = "pt-2"
			/>
			<v-textarea
				v-else
				:value = "content"
				:loading = "isLoading"
				:rows = "rowNumber"
				auto-grow
				@input = "$emit( 'input-content' , $event )"
			/>
		</div>
		<v-toolbar
			dense
			height = "48"
			flat
			style = "z-index: 0 !important"
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
import { AsyncMixrendComponentWithLoadingSpinner } from '@/components/async/mixrend/index';

export default {

	components: {
		AsyncMixrendComponentWithLoadingSpinner,
	},

	props: {
		content: {
			type: String,
			required: true,
		},
		submit: {
			type: Function,
			required: true,
		},
		rowNumber: {
			type: Number,
			default: 9,
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
			this.isError = false;
			this.isLoading = true;
			return this.submit({
				content: this.content,
				reply: null,
			})
				.then(() => {
					this.$emit('submit-success');
					this.withRender = false;
					this.$emit('input-content', '');
				})
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
