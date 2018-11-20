<template>
	<v-menu
		open-on-hover
		light
		offset-y
	>
		<v-btn
			slot = "activator"
			flat
		>
			<v-avatar
				size = "36"
				contain
			>
				<img :src = "profile.gravatar" >
			</v-avatar>
			<span class = "ml-2">
				{{ profile.username }}
			</span>
		</v-btn>

		<v-list>
			<v-list-tile
				v-for = "item in Items"
				:key = "item.label"
				@click = "item.click( profile )"
			>
				<v-icon
					class = "mr-2"
					flat
				>
					{{ item.icon }}
				</v-icon>
				<v-list-tile-content>
					<v-list-tile-title>
						{{ item.label }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>

	</v-menu>
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

	data: () => ({
		Items: [
			{
				icon: 'mdi-account',
				label: 'Profile',
				click: profileRef => Router.push({
					name: 'UserDetail',
					params: {
						username: profileRef.username,
					},
				}),
			},
			{
				icon: 'mdi-settings',
				label: 'Settings',
				click: profileRef => Router.push({
					name: 'UserSettings',
					params: {
						username: profileRef.username,
					},
				}),
			},
			{
				icon: 'mdi-logout',
				label: 'Sign Out',
				click: () => Router.push({
					name: 'Signout',
				}),
			},
		],
	}),
};
</script>
