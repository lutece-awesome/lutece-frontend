import ProblemDetail from '@/components/problem/detail/app';
import ProblemList from '@/components/problem/list/app';
import ProblemDescription from '@/components/problem/detail/description';
import ProblemEditor from '@/components/problem/detail/editor';
import ProblemChange from '@/components/problem/edit/app';
import ProblemCreate from '@/components/problem/create/app';

const Router = [
	{
		path: '/problem',
		name: 'Problem',
		component: ProblemList,
	},
	{
		path: '/problem-create',
		name: 'ProblemCreate',
		component: ProblemCreate,
	},
	{
		path: '/problem/:slug',
		name: 'ProblemDetail',
		component: ProblemDetail,
		redirect: {
			name: 'ProblemDescription',
		},
		children: [
			{
				path: 'description',
				name: 'ProblemDescription',
				component: ProblemDescription,
				props: true,
			},
			{
				path: 'editor',
				name: 'ProblemEditor',
				component: ProblemEditor,
			},
		],
		props: true,
	},
	{
		path: '/problem-edit/:slug',
		name: 'ProblemEdit',
		component: ProblemChange,
		props: true,
		meta: {
			requirePermission: 'problem.change_problem',
		},
	},
];


export default Router;
