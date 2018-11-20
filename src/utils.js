import apolloProvider from '@/apollo/provider';

function getServerUri(protocol, path) {
	const env = process.env.NODE_ENV;
	const loc = window.location;
	const host = env === 'production' ? loc.host : `${loc.host.split(':')[0]}:8000`;
	let newUri = protocol;
	if (loc.protocol === 'https:') {
		newUri += 's:';
	} else {
		newUri += ':';
	}
	newUri += `//${host}/${path}`;
	return newUri;
}

function getGraphQLUri() {
	return getServerUri('http', 'graphql');
}

function getWebSocketUri() {
	return getServerUri('ws', 'ws');
}

function getThoundNumberic(number) {
	return number < 1000 ? String(number) : `${String((number / 1000).toFixed(1))}K`;
}

function formatRank(rk) {
	let s = String(rk);
	if (s.length < 2) s = `0${s}`;
	return s;
}

function clearApolloCache() {
	return new Promise((resolve, reject) => {
		apolloProvider.defaultClient.resetStore().then(() => {
			resolve();
		}).catch((error) => {
			reject(error);
		});
	});
}

// To use this function gain the specific fied error message, the catch error must be
// parsing result of function parseGraphqlError.
function getErrorMessage(error, field) {
	if (error && Object.prototype.hasOwnProperty.call(error, field)) {
		return error[field][0].message;
	}
	return '';
}

function parseGraphqlError(error) {
	return JSON.parse(error.graphQLErrors[0].message);
}

const { version } = require('../package.json');

export {
	getGraphQLUri, getWebSocketUri, getServerUri, getThoundNumberic,
	formatRank, version, clearApolloCache, getErrorMessage, parseGraphqlError,
};
