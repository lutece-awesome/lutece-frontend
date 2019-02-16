import ProblemDetail from '@/components/problem/detail/app';
import ProblemList from '@/components/problem/list/app';
import ProblemDescription from '@/components/problem/utils/description';
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
		component: ProblemDetail,
		children: [
			{
				path: 'description',
				name: 'ProblemDetailDescription',
				component: ProblemDescription,
			},
			{
				path: 'editor',
				name: 'ProblemDetailEditor',
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
