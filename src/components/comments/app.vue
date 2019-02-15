<template>
	<div>
		<div>
			<v-icon size = "20" > mdi-comment </v-icon>
			<span class = "title ml-1" > Comments: </span>
		</div>
		<div
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
		</div>
		<comment-editor
			v-else
			:content = "replyComment"
			:trigger-promise = "submitComment"
			class = "mt-3"
			@input-content = "replyComment = $event"
		/>
	</div>
</template>


<script>
import { mapGetters } from 'vuex';
import CommentEditor from './editor';
// import gql from '@/plugins/essential/graphql-tag';

export default {

	components: {
		CommentEditor,
	},

	data() {
		return {
			replyComment: '',
		};
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'user/isAuthenticated',
		}),
	},

	methods: {
		submitComment() {
			// const mutation = gql`

			// `;
			// return new Promise((resolve, reject) => {

			// });
		},
	},
};
</script>
