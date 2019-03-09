<template>
	<v-card>
		<v-container
			class = "elevation-2"
		>
			<v-layout
				row
				wrap
				fill-height
				align-center
				justify-center
			>
				<v-flex
					v-if = "formTitle"
					xs12
					class = "mb-3"
				>
					<div class = "text-xs-center title">
						{{ formTitle }}
					</div>
				</v-flex>
				<v-flex xs12>
					<div class = "section-title" > Name </div>
					<v-text-field
						:value = "name"
						@input = "$emit( 'input-name' , $event )"/>
				</v-flex>
				<v-flex
					v-if = "owner"
					xs12
				>
					<div class = "section-title" > Owner </div>
					<v-avatar size = "24">
						<img
							:src = "owner.attachInfo.gravatar"
						>
					</v-avatar>
					<span>{{ owner.username }} </span>
				</v-flex>
				<v-flex
					xs12
				>
					<div class = "section-title" > Members </div>
					<v-list
						class = "mt-4 memberList"
						light>
						<v-list-tile
							v-for = "( each , index ) in memberList"
							:key = "index"
						>
							<v-list-tile-content>
								<v-list-tile-title>
									<router-link :to = "{name: 'UserDetail', params: {username: each }}" >
										<span>{{ each }} </span>
									</router-link>
								</v-list-tile-title>
							</v-list-tile-content>
							<v-list-tile-action
								v-if = "each != profile.username"
								@click = "$emit( 'input-removeUser' , index )">
								<v-icon style = "cursor: pointer" > mdi-close-circle </v-icon>
							</v-list-tile-action>
						</v-list-tile>
					</v-list>
					<user-select
						v-model = "queryUser"
						@input = "$emit( 'input-appendUser' , $event )"
					/>
				</v-flex>
			</v-layout>
		</v-container>
		<v-toolbar
			dense
			height = "48"
		>
			<v-spacer/>
			<v-btn
				:disabled = "isLoading"
				flat
				@click = "$emit( 'input-cancel' )"
			>
				Cancel
			</v-btn>
			<v-btn
				:loading = "isLoading"
				:disabled = "isLoading"
				:color = " isError ? 'error' : 'primary' "
				flat
				@click = "triggerClick"
			>
				Submit
			</v-btn>
		</v-toolbar>
	</v-card>
</template>

<script>

import UserSelect from '@/components/user/utils/auto-complete';
import { mapGetters } from 'vuex';

export default {
	components: {
		UserSelect,
	},

	props: {
		formTitle: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
		owner: {
			type: Object,
			default: null,
		},
		memberList: {
			type: Array,
			default: () => ([]),
		},
		submit: {
			type: Function,
			default: () => Promise.resolve(),
		},
	},

	data() {
		return {
			isLoading: false,
			isError: false,
			queryUser: null,
		};
	},

	computed: {
		...mapGetters({
			profile: 'user/profile',
		}),
	},

	methods: {
		triggerClick() {
			this.isLoading = true;
			this.isError = false;
			this.submit({
				name: this.name,
				memberList: this.memberList,
			})
				.finally(() => {
					this.isLoading = false;
				})
				.catch((_err) => {
					this.isError = true;
				});
		},
	},
};
</script>

<style scoped lang = "stylus">
	.title
		font-size: 20px
		color: grey
		font-weight: 500
		margin-top: 12px
		margin-bottom: -12px
	.section-title
		font-size: 16px
		color: grey
		font-weight: 500
		margin-top: 12px
		margin-bottom: -12px
</style>
