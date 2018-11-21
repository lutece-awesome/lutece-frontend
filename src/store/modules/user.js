/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import { UserLogin, RefreshToken } from '@/graphql/signin/token.gql';
import RegisterGQL from '@/graphql/signin/register.gql';
import { clearApolloCache } from '@/utils';
import apolloProvider from '@/apollo/provider';

const state = {
	token: localStorage.getItem('USER_TOKEN') || '',
	payload: {},
	profile: {},
	permission: [],
};

const getters = {
	payload: state => state.payload,
	profile: state => state.profile,
	token: state => state.token,
	isAuthenticated: state => !!state.token,
	hasPermission: state => permission => state.permission.indexOf(permission) !== -1,
};

const mutations = {
	login(state, data) {
		const { username, attachInfo } = data.user;
		state.token = data.token;
		state.payload = data.payload;
		state.profile = { username, ...attachInfo };
		state.permission = data.permission;
		localStorage.setItem('USER_TOKEN', data.token);
	},
	logout(state) {
		// TODO: cancel all pending apollo promise, otherwise throws
		// store reset while query was in flight(not completed in link chain) error.
		state.token = '';
		state.payload = {};
		state.profile = {};
		state.permission = [];
		localStorage.removeItem('USER_TOKEN');
	},
};

const actions = {
	login: ({ commit }, variables) => new Promise((resolve, reject) => {
		apolloProvider.defaultClient.mutate({
			mutation: UserLogin,
			variables,
		})
			.then(response => response.data.userLogin)
			.then((data) => {
				clearApolloCache().then(() => {
					commit('login', data);
					resolve(data);
				});
			})
			.catch((error) => {
				reject(error);
			});
	}),
	signup: ({ commit }, variables) => new Promise((resolve, reject) => {
		apolloProvider.defaultClient.mutate({
			mutation: RegisterGQL,
			variables,
		})
			.then(response => response.data.userRegister)
			.then((data) => {
				clearApolloCache().then(() => {
					commit('login', data);
					resolve(data);
				});
			})
			.catch((error) => {
				reject(error);
			});
	}),
	logout: ({ commit }) => new Promise((resolve, _reject) => {
		clearApolloCache().then(() => {
			commit('logout');
			resolve();
		});
	}),
	refresh_token: ({ state, commit }, force) => new Promise((resolve, reject) => {
		const BEFORE_EXPIRATION_DELTA = 60 * 60;
		if (state.token) {
			const { exp } = state.payload;
			const now = Date.now() / 1000;
			const expired = exp && exp <= now;
			const needRefresh = force || !exp || exp - now < BEFORE_EXPIRATION_DELTA;
			if (expired) {
				commit('logout');
				resolve();
			} else if (needRefresh) {
				apolloProvider.defaultClient.mutate({
					mutation: RefreshToken,
					variables: {
						token: state.token,
					},
				})
					.then(response => response.data.userTokenRefresh)
					.then((data) => {
						commit('login', data);
						resolve();
					})
					.catch((error) => {
						commit('snackbar/setSnack', error.message, { root: true });
						commit('logout');
						reject(error);
					});
			} else {
				resolve();
			}
		} else {
			resolve();
		}
	}),
};

export default {
	namespaced: true,
	getters,
	state,
	mutations,
	actions,
};
