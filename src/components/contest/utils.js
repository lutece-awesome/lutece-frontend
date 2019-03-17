import Vue from '@/plugins/essential/vue';

const getRunningStatus = (st, ed) => {
	const cur = Vue.moment();
	const stTime = Vue.moment(st);
	const edTime = Vue.moment(ed);
	if (cur < stTime) {
		return 'Pending';
	}
	if (cur < edTime) {
		return 'Running';
	}
	if (cur >= edTime) {
		return 'Finished';
	}
	return 'Unknown';
};

const getMinutesBetweenTwo = (st, ed) => Math.round((new Date(ed) - new Date(st)) / 1000 / 60);

const getTimeLength = (st, ed) => {
	const len = getMinutesBetweenTwo(st, ed);
	const hour = String(Math.round(len / 60));
	let minute = String(len % 60);
	if (minute.length === 1) {
		minute = `0${minute}`;
	}
	return `${hour}:${minute}`;
};


export { getRunningStatus, getTimeLength, getMinutesBetweenTwo };
