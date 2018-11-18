<template>
	<div>
		<code-mirror
			v-model = "code"
			:option = "{ mode: language.codemirror }"
		>
			<template slot = "extension">
				<v-divider class = "mt-4 mb-4"/>
				<v-card class = "pl-2 pr-2 pb-4" >
					<v-card-actions>
						<div class = "text-xs-right">
							<languageSelect
								v-model = "language"
								:item-value = "each => each"
								:clearable = "false"
								append-icon = "mdi-menu-down"
							/>
						</div>
					</v-card-actions>
				</v-card>
			</template>
		</code-mirror>
	</div>
</template>

<script>

import codeMirror from '@/components/utils/code-mirror';
import languageSelect from '@/components/language/utils/select';
import Language from '@/plugins/language';

export default {
	components: {
		codeMirror,
		languageSelect,
	},
	props: {
		problemslug: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		code: '',
		language: Language[0],
	}),
};
</script>
