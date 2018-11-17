<template>
	<v-container fluid>
		<v-layout
			row
			justify-center>
			<v-flex
				v-show = "result"
				xs12
				md8>
				<div>
					<v-card>
						<v-card-title primary-title>
							<div
								:class = "result_color + '--text'"
								class = "headline mb-0">
								<strong> {{ result }} </strong>
							</div>
						</v-card-title>
						<v-progress-linear
							:indeterminate = "isIndeterminate"
							v-model = "progress"
							:color = "result_color"
							height = "5"
							class = "ma-0"/>
						<v-card-text>
							<table class="submission-table output-code mt-2">
								<tr>
									<td><pre>Problem:</pre></td>
									<td class = "pl-1">
										<router-link
											:to = "{name: 'ProblemDetailDescription',
												params: {slug: problem__slug}}"
											tag = "a"
										>
											{{ problem__title }}
										</router-link>
									</td>
								</tr>
								<tr>
									<td><pre>User:</pre></td>
									<td class = "pl-1">
										<router-link :to="{name: 'UserDetail', params: {username: user__username}}">
											{{ user__username }}
										</router-link>
									</td>
								</tr>
								<tr>
									<td><pre>Time:</pre></td>
									<td class = "pl-1"><pre>{{ submit_time }}</pre></td>
								</tr>
								<tr>
									<td><pre>Case:</pre></td>
									<td
										class = "pl-1" >
										<span :class = "result_color + '--text'">
											{{ judge.length }} / {{ casenumber }}
										</span>
									</td>
								</tr>
							</table>
						</v-card-text>
					</v-card>
				</div>

				<div class = "elevation-2 mt-5" >
					<v-tabs
						v-model = "active"
						fixed-tabs>
						<v-tab
							:ripple = "false"
							:disabled = "!hasCode"
							value > Code </v-tab>
						<v-tab :ripple = "false"> Progress </v-tab>
					</v-tabs>

					<v-tabs-items
						v-model = "active"
						touchless
					>

						<v-tab-item>
							<codeComponent
								:code = "code"
								:judgererror_msg = "judgererror_msg"
								:compileerror_msg = "compileerror_msg"
								:cm-options = "cmOptions"
							/>
						</v-tab-item>

						<v-tab-item>
							<progressComponent
								:judge = "judge"
								:headers = "headers" />
						</v-tab-item>

					</v-tabs-items>

				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import { getWebSocketUri } from '@/utils';
import { mapGetters } from 'vuex';
import Verdict from '@/plugins/verdict';


export default {
	components: {
		codeComponent: () => import('@/components/status/detail/code'),
		progressComponent: () => import('@/components/status/detail/progress'),
	},
	metaInfo() { return { title: `Submission#${this.pk}` }; },
	data: () => ({
		isInitialized: false,
		active: null,
		pk: '',
		judge: [],
		ws: null,
		result: null,
		compileerror_msg: null,
		judgererror_msg: null,
		code: null,
		casenumber: null,
		codehighlight: null,
		cmOptions: {
			indentUnit: 4,
			lineNumbers: true,
			matchBrackets: true,
			mode: '',
			theme: 'neo',
			readOnly: true,
		},
		completed: false,
		problem__title: null,
		problem__slug: null,
		user__username: null,
		submit_time: null,
		result_color: 'info',
		headers: [
			{
				text: 'Case',
				align: 'center',
				sortable: false,
			},
			{
				text: 'Verdict',
				align: 'center',
				sortable: false,
			},
			{
				text: 'Time',
				align: 'center',
				sortable: false,
			},
			{
				text: 'Memory',
				align: 'center',
				sortable: false,
			},
		],

	}),

	computed: {
		progress() {
			return (this.judge.length / this.casenumber) * 100;
		},
		...mapGetters({
			token: 'user/token',
		}),
		hasCode() {
			if (!this.code) return false;
			return this.code.length > 0;
		},
		isIndeterminate() {
			const ret = Verdict.valueOf(this.result);
			return ret === Verdict.pd || ret === Verdict.pr;
		},
	},

	watch: {
		codehighlight(val) {
			this.cmOptions.mode = val;
		},
		completed(val) {
			if (val) {
				this.ws.close();
			}
		},
	},

	beforeRouteLeave(to, from, next) {
		this.ws.close();
		next();
	},

	mounted() {
		this.pk = this.$route.params.pk;
		this.ws = new WebSocket(`${getWebSocketUri()}/status/${String(this.pk)}/?${this.token}`);
		this.ws.onmessage = (event) => {
			let { data } = event;
			data = JSON.parse(data);
			if (data.judge !== undefined) {
				data.judge = this.judge.concat(data.judge);
			}
			Object.assign(this, data);
			if (!this.isInitialized) {
				this.isInitialized = true;
				if (this.hasCode) {
					this.active = 0;
				} else {
					this.active = 1;
				}
			}
		};
	},
};
</script>
