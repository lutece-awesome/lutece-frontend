<template>
	<div>
		<loading-spinner v-if = "isLoading"/>
		<error-spinner v-else-if = "isError"/>
		<comment
			v-for = "( each , index ) in articleCommentList"
			:key = "index"
			:author = "each.author"
			:content = "each.content"
			:create-time = "each.createTime"
			:last-update-time = "each.lastUpdateTime"
		/>
		<div class = "text-xs-center mt-3">
			<v-pagination
				ref = "pagination"
				v-model = "page"
				:length = "maxPage"
			/>
		</div>
	</div>
</template>

<script>
import comment from '@/components/comments/comment';

export default {
	components: {
		comment,
	},

	props: {
		fetchComments: {
			type: Function,
			required: true,
		},
	},

	data() {
		return {
			isLoading: false,
			isError: false,
			page: 1,
			maxPage: 0,
			articleCommentList: [],
		};
	},

	watch: {
		page() {
			this.update();
		},
	},

	mounted() {
		this.update();
	},

	methods: {
		update() {
			this.isLoading = true;
			this.isError = false;
			this.fetchComments(this.page)
				.then(data => Object.assign(this, data))
				.catch(() => {
					this.isError = true;
				}).finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
