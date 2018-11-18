import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import About from '@/components/about/about';
import Contest from '@/components/contest/contest';
import ArticleList from '@/components/article/list/app';
import ArticleDetail from '@/components/article/detail/app';
import ArticleEditor from '@/components/article/basic/app';
import UserList from '@/components/user/list/app';
import UserDetail from '@/components/user/detail/app';
import UserSettings from '@/components/user/settings/app';
import Login from '@/components/signin/login';
import Signup from '@/components/signin/signup';
import Signout from '@/components/signin/signout';
import NotFound from '@/components/global/404';
import ProblemRouter from '@/router/problem/router';
import StatusRouter from '@/router/status/router';
import store from '../store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
	if (!store.getters['user/isAuthenticated']) {
		next();
		return;
	}
	next('/');
};

const ifAuthenticated = (to, from, next) => {
	if (store.getters['user/isAuthenticated']) {
		next();
		return;
	}
	next('/login');
};

export default new Router({
	mode: 'history',
	routes: [
		...ProblemRouter,
		...StatusRouter,
		{
			path: '',
			redirect: {
				name: 'Home',
			},
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			beforeEnter: ifNotAuthenticated,
		},
		{
			path: '/contest',
			name: 'Contest',
			component: Contest,
		},
		{
			path: '/user',
			name: 'User',
			component: UserList,
		},
		{
			path: '/user/settings',
			name: 'UserSettings',
			component: UserSettings,
			beforeEnter: ifAuthenticated,
		},
		{
			path: '/user/:username',
			name: 'UserDetail',
			component: UserDetail,
		},
		{
			path: '/article',
			name: 'Article',
			component: ArticleList,
		},
		{
			path: '/article/:slug',
			name: 'ArticleDetail',
			component: ArticleDetail,
		},
		{
			path: '/article/create',
			name: 'articleCreate',
			component: ArticleEditor,
			beforeEnter: ifAuthenticated,
		},
		{
			path: '/about',
			name: 'About',
			component: About,
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup,
			beforeEnter: ifNotAuthenticated,
		},
		{
			path: '/signout',
			name: 'Signout',
			component: Signout,
			beforeEnter: ifAuthenticated,
		},
		{
			path: '*',
			name: '404',
			component: NotFound,
		},
	],
});
