<template>
	<v-container>
		<v-layout
			row
			wrap
			justify-center
		>
			<v-flex
				xs12
				sm10
				md8
				xl7
			>
				<user-profile :user = "user" />
				<user-summary
					:user = "user"
					class = "mt-4" />
				<user-solved
					:user = "user"
					class = "mt-4" />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import UserProfile from './profile';
import UserSummary from './summary';
import UserSolved from './solved';

export default {
	components: {
		UserProfile,
		UserSummary,
		UserSolved,
	},

	props: {
		user: {
			type: Object,
			default: null,
		},
	},
};
</script>
