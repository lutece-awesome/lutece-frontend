<template>
	<v-layout
		fill-height
		align-center
		justify-center
	>
		<v-avatar
			size = "36"
			contain
			@click = "toUserDetail"
		>
			<img :src = "profile.gravatar" >
		</v-avatar>
		<v-icon
			class = "ml-3"
			@click.once = "toSignout"
		>
			mdi-logout
		</v-icon>
	</v-layout>
</template>


<script>

import Router from '@/router/index';

export default {
	props: {
		profile: {
			type: Object,
			default: null,
		},
	},

	methods: {
		toUserDetail() {
			Router.push({
				name: 'UserDetail',
				params: {
					username: this.profile.username,
				},
			});
		},

		toSignout() {
			Router.push({
				name: 'Signout',
			});
		},

	},
};
</script>
