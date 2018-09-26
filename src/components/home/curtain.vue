<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 6 : 1}`"
		>
			<div
				class = "curtain secondary"
			>

				<v-layout
					fill-height
					align-center
					justify-center
					ma-0
				>
					<div class = "white--text pl-4 pr-4 pt-4 pb-4">
						<div class = "text-xs-center">
							<span class = "display-3 font-weight-bold" > Lutece </span>
							<span class = "font-weight-medium" > Ver {{ version }} </span>
						</div>
						<div class = "text-xs-center subheading mt-2">
							<!-- <span> In Lutece, meet the future. </span> -->
						</div>
					</div>
				</v-layout>
			</div>
		</v-card>
	</v-hover>
</template>


<script>

const { version } = require('@/utils');

export default {
	data: () => ({
		version,
	}),
};
</script>

<style scoped>
    .curtain {
		opacity:0.7;
        width: 100%;
        height: 350px;
    }
</style>
