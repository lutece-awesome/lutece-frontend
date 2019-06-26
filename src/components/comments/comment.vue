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
							class = "ml-3"
							style = "cursor:pointer"
							@click = "onStartReply"
						>
							<v-icon small >
								mdi-comment
							</v-icon>
							<span class = "subheader ml-1" > {{ totalReplyNumber }} </span>
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
		<div :class = "{ 'ml-4': $vuetify.breakpoint.smAndUp , 'ml-1': $vuetify.breakpoint.xsOnly }">
			<div
				v-if = "beingReply"
				class = "pb-3" >
				<Editor
					:content = "replyContent"
					:row-number = "5"
					:submit = "submitCommentReply"
					@input-content = "replyContent = $event"
				/>
			</div>
			<reply-comment
				v-for = "each in reply"
				:key = "each.pk"
				:pk = "parseInt(each.pk,10)"
				:author = "each.author"
				:content = "each.content"
				:create-time = "each.createTime"
				:vote = "each.vote"
				:self-attitude = "each.selfAttitude"
				:last-update-time = "each.lastUpdateTime"
				:reply = "each.reply"
				@update-success = "$emit( 'update-success' , $event )"
			/>
		</div>
	</div>
</template>


<script>
import { mapGetters } from 'vuex';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';
import gql from '@/plugins/essential/graphql-tag';
import UpdateDialog from './update';
import ToggleReplyVote from './toggle-reply-vote';
import Editor from './editor';
import ReplyComment from './reply-comment';

export default {

	components: {
		AsyncMixrendComponent,
		UpdateDialog,
		Editor,
		ReplyComment,
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
		reply: {
			type: Array,
			required: true,
		},
		totalReplyNumber: {
			type: Number,
			required: true,
		},
	},

	data() {
		return {
			dialogVisiable: false,
			voteLoading: false,
			rating: 0,
			replyContent: '',
			beingReply: false,
			processingReplyRequest: false,
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
		onStartReply() {
			if (this.processingReplyRequest || !this.isAuthenticated) {
				return;
			}
			this.beingReply = !this.beingReply;
		},

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

		submitCommentReply(data) {
			if (this.processingReplyRequest) {
				return Promise.resolve();
			}
			this.processingReplyRequest = true;
			const { content } = data;
			const mutation = gql`
				mutation CreateCommentReply( $parent: ID!, $content: String!){
					createCommentReply(parent: $parent, content: $content){
						state
					}
				}
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					parent: this.pk,
					content,
				},
			})
				.then(response => response.data.CreateCommentReply)
				.then(() => {
					this.$emit('update-success');
				})
				.finally(() => {
					this.processingReplyRequest = false;
					this.beingReply = false;
					this.replyContent = '';
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
</style>
