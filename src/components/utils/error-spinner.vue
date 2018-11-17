<template>
	<v-layout
		fill-height
		align-center
		justify-center
		ma-0
	>
		<v-alert
			:value = "true"
			type = "error"
			outline
		>
			<span class = "font-weight-medium subheading" > {{ msg }} </span>
		</v-alert>
	</v-layout>
</template>


<script>
export default {
	props: {
		msg: {
			type: String,
			default: 'Sorry, an unexpected error was occured, please refresh the browser.',
		},
	},
};
</script>
