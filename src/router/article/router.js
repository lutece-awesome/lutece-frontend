import HomeArticleEdit from '@/components/article/home/edit';
import HomeArticleCreate from '@/components/article/home/create';
import UserArticleEdit from '@/components/article/user/edit';
import UserArticleCreate from '@/components/article/user/create';

const Router = [
	{
		path: '/article/home/edit/:slug',
		name: 'HomeArticleEdit',
		component: HomeArticleEdit,
		props: true,
		meta: {
			requirePermission: 'article.change_homearticle',
		},
	},
	{
		path: '/article/home/create',
		name: 'HomeArticleCreate',
		component: HomeArticleCreate,
		meta: {
			requirePermission: 'article.add_homearticle',
		},
	},
	{
		path: '/article/user/edit/:pk',
		name: 'UserArticleEdit',
		component: UserArticleEdit,
		props: true,
		meta: {
			requirePermission: 'article.change_userarticle',
		},
	},
	{
		path: '/article/user/create',
		name: 'UserArticleCreate',
		component: UserArticleCreate,
		meta: {
			requirePermission: 'article.add_userarticle',
		},
	},
];

export default Router;
