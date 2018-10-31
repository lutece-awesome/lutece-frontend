<template>
	<v-container>
		<v-layout justify-center>
			<v-flex
				xs12
				md8
			>
				<v-card>
					<v-card-text>
						<v-form @submit.prevent="login">
							<v-layout column>
								<v-flex>
									<v-text-field
										v-model="username"
										:error-messages = "getErrorByDelegate( 'username' )"
										label="Username"
										autocomplete="off"
										autocorrect="off"
										autocapitalize="off"
										spellcheck="false"
										prepend-icon = "mdi-account"
										required />
								</v-flex>
								<v-flex>
									<v-text-field
										v-model="password"
										:error-messages = "getErrorByDelegate( 'password' )"
										type="password"
										label="Password"
										prepend-icon = "mdi-lock"
										required />
								</v-flex>
								<v-flex>
									<a @click="signup">Do not have account? </a>
								</v-flex>
								<v-flex
									class="text-xs-center"
									mt-3>
									<v-btn
										:loading = "loading"
										:color="error ? &quot;error&quot; : &quot;primary&quot;"
										block
										big
										type="submit">Login</v-btn>
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
	metaInfo() { return { title: 'Login' }; },
	data: () => ({
		loading: false,
		error: null,
		username: '',
		password: '',
	}),

	methods: {

		getErrorByDelegate(field) {
			return getErrorMessage(this.error, field);
		},

		login() {
			this.loading = true;
			this.error = null;
			const { username, password } = this;
			this.$store.dispatch('user/login', { username, password })
				.then(() => {
					this.$router.push(this.$route.query.redirect || '/');
				})
				.catch((error) => {
					this.error = parseGraphqlError(error);
				})
				.finally(() => { this.loading = false; });
		},

		signup() {
			this.$router.push({
				name: 'Signup',
				query: {
					redirect: this.$route.query.redirect || '/',
				},
			});
		},
	},
};
</script>
