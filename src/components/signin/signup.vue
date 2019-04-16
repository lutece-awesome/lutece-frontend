
<template>
	<v-container>
		<v-layout justify-center>
			<v-flex
				xs12
				md8
			>
				<v-card>
					<v-card-text>
						<v-form @submit.prevent="register">
							<v-layout column>
								<v-flex>
									<v-text-field
										v-model="username"
										:error-messages="getErrorByDelegate('username')"
										label="Username *"
										autocomplete="off"
										autocorrect="off"
										autocapitalize="off"
										spellcheck="false"
										required />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model="password"
										:error-messages="getErrorByDelegate('password')"
										type="password"
										label="Password *"
										required />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model="email"
										:error-messages="getErrorByDelegate('email')"
										type="email"
										label="Email *"
										required />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model = "school"
										:error-messages="getErrorByDelegate('school')"
										label="School" />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model = "company"
										:error-messages="getErrorByDelegate('company')"
										label="Company" />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model = "location"
										:error-messages="getErrorByDelegate('location')"
										label="Location" />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model = "codeforces"
										:error-messages="getErrorByDelegate('codeforces')"
										label="Codeforces" />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model = "atcoder"
										:error-messages="getErrorByDelegate('atcoder')"
										label="Atcoder" />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model = "about"
										:error-messages="getErrorByDelegate('about')"
										label="About" />
								</v-flex>
								<v-flex mt-3>
									<v-btn
										:loading="loading"
										:color="error ? &quot;error&quot; : &quot;primary&quot;"
										block
										big
										type="submit">Register</v-btn>
								</v-flex>
							</v-layout>
						</v-form>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import { parseGraphqlError, getErrorMessage } from '@/utils';

export default {
	metaInfo() { return { title: 'Sign Up' }; },
	data() {
		return {
			username: '',
			password: '',
			email: '',
			displayName: '',
			school: '',
			company: '',
			location: '',
			codeforces: '',
			atcoder: '',
			studentID: '',
			gender: true,
			about: 'The man is too lazy to leave anything.',
			loading: false,
			error: null,
		};
	},

	methods: {

		getErrorByDelegate(field) {
			return getErrorMessage(this.error, field);
		},

		register() {
			this.error = null;
			const {
				username, password, email, about, school, company, location, codeforces, atcoder,
			} = this;
			this.$store.dispatch('user/signup', {
				username, password, email, about, school, company, location, codeforces, atcoder,
			})
				.then(() => {
					this.$router.push(this.$route.query.redirect || '/');
				})
				.catch((error) => {
					this.error = parseGraphqlError(error);
				})
				.finally(() => { this.loading = false; });
		},
	},
};
</script>
