<template>
	<div class = "pl-3 pr-3 pt-4 pb-4">
		<v-layout>
			<v-item-group
				v-model = "current"
				:class = "{ 'mobile-shrink' : $vuetify.breakpoint.xsOnly }"
				class = "shrink"
				mandatory
			>
				<router-link
					v-for = "each in contest.problems.length"
					:key = "each"
					:to = "{name: 'ContestSpecifyProblem', params: {id: String.fromCharCode(each + 64) }}"
					tag = "span"
				>
					<v-item>
						<div slot-scope = "{ active }">
							<v-btn
								:input-value = "active"
								icon
							>
								<v-icon :color = "getIconColor(each)">
									{{ getIcon(each) }}
								</v-icon>
							</v-btn>
						</div>
					</v-item>
				</router-link>
			</v-item-group>
			<v-window
				v-model = "current"
				touchless
			>
				<v-window-item
					v-for = "(each, index) in contest.problems"
					:key = "index"
					:reverse-transition = "false"
					:transition = "false"
				>
					<problem-preview
						:problem = "each"
					/>
				</v-window-item>
			</v-window>
		</v-layout>
	</div>
</template>

<script>

import ProblemPreview from '@/components/problem/detail/preview';

export default {
	components: {
		ProblemPreview,
	},

	props: {
		contest: {
			type: Object,
			required: true,
		},
		id: {
			type: String,
			default: null,
		},
	},

	data() {
		return {
			current: 0,
		};
	},

	watch: {
		$route() {
			this.updateTab();
		},
	},

	created() {
		this.updateTab();
	},

	methods: {
		getIconColor(problemId) {
			return `hsl( ${(problemId - 1) * 360 / this.contest.problems.length} , 100%, 40%)`;
		},
		getIcon(problemId) {
			const alpha = String.fromCharCode(96 + problemId);
			if (this.contest.problems[problemId - 1].solved) {
				return `mdi-alpha-${alpha}-circle`;
			}
			if (this.contest.problems[problemId - 1].tried) {
				return `mdi-alpha-${alpha}-box-outline`;
			}
			return `mdi-alpha-${alpha}-circle-outline`;
		},
		init() {
			this.$emit('updateStatus');
		},
		updateTab() {
			const { id } = this.$route.params;
			if (id === undefined || !id || id.length > 1) {
				return;
			}
			let value = 0;
			const code = id.charCodeAt();
			if (code <= 90 && code >= 65) {
				value = code - 65;
			} else if (code >= 97 && code <= 122) {
				value = code - 97;
			}
			this.current = value;
		},
	},
};
</script>

<style scoped>
.shrink {
	margin-right: 5px;
}

.mobile-shrink {
	margin-right: -5px;
	margin-left: -20px;
}
</style>
