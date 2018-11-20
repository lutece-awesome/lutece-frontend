import Login from '@/components/signin/login';
import Signup from '@/components/signin/signup';

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
];


export default Router;
