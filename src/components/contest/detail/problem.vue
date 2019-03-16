<template>
	<div class = "pl-3 pr-3 pt-4 pb-4">
		<loading-spinner
			v-if = "isLoading"
			text = "Loading ..."
			style = "height: 600px"
		/>
		<error-spinner
			v-else-if = "error"
			:msg = "error"
		/>
		<div v-else>
			<v-layout>
				<v-item-group
					v-model = "current"
					:class = "{ 'mobile-shrink' : $vuetify.breakpoint.xsOnly }"
					class = "shrink"
					mandatory
				>
					<v-item
						v-for = "each in problemList.length"
						:key = "each"
					>
						<div slot-scope = "{ active, toggle }">
							<v-btn
								:input-value = "active"
								icon
								@click = "toggle"
							>
								<v-icon :color = "getIconColor(each)">
									{{ getIcon(each) }}
								</v-icon>
							</v-btn>
						</div>
					</v-item>
				</v-item-group>
				<v-window v-model = "current">
					<v-window-item
						v-for = "(each, index) in problemList"
						:key = "index"
						:reverse-transition = "false"
						:transition = "false"
					>
						<problem-preview
							:problem = "each"
						/>
					</v-window-item>
				</v-window>
			</v-layout>
		</div>
	</div>
</template>

<script>

import gql from 'graphql-tag';
import ProblemPreview from '@/components/problem/detail/preview';

export default {
	components: {
		ProblemPreview,
	},

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isLoading: true,
			error: null,
			problemList: [],
			current: null,
		};
	},

	created() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.isLoading = true;
			const query = gql`
				query ContestProblemList($pk: ID!){
					contestProblemList(pk: $pk){
						tried
						solved
						pk
						title
						content
						standardInput
						standardOutput
						constraints
						resources
						note
						limitation{
							timeLimit
							memoryLimit
							outputLimit
							cpuLimit
						}
						samples {
							sampleList{
								inputContent
								outputContent
							}
						}
					}
				}
			`;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contestProblemList)
				.then((data) => {
					this.problemList = data;
				})
				.catch((error) => { this.error = error; })
				.finally(() => { this.isLoading = false; });
		},
		getIconColor(problemId) {
			return `hsl( ${(problemId - 1) * 360 / this.problemList.length} , 100%, 40%)`;
		},
		getIcon(problemId) {
			const alpha = String.fromCharCode(96 + problemId);
			if (this.problemList[problemId - 1].solved) {
				return `mdi-alpha-${alpha}-circle`;
			}
			if (this.problemList[problemId - 1].tried) {
				return `mdi-alpha-${alpha}-box-outline`;
			}
			return `mdi-alpha-${alpha}-circle-outline`;
		},
	},
};
</script>

<style scoped>
.shrink {
	margin-right: 5px;
}

.mobile-shrink {
	margin-right: -5px;
	margin-left: -20px;
}
</style>
