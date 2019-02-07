<template>
	<v-container>
		<v-layout
			row
			fill-height
			align-center
			justify-center
			wrap
		>
			<v-flex
				xs12
				md10
				lg8
			>
				<div class = "font-weight-bold display-1 text-xs-center">
					{{ title }}
				</div>
				<async-mixrend-component-with-loading-spinner
					:content = "require('@/docs/develop.md')"
					class = "mt-3"
					style = "fontSize: 16px;"
				/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import { AsyncMixrendComponentWithLoadingSpinner } from '@/components/async/mixrend/index';

export default {
	components: {
		AsyncMixrendComponentWithLoadingSpinner,
	},
	data() {
		return {
			title: 'Lutece Development Guideline',
		};
	},
};
</script>

<style scope>
	p {
		margin-bottom: 6px !important;
	}
</style>
