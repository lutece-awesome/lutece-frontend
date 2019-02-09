<template>
	<div>
		<div class = "display-1 text-xs-center mt-2">
			{{ title }}
		</div>
		<div class = "text-xs-center mt-2 section">
			<span> Created by </span>
			<v-avatar
				size = "28"
				class = "ml-2 mr-2"
			>
				<img :src = "author.attachInfo.gravatar" >
			</v-avatar>
			<router-link :to = "{name: 'UserDetail', params: {username: author.username }}" >
				{{ author.username }}
			</router-link>
		</div>
		<div class = "text-xs-center mt-2 section">
			<span> {{ createTime | moment("MMMM Do, YYYY") }} </span>
			<span class = "ml-1 mr-1" > | </span>
			<span> {{ getThoundNumberic(record.count) }} views </span>
			<span class = "ml-1 mr-1" > | </span>
			<span>
				{{ vote + rating - selfAttitude }} stars
				<v-icon
					:color = "iconColor"
					class = "ml-1"
					size = "20"
					style = "display: inline"
					@click = "toggleVote"
				>
					mdi-thumb-up-outline
				</v-icon>
			</span>
		</div>

		<v-divider class="my-3"/>
		<async-mixrend-component
			:content = "content"
			class = "subheading"
		/>
	</div>
</template>


<script>
import { getThoundNumberic } from '@/utils';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';
import ToggleArticleVote from '../basic/toggle-article-vote';
import Store from '@/plugins/essential/store';

export default {
	components: {
		AsyncMixrendComponent,
	},

	props: {
		pk: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Object,
			required: true,
		},
		record: {
			type: Object,
			required: true,
		},
		createTime: {
			type: String,
			required: true,
		},
		lastUpdateTime: {
			type: String,
			required: true,
		},
		vote: {
			type: Number,
			required: true,
		},
		selfAttitude: {
			type: Boolean,
			required: true,
		},
	},

	data() {
		return {
			rating: 0,
			isLoading: false,
		};
	},

	computed: {
		iconColor() {
			return this.rating ? 'red lighten-2' : 'grey darkgen-4';
		},
	},

	mounted() {
		this.rating = this.selfAttitude ? 1 : 0;
	},

	methods: {
		getThoundNumberic(number) {
			return getThoundNumberic(number);
		},
		toggleVote() {
			if (this.isLoading || !Store.getters['user/isAuthenticated']) {
				return;
			}
			const previousRating = this.rating;
			this.isLoading = true;
			this.rating = 1 - this.rating;
			ToggleArticleVote(this.pk)
				.catch(() => {
					this.rating = previousRating;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>

<style scoped>
	.section {
		color: #999;
	}

</style>
