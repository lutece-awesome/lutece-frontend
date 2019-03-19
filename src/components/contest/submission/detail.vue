<template>
	<v-dialog
		:value = "value"
		max-width = "1400px"
		@input = "$emit( 'input' , $event )"
	>
		<v-card>
			<loading-spinner
				v-if = "isLoading || !initialized"
				style = "height: 600px"
			/>
			<div v-else>
				<div>
					<Summary
						:result = "result"
						:problemTitle = "problemTitle"
						:problemSlug = "problemSlug"
						:username = "submitUser"
						:submitTime = "submitTime"
						:language = "language"
						:isIndeterminate = "isIndeterminate"
						:caseNumber = "caseNumber"
						:caseList = "caseList"
					/>
				</div>

				<div
					class = "elevation-2 mt-5"
				>
					<v-tabs
						v-model = "tab"
						fixed-tabs>

						<v-tab
							v-if = "hasCode"
							:ripple = "false"
						>
							Code
						</v-tab>

						<v-tab :ripple = "false">
							Progress
						</v-tab>
					</v-tabs>


					<v-tabs-items
						v-model = "tab"
						touchless
					>

						<v-tab-item v-if = "hasCode">
							<Code
								:code = "code"
								:language = "language"
								:compileInfo = "compileInfo"
								:errorInfo = "errorInfo"
							/>
						</v-tab-item>

						<v-tab-item>
							<Progress
								:caseList = "caseList"
							/>
						</v-tab-item>

					</v-tabs-items>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>


<script>

import { establishWebSocketConnection, closeWebSocketConnectionSync } from '@/components/status/detail/connection';
import Verdict from '@/modules/verdict/main';
import Language from '@/modules/language/main';
import Code from '@/components/status/detail/code';
import Summary from './summary';
import Progress from '@/components/status/detail/progress';

export default {

	components: {
		Code,
		Summary,
		Progress,
	},

	props: {
		value: {
			type: Boolean,
			default: false,
		},
		pk: {
			type: String,
			default: null,
		},
		contest: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			isLoading: false,
			isError: false,
			initialized: false,
			ws: null,
			result: null,
			code: null,
			language: null,
			problemTitle: null,
			problemSlug: null,
			submitTime: null,
			caseNumber: null,
			submitUser: null,
			compileInfo: null,
			errorInfo: null,
			caseList: [],
			tab: null,
			currentPk: null,
		};
	},

	computed: {
		hasCode() {
			if (!this.code) return false;
			return this.code.length > 0;
		},
		isIndeterminate() {
			return this.result === Verdict.pd || this.result === Verdict.pr;
		},
	},

	watch: {
		pk(newValue) {
			this.start(newValue);
		},
	},

	destroyed() {
		if (this.ws) {
			closeWebSocketConnectionSync(this.ws);
		}
	},

	methods: {
		start(pk) {
			if (pk === null || pk === undefined || !pk) {
				return;
			}
			this.currentPk = pk;
			this.result = null;
			this.isLoading = true;
			this.isError = false;
			this.initialized = false;
			this.result = null;
			this.code = null;
			this.language = null;
			this.problemTitle = null;
			this.problemSlug = null;
			this.submitTime = null;
			this.caseNumber = null;
			this.submitUser = null;
			this.compileInfo = null;
			this.errorInfo = null;
			this.caseList = [];
			closeWebSocketConnectionSync(this.ws);
			establishWebSocketConnection(pk)
				.then((ws) => {
					this.isLoading = false;
					if (pk !== this.currentPk) {
						closeWebSocketConnectionSync(ws);
						return;
					}
					this.ws = ws;
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
			this.initialized = true;
		},
	},
};
</script>
