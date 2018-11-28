<template>
	<div
		class = "curtain"
	>
		<v-layout
			fill-height
			align-center
			justify-center
			ma-0
		>
			<div class = "blank--text pl-4 pr-4">
				<div class = "text-xs-center">
					<span class = "display-3 font-weight-bold" > Lutece </span>
					<span class = "font-weight-medium" > Ver {{ version }} </span>
				</div>
			</div>
		</v-layout>
	</div>

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
        margin-top: 20px;
    }
</style>
