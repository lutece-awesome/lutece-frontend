<template>
	<v-app>
		<app-navagation-bar/>
		<v-content>
			<div
				class = "maincontent"
				fill-height
			>
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
import Footer from '@/components/footer/app';
import AppNavagationBar from '@/components/navigation/app';
import Snackbar from '@/components/snackbar/app';


export default {
	components: {
		AppNavagationBar,
		Footer,
		Snackbar,
	},
};
</script>
