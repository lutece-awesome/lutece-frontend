import Vue from '../essential/vue';

export default import('vue-moment').then((module) => {
	Vue.use(module.default);
});
