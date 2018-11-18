<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover || isFocus ? 3 : 1}`"
		>
			<v-text-field
				:value = "value"
				:label = "label"
				hide-details
				prepend-inner-icon = "mdi-magnify"
				solo
				flat
				type = "search"
				@focus = "isFocus = true"
				@blur = "isFocus = false"
				@input = "$emit( 'input' , $event )"
			/>
		</v-card>
	</v-hover>
</template>

<script>

export default {
	props: {
		value: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: 'Search',
		},
	},
	data: () => ({
		isFocus: false,
	}),
};
</script>
