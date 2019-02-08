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
					:with-preview = "true"
					:preview = "preview"
					:submit = "submit"
					form-title = "Create Blog"
					@input-title = "title = $event"
					@input-content = "content = $event"
					@input-preview = "preview = $event"
					@input-disable = "disable = $event ? true : false"
				/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import gql from '@/plugins/essential/graphql-tag';
import ArticleSetting from '../edit/setting';
import { clearApolloCache } from '@/utils';

export default {
	components: {
		ArticleSetting,
	},

	data() {
		return {
			title: '',
			content: '',
			preview: '',
		};
	},

	methods: {
		submit(data) {
			const mutation = gql`
                mutation CreateHomeArticle( $title: String! , $preview: String! ,$content: String! ){
                    createHomeArticle( title: $title, preview: $preview, content: $content ){
                        slug
                    }
                }
            `;
			return this.$apollo.mutate({
				mutation,
				variables: {
					title: data.title,
					content: data.content,
					preview: data.preview,
				},
			}).then((response) => {
				clearApolloCache().finally(
					() => {
						this.$router.push({
							name: 'BlogDetail',
							params: {
								slug: response.data.createHomeArticle.slug,
							},
						});
					},
				);
			});
		},
	},
};
</script>
