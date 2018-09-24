<template>
	<v-container>
		<v-layout
			row
			justify-center
			wrap>
			<v-flex xs4>
				<top-user :number = "10" />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import TopUser from '@/components/home/topuser';

export default {
	metaInfo() { return { title: 'Home' }; },

	components: {
		TopUser,
	},

};
</script>
