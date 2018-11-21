/* eslint no-shadow: ["error", { "allow": ["state"] }] */

export const state = () => ({
	visible: 0,
	title: 'Lutece',
});

export const mutations = {
	setProgressVisible(state, visible) {
		if (visible === true) {
			state.visible += 1;
		} else if (visible === false) {
			state.visible -= 1;
		}
	},
	setTitle(state, title) {
		state.title = title;
	},
};

const getters = {
	progressVisible: state => (state.visible > 0),
	title: state => state.title,
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
};
