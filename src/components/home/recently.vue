<template>
	<div class = "curtain">
		<v-tabs
			v-model = "tab"
			fixed-tabs
		>
			<v-tab :ripple = "false">
				Article
			</v-tab>
			<v-tab
				:ripple = "false"
				disabled
			>
				Guide
			</v-tab>
			<v-tab
				:ripple = "false"
				disabled
			>
				Honor
			</v-tab>
		</v-tabs>

		<v-tabs-items
			v-model = "tab"
		>
			<v-tab-item/>

			<v-tab-item>
				<div/>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>


<script>

import ArticleDetail from '@/components/article/detail/app';

export default {

	components: {
		ArticleDetail,
	},
};
</script>

<style scoped>
    .curtain{
        min-height: 700px;
    }
</style>
