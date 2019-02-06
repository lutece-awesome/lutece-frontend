<template>
	<v-layout
		fill-height
		align-center
		justify-center
		ma-0
	>
		<v-flex text-xs-center>
			<v-progress-circular
				:size = "size"
				:color = "color"
				indeterminate
			/>
			<div
				v-if = "text"
				class = "mt-2"
			>
				{{ text }}
			</div>
		</v-flex>
	</v-layout>
</template>

<script>

import getRandomColor from './random-color';

export default {
	props: {
		size: {
			type: Number,
			default: 30,
		},
		text: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			color: getRandomColor(),
		};
	},
};
</script>
