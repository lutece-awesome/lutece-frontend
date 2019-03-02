import ContestList from '@/components/contest/list/app';
import ContestCreate from '@/components/contest/edit/create';
import ContestDetail from '@/components/contest/detail/app';

const Router = [
	{
		path: '/contest',
		name: 'Contest',
		component: ContestList,
	},
	{
		path: '/contest-create',
		name: 'ContestCreate',
		component: ContestCreate,
		meta: {
			requirePermission: 'contest.add_contest',
		},
	},
	{
		path: '/contest/:pk',
		name: 'ContestDetail',
		component: ContestDetail,
		props: true,
	},
];


export default Router;
