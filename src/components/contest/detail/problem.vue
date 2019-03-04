<template>
	<v-container fiuld>
		<loading-spinner
			v-if = "isLoading"
			text = "Loading ..."
			style = "height: 600px"
		/>
		<error-spinner
			v-else-if = "error"
			:msg = "error"
		/>
		<div v-else>
			<v-navigation-drawer permanent>
				<v-list class = "pt-0">
					<v-list-tile
						v-for = "(each, index) in problemPreviewList"
						:key = "index"
					>
						<v-list-tile-content>
							<v-list-tile-title>{{ each.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
		</div>
	</v-container>
</template>

<script>

import gql from 'graphql-tag';

export default {
	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isLoading: true,
			error: null,
			problemPreviewList: [],
		};
	},

	created() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.isLoading = true;
			const query = gql`
				query ContestProblemList($pk: ID!){
					contestProblemList(pk: $pk){
						title
						slug
						solved
					}
				}
			`;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contestProblemList)
				.then((data) => {
					this.problemPreviewList = data;
				})
				.catch((error) => { this.error = error; })
				.finally(() => { this.isLoading = false; });
		},
	},
};
</script>
