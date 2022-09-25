<template>
	<v-container
		fluid
		grid-list-lg
	>
		<v-layout
			row
			wrap
			align-center
			justify-center
		>
			<v-flex
				xs12
				md10
				lg8
			>
				<article-setting
					:title = "title"
					:content = "content"
					:submit = "submit"
					form-title = "Create Blog"
					@input-title = "title = $event"
					@input-content = "content = $event"
				/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import gql from '@/plugins/essential/graphql-tag';
import ArticleSetting from '../edit/user_article_setting';
import { clearApolloCache } from '@/utils';

export default {
	components: {
		ArticleSetting,
	},

	data() {
		return {
			title: '',
			content: '',
		};
	},

	methods: {
		submit(data) {
			const mutation = gql`
                mutation CreateUserArticle( $title: String!, $content: String! ){
                    createUserArticle( title: $title, content: $content ){
						pk
                    }
                }
            `;
			return this.$apollo.mutate({
				mutation,
				variables: {
					title: data.title,
					content: data.content,
				},
			}).then((response) => {
				clearApolloCache().finally(
					() => {
						this.$router.push({
							name: 'Blog',
						});
					},
				);
			});
		},
	},
};
</script>
