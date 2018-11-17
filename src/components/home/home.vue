<template>
	<v-container fluid>
		<v-layout
			row
			justify-center
			wrap>
			<v-flex
				xs10
				sm8>
				<v-layout
					row
					justify-center
					wrap>
					<user-auto-complete v-model = "a"/>
					<v-flex xs12>
						<Curtain/>
					</v-flex>
					<v-flex xs12>
						<v-divider />
					</v-flex>
					<v-flex xs12>
						<Recently class = "mt-4" />
					</v-flex>
				</v-layout>
			<!-- <v-flex xs6>
				<Recently />
			</v-flex> -->
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import TopUser from '@/components/home/topuser';
import Curtain from '@/components/home/curtain';
import Recently from '@/components/home/recently';
import UserAutoComplete from '@/components/user/utils/auto-complete';

export default {
	metaInfo() { return { title: 'Home' }; },

	components: {
		TopUser,
		Curtain,
		Recently,
		UserAutoComplete,
	},

	data() {
		return {
			a: '',
		};
	},
};
</script>
