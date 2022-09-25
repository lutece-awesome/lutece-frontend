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
						<h1 class = "headline mb-3 primary--text"> Dev Team </h1>
						<v-divider class = "mb-3" />
						<v-layout
							row
							wrap
						>
							<v-flex
								v-for = "( each , index ) in author"
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
		author: [
			{
				name: 'Ke Shen',
				company: 'Google',
				location: 'Shanghai',
				title: 'Software Engineer',
				gravataremail: 'https://gravatar.loli.net/avatar/79bc21937a1f625d1cf08c919f8c70c2.jpg?s=250&d=mm&r=g',
			},
			{
				name: 'Bofan Zhou',
				company: 'Bytedance',
				location: 'Beijing',
				title: 'Algorithm Engineer',
				gravataremail: 'https://gravatar.loli.net/avatar/f2b757a861d7ea0baa14ca7745c80eb1.jpg?s=250&d=mm&r=g',
			},
		],
	}),
};
</script>
