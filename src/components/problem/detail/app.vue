<template>
	<div>
		<v-container
			:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
			fluid
		>
			<v-layout
				row
				wrap
				justify-center
			>
				<v-flex
					xs12
					md10
					xl8
				>
					<v-card>
						<v-tabs
							v-model = "tabs"
							fixed-tabs
						>
							<v-tab
								:ripple = "false"
								:to = "{name: 'ProblemDescription'}"
							>
								Description
							</v-tab>
							<v-tab
								:ripple = "false"
								:to = "{name: 'ProblemEditor'}"
							>
								Editor
							</v-tab>
						</v-tabs>
						<keep-alive>
							<router-view/>
						</keep-alive>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<v-btn
			v-if = "hasPermission('problem.change_problem')"
			:to = "{
				name: 'ProblemEdit',
				params: { slug }
			}"
			color = "accent"
			dark
			fab
			fixed
			bottom
			right
		>
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
	</div>
</template>

<script>

import ProblemDescription from '@/components/problem/utils/preview';
import ProblemEditor from '@/components/problem/detail/editor';
import { mapGetters } from 'vuex';

export default {

	metaInfo() {
		return {
			title: this.problem ? this.problem.title : 'Loading...',
		};
	},

	components: {
		ProblemDescription,
		ProblemEditor,
	},

	props: {
		slug: {
			type: String,
			required: true,
		},
	},

	data: () => ({
		tabs: 0,
	}),

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},
};
</script>
