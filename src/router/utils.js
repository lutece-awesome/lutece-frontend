import router from '@/router/index';
import store from '@/store';

const goBack = () => (window.history.length > 1 ? router.go(-1) : router.push('/'));

const goHome = () => (router.push('/'));

const isAuthenticated = () => store.getters['user/isAuthenticated'];

const hasPermission = permission => store.getters['user/hasPermission'](permission);

export {
	goHome, goBack, isAuthenticated, hasPermission,
};
