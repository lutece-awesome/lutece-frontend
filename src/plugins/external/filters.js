export default import('../essential/vue').then((module) => {
	module.default.filter('nl2br', text => text.replace(/(?:\r\n|\r|\n)/g, '<br>'));
});
