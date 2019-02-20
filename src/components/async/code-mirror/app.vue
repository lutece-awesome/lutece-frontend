<template>
	<div>
		<codemirror
			:value = "code"
			:options = "getOptions"
			class = "CodeMirror"
			@input = "$emit( 'input-code' , $event )"
		/>
		<v-toolbar
			v-if = "!hideToolBar"
			dense
			flat
			class = "pl-3 pt-2 pb-3"
		>
			<languageSelect
				:value = "language"
				:item-text = "each => each.info"
				:clearable = "false"
				style = "max-width: 225px"
				append-icon = "mdi-menu-down"
				@input = "$emit( 'input-language' , $event )"
			/>
			<v-icon
				class = "ml-3 mt-3"
				@click = "setting = !setting"
			>
				mdi-settings
			</v-icon>
			<v-spacer/>
			<v-btn
				:loading = "isLoading"
				:color = "isError ? 'error' : 'primary'"
				class = "mt-3"
				@click = "$emit( 'input-submit' , $event )"
			>
				Submit
			</v-btn>
		</v-toolbar>
		<setting-dialog v-model = "setting"/>
	</div>
</template>

<script>

import LoadingSpinnerWrapper from './loading-wrapper';
import ErrorSpinner from '@/components/utils/error-spinner';
import languageSelect from '@/components/language/utils/select';
import settingDialog from './settings';

export default {

	components: {
		languageSelect,
		settingDialog,

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
		code: {
			type: String,
			required: true,
		},
		language: {
			type: Object,
			default: null,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		isError: {
			type: Boolean,
			default: false,
		},
		hideToolBar: {
			type: Boolean,
			default: false,
		},
		readOnly: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			defaultOption: {
				indentUnit: 4,
				line: true,
				lineNumbers: !this.$vuetify.breakpoint.xsOnly,
				lineWrapping: true,
				tabindex: '0',
				autoRefresh: true,
				scrollbarStyle: 'overlay',
				styleActiveLine: true,
				matchBrackets: true,
				autoCloseBrackets: true,
			},
			setting: false,
		};
	},

	computed: {
		getOptions() {
			const lang = this.$store.getters['editor/importLanguage'];
			let theme = this.$store.getters['editor/importTheme'];
			if (theme && theme.name === 'default') {
				theme = null;
			}
			let keymap = this.$store.getters['editor/importKeymap'];
			if (keymap && keymap.name === 'default') {
				keymap = null;
			}
			const options = {
				readOnly: this.readOnly,
			};
			if (lang) {
				options.mode = lang.codeMirror;
			}
			if (theme) {
				options.theme = theme.name;
			}
			if (keymap) {
				options.keymap = keymap.name;
			}
			return {
				...this.defaultOption,
				...options,
			};
		},
	},

	watch: {
		language(current) {
			this.$store.dispatch('editor/updateLanguage', current);
		},
	},

	mounted() {
		if (this.language) {
			this.$store.dispatch('editor/updateLanguage', this.language);
		}
	},
};
</script>


<style>
    .CodeMirror {
        min-height: 512px !important;
        font-family: Courier New, monospace, Lucida Console !important;
        font-size: 16px;
    }
</style>
