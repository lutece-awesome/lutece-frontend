import ProblemDetail from '@/components/problem/detail/app';
import ProblemList from '@/components/problem/list/app';
import ProblemDescription from '@/components/problem/utils/description';
import ProblemEditor from '@/components/problem/detail/editor';

const Router = [
	{
		path: '/problem',
		name: 'Problem',
		component: ProblemList,
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
	},
];


export default Router;
