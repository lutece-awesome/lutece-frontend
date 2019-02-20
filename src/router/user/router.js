import UserList from '@/components/user/list/app';
import UserDetail from '@/components/user/detail/app';
import UserSettings from '@/components/user/settings/app';

const Router = [
	{
		path: '/user',
		name: 'User',
		component: UserList,
	},
	{
		path: '/user/settings',
		name: 'UserSettings',
		component: UserSettings,
		meta: {
			requireAuth: true,
		},
	},
	{
		path: '/user/:username',
		name: 'UserDetail',
		component: UserDetail,
		props: true,
	},
];


export default Router;
