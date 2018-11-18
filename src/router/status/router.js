import StatusList from '@/components/status/list/app';
import StatusDetail from '@/components/status/detail/app';

const Router = [
	{
		path: '/status',
		name: 'Status',
		component: StatusList,
	},
	{
		path: '/status/:pk',
		name: 'StatusDetail',
		component: StatusDetail,
		props: true,
	},
];


export default Router;
