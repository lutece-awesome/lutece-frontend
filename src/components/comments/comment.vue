<template>
	<div>
		<v-card
			hover
			class = "mt-2 card"
		>
			<div class = "pl-1 pr-1" >
				<v-card-text
					class = "mb-4" >
					<div>
						<v-avatar size = "40" >
							<img :src = "author.attachInfo.gravatar" >
						</v-avatar>
						<router-link
							:to = "{name: 'UserDetail', params: {username: author.username}}"
							class = "ml-2"
						>
							{{ author.username }}
						</router-link>
						<span
							class = "ml-2"
							style = "color:#999;" >
							<v-icon small>
								mdi-clock-outline
							</v-icon>
							<span
								:title = "createTime | moment('Y-MM-DD HH:mm:ss')"
								class = "humanize-time"
							>
								{{ createTime | moment("from") }}
							</span>
						</span>
					</div>
					<async-mixrend-component
						:content = "content"
						class = "mt-3 commentContent"
					/>
					<div
						v-if = "hasEditPermission"
						class = "mt-3 subheader"
					>
						<span
							style = "cursor:pointer;"
							@click = "dialogVisiable = !dialogVisiable"
						>
							Edit
						</span>
					</div>
					<update-dialog
						v-if = "dialogVisiable"
						:value = "dialogVisiable"
						:pk = "pk"
						:content = "content"
						@input = "dialogVisiable = !dialogVisiable"
						@update-success = "$emit( 'update-success' , $event )"
					/>
				</v-card-text>
			</div>
		</v-card>
	</div>
</template>


<script>
import { mapGetters } from 'vuex';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';
import UpdateDialog from './update';

export default {

	components: {
		AsyncMixrendComponent,
		UpdateDialog,
	},

	props: {
		pk: {
			type: Number,
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
		createTime: {
			type: String,
			required: true,
		},
		lastUpdateTime: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			dialogVisiable: false,
		};
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'user/isAuthenticated',
		}),
		hasEditPermission() {
			return this.author.username === this.$store.getters['user/profile'].username || this.$store.getters['user/hasPermission']('reply.change_basereply');
		},
	},
};
</script>

<style scoped>
	.subheader {
		font-size: 16px;
		color: grey;
		font-weight:  400;
	}

	.card {
		cursor: default;
	}
</style>
