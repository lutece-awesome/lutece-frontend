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
				<template
					v-slot:items = "props"
				>
					<td
						:class = "{ 'blue--text': hasPermission('contest.view_contestteam') }"
						:style = "{ cursor: hasPermission('contest.view_contestteam') ? 'pointer' : 'auto' }"
						class = "text-xs-center"
						@click = "queryDialog(props.item.pk)"
					>
						{{ props.item.pk }}</td>
					<td class="text-xs-center">
						<span class = "font-weight-medium" >{{ props.item.name }}</span>
					</td>
					<td class="text-xs-center">
						<div
							v-for = "(each , index) in props.item.memberList"
							:key = "index"
							:class = "{ 'mb-2' : index === props.item.memberList.length - 1 }"
							class = "mt-2"
						>
							<router-link
								:to = "{name: 'UserDetail', params: {username: each.user.username }}"
							>
								<v-avatar :size = "getSize">
									<img
										:src = "each.user.attachInfo.gravatar"
									>
								</v-avatar>
								<span class = "ml-2">
									{{ each.user.username }}
								</span>
								<v-icon
									:color = "each.confirmed ? 'light-green' : 'grey'"
									small
								>
									{{ each.confirmed ? 'mdi-check' : 'mdi-help' }}
								</v-icon>
							</router-link>
						</div>
					</td>
					<td class = "text-xs-center">
						<div
							v-if = "!hasPermission('contest.change_contestteam')">
							<span
								v-if = "props.item.approved"
								class = "green--text"
							>
								<strong> Approved  </strong>
							</span>
							<span
								v-else
								class = "grey--text"
							>
								<strong> Pending </strong>
							</span>
						</div>
						<div v-else>
							<v-btn
								:color = "props.item.approved ? 'error' : 'success'"
								:disabled = "isUpdating[props.item.idx]"
								:loading = "isUpdating[props.item.idx]"
								@click = "toggleTeamStatus(props.item.idx)"
							>
								<strong> {{ props.item.approved? 'Reject' : 'Approve' }} </strong>
							</v-btn>
						</div>
					</td>
				</template>
			</v-data-table>
			<query-dialog
				v-model = "dialog"
				:pk = "queryPk"
			/>
		</div>
	</v-container>
</template>


<script>

import gql from 'graphql-tag';
import SearchBar from '@/components/utils/search-bar';
import { mapGetters } from 'vuex';
import Vue from '@/plugins/essential/vue';
import QueryDialog from './query-dialog';

export default {
	components: {
		SearchBar,
		QueryDialog,
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
			dialog: false,
			queryPk: null,
			headers: [
				{
					text: '#',
					align: 'center',
					sortable: false,
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
				{
					text: 'Status',
					align: 'center',
					sortable: false,
				},
			],
			isUpdating: [],
		};
	},


	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
		renderList() {
			return this.teamList.filter(each => this.filter === '' || each.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
		},
		getSize() {
			return this.$vuetify.breakpoint.xsOnly ? 24 : 32;
		},
	},

	activated() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.isLoading += 1;
			const query = gql`
                query ContestTeamList($pk: ID!){
                    contestTeamList(pk: $pk){
						pk
						name
						owner {
							username
						}
						memberList {
							confirmed
							user {
								username
								attachInfo {
									gravatar
								}
							}
						}
						approved
                    }
                }
            `;
			return this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contestTeamList)
				.then((data) => {
					this.isUpdating = [];
					this.teamList = [];
					for (let i = 0; i < data.length; i += 1) {
						this.isUpdating.push(false);
					}
					for (let i = 0; i < data.length; i += 1) {
						this.teamList.push({
							...data[i],
							...{
								idx: i,
							},
						});
					}
				})
				.finally(() => { this.isLoading -= 1; });
		},

		queryDialog(pk) {
			if (!this.hasPermission('contest.view_contestteam')) {
				return;
			}
			this.dialog = true;
			this.queryPk = pk;
		},

		toggleTeamStatus(idx) {
			Vue.set(this.isUpdating, idx, true);
			const mutation = gql`
                mutation ToggleContestTeam($pk: ID!) {
                    toggleContestTeam(pk: $pk) {
                        state
                    }
                }
            `;
			this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.teamList[idx].pk,
				},
			})
				.then((response) => {
					Vue.set(this.teamList, idx, {
						...this.teamList[idx],
						...{
							approved: response.data.toggleContestTeam.state,
						},
					});
				})
				.finally(() => {
					Vue.set(this.isUpdating, idx, false);
				});
		},
	},
};
</script>
