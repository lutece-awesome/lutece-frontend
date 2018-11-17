<template>
	<v-select
		:items = "verdictList"
		:item-text = "each => each.full"
		:item-value = "itemValue"
		:append-icon = "appendIcon"
		:label = "label"
		single-line
		hide-details
		dense
		clearable
		menu-props="offsetY"
		@input = "$emit( 'input' , $event)"
	/>
</template>

<script>

import Verdict from '@/plugins/verdict';

export default {
	props: {
		value: {
			type: String,
			default: null,
		},
		label: {
			type: String,
			default: 'Verdict',
		},
		appendIcon: {
			type: String,
			default: '',
		},
		itemValue: {
			type: Function,
			default: each => each.full,
		},
	},

	data: () => ({
		verdictList: Verdict.all(),
	}),
};
</script>
