<template>
	<v-app>
		<app-navagation-bar/>
		<v-content>
			<div class = "maincontent" >
				<v-fade-transition
					:duration = "100"
					mode = "out-in"
				>
					<keep-alive
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
import Footer from '@/components/global/footer';
import AppNavagationBar from '@/components/navigation/app';
import Snackbar from '@/components/global/snackbar';
import { mapGetters } from 'vuex';


export default {
	components: {
		AppNavagationBar,
		Footer,
		Snackbar,
	},

	computed: {
		...mapGetters({
			isAuthenticated: 'user/isAuthenticated',
		}),
	},
};
</script>
