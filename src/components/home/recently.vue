<template>
	<v-hover class = "mt-2 curtain">
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 6 : 1}`"
		>
			<v-card-text>
				<div class = "subheading font-weight-medium"> Recently Articles </div>
				<v-divider class = "mt-2 mb-2" />
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
