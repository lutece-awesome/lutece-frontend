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
				<v-divider
					class = "mt-2 mb-2"
				/>
			</v-flex>
			<v-flex xs12>
				<Recently class = "mt-3" />
			</v-flex>
		</v-flex>
	</v-layout>
</template>

<script>

import Curtain from '@/components/home/curtain';
import Recently from '@/components/home/recently';

export default {

	components: {
		Curtain,
		Recently,
	},
};
</script>
