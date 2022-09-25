<template>
	<v-card
		:to = "{name: 'BlogDetail', params: {pk} }"
		hover
	>
		<div>
			<h2
				class = "headline pt-3 pl-3 pb-2"
				style = "text-align: start"
			>
				{{ title }}
			</h2>
		</div>

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
				<span>
					<!-- {{ getThoundNumberic(count) }} views -->
					{{ vote }} stars
					<v-icon
					color = "blue light-2"
					class = "ml-1"
					size = "20"
					style = "display: inline"
					>
						mdi-thumb-up-outline
					</v-icon>
				</span>

				<span class = "ml-1 mr-1" > | </span>
				<span>
					{{ getThoundNumberic(count) }} views
				</span>
			</span>
		</v-card-actions>
	</v-card>
</template>


<script>

import { getThoundNumberic } from '@/utils';

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
		lastUpdateTime: {
			type: String,
			default: '',
		},
		count: {
			type: Number,
			default: 0,
		},
		pk: {
			type: Number,
			default: 0,
		},
		vote: {
			type: Number,
			default: 0,
		}
	},

	methods: {
		getThoundNumberic(number) {
			return getThoundNumberic(number);
		},
	},
};
</script>

<style scoped>
	.content {
		text-align: start;
	}
</style>
