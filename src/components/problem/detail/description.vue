<template>
	<ApolloQuery
		:query = "require('@/graphql/problem/detail.gql')"
		:variables = "{ slug }"
	>
		<template
			slot-scope = "{ result: { loading , error , data } , isLoading }"
		>
			<loading-spinner
				v-if = "(loading || !data || isLoading ) && !error"
				style = "height: 300px"
			/>
			<error-spinner v-else-if = "error" />
			<v-container
				v-else
				fiuld
			>
				<async-mixrend-component
					:content = "data.problem.content"
					class = "mb-3" />
				<h2
					v-if = "data.problem.standardInput"
					class="headline mb-3">Standard Input</h2>
				<async-mixrend-component
					:content = "data.problem.standardInput"
					class = "mb-3" />
				<h2
					v-if = "data.problem.standardOutput"
					class="headline mb-3">Standard Output</h2>
				<async-mixrend-component
					:content = "data.problem.standardOutput"
					class = "mb-3" />
				<h2 class="headline mb-3">Samples</h2>
				<table class="sample-table mb-3">
					<tr><th>Input</th><th>Output</th></tr>
					<tr
						v-for = "(sample, index) in data.problem.samples.sampleList"
						:key = "index">
						<td><pre>{{ sample.inputContent }}</pre></td>
						<td><pre>{{ sample.outputContent }}</pre></td>
					</tr>
				</table>
				<h2
					v-if = "data.problem.constraints"
					class="headline mb-3">Constraints</h2>
				<async-mixrend-component
					:content = "data.problem.constraints"
					class = "mb-3" />
				<h2
					v-if = "data.problem.note"
					class = "headline mb-3">Note</h2>
				<async-mixrend-component
					:content = "data.problem.note"
					class = "mb-3" />
				<table class="guideline-table" >
					<tr>
						<td>Problem ID</td>
						<td>{{ data.problem.pk }}</td>
					</tr>
					<tr>
						<td>Problem Title</td>
						<td>{{ data.problem.title }}</td>
					</tr>
					<tr>
						<td>Time Limit</td>
						<td>{{ data.problem.limitation.timeLimit }} ms</td>
					</tr>
					<tr>
						<td>Memory Limit</td>
						<td>{{ data.problem.limitation.memoryLimit }} MiB</td>
					</tr>
					<tr>
						<td>Output Limit</td>
						<td>{{ data.problem.limitation.outputLimit }} MiB</td>
					</tr>
					<tr v-if = "data.problem.resources">
						<td>Source</td>
						<td>{{ data.problem.resources }}</td>
					</tr>
				</table>
			</v-container>
		</template>
	</ApolloQuery>
</template>

<script>
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';

export default {
	components: {
		AsyncMixrendComponent,
	},
	props: {
		slug: {
			type: String,
			required: true,
		},
	},
};
</script>
