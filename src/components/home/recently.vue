<template>
	<v-hover class = "mt-2 curtain">
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 6 : 1}`"
		>
			<v-card-text>
				<v-layout
					fill-height
					align-center
					justify-center
					ma-0
				>
					<div style = "margin-top: 200px">
						<span class = "headline font-weight-medium grey--text"> No article available </span>
					</div>
				</v-layout>
			</v-card-text>
		</v-card>
	</v-hover>
</template>


<script>
export default {

};
</script>

<style scoped>
    .curtain{
        min-height: 600px;
    }
</style>
