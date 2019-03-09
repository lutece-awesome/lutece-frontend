<template>
	<v-container
		:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid
		class = "mt-3"
	>
		<search-bar
			v-model = "filter"
			label = ""
		/>
		<div class = "elevation-2 mt-4">
			<v-data-table
				:headers = "headers"
				:items = "renderList"
				:loading = "isLoading > 0"
				hide-actions
			>
				<template v-slot:items = "props">
					<td class="text-xs-center">{{ props.item.pk }}</td>
					<td class="text-xs-center">{{ props.item.iron }}</td>
					<td class="text-xs-center">{{ props.item.iron }}</td>
				</template>
			</v-data-table>
		</div>
	</v-container>
</template>


<script>

import gql from 'graphql-tag';
import SearchBar from '@/components/utils/search-bar';

export default {
	components: {
		SearchBar,
	},

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			filter: '',
			isLoading: 0,
			teamList: [],
			headers: [
				{
					text: '#',
					align: 'center',
					sortable: true,
					value: 'pk',
				},
				{
					text: 'Name',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Member',
					align: 'center',
					sortable: false,
				},
			],
		};
	},

	computed: {
		renderList() {
			return this.teamList.filter(each => this.filter === '' || each.name.indexOf(this.filter) !== -1);
		},
	},

	mounted() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.isLoading += 1;
			const query = gql`
                query ContestPendingTeamList($pk: ID!){
                    contestPendingTeamList(pk: $pk){
						pk
						name
						memberList {
							username
						}
                    }
                }
            `;
			return this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contestPendingTeamList)
				.then((data) => { this.teamList = data; })
				.finally(() => { this.isLoading -= 1; });
		},
	},
};
</script>
