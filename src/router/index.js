import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/components/global/404';
import AboutRouter from '@/router/about/router';
import HomeRouter from '@/router/home/router';
import ProblemRouter from '@/router/problem/router';
import SignRouter from '@/router/sign/router';
import StatusRouter from '@/router/status/router';
import UserRouter from '@/router/user/router';
import Store from '@/store/index';
import { isAuthenticated, goHome } from './utils';

/*
	Supporting meta:

		requireAuth: boolean
			- true: Must log in to access.
			- false: Must not log in to access.

*/

const router = new Router({
	mode: 'history',
	routes: [
		...AboutRouter,
		...HomeRouter,
		...ProblemRouter,
		...SignRouter,
		...StatusRouter,
		...UserRouter,
		{
			path: '*',
			name: '404',
			component: NotFound,
		},
	],
});


router.beforeEach((to, from, next) => {
	const meta = {};
	to.matched.some(record => Object.assign(meta, record.meta));
	if (Object.prototype.hasOwnProperty.call(meta, 'requireAuth')) {
		if (isAuthenticated() !== meta.requireAuth) {
			goHome();
			return;
		}
	}
	// Refresh token before enter any router, any error should be ignored,
	// this step is only to validate token expired or not.
	Store.dispatch('user/refresh_token')
		.then(() => next())
		.catch(() => next());
});

Vue.use(Router);

export default router;
