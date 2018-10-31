<template>
	<v-container
		:class="{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid
		grid-list-lg
		class="ma-0">
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
	</v-container>
</template>

<script>
import ProblemDescription from '@/components/problem/detail/description';
import ProblemSetting from '@/components/problem/detail/setting';
import ProblemDetailGQL from '@/graphql/problem/detail.gql';
import updateProblem from '@/graphql/problem/edit.gql';

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
		this.request();
	},

	methods: {

		updateSampleList(current) {
			this.problem.samples = current;
		},

		updateLimitation(current) {
			this.problem.limitation = current;
		},

		submit() {
			this.$apollo.mutate({
				mutation: updateProblem,
				variables: {
					title: this.title,
					content: this.content,
					note: this.note,
					timeLimit: this.timeLimit,
					memoryLimit: this.memoryLimit,
					constraints: this.constraints,
					resource: this.resource,
					standardInput: this.standardInput,
					standardOutput: this.standardOutput,
					slug: this.slug,
					samples: this.samples,
					discussionvisible: this.discussionvisible,
					visible: this.visible,
				},
			})
				.then(() => {
					// location.reload();
				})
				.catch(error => this.$store.commit('snackbar/setSnack', error.message));
		},
		request() {
			this.$apollo.query({
				query: ProblemDetailGQL,
				variables: {
					slug: this.slug,
				},
			})
				.then(response => response.data.problem)
				.then((data) => {
					this.problem = Object.assign({}, data);
				});
		},
		has_permission(permission) {
			return this.$store.getters['user/has_permission'](permission);
		},
	},
};
</script>
