<template>
	<div>
		<comment
			v-for = "( each , index ) in list"
			:key = "index"
			:pk = "parseInt(each.pk,10)"
			:author = "each.author"
			:content = "each.content"
			:create-time = "each.createTime"
			:last-update-time = "each.lastUpdateTime"
			@update-success = "update"
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
		reFetch: {
			type: Boolean,
			default: false,
		},
		reFresh: {
			type: Boolean,
			default: false,
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
		reFetch() {
			this.page = 1;
			this.update();
		},
		reFresh() {
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
	},
};
</script>
