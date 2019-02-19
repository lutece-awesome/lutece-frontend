/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Language from '@/modules/language/main';
import Keymap from '@/modules/code-mirror/keymap';
import Theme from '@/modules/code-mirror/theme';

export const state = () => ({
	currentLanguage: Language.valueOf(localStorage.getItem('editor_language')),
	importLanguage: null,
	currentKeymap: Keymap.valueOf(localStorage.getItem('editor_keymap')),
	importKeymap: null,
	currentTheme: Theme.valueOf(localStorage.getItem('editor_theme')),
	importTheme: null,
});

export const mutations = {
	setCurrentLanguage(state, lang) {
		localStorage.setItem('editor_language', lang.full);
		state.currentLanguage = lang;
	},
	setImportLanguage(state, lang) {
		if (state.currentLanguage === lang) {
			state.importLanguage = lang;
		}
	},
	setCurrentKeymap(state, keymap) {
		localStorage.setItem('editor_keymap', keymap.name);
		state.currentKeymap = keymap;
	},
	setImportKeymap(state, keymap) {
		if (state.currentKeymap === keymap) {
			state.importKeymap = keymap;
		}
	},
	setCurrentTheme(state, theme) {
		localStorage.setItem('editor_theme', theme.name);
		state.currentTheme = theme;
	},
	setImportTheme(state, theme) {
		if (state.currentTheme === theme) {
			state.importTheme = theme;
		}
	},
};

const getters = {
	currentLanguage: state => state.currentLanguage,
	importLanguage: state => state.importLanguage,
	currentKeymap: state => state.currentKeymap,
	importKeymap: state => state.importKeymap,
	currentTheme: state => state.currentTheme,
	importTheme: state => state.importTheme,
};

const actions = {
	updateLanguage({ commit }, lang) {
		commit('setCurrentLanguage', lang);
		lang.codeMirrorImport().then(() => {
			commit('setImportLanguage', lang);
		});
	},
	updateKeymap({ commit }, keymap) {
		commit('setCurrentKeymap', keymap);
		keymap.import().then(() => {
			commit('setImportKeymap', keymap);
		});
	},
	updateTheme({ commit }, theme) {
		commit('setCurrentTheme', theme);
		theme.import().then(() => {
			commit('setImportTheme', theme);
		});
	},
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
