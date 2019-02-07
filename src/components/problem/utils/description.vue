<template>
	<v-container
		v-if = "problem"
		fiuld>
		<async-mixrend-component
			:content = "problem.content"
			class = "mb-3" />
		<h2
			v-if = "problem.standardInput"
			class="headline mb-3">Standard Input</h2>
		<async-mixrend-component
			:content = "problem.standardInput"
			class = "mb-3" />
		<h2
			v-if="problem.standardOutput"
			class="headline mb-3">Standard Output</h2>
		<async-mixrend-component
			:content = "problem.standardOutput"
			class = "mb-3" />
		<h2 class="headline mb-3">Samples</h2>
		<table class="sample-table mb-3">
			<tr><th>Input</th><th>Output</th></tr>
			<tr
				v-for = "(sample, index) in problem.samples.sampleList"
				:key = "index">
				<td><pre>{{ sample.inputContent }}</pre></td>
				<td><pre>{{ sample.outputContent }}</pre></td>
			</tr>
		</table>
		<h2
			v-if="problem.constraints"
			class="headline mb-3">Constraints</h2>
		<async-mixrend-component
			:content = "problem.constraints"
			class = "mb-3" />
		<h2
			v-if = "problem.note"
			class = "headline mb-3">Note</h2>
		<async-mixrend-component
			:content = "problem.note"
			class = "mb-3" />
		<table class="guideline-table" >
			<tr>
				<td>Problem ID</td>
				<td>{{ problem.pk }}</td>
			</tr>
			<tr>
				<td>Problem Title</td>
				<td>{{ problem.title }}</td>
			</tr>
			<tr>
				<td>Time Limit</td>
				<td>{{ problem.limitation.timeLimit }} ms</td>
			</tr>
			<tr>
				<td>Memory Limit</td>
				<td>{{ problem.limitation.memoryLimit }} MiB</td>
			</tr>
			<tr>
				<td>Output Limit</td>
				<td>{{ problem.limitation.outputLimit }} MiB</td>
			</tr>
			<tr v-if="problem.resources">
				<td>Source</td>
				<td>{{ problem.resources }}</td>
			</tr>
		</table>
	</v-container>
</template>

<script>
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';

export default {
	components: {
		AsyncMixrendComponent,
	},
	props: {
		problem: {
			type: Object,
			default: null,
		},
	},
};
</script>
