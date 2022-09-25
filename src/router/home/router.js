import Home from '@/components/home/home';
import Announcement from '@/components/home/announcement';
import Develop from '@/components/home/develop';
import AnnouncementDetail from '@/components/article/home/detail';
import Honor from '@/components/home/honor';
import Blog from '@/components/home/blog';
import BlogDetail from '@/components/article/user/detail';

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
		path: '/announcement',
		name: 'Announcement',
		component: Announcement,
	},
	{
		path: '/announcement/:slug',
		name: 'AnnouncementDetail',
		component: AnnouncementDetail,
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
	{
		path: '/blog',
		name: 'Blog',
		component: Blog,
	},
	{
		path: '/blog/:pk',
		name: 'BlogDetail',
		component: BlogDetail,
		props: true,
	},
];

export default Router;
