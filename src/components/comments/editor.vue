<template>
	<div class = "elevation-1">
		<div class = "pl-3 pr-3 pb-3">
			<async-mixrend-component-with-loading-spinner
				v-if = "withRender"
				:content = "content"
				class = "pt-3"
			/>
			<v-textarea
				v-else
				:value = "content"
				auto-grow
				rows = "4"
				@input = "$emit( 'input-content' , $event )"
			/>
		</div>
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

		},
	},
};
</script>
