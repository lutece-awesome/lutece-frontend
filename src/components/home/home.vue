<template>
	<v-container>
		<v-layout
			row
			justify-center
			wrap>
			<v-flex
				xs12
				md10
			>
				<Curtain/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import TopUser from '@/components/home/topuser';
import Curtain from '@/components/home/curtain';

export default {
	metaInfo() { return { title: 'Home' }; },

	components: {
		TopUser,
		Curtain,
	},

};
</script>
