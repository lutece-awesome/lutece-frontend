<template>
	<v-toolbar
		fixed
		clipped-left
		app
		dark
		color = "primary"
		extension-height = "0"
	>
		<v-toolbar-side-icon
			@click.stop = "$emit( 'input-toggle-drawer' , $event )"
		/>

		<v-toolbar-title>
			{{ title || 'Lutece' }}
		</v-toolbar-title>

		<v-spacer/>

		<v-toolbar-items>
			<v-btn
				v-if = "!isAuthenticated"
				flat
				@click = "toLogin"
			>
				<v-icon class = "mr-2" >mdi-login</v-icon>
				<span> SIGN IN </span>
			</v-btn>
			<UserMenu
				v-else
				:profile = "profile"
			/>
		</v-toolbar-items>

	</v-toolbar>
</template>


<script>

import UserMenu from './user-menu';
import Router from '@/router/index';

export default {
	components: {
		UserMenu,
	},

	props: {
		title: {
			type: String,
			default: null,
		},
		profile: {
			type: Object,
			default: null,
		},
		isAuthenticated: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		toLogin: () => {
			Router.push({
				name: 'Login',
			});
		},
	},
};
</script>
