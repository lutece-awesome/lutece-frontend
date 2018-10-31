<template>
	<v-form>
		<v-text-field
			v-model = "value.title"
			label="Title"
		/>
		<v-textarea
			v-model = "value.content"
			label="Content"
			auto-grow
		/>
	</v-form>
</template>

<script>
export default {
	props: {
		value: {
			type: Object,
			default: null,
		},
	},

	methods: {
	},
};
</script>
