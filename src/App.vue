<template>
	<v-app>
		<Navbar/>
		<v-content>
			<div class = "maincontent" >
				<v-fade-transition
					:duration="100"
					mode="out-in">
					<keep-alive
						v-if = "!isAuthenticated || isProfileLoaded"
						include = "Problem,Status,User,Article">
						<router-view/>
					</keep-alive>
				</v-fade-transition>
			</div>
			<Footer/>
		</v-content>
		<Snackbar/>
	</v-app>
</template>

<script>
import Vue from 'vue';
import Footer from '@/components/global/footer';
import Navbar from '@/components/global/navbar';
import Snackbar from '@/components/global/snackbar';
import UserManager from '@/plugins/user-manager';


export default {
	components: {
		Navbar,
		Footer,
		Snackbar,
	},
	computed: {
		isAuthenticated: UserManager.isAuthenticated(),
		isProfileLoaded: UserManager.isProfileLoaded(),
	},
	metaInfo() {
		return {
			title: this.$root.title || 'Lutece',
			titleTemplate: '%s | Lutece',
			meta: [
				{ name: 'theme-color', content: Vue.prototype.$vuetify.theme.primary },
			],
		};
	},
};
</script>

<style scoped>
	.maincontent{
		min-height: 85%;
	}
</style>
