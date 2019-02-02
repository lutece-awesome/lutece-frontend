// import '@babel/polyfill';

import loadingPlugins from './plugins/index';
import Vue from './plugins/essential/vue';
import router from './plugins/essential/router';
import store from './plugins/essential/store';
import apolloProvider from './plugins/essential/apollo-provider';
import App from './App';

loadingPlugins.loadingEssential().then(() => {
	loadingPlugins.loadingExternal();
	new Vue({
		router,
		store,
		apolloProvider,
		render: h => h(App),
	}).$mount('#app');
});
