import store from '@/store/index';


const UserManager = {
	getPayload: () => store.getters['user/payload'],
	getProfile: () => store.getters['user/profile'],
	getToken: () => store.getters['user/token'],
	isAuthenticated: () => store.getters['user/isAuthenticated'],
	isProfileLoaded: () => store.getters['user/isProfileLoaded'],
	hasPermission: permisson => store.getters['user/hasPermission'](permisson),
};

export default UserManager;
