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
						<h1 class="headline mb-3 primary--text"> Dev Team </h1>
						<v-divider class = "mb-3" />
						<v-layout
							row
							wrap>
							<v-flex
								v-for = "( each , index ) in author"
								:key = "index"
								xs12
								md6
							>
								{{ each.name }}
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-hover>
</template>


<script>
export default {
	data: () => ({
		author: [
			{
				name: 'Ke Shen',
				company: 'Google',
				location: 'Shanghai',
				title: 'Software Engineer',
			},
			{
				name: 'Zhu He',
				company: 'Alibaba',
				location: 'Hangzhou',
				title: 'Algorithm Engineer',
			},
		],
	}),
};
</script>
