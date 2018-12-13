<template>
	<v-container
		v-if = "problem"
		fiuld>
		<v-form>
			<div>
				<div class = "section-title" > Title </div>
				<v-text-field
					:value = "problem.title"
					:error-messages = "getErrorByDelegate('title')"
					@input = "$emit( 'input-title' , $event )"/>
			</div>

			<div>
				<div class = "section-title" > Limitation </div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:value = "problem.limitation.timeLimit"
							:error-messages="getErrorByDelegate('time_limit')"
							prepend-icon = "mdi-clock"
							suffix = "Ms"
							type = "number"
							@input = "$emit( 'input-limitation-time-limit' , $event )"
						/>
						<span> Time Limit </span>
					</v-tooltip>
				</div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:error-messages="getErrorByDelegate('memory_limit')"
							:value = "problem.limitation.memoryLimit"
							prepend-icon = "mdi-zip-disk"
							suffix = "Mib"
							type= "number"
							@input = "$emit( 'input-limitation-memory-limit' , $event )"
						/>
						<span> Memory Limit </span>
					</v-tooltip>
				</div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:value = "problem.limitation.outputLimit"
							:error-messages="getErrorByDelegate('output_limit')"
							prepend-icon = "mdi-pencil"
							suffix = "Mib"
							type= "number"
							@input = "$emit( 'input-limitation-output-limit' , $event )"
						/>
						<span> Output Limit </span>
					</v-tooltip>
				</div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:value = "problem.limitation.cpuLimit"
							:error-messages="getErrorByDelegate('cpu_limit')"
							disabled
							prepend-icon = "mdi-laptop"
							suffix = "Core"
							type= "number"
							@input = "$emit( 'input-limitation-cpu-limit' , $event )"
						/>
						<span> CPU Limit </span>
					</v-tooltip>
				</div>
				<div>
					<v-switch
						:input-value = "problem.disable"
						label = "Disable"
						@change = "$emit( 'input-disable' , $event )"
					/>
				</div>
			</div>

			<div>
				<div class = "section-title" > Content </div>
				<v-textarea
					:value = "problem.content"
					:error-messages="getErrorByDelegate('content')"
					auto-grow
					rows="4"
					@input = "$emit( 'input-content' , $event )"
				/>
			</div>
			<div>
				<div class = "section-title" > Standard Input </div>
				<v-textarea
					:value = "problem.standardInput"
					:error-messages="getErrorByDelegate('standard_input')"
					auto-grow
					rows ="4"
					@input = "$emit( 'input-standard-input' , $event )"
				/>
			</div>

			<div>
				<div class = "section-title" > Standard Output </div>
				<v-textarea
					:value = "problem.standardOutput"
					:error-messages="getErrorByDelegate('standard_output')"
					auto-grow
					rows = "4"
					@input = "$emit( 'input-standard-output' , $event )"
				/>
			</div>

			<div>
				<div class = "section-title" > Samples </div>
				<v-layout
					row
					wrap>
					<v-flex
						v-for = "(sample, index) in problem.samples.sampleList"
						:key = "index"
						d-flex
					>
						<v-flex
							d-flex
							xs5>
							<v-textarea
								:value = "sample.inputContent"
								auto-grow
								rows = "1"
								@input = "$emit( 'input-sample-input' , $event , index )"
							/>
						</v-flex>

						<v-flex
							d-flex
							xs5>
							<v-textarea
								:value = "sample.outputContent"
								auto-grow
								rows="1"
								@input = "$emit( 'input-sample-output' , $event , index )"
							/>
						</v-flex>

						<v-flex
							d-flex
							xs1>
							<v-icon
								@click = "$emit( 'input-sample-remove' , index )"
							>
								mdi-close-circle
							</v-icon>
						</v-flex>
					</v-flex>

				</v-layout>
				<div class = "text-xs-center">
					<v-btn
						color = "info"
						@click = "$emit( 'input-sample-add' )" > Add Sample </v-btn>
				</div>
			</div>

			<div>
				<div class = "section-title" > Constraints </div>
				<v-textarea
					:value = "problem.constraints"
					:error-messages="getErrorByDelegate('constraints')"
					auto-grow
					rows="4"
					@input = "$emit( 'input-constraints' , $event )"
				/>
			</div>

			<div>
				<div class = "section-title" > Note </div>
				<v-textarea
					:value = "problem.note"
					:error-messages="getErrorByDelegate('note')"
					auto-grow
					rows="4"
					@input = "$emit( 'input-note' , $event )"
				/>
			</div>

			<div>
				<div class = "section-title" > Resources </div>
				<v-text-field
					:value = "problem.resources"
					:error-messages="getErrorByDelegate('resources')"
					@input = "$emit( 'input-resources' , $event )"
				/>
			</div>

			<div class = "text-xs-center">
				<v-btn
					:loading = "isLoading"
					:color = "error ? 'error' : 'success'"
					@click = "submit" > SUBMIT </v-btn>
			</div>
		</v-form>
	</v-container>
</template>


<script>

import updateProblemGQL from '@/graphql/problem/edit.gql';
import { clearApolloCache, getErrorMessage, parseGraphqlError } from '@/utils';

export default {
	props: {
		data: {
			type: Object,
			default: null,
		},
		slug: {
			type: String,
			default: null,
		},
		problem: {
			type: Object,
			default: null,
		},
	},

	data: () => ({
		isLoading: false,
		error: false,
	}),

	methods: {

		getErrorByDelegate(field) {
			return getErrorMessage(this.error, field);
		},

		submit() {
			this.isLoading = true;
			this.isError = false;
			this.$apollo.mutate({
				mutation: updateProblemGQL,
				variables: {
					title: this.problem.title,
					content: this.problem.content,
					note: this.problem.note,
					timeLimit: this.problem.limitation.timeLimit,
					memoryLimit: this.problem.limitation.memoryLimit,
					outputLimit: this.problem.limitation.outputLimit,
					cpuLimit: this.problem.limitation.cpuLimit,
					constraints: this.problem.constraints,
					resources: this.problem.resources,
					standardInput: this.problem.standardInput,
					standardOutput: this.problem.standardOutput,
					slug: this.slug,
					samples: JSON.stringify(this.problem.samples.sampleList),
					disable: this.problem.disable,
				},
			})
				.then(() => {
					clearApolloCache().then(() => {
						this.$router.push({
							name: 'ProblemDetailDescription',
							params: { slug: this.slug },
						});
					});
				})
				.catch((error) => {
					this.error = parseGraphqlError(error);
				})
				.finally(() => {
					this.isLoading = false;
				});
		},

	},
};
</script>


<style scoped lang = "stylus">
	.section-title
		font-size: 16px
		color: grey
		font-weight: 500
		margin-top: 12px
		margin-bottom: -12px

	.limitation-section
		max-width: 200px
</style>
