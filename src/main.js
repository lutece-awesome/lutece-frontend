import '@babel/polyfill';
import Vue from 'vue';
import router from './router/index';
import '@mdi/font/css/materialdesignicons.css';
import './plugins/filters';
import './plugins/markdown-it-katex';
import './plugins/vue-line-clamp';
import './plugins/vue-moment';
import './plugins/vuetify';
import App from './App';
import store from './store';
import apolloProvider from './apollo/provider';
import './registerServiceWorker';
import './stylus/main.styl';

import './plugins/util-components';

Vue.config.productionTip = false;

// Force refresh token before initializing the app vue.
store.dispatch('user/refresh_token', true).then(
	() => new Vue({
		router,
		store,
		apolloProvider,
		render: h => h(App),
	}).$mount('#app'),
);
