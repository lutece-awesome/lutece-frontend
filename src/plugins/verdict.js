const VerdictList = [
	{
		full: 'Pending',
		short: 'pd',
	},
	{
		full: 'Preparing',
		short: 'pr',
	},
	{
		full: 'Accepted',
		short: 'ac',
		backgroundColor: 'rgba(0, 255, 127, 0.2)',
		borderColor: 'rgba(0, 255, 127, 1)',
	},
	{
		full: 'Running',
		short: 'rn',
	},
	{
		full: 'Compile Error',
		short: 'ce',
		backgroundColor: 'rgba(54, 162, 235, 0.2)',
		borderColor: 'rgba(54, 162, 235, 1)',
	},
	{
		full: 'Wrong Answer',
		short: 'wa',
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		borderColor: 'rgba(255, 99, 132, 1)',
	},
	{
		full: 'Runtime Error',
		short: 're',
		backgroundColor: 'rgba(255, 206, 86, 0.2)',
		borderColor: 'rgba(255, 206, 86, 1)',
	},
	{
		full: 'Time Limit Exceeded',
		short: 'tle',
		backgroundColor: 'rgba(75, 192, 192, 0.2)',
		borderColor: 'rgba(75, 192, 192, 1)',
	},
	{
		full: 'Output Limit Exceeded',
		short: 'ole',
		backgroundColor: 'rgba(153, 102, 255, 0.2)',
		borderColor: 'rgba(153, 102, 255, 1)',
	},
	{
		full: 'Memory Limit Exceeded',
		short: 'mle',
		backgroundColor: 'rgba(255, 159, 64, 0.2)',
		borderColor: 'rgba(255, 159, 64, 1)',
	},
	{
		full: 'Judger Error',
		short: 'je',
	},
];

const valueOf = result => VerdictList.find(element => element.full === result
	|| element.short === result);

const Verdict = {
	valueOf: result => valueOf(result),
	all: () => VerdictList,
	pd: valueOf('pd'),
	pr: valueOf('pr'),
	ac: valueOf('ac'),
	rn: valueOf('rn'),
	ce: valueOf('ce'),
	wa: valueOf('wa'),
	re: valueOf('re'),
	tle: valueOf('tle'),
	ole: valueOf('ole'),
	mle: valueOf('mle'),
	je: valueOf('je'),
};


export default Verdict;
