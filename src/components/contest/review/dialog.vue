<template>
	<div>
		<v-dialog
			v-model = "dialog"
			width = "500"
		>
			<template v-slot:activator = "{ on }">
				<v-btn
					:color = "btnColor"
					:disabled = "isLoading"
					:loading = "isLoading"
					dark
					v-on = "on"
				>
					{{ btnText }}
				</v-btn>
			</template>
			<v-card>
				<v-card-title
					class = "headline grey lighten-2"
					primary-title
				>
					{{ title }}
				</v-card-title>
				<v-card-text>
					{{ text }}
				</v-card-text>
				<v-divider/>
				<v-card-actions>
					<v-spacer/>
					<v-btn
						color = "primary"
						flat
						@click = "triggerClick"
					>
						OK
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
		text: {
			type: String,
			default: '',
		},
		btnColor: {
			type: String,
			default: 'success',
		},
		btnText: {
			type: String,
			default: '',
		},
		submit: {
			type: Function,
			default: () => Promise.resolve(),
		},
	},

	data() {
		return {
			dialog: false,
			isLoading: false,
		};
	},

	methods: {
		triggerClick() {
			this.isLoading = true;
			this.dialog = false;
			this.submit().finally(() => { this.isLoading = false; });
		},
	},
};
</script>
