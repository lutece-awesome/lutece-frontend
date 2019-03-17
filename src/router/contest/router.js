import ContestList from '@/components/contest/list/app';
import ContestCreate from '@/components/contest/edit/create';
import ContestDetail from '@/components/contest/detail/app';
import ContestReview from '@/components/contest/review/app';
import ContestRank from '@/components/contest/detail/rank';
import ContestReviewOverall from '@/components/contest/review/overall';
import ContestReviewMine from '@/components/contest/review/mine';
import ContestUpdate from '@/components/contest/edit/update';

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
		path: '/contest-update/:pk',
		name: 'ContestUpdate',
		component: ContestUpdate,
		meta: {
			requirePermission: 'contest.change_contest',
		},
		props: true,
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
			},
			{
				path: 'clarification',
				name: 'ContestClarification',
			},
			{
				path: 'problem',
				name: 'ContestProblem',
				children: [{
					path: ':id',
					name: 'ContestSpecifyProblem',
				}],
			},
			{
				path: 'submit',
				name: 'ContestSubmissionSubmit',
			},
			{
				path: 'submission',
				name: 'ContestSubmission',
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
		redirect: {
			name: 'ContestReviewOverall',
		},
		children: [
			{
				path: 'overall',
				name: 'ContestReviewOverall',
				component: ContestReviewOverall,
				props: true,
			},
			{
				path: 'mine',
				name: 'ContestReviewMine',
				component: ContestReviewMine,
				props: true,
				meta: {
					requireAuth: true,
				},
			},
		],
		props: true,
	},
];


export default Router;
