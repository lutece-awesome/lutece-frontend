import Home from '@/components/home/home';
import Blog from '@/components/home/blog';
import Develop from '@/components/home/develop';
import HomeManager from '@/components/home/manager';
import BlogDetail from '@/components/article/home/detail';

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
		path: '/home/manager',
		name: 'HomeManager',
		component: HomeManager,
		meta: {
			requirePermission: 'article.change_homearticle',
		},
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
];

export default Router;
