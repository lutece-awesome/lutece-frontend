<template>
	<div>
		<div
			v-if = "displayTitle"
			class = "mb-3"
		>
			<v-icon size = "20" > mdi-comment </v-icon>
			<span class = "title ml-1" > Comments: </span>
		</div>
		<comment-list
			ref = "comments"
			:fetch-comments = "fetchComments"
		/>
		<div v-if = "isAuthenticated">
			<v-divider class = "mt-3 mb-3"/>
			<comment-editor
				:content = "replyComment"
				:submit = "submit"
				class = "mt-3"
				@input-content = "replyComment = $event"
				@submit-success = "submitSuccessCallback"
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
		};
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'user/isAuthenticated',
		}),
	},

	methods: {
		update() {
			this.$refs.comments.update();
		},
		submitSuccessCallback() {
			this.$refs.comments.refresh();
		},
	},
};
</script>
