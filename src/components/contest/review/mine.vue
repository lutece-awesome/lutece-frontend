<template>
	<v-container
		fluid
		class = "mt-3"
	>
		<loading-spinner
			v-if = "isLoading"
			style = "height: 300px"
		/>
		<error-spinner
			v-else-if = "isError"
			style = "height: 300px"
		/>
		<div v-else>
			<h1 class = "headline mb-4 grey--text">
				<strong>{{ mine ? mine.name : 'My Team' }} </strong>
			</h1>
			<div v-if = "mine">
				<v-layout
					row
					wrap
				>
					<div
						v-for = "(each , index) in mine.memberList"
						:key = "index"
						:class = "{ 'ml-3' : index > 0 }"
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
				</v-layout>
				<div
					class = "mt-2"
					style = "margin-left: -10px"
				>
					<v-layout>
						<v-btn
							v-if = "isOwner"
							color = "orange"
							@click = "updateTeamDialog = true"
						>
							UPDATE
						</v-btn>
						<update-team
							v-model = "updateTeamDialog"
							:owner = "mine.owner"
							:members = "updateMemberList"
							:submit = "updateTeam"
							:base-name = "mine.name"
							:base-info = "mine.info"
							extra = "Please notice that your change
							would make your team as pending status if it was approved before."
							form-title = "Update Team"
						/>
						<button-dialog
							:text = "exitText.content"
							:title = "exitText.title"
							:submit = "exitTeam"
							btn-color = "error"
							btn-text = "Exit"
						/>
					</v-layout>
				</div>
			</div>
			<div v-else>
				<v-btn
					color = "primary"
					@click = "createTeamDialog = true"
				>
					CREATE
				</v-btn>
				<update-team
					v-model = "createTeamDialog"
					:submit = "createTeam"
					form-title = "Create Team"
				/>
			</div>
			<div v-if = "mine">
				<v-divider class = "mt-4 mb-4" />
				<h1 class = "headline mb-4 grey--text"> <strong> Infos </strong> </h1>
				<async-mixrend-component
					:content = "getInfo | nl2br"
				/>
			</div>
			<v-divider class = "mt-4 mb-4" />
			<h1 class = "headline mb-4 grey--text"> <strong> My Invitation </strong> </h1>
			<div>
				<team-tile
					v-for = "(team,idx) in invitationList"
					:key = "idx"
					:team = "team"
					:can-join = "mine ? false : true"
					:disabled = "disableJoin"
					:submit = "joinTeam"
					class = "mt-4"
				/>
			</div>
		</div>
	</v-container>
</template>


<script>

import gql from 'graphql-tag';
import { mapGetters } from 'vuex';
import ButtonDialog from './dialog';
import { clearApolloCache } from '@/utils';
import UpdateTeam from './update-team';
import TeamTile from './team-tile';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';

export default {

	components: {
		ButtonDialog,
		UpdateTeam,
		TeamTile,
		AsyncMixrendComponent,
	},

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
			mine: null,
			invitationList: [],
			exitText: {
				title: 'Exit Team',
				content: 'If you are the owner of team, your exit would delete the entire team, but if you are just one member, your exit would remove yourself from the entire team and make the contest status to pending if it was approved before',
			},
			createTeamDialog: false,
			updateTeamDialog: false,
			disableJoin: false,
			isOwner: false,
		};
	},

	computed: {
		...mapGetters({
			profile: 'user/profile',
		}),
		getSize() {
			return this.$vuetify.breakpoint.xsOnly ? 24 : 32;
		},
		updateMemberList() {
			return this.mine.memberList.map(each => each.user.username);
		},
		getInfo() {
			const error = 'No additional info provided.';
			if (!this.mine || this.mine === undefined || !this.mine.info
			|| this.mine.info === undefined || this.mine.info.length === 0) {
				return error;
			}
			return this.mine.info;
		},
	},

	mounted() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.isError = false;
			this.isLoading = true;
			const query = gql`
                query RelatedContestTeamList($pk: ID!){
                    relatedContestTeamList(pk: $pk){
                        pk
                        name
                        approved
						owner {
							username
						}
						info
                        memberList{
                            user{
                                username
                                attachInfo{
                                    gravatar
                                }
                            }
                            confirmed
                        }
                    }
                }
            `;
			return this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
				fetchPolicy: 'no-cache',
			})
				.then(response => response.data.relatedContestTeamList)
				.then((data) => { this.processData(data); })
				.catch((_err) => { this.isError = true; })
				.finally(() => { this.isLoading = false; });
		},

		processData(data) {
			let mine = null;
			const inv = [];
			let mineIdx = -1;
			for (let i = 0; i < data.length; i += 1) {
				const memebers = data[i].memberList;
				let fd = false;
				for (let j = 0; j < memebers.length && !fd; j += 1) {
					if (memebers[j].confirmed && memebers[j].user.username === this.profile.username) {
						fd = true;
					}
				}
				if (fd || data[i].owner.username === this.profile.username) {
					mine = data[i];
					mineIdx = i;
				} else {
					inv.push(data[i]);
				}
			}
			this.mine = mine;
			this.invitationList = inv;
			if (mineIdx >= 0) {
				this.isOwner = data[mineIdx].owner.username === this.profile.username;
			}
		},

		exitTeam() {
			const mutation = gql`
                mutation ExitContestTeam( $pk: ID!){
                    exitContestTeam( pk: $pk ){
                        state
                    }
                } 
            `;
			return this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.mine.pk,
				},
			}).then(() => {
				clearApolloCache().then(
					() => {
						this.fetchData();
					},
				);
			});
		},

		createTeam(data) {
			const mutation = gql`
                mutation CreateContestTeam( $pk: ID!, $name: String!, $members: String! , $additionalInfo: String ){
                    createContestTeam( pk: $pk , name: $name, members: $members, additionalInfo: $additionalInfo ){
                        state
                    }
                } 
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.pk,
					name: data.name,
					members: JSON.stringify(data.memberList),
					additionalInfo: data.info,
				},
			}).then(() => {
				clearApolloCache().then(
					() => {
						this.fetchData();
						this.createTeamDialog = false;
					},
				);
			});
		},

		updateTeam(data) {
			const mutation = gql`
                mutation UpdateContestTeam( $pk: ID!, $name: String!, $members: String!, $additionalInfo: String ){
                    updateContestTeam( pk: $pk , name: $name, members: $members, additionalInfo: $additionalInfo ){
                        state
                    }
                } 
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.mine.pk,
					name: data.name,
					members: JSON.stringify(data.memberList),
					additionalInfo: data.info,
				},
			}).then(() => {
				clearApolloCache().then(
					() => {
						this.fetchData();
						this.updateTeamDialog = false;
					},
				);
			});
		},

		joinTeam(pk) {
			this.disableJoin = true;
			const mutation = gql`
                mutation JoinContestTeam( $pk: ID!){
                    joinContestTeam( pk: $pk){
                        state
                    }
                } 
			`;
			return this.$apollo.mutate({
				mutation,
				variables: {
					pk,
				},
			})
				.then(() => {
					clearApolloCache().then(
						() => {
							this.fetchData();
						},
					);
				})
				.finally(() => {
					this.disableJoin = false;
				});
		},
	},
};
</script>
