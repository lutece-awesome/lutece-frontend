<template>
	<v-container
		:class="{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid
		grid-list-lg
		class="ma-0">
		<ApolloQuery
			:query = "require('@/graphql/problem/detail.gql')"
			:variables = "{ slug }"
			@result = "onResult" >
			<template
				slot-scope = "{ result: { loading , error , data } }">
				<error-spinner v-if = "error" />
				<div v-show = "data">
					<v-layout
						row
						wrap>
						<v-flex
							xs12
							md6>
							<div class = "elevation-2" >
								<div class = "text-xs-center pt-4" >
									<v-icon> mdi-circle-edit-outline </v-icon>
									<span class = "headline" > Edit </span>
								</div>
								<div>
									<ProblemSetting
										:data = "problem"
										:slug = "slug"
										@triggerSampleListChanged = "updateSampleList"
										@triggerLimitationChanged = "updateLimitation" />
								</div>
							</div>
						</v-flex>
						<v-flex
							xs12
							md6>
							<v-card>
								<v-card-title primary-title>
									<div class = "headline">Preview</div>
								</v-card-title>
								<ProblemDescription :problem = "problem" />
							</v-card>
						</v-flex>
					</v-layout>
				</div>
			</template>
		</ApolloQuery>
	</v-container>
</template>

<script>
import ProblemDescription from '@/components/problem/detail/description';
import ProblemSetting from '@/components/problem/detail/setting';

export default {
	metaInfo() { return { title: this.problem ? `Edit ${this.problem.title}` : 'Loading...' }; },
	components: {
		ProblemDescription,
		ProblemSetting,
	},
	data: () => ({
		slug: '',
		problem: null,
	}),

	mounted() {
		this.slug = this.$route.params.slug;
	},

	methods: {

		updateSampleList(current) {
			this.problem.samples = current;
		},

		updateLimitation(current) {
			this.problem.limitation = current;
		},

		onResult(result) {
			this.problem = Object.assign({}, result.data.problem);
		},

		has_permission(permission) {
			return this.$store.getters['user/has_permission'](permission);
		},
	},
};
</script>
