<template>
	<v-dialog
		:value = "value"
		max-width = "800px"
		@input = "$emit( 'input' , $event )"
	>
		<v-card style = "overflow-y:hidden;">
			<v-container>
				<div>
					<v-subheader> Theme </v-subheader>
					<v-select
						v-model = "theme"
						:items = "ThemeList"
						:item-value = "each => each"
						:item-text = "each => each.name"
						single-line
						hide-details
						class = "pl-2 pr-2 pb-2"
						solo
					>
						<template
							slot = "item"
							slot-scope = "{ item }"
						>
							<v-list-tile-content @mouseenter = "debounceUpdateTheme( item )">
								{{ item.name }}
							</v-list-tile-content>
						</template>
					</v-select>
				</div>
				<div>
					<v-subheader> Keymap </v-subheader>
					<v-select
						v-model = "keymap"
						:items = "KeymapList"
						:item-value = "each => each"
						:item-text = "each => each.name"
						single-line
						hide-details
						class = "pl-2 pr-2 pb-2"
						solo
					/>
				</div>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import Theme from '@/modules/code-mirror/theme';
import Keymap from '@/modules/code-mirror/keymap';
import debounce from 'lodash/debounce';

export default {
	props: {
		value: {
			type: Boolean,
			required: true,
		},
	},

	data() {
		return {
			ThemeList: Theme.all(),
			KeymapList: Keymap.all(),
			theme: null,
			keymap: null,
		};
	},

	watch: {
		keymap(current) {
			this.$store.dispatch('editor/updateKeymap', current);
		},
		theme(current) {
			this.$store.dispatch('editor/updateTheme', current);
		},
	},

	mounted() {
		this.theme = this.$store.getters['editor/currentTheme'] || Theme.first();
		this.keymap = this.$store.getters['editor/currentKeymap'] || Keymap.first();
		this.debounceUpdateTheme = debounce(this.updateTheme, 125);
	},

	methods: {
		updateTheme(theme) {
			this.theme = theme;
		},
	},
};
</script>
