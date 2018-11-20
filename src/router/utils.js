import router from '@/router/index';
import store from '@/store';

const goBack = () => (window.history.length > 1 ? router.go(-1) : router.push('/'));

const goHome = () => (router.push('/'));

const isAuthenticated = () => store.getters['user/isAuthenticated'];

export { goHome, goBack, isAuthenticated };
