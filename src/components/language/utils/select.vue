<template>
	<v-select
		:value = "value"
		:items = "languageList"
		:item-text = "each => each.full"
		:item-value = "itemValue"
		:append-icon = "appendIcon"
		:label = "label"
		:solo = "solo"
		:flat = "flat"
		:clearable = "clearable"
		single-line
		hide-details
		dense
		menu-props = "offsetY"
		@input = "$emit( 'input' , $event )"
	/>
</template>

<script>

import Language from '@/plugins/language';

export default {
	props: {
		value: {
			type: Object,
			default: null,
		},
		label: {
			type: String,
			default: 'Language',
		},
		appendIcon: {
			type: String,
			default: '',
		},
		itemValue: {
			type: Function,
			default: each => each.full,
		},
		solo: {
			type: Boolean,
			default: false,
		},
		flat: {
			type: Boolean,
			default: false,
		},
		clearable: {
			type: Boolean,
			default: true,
		},
	},

	data: () => ({
		languageList: Language.all(),
	}),
};
</script>
