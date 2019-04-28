import Home from '@/components/home/home';
import Blog from '@/components/home/blog';
import Develop from '@/components/home/develop';
import BlogDetail from '@/components/article/home/detail';
import Honor from '@/components/home/honor';

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
		path: '/blog/:slug',
		name: 'BlogDetail',
		component: BlogDetail,
		props: true,
	},
	{
		path: '/develop',
		name: 'Develop',
		component: Develop,
	},
	{
		path: '/honor',
		name: 'Honor',
		component: Honor,
	},
];

export default Router;
