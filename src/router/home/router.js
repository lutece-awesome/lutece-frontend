import Home from '@/components/home/home';
import Blog from '@/components/home/blog';

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
];

export default Router;
