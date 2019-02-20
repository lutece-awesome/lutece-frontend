<template>
	<div>
		<v-btn
			v-if = "$store.state.user.payload && username == $store.state.user.payload.username"
			:to = "{name: 'UserSettings'}"
			color = "accent"
			dark
			fab
			fixed
			bottom
			right>
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
		<v-container>
			<v-layout
				row
				justify-center
				wrap>
				<v-flex
					xs12
					sm11
					md10
				>
					<ApolloQuery
						:query = "require('@/graphql/user/profile.gql')"
						:variables = "{ username }"
					>
						<template
							slot-scope = "{ result: { loading , error , data } }">
							<loading-spinner v-if = "loading" />
							<error-spinner v-else-if = "error" />
							<div v-else-if = "data">
								<Layout :user = "data.user"/>
							</div>
						</template>
					</ApolloQuery>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>


<script>

import Layout from './layout';

export default {
	metaInfo() { return { title: this.username }; },

	components: {
		Layout,
	},

	props: {
		username: {
			type: String,
			required: true,
		},
	},

	computed: {
		isxs() {
			return this.$vuetify.breakpoint.smAndDown;
		},
		notxs() {
			return !this.$vuetify.breakpoint.smAndDown;
		},
	},
};
</script>
