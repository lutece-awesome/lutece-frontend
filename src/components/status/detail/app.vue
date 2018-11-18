<template>
	<v-container fluid>
		<v-layout
			row
			justify-center>
			<v-flex
				xs12
				md8>
				<div>
					<Summary
						v-if = "isInitialized"
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
					v-if = "isInitialized"
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
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import Verdict from '@/plugins/verdict';
import Language from '@/plugins/language';
import Code from '@/components/status/detail/code';
import Summary from '@/components/status/detail/summary';
import Progress from '@/components/status/detail/progress';
import { establishWebSocketConnection, closeWebSocketConnection, waitingInitializing } from './connection';

export default {

	metaInfo() {
		return {
			title: `Submission - ${this.pk}`,
		};
	},

	components: {
		Code,
		Summary,
		Progress,
	},

	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data: () => ({
		isInitialized: false,
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
	}),

	computed: {
		hasCode() {
			if (!this.code) return false;
			return this.code.length > 0;
		},
		isIndeterminate() {
			return this.result === Verdict.pd || this.result === Verdict.pr;
		},
	},

	beforeRouteLeave(to, from, next) {
		closeWebSocketConnection(this.ws).then(() => next());
	},

	beforeRouteEnter: (to, from, next) => {
		establishWebSocketConnection(to.params.pk).then(
			(ws) => {
				waitingInitializing(ws).then((event) => {
					next((vm) => {
						vm.assignData(event);
						Object.assign(vm, { ws });
						Object.assign(vm.ws, { onmessage: ev => vm.assignData(ev) });
						Object.assign(vm, { isInitialized: true });
					});
				});
			},
		).catch(() => next(false));
	},

	methods: {
		assignData(event) {
			const data = JSON.parse(event.data);
			const previousCaseList = this.caseList;
			Object.assign(this, data);
			this.result = Verdict.valueOf(this.result);
			this.language = Language.valueOf(this.language);
			this.caseList = [
				...this.caseList,
				...previousCaseList,
			]
				.sort((a, b) => a.case < b.case)
				.map(each => ({
					...each,
					...{
						result: typeof (each.result) === 'string' ? Verdict.valueOf(each.result) : each.result,
					},
				}));
		},
	},

};
</script>
