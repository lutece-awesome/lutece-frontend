<template>
	<div class = "reply-box" >
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
					<v-layout
						class = "mt-3"
						wrap
						row
					>
						<div
							style = "cursor:pointer"
							@click = "toggleVote"
						>
							<v-icon
								:color = "iconColor"
								small >
								mdi-heart
							</v-icon>
							<span class = "subheader ml-1">
								{{ vote + rating - selfAttitude }}
							</span>
						</div>
						<div
							v-if = "hasEditPermission"
							class = "ml-3 subheader"
						>
							<span
								style = "cursor:pointer;"
								@click = "dialogVisiable = !dialogVisiable"
							>
								Edit
							</span>
						</div>
					</v-layout>
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
import ToggleReplyVote from './toggle-reply-vote';

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
			dialogVisiable: false,
			voteLoading: false,
			rating: 0,
		};
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'user/isAuthenticated',
		}),
		hasEditPermission() {
			return this.author.username === this.$store.getters['user/profile'].username || this.$store.getters['user/hasPermission']('reply.change_basereply');
		},
		iconColor() {
			return this.rating ? 'red lighten-2' : '';
		},
	},

	mounted() {
		this.rating = this.selfAttitude ? 1 : 0;
	},

	methods: {

		toggleVote() {
			if (this.voteLoading || !this.isAuthenticated) {
				return;
			}
			const previousRating = this.rating;
			this.voteLoading = true;
			this.rating = 1 - this.rating;
			ToggleReplyVote(this.pk)
				.catch(() => {
					this.rating = previousRating;
				})
				.finally(() => {
					this.voteLoading = false;
				});
		},
	},

};
</script>

<style scoped>
	.subheader {
		font-size: 14px;
		color: grey;
		font-weight:  400;
	}

	.card {
		cursor: default;
	}

	.reply-box {
		border-left: 3px #37474F solid;
	}
</style>
