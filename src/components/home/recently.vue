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

import ArticleDetail from '@/components/article/home/tile';

export default {

	components: {
		ArticleDetail,
	},

	data() {
		return {
			tab: null,
		};
	},
};
</script>

<style scoped>
    .curtain{
        min-height: 700px;
    }
</style>
