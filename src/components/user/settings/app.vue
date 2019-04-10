<template>
	<v-container>
		<v-layout
			justify-center
			row
			wrap>
			<v-flex
				xs12
				sm10
				md8
				lg6
				xl4>
				<v-card>
					<v-card-text>
						<v-form @submit.prevent = "submit">
							<v-text-field
								v-model = "school"
								:error-messages = "getErrorByDelegate('school')"
								label = "School"
								prepend-icon = "mdi-school"
							/>
							<v-text-field
								v-model = "company"
								:error-messages = "getErrorByDelegate('company')"
								label = "Company"
								prepend-icon = "mdi-briefcase"
							/>
							<v-text-field
								v-model = "location"
								:error-messages = "getErrorByDelegate('location')"
								label = "Location"
								prepend-icon = "mdi-map-marker"
							/>

							<v-text-field
								v-model = "codeforces"
								:error-messages = "getErrorByDelegate('codeforces')"
								label = "Codeforces"
								prepend-icon = "mdi-emoticon-cool"
							/>
							<v-text-field
								v-model = "atcoder"
								:error-messages = "getErrorByDelegate('atcoder')"
								label = "Atcoder"
								prepend-icon = "mdi-emoticon-cool"
							/>

							<v-text-field
								v-model = "about"
								:error-messages = "getErrorByDelegate('about')"
								label = "About"
								prepend-icon = "mdi-book"
							/>
							<v-text-field
								v-model = "gravatar"
								:error-messages = "getErrorByDelegate('gravatar')"
								label = "Gravatar"
								disabled
								prepend-icon = "mdi-emoticon-cool"
							/>
							<v-alert
								:value = "true"
								class = "mb-3"
								type = "info"
								outline
							>
								<span v-html = "gravatarExplain" />
							</v-alert>
							<v-btn
								:loading = "isloading"
								:color="error ? &quot;error&quot; : &quot;primary&quot;"
								block
								type = "submit"
							> Submit </v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>

import { mapGetters } from 'vuex';
import { UserInfoUpdateGQL } from '@/graphql/user/settings.gql';
import { ProfileGQL } from '@/graphql/user/profile.gql';
import { clearApolloCache, parseGraphqlError, getErrorMessage } from '@/utils';


export default {
	metaInfo() { return { title: 'Settings' }; },

	data: () => ({
		school: '',
		company: '',
		location: '',
		about: '',
		gravatar: '',
		codeforces: '',
		atcoder: '',
		isloading: false,
		error: null,
		gravatarExplain: '<div> You can only use Gravatar service to gain the avatar, to ensure your gravatar email privacy, the default gravatar email address will not shown and only encrypted address shown. </div> <div> But currently this is based on your email, changing is still WIP. </div>',
	}),
	computed: {
		...mapGetters({
			profile: 'user/profile',
		}),
	},
	mounted() {
		this.school = this.profile.school;
		this.company = this.profile.company;
		this.location = this.profile.location;
		this.about = this.profile.about;
		this.gravatar = this.profile.gravatar;
		this.codeforces = this.profile.codeforces;
		this.atcoder = this.profile.atcoder;
	},
	methods: {
		request() {
			this.$apollo.query({
				query: ProfileGQL,
				variables: {
					username: this.username,
				},
			})
				.then(response => response.data.user)
				.then((data) => {
					Object.assign(this, data);
				});
		},

		getErrorByDelegate(field) {
			return getErrorMessage(this.error, field);
		},

		submit() {
			this.isloading = true;
			this.error = null;
			this.$apollo.mutate({
				mutation: UserInfoUpdateGQL,
				variables: {
					company: this.company,
					displayName: this.displayName,
					about: this.about,
					school: this.school,
					location: this.location,
					codeforces: this.codeforces,
					atcoder: this.atcoder,
				},
			})
				.then(() => {
					this.$store.dispatch('user/refresh_token', true);
					clearApolloCache().then(() => {
						this.$router.push({
							name: 'UserDetail',
							params: { username: this.$store.state.user.payload.username },
						});
					});
				})
				.catch((error) => {
					this.error = parseGraphqlError(error);
				})
				.finally(() => { this.isloading = false; });
		},
	},
};
</script>
