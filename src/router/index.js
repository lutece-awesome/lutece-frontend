import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/components/global/404';
import AboutRouter from '@/router/about/router';
import ArticleRouter from '@/router/article/router';
import ContestRouter from '@/router/contest/router';
import HomeRouter from '@/router/home/router';
import ProblemRouter from '@/router/problem/router';
import SignRouter from '@/router/sign/router';
import StatusRouter from '@/router/status/router';
import UserRouter from '@/router/user/router';
import Store from '@/store/index';
import { isAuthenticated, goHome, hasPermission } from './utils';

/*
	Supporting meta:

		requireAuth: boolean
			- true: Must log in to access.
			- false: Must not log in to access.

		requirePermission: str
			check the permission to login the specific route.

*/

const router = new Router({
	mode: 'history',
	routes: [
		...AboutRouter,
		...ArticleRouter,
		...HomeRouter,
		...ProblemRouter,
		...SignRouter,
		...StatusRouter,
		...UserRouter,
		...ContestRouter,
		{
			path: '*',
			name: '404',
			component: NotFound,
		},
	],
});


router.beforeEach((to, from, next) => {
	const { matched } = to;

	for (let i = 0; i < matched.length; i += 1) {
		const { meta } = matched[i];
		// Check the requireAuth meta info
		if (Object.prototype.hasOwnProperty.call(meta, 'requireAuth')) {
			if (isAuthenticated() !== meta.requireAuth) {
				goHome();
				return;
			}
		}

		// Check the permission required or not
		if (Object.prototype.hasOwnProperty.call(meta, 'requirePermission')) {
			if (!hasPermission(meta.requirePermission)) {
				goHome();
				return;
			}
		}
	}

	// Refresh token before enter any router, any error should be ignored,
	// this step is only to validate token expired or not.
	Store.dispatch('user/refresh_token')
		.then(() => next())
		.catch(() => next());
});


// Reset the title
router.beforeEach((to, from, next) => {
	Store.commit('navbar/setTitle', 'Lutece');

	next();
});

Vue.use(Router);

export default router;
