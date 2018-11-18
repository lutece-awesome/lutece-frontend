<template>
	<v-container
		:class = "{'pa-0': $vuetify.breakpoint.xsOnly }"
		fluid>
		<v-layout
			row
			wrap
			justify-center>
			<v-flex
				xs12
				md10
				xl8>
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
				<v-card>
					<v-tabs
						v-if = "problem"
						v-model = "tabs"
						fixed-tabs>
						<v-tab
							:ripple="false"
							to = "description">Description</v-tab>
						<v-tab
							:ripple="false"
							to = "editor">Editor</v-tab>
					</v-tabs>
					<v-tabs-items
						v-if = "problem"
						v-model = "tabs"
						touchless>
						<v-tab-item value = "description">
							<ProblemDescription :problem = "problem"/>
						</v-tab-item>
						<v-tab-item value = "editor">
							<ProblemEditor :problemslug = "slug" />
						</v-tab-item>
					</v-tabs-items>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import ProblemDescription from '@/components/problem/utils/description';
import ProblemEditor from '@/components/problem/detail/editor';
import ProblemDetailGQL from '@/graphql/problem/detail.gql';
import DataFetch from '@/components/problem/utils/fetch';
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
		tabs: null,
		problem: null,
	}),

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},

	beforeRouteEnter: (to, from, next) => {
		DataFetch({
			slug: to.params.slug,
			gql: ProblemDetailGQL,
		})
			.then((response) => {
				next((vm) => {
					Object.assign(vm, response.data);
				});
			})
			.catch(() => next(false));
	},
};
</script>
