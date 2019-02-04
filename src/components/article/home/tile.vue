<template>
	<v-card hover>
		<div style = "width: 100%">
			<h2
				class = "headline pt-3 pl-3 pb-2"
				style = "text-align: start"
			>
				{{ title }}
			</h2>
		</div>

		<v-card-text>
			<div
				v-line-clamp:20 = "2"
				class = "content"
				fill-height
				align-center
				justify-center
				ma-0
			>
				{{ preview }}
			</div>
		</v-card-text>

		<v-divider/>

		<v-card-actions class = "mt-1 mb-3 ml-2 mr-2 " >

			<div class = "grey--text">
				<router-link
					:to = "{name: 'UserDetail', params: {username}}"
				>
					<v-avatar size = "32">
						<img :src = "gravatar" >
					</v-avatar>
					<span class = "ml-2">
						{{ username }}
					</span>
				</router-link>
			</div>

			<v-spacer/>

			<span class = "grey--text" >
				<span> 1.5K views </span>
			</span>
		</v-card-actions>
	</v-card>
</template>


<script>
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
		username: {
			type: String,
			default: '',
		},
		gravatar: {
			type: String,
			default: '',
		},
		preview: {
			type: String,
			default: '',
		},
		lastUpdateTime: {
			type: String,
			default: '',
		},
	},
};
</script>

<style scoped>
	.content {
		text-align: start;
	}
</style>
