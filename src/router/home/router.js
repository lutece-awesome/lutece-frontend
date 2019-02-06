import Home from '@/components/home/home';
import Blog from '@/components/home/blog';
import Develop from '@/components/home/develop';

const Router = [
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
		path: '/blog',
		name: 'Blog',
		component: Blog,
	},
	{
		path: '/develop',
		name: 'Develop',
		component: Develop,
	},
];

export default Router;
