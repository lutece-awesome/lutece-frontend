<template>
	<v-container fiuld>
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
					tag = "v-flex"
				>
					<v-item
						v-for = "each in problemList.length"
						:key = "each"
					>
						<div slot-scope="{ active, toggle }">
							<v-btn
								:input-value = "active"
								icon
								@click = "toggle"
							>
								<v-icon
									:color = "problemList[each - 1].solved ?
									'light-green' : colorList[each % colorList.length]">
									mdi-record
								</v-icon>
							</v-btn>
						</div>
					</v-item>
				</v-item-group>
				<v-flex>
					<v-window
						v-model = "current"
						vertical
						mandatory
					>
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
				</v-flex>
			</v-layout>
		</div>
	</v-container>
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
			colorList: [
				'red',
				'pink',
				'purple',
				'deep-purple',
				'indigo',
				'blue',
				'light-blue',
				'cyan',
				'teal',
				'lime',
				'yellow',
				'amber',
				'orange',
				'deep-orange',
				'brown',
				'blue-grey',
				'grey',
			],
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
	},
};
</script>

<style scoped>
	.shrink {
		margin-left: -25px;
		margin-right: 5px;
	}

	.mobile-shrink {
		margin-right: -5px
	}
</style>
