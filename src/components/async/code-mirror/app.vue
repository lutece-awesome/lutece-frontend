<template>
	<div>
		<codemirror
			:value = "value"
			:options = "getOptions"
			class = "CodeMirror"
			@input = "$emit( 'input' , $event )"
		/>
		<v-toolbar
			dense
			flat
			class = "pl-3 pt-2 pb-3"
		>
			<languageSelect
				v-model = "language"
				:item-text = "each => each.info"
				:clearable = "false"
				style = "max-width: 225px"
				append-icon = "mdi-menu-down"
			/>
			<v-icon class = "ml-3 mt-3">
				mdi-settings
			</v-icon>
			<v-spacer/>
			<v-btn
				class = "mt-3"
				color = "primary"
			>
				Submit
			</v-btn>
		</v-toolbar>
	</div>
</template>

<script>

import LoadingSpinnerWrapper from './loading-wrapper';
import ErrorSpinner from '@/components/utils/error-spinner';
import languageSelect from '@/components/language/utils/select';
import Language from '@/modules/language/main';

export default {
	components: {
		languageSelect,

		codemirror() {
			return {
				component: import('@/plugins/external/code-mirror').then(md => md.default),
				loading: LoadingSpinnerWrapper,
				error: ErrorSpinner,
				delay: 0,
			};
		},
	},

	props: {
		value: {
			type: String,
			default: '',
		},
	},


	data() {
		return {
			isLoading: false,
			isError: false,
			language: null,
			defaultOption: {
				indentUnit: 4,
				line: true,
				lineNumbers: true,
				lineWrapping: true,
				tabindex: '0',
				autoRefresh: true,
				scrollbarStyle: 'overlay',
				styleActiveLine: true,
				matchBrackets: true,
				autoCloseBrackets: true,
			},
		};
	},

	computed: {
		getOptions() {
			const lang = this.$store.getters['editor/importLanguage'];
			return {
				...this.defaultOption,
				...{
					mode: lang ? lang.codeMirror : null,
				},
			};
		},
	},

	watch: {
		language(current) {
			this.$store.dispatch('editor/updateLanguage', current);
		},
	},

	mounted() {
		this.language = this.$store.getters['editor/currentLanguage'] || Language.first();
	},
};
</script>


<style>
    .CodeMirror {
        min-height: 512px !important;
        font-family: Courier New, monospace !important;
        font-size: 16px;
    }
</style>
