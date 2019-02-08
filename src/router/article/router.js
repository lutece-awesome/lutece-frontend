import HomeArticleEdit from '@/components/article/home/edit';
import HomeArticleCreate from '@/components/article/home/create';

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
];

export default Router;
