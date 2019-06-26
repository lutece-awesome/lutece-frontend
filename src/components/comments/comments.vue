<template>
	<div>
		<comment
			v-for = "each in list"
			:key = "each.pk"
			:pk = "parseInt(each.pk,10)"
			:author = "each.author"
			:content = "each.content"
			:create-time = "each.createTime"
			:vote = "each.vote"
			:self-attitude = "each.selfAttitude"
			:last-update-time = "each.lastUpdateTime"
			:reply = "each.reply"
			:total-reply-number = "each.totalReplyNumber"
			@update-success = "update"
		/>
		<div class = "text-xs-center mt-3">
			<v-pagination
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
			list: [],
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
			const currentPage = this.page;
			this.isLoading = true;
			this.isError = false;
			this.fetchComments(this.page)
				.then((data) => {
					if (currentPage === this.page) {
						this.maxPage = data.maxPage;
						this.list = data.list;
					}
				})
				.catch(() => {
					this.isError = true;
				}).finally(() => {
					this.isLoading = false;
				});
		},

		refresh() {
			this.page = 1;
			this.update();
		},
	},
};
</script>
