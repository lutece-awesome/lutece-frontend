const VerdictList = [
	{
		full: 'Pending',
		short: 'pd',
		textColor: 'info',
	},
	{
		full: 'Preparing',
		short: 'pr',
		textColor: 'info',
	},
	{
		full: 'Accepted',
		short: 'ac',
		backgroundColor: 'rgba(0, 255, 127, 0.2)',
		borderColor: 'rgba(0, 255, 127, 1)',
		textColor: 'success',
	},
	{
		full: 'Running',
		short: 'rn',
		textColor: 'info',
	},
	{
		full: 'Compile Error',
		short: 'ce',
		backgroundColor: 'rgba(54, 162, 235, 0.2)',
		borderColor: 'rgba(54, 162, 235, 1)',
		textColor: 'warning',
	},
	{
		full: 'Wrong Answer',
		short: 'wa',
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		borderColor: 'rgba(255, 99, 132, 1)',
		textColor: 'error',
	},
	{
		full: 'Runtime Error',
		short: 're',
		backgroundColor: 'rgba(255, 206, 86, 0.2)',
		borderColor: 'rgba(255, 206, 86, 1)',
		textColor: 'error',
	},
	{
		full: 'Time Limit Exceeded',
		short: 'tle',
		backgroundColor: 'rgba(75, 192, 192, 0.2)',
		borderColor: 'rgba(75, 192, 192, 1)',
		textColor: 'error',
	},
	{
		full: 'Output Limit Exceeded',
		short: 'ole',
		backgroundColor: 'rgba(153, 102, 255, 0.2)',
		borderColor: 'rgba(153, 102, 255, 1)',
		textColor: 'error',
	},
	{
		full: 'Memory Limit Exceeded',
		short: 'mle',
		backgroundColor: 'rgba(255, 159, 64, 0.2)',
		borderColor: 'rgba(255, 159, 64, 1)',
		textColor: 'error',
	},
	{
		full: 'Judger Error',
		short: 'je',
		textColor: 'warning',
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
