<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 4 : 1}`"
		>
			<v-container grid-list-xl>
				<v-layout
					row
					wrap
					align-center
				>
					<v-flex xs12>
						<h1 class="headline mb-3 primary--text">Why Lutece?</h1>
						<v-divider class = "mb-3" />
						<v-layout
							row
							wrap
						>
							<v-flex
								v-for = "( each , index ) in cards"
								:key = "index"
								xs12
								sm4
							>
								<div>
									<v-divider v-if = "$vuetify.breakpoint.xs && index" />

									<div class = "text-xs-center mt-4">
										<v-icon
											x-large
											class = "blue--text text--lighten-2"
										>
											{{ each.icon }}
										</v-icon>
									</div>
									<div
										primary-title
										class = "layout justify-center mt-4"
									>
										<div class = "headline text-xs-center"> {{ each.title }} </div>
									</div>
									<v-card-text class = "text-xs-center" >
										{{ each.text }}
									</v-card-text>
								</div>
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
		cards: [
			{
				icon: 'mdi-material-design',
				title: 'Material',
				text: 'Design based on Google Material, easily to touch beautify.',
			},
			{
				icon: 'mdi-flash',
				title: 'Flexible',
				text: 'Core drived by distributed judge Osiris, so powerful and amazing.',
			},
			{
				icon: 'mdi-wrench',
				title: 'Expandable',
				text: 'Developed by Python and Vue, to build your own Lutece easily.',
			},
		],
	}),
};
</script>
