<template>
	<v-navigation-drawer
		v-model = "drawer"
		:mini-variant = "$vuetify.breakpoint.mdOnly"
		:width = "250"
		mobile-break-point = "960"
		fixed
		clipped
		app
	>
		<v-toolbar
			flat
			class = "hidden-sm-and-up"
		>
			<v-list-tile >
				<v-list-tile-content>
					<v-list-tile-title class = "title">
						<span>
							{{ title || 'Lutece' }}
						</span>
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-toolbar>

		<v-divider class = "hidden-sm-and-up" />

		<v-list>
			<v-list-tile
				v-for = "item in items"
				:key = "item.title"
				:to = "item.to"
				ripple
				active-class = "grey lighten-3"
			>
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>{{ item.title }}</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>
</template>


<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		toggleEvent: {
			type: Boolean,
			default: null,
		},
	},

	data() {
		return {
			drawer: !this.$vuetify.breakpoint.xsOnly,
			items: [
				{
					title: 'Home',
					icon: 'mdi-home',
					to: '/home',
				},
				{
					title: 'Announcement',
					icon: 'mdi-calendar-text',
					to: '/announcement',
				},
				{
					title: 'Contest',
					icon: 'mdi-rocket',
					to: '/contest',
				},
				{
					title: 'Problem',
					icon: 'mdi-view-list',
					to: '/problem',
				},
				{
					title: 'Status',
					icon: 'mdi-chart-bar',
					to: '/status',
				},
				{
					title: 'User',
					icon: 'mdi-account-multiple',
					to: '/user',
				},
				{
					title: 'Blog',
					icon: 'message',
					to: '/blog',
				},
				{
					title: 'About',
					icon: 'mdi-information',
					to: '/about',
				},
			],
		};
	},

	watch: {
		toggleEvent() {
			this.drawer = !this.drawer;
		},
	},
};
</script>
