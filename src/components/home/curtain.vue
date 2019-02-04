<template>
	<v-layout
		class = "curtain"
		fill-height
		align-center
		justify-center
		ma-0
	>
		<div class = "pl-4 pr-4">
			<div class = "text-xs-center">
				<div class = "font-weight-black display-3">
					<v-img
						:src = "require('@/assets/logo.png')"
						height = "128"
						contain
					>
						<loading-spinner slot = "placeholder" />
					</v-img>
				</div>
				<v-divider
					color = "white"
					class = "mt-4 mb-4"
				/>
				<div class = "sub-title red--text font-weight-bold" >
					- Develop better Online Judge
				</div>
				<div class = "sub-title blue--text font-weight-bold mt-2" >
					- Learn computer science
				</div>
				<div class = "sub-title green--text font-weight-bold mt-2" >
					- Make programming contest easy
				</div>
				<div class = "mt-4" >
					<v-btn
						v-for = "( each , index ) in item"
						:key = "index"
						:color = "each.color"
						:to = "each.to"
					>
						<a
							v-if = "each.url"
							:href = "each.url"
							class = "white--text"
						>
							{{ each.info }}
						</a>
						<span v-else>
							{{ each.info }}
						</span>
					</v-btn>
				</div>
			</div>
		</div>
	</v-layout>

</template>


<script>

const { version } = require('@/utils');

export default {
	data: () => ({
		version,
		item: [
			{
				info: 'Start',
				color: 'success',
			},
			{
				info: 'BLOG',
				color: 'info',
				to: {
					name: 'Blog',
				},
			},
			{
				info: 'DEVELOP',
				color: 'yellow',
			},
			{
				info: 'CODEBASE',
				color: 'indigo',
				url: 'https://github.com/lutece-awesome',
			},
			{
				info: 'HONOR',
				color: 'red',
			},
		],
	}),
};
</script>

<style scoped>
    .curtain {
		opacity: 0.8;
        width: 100%;
        margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		height: 600px;
    }

</style>
