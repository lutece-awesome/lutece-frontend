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
				:to = "login"
				flat
			>
				<v-icon class = "mr-2" >mdi-login</v-icon>
				<span> SIGN IN </span>
			</v-btn>
		</v-toolbar-items>


	</v-toolbar>
</template>


<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		isAuthenticated: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
