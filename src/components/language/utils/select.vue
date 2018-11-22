<template>
	<v-select
		:value = "value"
		:items = "languageList"
		:item-value = "each => each"
		:item-text = "itemText"
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

import Language from '@/modules/language/main';

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
		solo: {
			type: Boolean,
			default: false,
		},
		flat: {
			type: Boolean,
			default: false,
		},
		itemText: {
			type: Function,
			default: each => each.full,
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
