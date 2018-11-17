<template>
	<v-select
		:items = "languageList"
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

import LanguageList from '@/plugins/language';

export default {
	props: {
		value: {
			type: String,
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
	},

	data: () => ({
		languageList: LanguageList,
	}),
};
</script>
