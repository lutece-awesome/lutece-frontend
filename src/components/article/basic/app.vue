<template>
	<v-container>
		<v-layout
			row
			justify-center
			wrap>
			<v-flex
				xs12
				md6>
				<article-edit
					:value = "value"
				/>
				<v-btn
					:loading = "isloading"
					:color="error ? &quot;error&quot; : &quot;primary&quot;"
					block
					@click = "submit"
				> Submit </v-btn>
			</v-flex>
			<v-flex
				xs12
				md6>
				<div
					v-mixrend = "value.content"
					class="mb-3" />
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>

import ArticleEdit from '@/components/article/basic/edit';
import CreateArticleGQL from '@/graphql/article/create.gql';

export default {
	components: {
		ArticleEdit,
	},
	data: () => ({
		value: {
			title: '',
			content: '',
		},
		isloading: false,
		error: false,
	}),

	methods: {
		submit() {
			this.$apollo.mutate({
				mutation: CreateArticleGQL,
				variables: {
					title: this.value.title,
					content: this.value.content,
				},
			})
				.then(response => response.data.CreateBlog);
		},
	},

};
</script>
