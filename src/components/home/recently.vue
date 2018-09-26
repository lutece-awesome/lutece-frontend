<template>
	<v-hover class = "secondary mt-2 curtain">
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 6 : 1}`"
		>
			<v-card-text>
				123
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
        min-height:200px;
    }
</style>
