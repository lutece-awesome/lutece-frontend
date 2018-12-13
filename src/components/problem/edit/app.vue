<template>
	<v-container
		:class="{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid
		grid-list-lg
		class="ma-0">
		<ApolloQuery
			:query = "require('@/graphql/problem/edit-detail.gql')"
			:variables = "{ slug }"
			@result = "onResult" >
			<template
				slot-scope = "{ result: { error , data } }">
				<error-spinner v-if = "error" />
				<div v-show = "data">
					<v-layout
						row
						wrap>
						<v-flex
							xs12
							md6>
							<div class = "elevation-2" >
								<div class = "text-xs-center pt-4 pb-2" >
									<v-icon class = "mr-2" > mdi-circle-edit-outline </v-icon>
									<span class = "headline" > Edit </span>
								</div>
								<div>
									<ProblemSetting
										:problem = "problem"
										:slug = "slug"
										@input-title = "problem.title = $event"
										@input-limitation-time-limit = "problem.limitation.timeLimit = $event"
										@input-limitation-memory-limit = "problem.limitation.memoryLimit = $event"
										@input-limitation-output-limit = "problem.limitation.outputLimit = $event"
										@input-limitation-cpu-limit = "problem.limitation.cpuLimit = $event"
										@input-disable = "problem.disable = $event ? true : false"
										@input-content = "problem.content = $event"
										@input-standard-input = "problem.standardInput = $event"
										@input-standard-output = "problem.standardOutput = $event"
										@input-sample-input = "sampleInputChange"
										@input-sample-output = "sampleOutputChange"
										@input-sample-remove = "sampleRemove"
										@input-sample-add = "sampleAdd"
										@input-constraints = "problem.constraints = $event"
										@input-note = "problem.note = $event"
										@input-resources = "problem.resources = $event"
									/>
								</div>
							</div>
						</v-flex>
						<v-flex
							xs12
							md6>
							<div class = "elevation-2" >
								<div class = "text-xs-center pt-4 pb-2" >
									<v-icon class = "mr-2" > mdi-cloud </v-icon>
									<span class = "headline" > Preview </span>
								</div>
								<ProblemDescription :problem = "problem" />
							</div>
						</v-flex>
					</v-layout>
				</div>
			</template>
		</ApolloQuery>
	</v-container>
</template>

<script>
import ProblemDescription from '@/components/problem/utils/description';
import ProblemSetting from '@/components/problem/edit/setting';
import Vue from 'vue';

export default {
	metaInfo() { return { title: this.problem ? `Edit ${this.problem.title}` : 'Loading...' }; },
	components: {
		ProblemDescription,
		ProblemSetting,
	},

	props: {
		slug: {
			type: String,
			required: true,
		},
	},

	data: () => ({
		problem: null,
	}),

	methods: {

		sampleInputChange(event, index) {
			Vue.set(this.problem.samples.sampleList, index, {
				inputContent: event,
				outputContent: this.problem.samples.sampleList[index].outputContent,
			});
		},

		sampleOutputChange(event, index) {
			Vue.set(this.problem.samples.sampleList, index, {
				inputContent: this.problem.samples.sampleList[index].inputContent,
				outputContent: event,
			});
		},

		sampleRemove(index) {
			this.problem.samples.sampleList.splice(index, 1);
		},

		sampleAdd() {
			this.problem.samples.sampleList.push({
				inputContent: '',
				outputContent: '',
			});
		},

		onResult(result) {
			this.problem = Object.assign({}, result.data.problem);
		},
	},
};
</script>
