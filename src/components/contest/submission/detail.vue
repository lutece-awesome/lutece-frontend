<template>
	<v-coantainer fluid>
		This is status detail page of contest submission
	</v-coantainer>
</template>


<script>

import { establishWebSocketConnection, closeWebSocketConnection } from '@/components/status/detail/connection';
import Verdict from '@/modules/verdict/main';
import Language from '@/modules/language/main';

export default {

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isLoading: false,
			isError: false,
			result: [],
			meta: null,
			ws: null,
		};
	},

	watch: {
		pk(newValue) {
			this.start(newValue);
		},
	},

	destroyed() {
		if (this.ws) {
			closeWebSocketConnection(this.ws);
		}
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
			pro.then(() => establishWebSocketConnection(pk))
				.then((ws) => {
					this.ws = ws;
					this.isLoading = false;
					Object.assign(this.ws, { onmessage: ev => this.assignData(ev) });
				})
				.catch((_err) => { this.isError = true; });
		},

		assignData(event) {
			const data = JSON.parse(event.data);
			const previousCaseList = this.caseList;
			if (Object.prototype.hasOwnProperty.call(data, 'result')) {
				Object.assign(data, { result: Verdict.valueOf(data.result) });
			}
			if (Object.prototype.hasOwnProperty.call(data, 'language')) {
				Object.assign(data, { language: Language.valueOf(data.language) });
			}
			if (Object.prototype.hasOwnProperty.call(data, 'caseList')) {
				Object.assign(data, {
					caseList: data.caseList.map(each => ({
						...each,
						...{
							result: Verdict.valueOf(each.result),
						},
					})),
				});
			}
			Object.assign(this, data);
			this.caseList = [
				...this.caseList,
				...previousCaseList,
			]
				.sort((a, b) => {
					if (a.case > b.case) {
						return -1;
					}
					if (a.case === b.case) {
						return 0;
					}
					return 1;
				});
		},
	},
};
</script>
