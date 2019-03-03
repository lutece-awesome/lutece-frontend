<template>
	<div>
		<div
			v-if = "displayTitle"
			class = "mb-3"
		>
			<v-icon size = "20" > mdi-comment </v-icon>
			<span class = "title ml-1" > Comments: </span>
		</div>
		<!-- <div
			v-if = "!isAuthenticated"
			class = "mt-3"
		>
			<v-card
				:to = "{ name: 'Login' }"
				elevation = "1"
			>
				<v-card-title class = "justify-center grey--text">
					<strong> Login to Comment </strong>
					<v-icon
						size = "20"
						class = "ml-2"
					>
						mdi-comment-text
					</v-icon>
				</v-card-title>
			</v-card>
		</div> -->
		<comment-list
			:fetch-comments = "fetchComments"
			:re-fetch = "reFetch"
		/>
		<div v-if = "isAuthenticated">
			<v-divider class = "mt-3 mb-3"/>
			<comment-editor
				:content = "replyComment"
				:submit = "submit"
				class = "mt-3"
				@submit-success = "reFetch = !reFetch"
				@input-content = "replyComment = $event"
			/>
		</div>
	</div>
</template>


<script>
import { mapGetters } from 'vuex';
import CommentEditor from './editor';
import CommentList from './comments';

export default {

	components: {
		CommentEditor,
		CommentList,
	},

	props: {
		displayTitle: {
			type: Boolean,
			default: true,
		},
		fetchComments: {
			type: Function,
			required: true,
		},
		submit: {
			type: Function,
			required: true,
		},
	},

	data() {
		return {
			replyComment: '',
			commentsArray: [],
			reFetch: false,
		};
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'user/isAuthenticated',
		}),
	},
};
</script>
