<template>
	<div>
		<v-dialog
			:value = "value"
			width = "500"
			@input = "$emit( 'input' , $event )"
		>
			<v-card>
				<loading-spinner
					v-if = "isLoading"
					style = "height: 600px"/>
				<div v-else>
					<v-card-title
						class = "headline grey lighten-2"
						primary-title
					>
						<strong> SUMMARY </strong>
					</v-card-title>
					<v-card-text>
						<v-layout
							row
							wrap
						>
							<div
								v-for = "(each , index) in memberList"
								:key = "index"
								:class = "{ 'ml-3' : index > 0 }"
								class = "mt-2"
							>
								<router-link
									:to = "{name: 'UserDetail', params: {username: each.user.username }}"
								>
									<v-avatar size = "28">
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
						<v-divider class = "mt-3 mb-3" />
						<async-mixrend-component
							:content = "info | nl2br"
						/>
					</v-card-text>
					<v-divider/>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>

import gql from 'graphql-tag';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';

export default {
	components: {
		AsyncMixrendComponent,
	},

	props: {
		pk: {
			type: String,
			default: null,
		},
		value: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			isLoading: false,
			info: '',
			memberList: [],
		};
	},

	watch: {
		pk(cur) {
			this.fetchData(cur);
		},
	},

	methods: {
		fetchData(pk) {
			if (!pk || pk === undefined) {
				return;
			}
			this.info = '';
			this.isLoading = true;
			const query = gql`
                query ContestTeam($pk: ID!){
                    contestTeam(pk: $pk){
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
			this.$apollo.query({
				query,
				variables: {
					pk,
				},
				fetchPolicy: 'no-cache',
			})
				.then(response => response.data.contestTeam)
				.then((data) => {
					this.info = data.info;
					this.memberList = data.memberList;
					if (data.info.length === 0) {
						this.info = 'No additional info provided.';
					}
					this.isLoading = false;
				});
		},
	},
};
</script>

<style scoped lang = "stylus">
	.section-title
		font-size: 16px
		color: grey
		font-weight: 500
		margin-top: 12px
</style>
