<template>
	<div>
		<Curtain/>
		<v-btn
			v-if = "hasPermission('problem.change_problem')"
			:to = "{
				name: 'HomeManager',
			}"
			color = "accent"
			dark
			fab
			fixed
			bottom
			right
		>
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
	</div>
</template>

<script>

import { mapGetters } from 'vuex';
import Curtain from '@/components/home/curtain';

export default {

	components: {
		Curtain,
	},

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},
};
</script>
