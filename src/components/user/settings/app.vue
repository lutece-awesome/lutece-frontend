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
								:error-messages = "geterror('school')"
								label = "School"
								prepend-icon = "mdi-school"
							/>
							<v-text-field
								v-model = "company"
								:error-messages = "geterror('company')"
								label = "Company"
								prepend-icon = "mdi-briefcase"
							/>
							<v-text-field
								v-model = "location"
								:error-messages = "geterror('location')"
								label = "Location"
								prepend-icon = "mdi-map-marker"
							/>

							<v-text-field
								v-model = "about"
								:error-messages = "geterror('about')"
								label = "About"
								prepend-icon = "mdi-book"
							/>
							<v-text-field
								v-model = "gravatar"
								:error-messages = "geterror('gravatar')"
								label = "Gravatar"
								disabled
								prepend-icon = "mdi-emoticon-cool"/>
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
import apolloProvider from '@/apollo';

export default {
	metaInfo() { return { title: 'Settings' }; },

	data: () => ({
		school: '',
		company: '',
		location: '',
		about: '',
		gravatar: '',
		isloading: false,
		error: false,
		errordetail: [],
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
		geterror(field) {
			if (Object.prototype.hasOwnProperty.call(this.errordetail, field)) {
				return this.errordetail[field][0].message;
			}
			return '';
		},

		submit() {
			this.isloading = true;
			this.errordetail = [];
			this.error = false;
			this.$apollo.mutate({
				mutation: UserInfoUpdateGQL,
				variables: {
					company: this.company,
					displayName: this.displayName,
					about: this.about,
					school: this.school,
					location: this.location,
				},
			})
				.then(() => {
					this.$store.dispatch('user/refresh_token', true);
					apolloProvider.defaultClient.resetStore();
					this.$router.push({
						name: 'UserDetail',
						params: { username: this.$store.state.user.payload.username },
					});
				})
				.finally(() => { this.isloading = false; })
				.catch((error) => {
					this.errordetail = JSON.parse(error.graphQLErrors[0].message);
					this.error = true;
				});
		},
	},
};
</script>
