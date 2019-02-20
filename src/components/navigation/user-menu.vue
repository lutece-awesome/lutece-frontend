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
			<span
				class = "ml-2"
				style = "text-transform: none"
			>
				{{ profile.username }}
			</span>
		</v-btn>

		<v-list>
			<v-list-tile
				:to = "{ name: 'UserDetail' , params: { username: profile.username } }"
			>
				<v-icon
					class = "mr-2"
					flat
				>
					mdi-account
				</v-icon>
				<v-list-tile-content>
					<v-list-tile-title>
						Profile
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<v-list-tile
				v-for = "item in items"
				:key = "item.label"
				:to = "item.to"
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
export default {
	props: {
		profile: {
			type: Object,
			default: null,
		},
	},

	data() {
		return {
			items: [
				{
					icon: 'mdi-settings',
					label: 'Settings',
					to: {
						name: 'UserSettings',
					},
				},
				{
					icon: 'mdi-logout',
					label: 'Sign Out',
					to: {
						name: 'Signout',
					},
				},
			],
		};
	},
};
</script>
