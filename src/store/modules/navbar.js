/* eslint no-shadow: ["error", { "allow": ["state"] }] */

export const state = () => ({
	visible: 0,
});

export const mutations = {
	setVisible(state, visible) {
		if (visible === true) {
			state.visible += 1;
		} else if (visible === false) {
			state.visible -= 1;
		}
	},
};

const getters = {
	visible: state => (state.visible > 0),
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
};
