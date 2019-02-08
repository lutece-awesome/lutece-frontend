<template>
	<div>
		<div class = "display-1 text-xs-center mt-2">
			{{ title }}
		</div>
		<div
			class = "text-xs-center mt-2"
			style = "color:#999;"
		>
			<div>
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
			<div>
				<span> {{ createTime | moment("MMMM Do, YYYY") }} </span>
				<span class = "ml-1 mr-1" > | </span>
				<span> {{ getThoundNumberic(record.count) }} views </span>
				<span class = "ml-1 mr-1" > | </span>
				<span>
					0 stars
					<v-icon class = "ml-1" >mdi-thumb-up-outline </v-icon>
				</span>
			</div>
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
	},

	methods: {
		getThoundNumberic(number) {
			return getThoundNumberic(number);
		},
	},
};
</script>
