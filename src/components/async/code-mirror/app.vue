<template>
	<div>
		<codemirror
			:value = "value"
			:options = "getOptions"
			class = "CodeMirror"
			@input = "$emit( 'input' , $event )"
		/>
		<slot name = "extension" />
	</div>
</template>

<script>

import LoadingSpinner from '@/components/utils/loading-spinner';
import ErrorSpinner from '@/components/utils/error-spinner';

export default {
	components: {
		// TODO: Split those promise to configuration files and
		// support async theme / language-mode / keymap download.
		codemirror: () => {
			const cmPromise = import('@/plugins/external/code-mirror');
			return {
				component: cmPromise.then(md => md.default.component),
				loading: LoadingSpinner,
				error: ErrorSpinner,
				dealy: 0,
			};
		},
	},

	props: {
		value: {
			type: String,
			default: '',
		},
		option: {
			type: Object,
			default: () => ({}),
		},
	},

	data() {
		return {
			isLoading: false,
			isError: false,
			defaultOption: {
				indentUnit: 4,
				line: true,
				lineNumbers: true,
				// keyMap: 'sublime',
				// tabindex: '0',
				// line: true,
				// styleActiveLine: true,
				// matchBrackets: true,
				// theme: 'neo',
				// autoRefresh: true,
			},
		};
	},

	computed: {
		getOptions() {
			return {
				...this.defaultOption,
				...this.option,
			};
		},
	},
};
</script>


<style>
    .CodeMirror {
        height: auto !important;
        border: 1px solid #eee;
    }
    .CodeMirror-scroll{
        min-height: 512px;
    }
</style>
