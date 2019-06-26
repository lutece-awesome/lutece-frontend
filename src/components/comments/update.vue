<template>
	<v-dialog
		:value = "value"
		max-width = "600px"
		@input = "$emit( 'input' , $event )"
	>
		<v-card style = "overflow-y:hidden;">
			<v-container
				class = "elevation-2"
			>
				<v-layout
					row
					wrap
					fill-height
					align-center
					justify-center
				>
					<v-flex
						xs12
					>
						<div class = "text-xs-center title">
							Edit Comment
						</div>
					</v-flex>
					<v-flex xs12>
						<async-mixrend-component
							v-if = "withRender"
							:content = "dataContent"
							class = "mt-4"
						/>
						<v-textarea
							v-else
							v-model = "dataContent"
							:loading = "isLoading"
							auto-grow
							rows = "4"
						/>
					</v-flex>
				</v-layout>
			</v-container>
			<v-toolbar
				dense
				height = "48"
			>
				<v-switch
					v-model = "withRender"
					:label = "withRender ? 'Preview' : 'Edit' "
					color = "red"
					style = "width: 20%"
					hide-details
				/>
				<v-btn
					:loading = "isLoading"
					:color = " isError ? 'error' : 'primary' "
					flat
					@click = "submit"
				>
					Submit
				</v-btn>
			</v-toolbar>
		</v-card>
	</v-dialog>
</template>


<script>

import gql from '@/plugins/essential/graphql-tag';
import { AsyncMixrendComponent } from '@/components/async/mixrend/index';

export default {

	components: {
		AsyncMixrendComponent,
	},

	props: {
		pk: {
			type: Number,
			required: true,
		},
		value: {
			type: Boolean,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isLoading: false,
			isError: false,
			withRender: false,
			dataContent: '',
		};
	},

	mounted() {
		this.dataContent = this.content;
	},

	methods: {
		submit() {
			this.isLoading = true;
			this.isError = false;
			const mutation = gql`
				mutation UpdateBaseReply( $pk: ID!, $content: String! ){
					updateBaseReply(pk: $pk, content: $content){
						state
					}
				}
			`;
			this.$apollo.mutate({
				mutation,
				variables: {
					pk: this.pk,
					content: this.dataContent,
				},
			})
				.then(() => {
					this.$emit('update-success', this.dataContent).then((
						this.$emit('input')
					));
				})
				.catch(() => {
					this.isError = true;
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
