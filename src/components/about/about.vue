<template>
	<v-container>
		<v-layout
			row
			justify-center
			wrap
		>
			<v-flex
				xs12
				sm10
				lg8
			>
				<introduction/>
				<why class = "mt-4" />
				<dev class = "mt-4" />
				<copyright class = "mt-4" />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import introduction from '@/components/about/introduction';
import why from '@/components/about/why';
import copyright from '@/components/about/copyright';
import dev from '@/components/about/dev';

export default {
	components: {
		introduction,
		copyright,
		why,
		dev,
	},
	metaInfo() { return { title: 'About' }; },
};
</script>
