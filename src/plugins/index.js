
// essential plugins, which would block the initializing.
import authPromise from './essential/auth';

const essentialPlugins = () => [
    // Vue.js as JS Framework
    import('./essential/vue'),
    // Vuetify UI Framework
    import('./essential/vuetify'),
    // Vue Router
    import('./essential/router'),
    // Apollo Provider
    import('./essential/apollo-provider'),
    // Pre auth
    authPromise,
    // Global components
    import('./essential/global-components'),
    // Line clamp
    import('./essential/vue-line-clamp'),
    // Apollo related
    import('./essential/apollo-provider'),
];

const externalPlugins = () => [
	// Filter plugin, support nl2br
	import('./external/filters'),
	// Markdown it katex plugin
    import('./external/markdown-it-katex'),
    // Vue moment
    import('./external/vue-moment'),
];

export default {
	loadingEssential: () => Promise.all(essentialPlugins()),
	loadingExternal: () => Promise.all(externalPlugins()),
};
