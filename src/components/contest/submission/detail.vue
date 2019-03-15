<template>
	<v-coantainer fluid>
		This is status detail page of contest submission
	</v-coantainer>
</template>


<script>

import { establishWebSocketConnection, closeWebSocketConnection } from '@/components/status/detail/connection';


export default {

	data() {
		return {
			isLoading: false,
			isError: false,
			ws: null,
		};
	},


	methods: {
		start(pk) {
			if (pk === null || pk === undefined || !pk) {
				return;
			}
			let pro = Promise.resolve();
			this.isLoading = true;
			this.isError = false;
			if (!this.ws) {
				pro = closeWebSocketConnection(this.ws);
			}
			pro.then(() => {
				this.ws = establishWebSocketConnection(pk);
			});
		},
	},
};
</script>
