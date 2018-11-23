<template>
	<div>
		<code-mirror
			v-model = "code"
			:option = "{ mode: language.codeMirror }"
		>
			<template slot = "extension">
				<v-divider />
				<v-card class = "pl-2 pr-2 pb-2" >
					<v-card-actions>
						<v-spacer/>
						<languageSelect
							v-model = "language"
							:item-text = "each => each.info"
							:clearable = "false"
							style = "max-width: 225px"
							append-icon = "mdi-menu-down"
						/>
						<v-btn
							:loading = "isLoading"
							:color = "isError ? 'error' : 'primary'"
							flat
							large
							class = "ml-1 mt-2"
							@click = "submit"
						>
							<v-icon > mdi-send </v-icon>
							<span class = "ml-2"> Submit </span>
						</v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</code-mirror>
	</div>
</template>

<script>

import codeMirror from '@/components/utils/code-mirror';
import languageSelect from '@/components/language/utils/select';
import Language from '@/modules/language/main';

export default {
	components: {
		codeMirror,
		languageSelect,
	},
	props: {
		slug: {
			type: String,
			required: true,
		},
		option: {
			type: Object,
			default: null,
		},
		gql: {
			type: Object,
			default: null,
		},
	},
	data: () => ({
		code: '',
		language: Language.first(),
		isLoading: false,
		isError: false,
	}),

	methods: {
		submit() {
			if (!this.gql) {
				return;
			}
			this.isLoading = true;
			this.isError = false;
			this.$apollo.mutate({
				mutation: this.gql,
				variables: {
					problemSlug: this.slug,
					language: this.language.full,
					code: this.code,
					...this.option,
				},
			})
				.then((response) => {
					this.$router.push({
						name: 'StatusDetail',
						params: {
							pk: response.data.submitSubmission.pk,
						},
					});
				})
				.catch(() => {
					this.isError = true;
				})
				.finally(() => { this.isLoading = false; });
		},
	},
};
</script>
