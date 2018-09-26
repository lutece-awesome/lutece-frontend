<template>
	<v-container fluid>
		<v-layout
			row
			justify-center
			wrap>
			<v-flex xs12>
				<Curtain/>
			</v-flex>
			<v-flex xs6>
				<Recently />
			</v-flex>
			<v-flex xs6/>
		</v-layout>
	</v-container>
</template>

<script>

import TopUser from '@/components/home/topuser';
import Curtain from '@/components/home/curtain';
import Recently from '@/components/home/recently';

export default {
	metaInfo() { return { title: 'Home' }; },

	components: {
		TopUser,
		Curtain,
		Recently,
	},

};
</script>
