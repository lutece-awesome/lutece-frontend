<template>
	<v-container
		:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid
	>
		<v-layout
			row
			justify-center>
			<v-flex
				xs12
				md8
			>
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
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import Verdict from '@/modules/verdict/main';
import Language from '@/modules/language/main';
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
