import Login from '@/components/signin/login';
import Signup from '@/components/signin/signup';
import Signout from '@/components/signin/signout';

const Router = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			requireAuth: false,
		},
	},
	{
		path: '/signup',
		name: 'Signup',
		component: Signup,
		meta: {
			requireAuth: false,
		},
	},
	{
		path: '/signout',
		name: 'Signout',
		component: Signout,
		meta: {
			requireAuth: true,
		},
	},
];


export default Router;
