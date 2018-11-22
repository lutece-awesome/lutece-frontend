<template>
	<v-layout
		row
		justify-center
		wrap
	>
		<v-flex
			xs12
			sm10
		>
			<v-flex xs12>
				<Curtain/>
			</v-flex>
			<v-flex xs12>
				<Recently class = "mt-4" />
			</v-flex>
		</v-flex>
	</v-layout>
</template>

<script>

import TopUser from '@/components/home/topuser';
import Curtain from '@/components/home/curtain';
import Recently from '@/components/home/recently';
import UserAutoComplete from '@/components/user/utils/auto-complete';

export default {

	components: {
		TopUser,
		Curtain,
		Recently,
		UserAutoComplete,
	},
};
</script>
