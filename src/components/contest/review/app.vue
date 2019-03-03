<template>
	<v-container class = "elevation-2">
		<v-layout
			row
			wrap
			fill-height
			align-center
			justify-center
		>
			<loading-spinner
				v-if = "isLoading"
				style = "height: 600px"
			/>
			<error-spinner
				v-else-if = "isError"
				style = "height: 600px"
			/>
			<div v-else>
				<v-flex
					v-if = "formTitle"
					xs12
				>
					<div class = "text-xs-center title">
						{{ contest.title }} - Review
					</div>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Title </div>
					<v-text-field
						v-model = "title"
						:disabled = "withRender"
						@input = "$emit( 'input-title' , $event )"/>
				</v-flex>
			</div>
		</v-layout>
	</v-container>
</template>


<script>
export default {
	props: {
		pk: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			isLoading: true,
			isError: false,
			contest: null,
		};
	},
};
</script>

<style scoped lang = "stylus">
	.title
		font-size: 20px
		color: grey
		font-weight: 500
		margin-top: 12px
		margin-bottom: -12px
	.section-title
		font-size: 16px
		color: grey
		font-weight: 500
		margin-top: 12px
		margin-bottom: -12px
</style>
