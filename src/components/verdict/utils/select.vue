<template>
	<v-select
		:items = "verdictList"
		:item-text = "itemText"
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

import Verdict from '@/modules/verdict/main';

export default {
	props: {
		value: {
			type: Object,
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
		itemText: {
			type: Function,
			default: each => each.full,
		},
		itemValue: {
			type: Function,
			default: each => each,
		},
	},

	data: () => ({
		verdictList: Verdict.all(),
	}),
};
</script>
