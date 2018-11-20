<template>
	<v-card>
		<v-card-text>
			<code-mirror
				:value = "code"
				:option = "option"
			/>
			<div
				v-if = "errorInfo"
				class = "output-code mt-1">
				<div class = "title">
					<strong> Error Info </strong>
				</div>
				<v-divider class = "mt-2 mb-2" />
				<pre class = "subheadline"> {{ errorInfo }} </pre>
			</div>
			<div
				v-if = "compileInfo"
				class = "output-code mt-1">
				<div class = "title">
					<strong> Compile Info </strong>
				</div>
				<v-divider class = "mt-2 mb-2" />
				<pre class = "subheadline"> {{ compileInfo }} </pre>
			</div>
		</v-card-text>
	</v-card>
</template>


<script>

import CodeMirror from '@/components/utils/code-mirror';

export default {

	components: {
		CodeMirror,
	},

	props: {
		code: {
			type: String,
			default: null,
		},
		compileInfo: {
			type: String,
			default: null,
		},
		errorInfo: {
			type: String,
			default: null,
		},
	},

	data() {
		return {
			option: {
				readOnly: true,
			},
		};
	},
};
</script>
