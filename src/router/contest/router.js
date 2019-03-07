import ContestList from '@/components/contest/list/app';
import ContestCreate from '@/components/contest/edit/create';
import ContestDetail from '@/components/contest/detail/app';
import ContestReview from '@/components/contest/review/app';
import ContestSummary from '@/components/contest/detail/summary';
import ContestClarification from '@/components/contest/detail/clarification';
import ContestProblem from '@/components/contest/detail/problem';
import ContestRank from '@/components/contest/detail/rank';
import ContestSubmission from '@/components/contest/detail/submission';
import ContestSubmissionSubmit from '@/components/contest/detail/submit';

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
		redirect: {
			name: 'ContestSummary',
		},
		children: [
			{
				path: 'summary',
				name: 'ContestSummary',
				component: ContestSummary,
				props: true,
			},
			{
				path: 'clarification',
				name: 'ContestClarification',
				component: ContestClarification,
				props: true,
			},
			{
				path: 'problem',
				name: 'ContestProblem',
				component: ContestProblem,
				props: true,
			},
			{
				path: 'submit',
				name: 'ContestSubmissionSubmit',
				component: ContestSubmissionSubmit,
				props: true,
			},
			{
				path: 'submission',
				name: 'ContestSubmission',
				component: ContestSubmission,
				props: true,
			},
			{
				path: 'rank',
				name: 'ContestRank',
				component: ContestRank,
				props: true,
			},
		],
		props: true,
	},
	{
		path: '/contest-review/:pk',
		name: 'ContestReview',
		component: ContestReview,
		props: true,
	},
];


export default Router;
