
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
	// Filter plugin, support nl2br
    import('./essential/filters'),
    // Vue moment
    import('./essential/vue-moment'),
    // Graphql Tag
    import('./essential/graphql-tag'),
];

const externalPlugins = () => [
	// Markdown it katex plugin
	import('./external/markdown-it-katex'),
];

export default {
	loadingEssential: () => Promise.all(essentialPlugins()),
	loadingExternal: () => Promise.all(externalPlugins()),
};
