<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 4 : 1}`"
		>
			<v-container>
				<v-layout
					row
					wrap>
					<v-flex xs12>
						<h1 class = "headline mb-3 primary--text"> Contributor </h1>
						<v-divider class = "mb-3" />
						<v-layout
							row
							wrap
						>
							<v-flex
								v-for = "( each , index ) in contributor"
								:key = "index"
								xs12
								md6
							>
								<Card :user = "each" />
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-hover>
</template>


<script>

import Card from '@/components/about/card';

export default {
	components: {
		Card,
	},
	data: () => ({
		contributor: [
			{
				name: 'Jun Qing',
				company: 'Bytedance',
				location: 'Beijing',
				title: 'Algorithm Engineer',
				gravataremail: 'https://secure.gravatar.com/avatar/647ebdcf8e291dc01e81ddd4e59a33ec.jpg?s=250&d=mm&r=g',
			},
		],
	}),
};
</script>
