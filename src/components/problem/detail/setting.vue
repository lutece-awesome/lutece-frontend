<template>
	<v-container
		v-if="problem"
		fiuld>
		<v-form>
			<div>
				<div class = "section-title" > Title </div>
				<v-text-field v-model = "problem.title"/>
			</div>

			<div>
				<div class = "section-title" > Limitation </div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:change = "triggerLimitationUpdate()"
							v-model = "limitation.timeLimit"
							prepend-icon = "mdi-clock"
							suffix = "Ms"
							type = "number"
						/>
						<span> Time Limit </span>
					</v-tooltip>
				</div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:change = "triggerLimitationUpdate()"
							v-model = "limitation.memoryLimit"
							prepend-icon = "mdi-zip-disk"
							suffix = "Mib"
							type= "number"
						/>
						<span> Memory Limit </span>
					</v-tooltip>
				</div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:change = "triggerLimitationUpdate()"
							v-model = "limitation.outputLimit"
							prepend-icon = "mdi-pencil"
							suffix = "Mib"
							type= "number"
						/>
						<span> Output Limit </span>
					</v-tooltip>
				</div>
				<div class = "limitation-section" >
					<v-tooltip right>
						<v-text-field
							slot = "activator"
							:change = "triggerLimitationUpdate()"
							v-model = "limitation.cpuLimit"
							disabled
							prepend-icon = "mdi-laptop"
							suffix = "Core"
							type= "number"
						/>
						<span> CPU Limit </span>
					</v-tooltip>
				</div>
			</div>


			<div>
				<div class = "section-title" > Content </div>
				<v-textarea
					v-model = "problem.content"
					auto-grow
					rows="4"
				/>
			</div>
			<div>
				<div class = "section-title" > Standard Input </div>
				<v-textarea
					v-model = "problem.standardInput"
					auto-grow
					rows ="4"
				/>
			</div>

			<div>
				<div class = "section-title" > Standard Output </div>
				<v-textarea
					v-model="problem.standardOutput"
					auto-grow
					rows="4"
				/>
			</div>

			<div>
				<div class = "section-title" > Samples </div>
				<v-layout
					row
					wrap>
					<v-flex
						v-for = "(sample, index) in samples.sampleList"
						:key = "index"
						d-flex
					>
						<v-flex
							d-flex
							xs5>
							<v-textarea
								v-model = "sample.inputContent"
								:change = "triggerEmitSampleUpdate()"
								auto-grow
								rows = "1"
							/>
						</v-flex>

						<v-flex
							d-flex
							xs5>
							<v-textarea
								v-model = "sample.outputContent"
								:change = "triggerEmitSampleUpdate()"
								auto-grow
								rows="1"
							/>
						</v-flex>

						<v-flex
							d-flex
							xs1>
							<v-icon @click = "removeSample(index)" > mdi-close-circle </v-icon>
						</v-flex>
					</v-flex>

				</v-layout>
				<div class = "text-xs-center">
					<v-btn
						color = "info"
						@click = "addSample" > Add Sample </v-btn>
				</div>
			</div>

			<div>
				<div class = "section-title" > Constraints </div>
				<v-textarea
					v-model="problem.constraints"
					auto-grow
					rows="4"
				/>
			</div>

			<div>
				<div class = "section-title" > Note </div>
				<v-textarea
					v-model = "problem.note"
					auto-grow
					rows="4"
				/>
			</div>

			<div>
				<div class = "section-title" > Resources </div>
				<v-text-field v-model = "problem.resources" />
			</div>

			<div class = "text-xs-center">
				<v-btn color = "success"> SUBMIT </v-btn>
			</div>
		</v-form>
	</v-container>
</template>


<script>

export default {
	props: {
		data: {
			type: Object,
			default: null,
		},
	},

	data: () => ({
		problem: null,
		samples: null,
		limitation: null,
	}),

	watch: {
		data(current) {
			this.problem = current;
			this.samples = JSON.parse(JSON.stringify(this.problem.samples));
			this.limitation = JSON.parse(JSON.stringify(this.problem.limitation));
		},
	},

	methods: {

		addSample() {
			this.samples.sampleList.push({
				inputContent: '',
				outputContent: '',
			});
		},

		removeSample(index) {
			this.samples.sampleList.splice(index, 1);
		},

		triggerEmitSampleUpdate() {
			this.$emit('triggerSampleListChanged', this.samples);
		},

		triggerLimitationUpdate() {
			this.$emit('triggerLimitationChanged', this.limitation);
		},

		submit() {
			this.$emit('sumitChange');
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
