/* eslint-disable */
import { getWebSocketUri } from '@/utils';
import store from '@/store';

const establishWebSocketConnection = pk => new Promise(
	(resolve, reject) => {
		const token = store.getters['user/token'];
		const ws = new WebSocket(`${getWebSocketUri()}/status/${String(pk)}/?${token}`);
		ws.onerror = error => reject(error);
		ws.onopen = resolve(ws);
		return ws;
	},
);

const closeWebSocketConnection = ws => new Promise(
	(resolve) => {
		if (ws) {
			ws.close();
		}
		resolve();
	},
);


const waitingInitializing = ws => new Promise(
	(resolve) => {
		ws.onmessage = (data) => {
			ws.onmessage = null;
			resolve(data);
		};
	},
);

export { establishWebSocketConnection, closeWebSocketConnection, waitingInitializing };
