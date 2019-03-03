<template>
	<v-container fiuld>
		<loading-spinner
			v-if = "isLoading"
			text = "Loading ..."
			style = "height: 600px"
		/>
		<error-spinner
			v-else-if = "isError"
			style = "height: 600px"
		/>
		<div v-else>
			This is summary page
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
			isLoading: false,
			isError: false,
			contest: null,
		};
	},

	mounted() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.isLoading = true;
			this.isError = false;
			const query = gql`
                query ContestSummary($pk: ID!){
                    contest(pk: $pk){
                        title
                        settings {
                            note
                            startTime
                            endTime
                            maxTeamMemberNumber
                        }
                        registered
                        registerMemberNumber
                    }
                }
            `;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contest)
				.then((data) => { this.contest = data.contest; })
				.catch(() => { this.isError = true; })
				.finally(() => { this.isLoading = false; });
		},
	},

};
</script>
