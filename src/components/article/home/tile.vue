<template>
	<v-card
		class = "elevation-2"
	>
		<v-card-title primary-title>
			<div>
				<h2 class = "headline"> {{ title }} </h2>
				<div class = "mt-2 grey--text">
					<v-avatar size = "32">
						<img :src = "gravatar" >
					</v-avatar>
					<a class = "ml-2" >{{ username }}</a>
					<span class = "ml-1 mr-1" > | </span>
					<span> 1.5K views </span>
				</div>
			</div>
		</v-card-title>

		<v-card-text>
			<pre class = "preview">{{ preview }}</pre>
		</v-card-text>

		<v-divider/>

		<v-card-actions>
			<v-btn
				flat
				color = "orange"
			>
				Read More
			</v-btn>

			<v-spacer/>

			<span class = "grey--text" > Updated on {{ createTime | moment("MMMM Do, YYYY") }}</span>
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
		createTime: {
			type: String,
			default: '',
		},
	},
};
</script>


<style scoped>
	.preview{
		max-height: 175px;
		height: auto;
		font-size: 14px;
		line-height: 25px;
		overflow: hidden;
	}
</style>
