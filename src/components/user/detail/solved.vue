<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 4 : 1}`"
		>
			<div>
				<v-container fluid>
					<v-layout
						row
						wrap
						justify-center
						align-center
					>
						<v-flex xs12>
							<h3>
								<v-icon class = "mdi-18px"> mdi-chart-gantt </v-icon>
								<span class = "ml-1"> Solved </span>
							</h3>
							<v-divider class = "mt-2 mb-2" />
						</v-flex>
						<v-flex
							xs12
						>
							<div class = "text-xs-center">
								<v-btn
									v-for = "each in user.statistics.solve"
									:key = "each.pk"
									:to = "{name: 'ProblemDetail', params: {slug: each.slug }}"
									:color = " each.status ? 'success' : 'error' "
									small
								>
									{{ each.pk }}
								</v-btn>
							</div>
						</v-flex>
					</v-layout>
				</v-container>
			</div>
		</v-card>
	</v-hover>
</template>


<script>
export default {
	props: {
		user: {
			type: Object,
			default: null,
		},
	},
};
</script>
