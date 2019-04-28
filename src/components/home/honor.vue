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
					:content = "require('@/docs/honor.md')"
					danger
					class = "mt-3 honor-content"
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
			title: 'Honor',
		};
	},
};
</script>

<style>
	.honor-content>.table {
		width: 100%;
		max-width: 65em;
		border: 1px solid #dedede;
		margin: 15px auto;
		border-collapse: collapse;
		empty-cells: show;
	}
	.honor-content>.table td {
		height: 35px;
		border: 1px solid #dedede;
		padding: 0 10px;
	}
	.honor-content>.table th {
		font-weight: bold;
		text-align: center !important;
		background: rgba(158,188,226,0.2);
		white-space: nowrap;
	}
	.honor-content>.table td:nth-child(1) {
		white-space: nowrap;
	}
</style>
