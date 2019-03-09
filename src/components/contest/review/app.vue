<template>
	<v-container
		:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
		class = "mt-4"
		fluid
	>
		<v-layout
			row
			wrap
			justify-center
		>
			<v-flex
				xs12
				md10
				xl8
			>
				<div
					class = "mt-4"
				>
					<v-tabs
						v-model = "tabs"
						fixed-tabs
						fluid
						color = "#fafafa"
					>
						<v-tab
							:ripple = "false"
							to = "overall"
						>
							Overall
						</v-tab>
						<v-tab
							v-if = "isAuthenticated"
							:ripple = "false"
							to = "mine"
						>
							Mine
						</v-tab>
					</v-tabs>
					<keep-alive>
						<router-view/>
					</keep-alive>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>

import { mapGetters } from 'vuex';


export default {
	data() {
		return {
			tabs: null,
		};
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'user/isAuthenticated',
		}),
	},
};
</script>
