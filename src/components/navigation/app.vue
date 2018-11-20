<template>
	<div>
		<ToolBar
			:profile = "profile"
			:is-authenticated = "isAuthenticated"
		/>
	</div>
</template>


<script>

import { mapGetters } from 'vuex';
import ToolBar from './toolbar';

export default {

	components: {
		ToolBar,
	},

	computed: {
		...mapGetters({
			profile: 'user/profile',
			isAuthenticated: 'user/isAuthenticated',
			isProgressBarVisible: 'navbar/visible',
		}),
	},
};
</script>
